#!/usr/bin/env python3
"""Monitor de alterações em páginas oficiais de créditos. Sem login ou inscrições."""
import argparse
import datetime as dt
import hashlib
import json
import os
import re
import urllib.error
import urllib.request
from html.parser import HTMLParser
from pathlib import Path

KEYWORDS = re.compile(r"credit|cr[eé]dit|eligib|requisit|criteria|qualif|funded|founder|founded|startup|business email|valid|expire|expir|funding|financi|\$[0-9]", re.I)
SPACES = re.compile(r"\s+")
MAX_MATCHES = 65

class VisibleText(HTMLParser):
    def __init__(self):
        super().__init__()
        self.depth = 0
        self.lines = []
    def handle_starttag(self, tag, attrs):
        if tag in {'script', 'style', 'noscript', 'svg'}:
            self.depth += 1
    def handle_endtag(self, tag):
        if tag in {'script', 'style', 'noscript', 'svg'} and self.depth:
            self.depth -= 1
    def handle_data(self, data):
        if not self.depth:
            line = SPACES.sub(' ', data).strip()
            if len(line) > 12:
                self.lines.append(line[:240])

def fragments(html):
    parser = VisibleText()
    parser.feed(html)
    candidates = {x for x in parser.lines if KEYWORDS.search(x)}
    return sorted(candidates)[:MAX_MATCHES]

def digest(parts):
    return hashlib.sha256('\n'.join(parts).encode('utf-8')).hexdigest()

def fetch(url):
    req = urllib.request.Request(url, headers={'User-Agent':'StartupCreditRadar/1.0 (+official-public-source-monitor)','Accept':'text/html'})
    with urllib.request.urlopen(req, timeout=25) as resp:
        if resp.status != 200:
            raise RuntimeError(f'HTTP {resp.status}')
        raw = resp.read(2_000_000)
        return raw.decode('utf-8', errors='replace')

def scan(programs, previous, fetcher=fetch):
    now = dt.datetime.now(dt.timezone.utc).isoformat()
    result = dict(previous)
    changes, failures, checked = [], [], []
    for program in programs:
        slug, url = program['id'], program['url']
        try:
            parts = fragments(fetcher(url))
            if len(parts) < 3:
                raise ValueError('Conteúdo insuficiente para comparação confiável')
            new_hash = digest(parts)
            old = previous.get(slug)
            if old is not None and old.get('sha256') != new_hash:
                changes.append({'name':program['name'], 'url':url, 'before':old.get('samples',[]), 'after':parts})
            result[slug] = {'sha256': new_hash, 'samples': parts, 'checked_utc':now, 'url':url}
            checked.append(program['name'])
        except (OSError, urllib.error.URLError, ValueError, RuntimeError) as err:
            failures.append({'name':program['name'], 'url':url, 'error':type(err).__name__})
    return result, changes, failures, checked

def report(changes, failures, checked):
    day = dt.datetime.now(dt.timezone.utc).strftime('%Y-%m-%d')
    out = [f'# Radar de créditos: {day}', '', '> Mudanças de texto são sinais para revisão humana, não confirmação de nova oferta ou elegibilidade.', '',f'Fontes verificadas: **{len(checked)}**. Mudanças potenciais: **{len(changes)}**. Falhas de acesso: **{len(failures)}**.', '']
    for item in changes:
        prior = set(item['before'])
        added = [x for x in item['after'] if x not in prior][:8]
        out += [f"## Possível mudança: {item['name']}", f"Fonte: {item['url']}", '', '**Trechos para revisar:**']
        out += [f'- {x}' for x in added] or ['- Conteúdo removido/reorganizado: abrir fonte oficial e comparar requisitos.']
        out += ['', '**AÇÃO:** conferir manualmente a página e os termos antes de atualizar qualquer requisito.', '']
    if failures:
        out += ['## Páginas não verificadas']
        out += [f"- {x['name']}: {x['error']} ({x['url']})" for x in failures]
        out += ['']
    out += ['## Regras de segurança', '- Não há inscrição automática, transferência de créditos, coleta de dados pessoais nem confirmação de aprovação.', '- Valores anunciados não são saldos de crédito recebidos.', '- Dados da empresa e decisões de inscrição devem permanecer fora deste repositório público.', '']
    return '\n'.join(out)

def main():
    ap = argparse.ArgumentParser()
    ap.add_argument('--programs', default='toolkits/startup-credits/programs.json')
    ap.add_argument('--state', default='toolkits/startup-credits/state.json')
    ap.add_argument('--report', default='credit-report.md')
    args = ap.parse_args()
    programs = json.loads(Path(args.programs).read_text(encoding='utf-8'))
    path = Path(args.state)
    prev = json.loads(path.read_text(encoding='utf-8')) if path.exists() else {}
    state, changes, errors, checked = scan(programs, prev)
    path.parent.mkdir(parents=True, exist_ok=True)
    path.write_text(json.dumps(state,ensure_ascii=False,indent=2)+'\n',encoding='utf-8')
    Path(args.report).write_text(report(changes, errors, checked),encoding='utf-8')
    if os.getenv('GITHUB_OUTPUT'):
        with open(os.environ['GITHUB_OUTPUT'],'a',encoding='utf-8') as out:
            out.write(f"changed={'true' if changes else 'false'}\n")
    print(f'checked={len(checked)}, changes={len(changes)}, failures={len(errors)}')

if __name__ == '__main__':
    main()
