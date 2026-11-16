#!/usr/bin/env python3
"""Monitor de mudanças em páginas oficiais de créditos; não envia inscrições."""
import hashlib
import html
import json
import os
import re
import urllib.error
import urllib.request
from datetime import datetime, timezone
from html.parser import HTMLParser
from pathlib import Path

ROOT = Path(__file__).resolve().parent
STATE = ROOT / "state.json"
REPORT = ROOT / "latest-report.md"
SOURCES = [
    # Contas individuais, sem exigir CNPJ. Cada benefício depende de elegibilidade individual.
    ("AWS Free Tier", "https://aws.amazon.com/free/free-tier-faqs/"),
    ("Google Cloud Free", "https://cloud.google.com/free"),
    ("Google Cloud Free Trial FAQ", "https://cloud.google.com/signup-faqs?hl=pt-BR"),
    ("Oracle Cloud Free Tier Brasil", "https://www.oracle.com/br/cloud/free/faq/"),
    ("Azure Free Account", "https://azure.microsoft.com/en-us/pricing/purchase-options/azure-account"),
    ("Cloudflare Workers Free", "https://developers.cloudflare.com/workers/platform/limits/"),
    ("GitHub Student Developer Pack", "https://docs.github.com/pt/education/about-github-education/github-education-for-students/github-terms-and-conditions-for-the-student-developer-pack"),
]
class Text(HTMLParser):
    def __init__(self):
        super().__init__()
        self.parts = []
        self.skip = 0
    def handle_starttag(self, tag, attrs):
        if tag in ("script", "style", "noscript", "svg"):
            self.skip += 1
    def handle_endtag(self, tag):
        if tag in ("script", "style", "noscript", "svg") and self.skip:
            self.skip -= 1
    def handle_data(self, data):
        if not self.skip:
            self.parts.append(data)
def fingerprint(raw):
    p = Text()
    p.feed(raw.decode("utf-8", errors="replace"))
    s = re.sub(r"\s+", " ", html.unescape(" ".join(p.parts))).strip().lower()
    return hashlib.sha256(s.encode()).hexdigest(), len(s)
def fetch(url):
    req = urllib.request.Request(url, headers={"User-Agent": "StartupCreditsRadar/1.0 (+manual review; public pages)", "Accept-Language":"en-US,en;q=0.8"})
    with urllib.request.urlopen(req, timeout=25) as response:
        data = response.read(2_000_000)
        return fingerprint(data)
def main():
    old = json.loads(STATE.read_text()) if STATE.exists() else {}
    records = {}
    events = []
    now = datetime.now(timezone.utc).isoformat()
    for name, url in SOURCES:
        previous = old.get(url, {})
        entry = {"name": name, "url": url, "last_checked_utc": now, "fingerprint": previous.get("fingerprint"), "length":previous.get("length"), "status":"error"}
        try:
            fp, length = fetch(url)
            entry.update(fingerprint=fp, length=length, status="ok")
            if previous.get("fingerprint") and previous["fingerprint"] != fp:
                events.append(f"- **Possível alteração (revisão manual):** [{name}]({url})")
        except (urllib.error.URLError, TimeoutError, OSError, ValueError) as exc:
            entry["error"] = type(exc).__name__
        records[url] = entry
        print(name, entry["status"])
    STATE.write_text(json.dumps(records, ensure_ascii=False, indent=2, sort_keys=True) + "\n")
    lines = ["# Radar de créditos — última execução", "", f"Verificado em UTC: {now}", "",
             "O monitor detecta alterações em páginas públicas. **Não confirma créditos, elegibilidade, valores ou prazos; exige revisão manual.**", "",
             "## Alterações para verificar", *(events or ["Nenhuma mudança textual detectada nas fontes acessíveis."]), "",
             "## Fontes", "| Programa | Status de acesso | URL |", "|---|---|---|"]
    lines += [f"| {e['name']} | {e['status']} | {e['url']} |" for e in records.values()]
    lines += ["", "## Regras", "- Não criar contas, enviar formulários ou aceitar termos.", "- Perfil: pessoa física residente no Brasil, sem CNPJ. Identidade e elegibilidade não verificadas.", "- Proibido registrar CPF, RG, dados bancários, endereço, telefone ou e-mail no repositório público.", "- Não inventar dados de empresa nem aprovações.", "- Saldos e datas de expiração dependem de confirmação individual.", "- Mudanças no texto da página podem ser apenas marketing, rodapé ou layout."]
    REPORT.write_text("\n".join(lines) + "\n")
    # Saída interpretável pelo workflow sem depender de configuração privada.
    if os.getenv("GITHUB_OUTPUT"):
        with open(os.environ["GITHUB_OUTPUT"], "a") as f:
            f.write(f"changes={len(events)}\n")
    return 0
if __name__ == "__main__":
    raise SystemExit(main())
