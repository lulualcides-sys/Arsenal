#!/usr/bin/env python3
"""Synthetic buyer objections via local Ollama. NOT MiroFish or real demand."""
import argparse, json
from pathlib import Path
from urllib.request import Request, urlopen
from collections import Counter

ROLES=[("proprietario",12),("gestor_operacional",8),("financeiro",6),("consultor",4)]
OPTIONS=["nenhuma","149","249","399"]
def personas():
    out=[]
    for role,n in ROLES:
        for _ in range(n):
            i=len(out)
            out.append({"id":i+1,"role":role,"os_mes":[12,35,65,90,150,240][i%6],
                "sistema":["planilha","ERP","OS simples","manual"][i%4],
                "faturamento":["sem erro conhecido","suspeita de diferença","diferença confirmada internamente"][i%3],
                "dados":["completos","incompletos","variáveis"][i%3],
                "orçamento":["apertado","moderado","depende de ROI"][i%3]})
    assert len(out)==30
    return out
def prompt(p):
    return ("Cenário SINTÉTICO: você é um comprador B2B cético, NÃO pessoa real. "
        "Atue como o perfil brasileiro descrito. Pode rejeitar todas as ofertas. "
        "Não invente vendas, receita, taxas de acerto ou ROI. Perfil: "
        +json.dumps(p,ensure_ascii=False)
        +" Produto: RecuperaOS, SaaS que identifica divergências possivelmente faturáveis "
        "entre ordens de serviço, contratos e faturas importadas com autorização. "
        "Exige verificação humana; não é ERP; nenhuma eficácia medida ainda. "
        "Escolha entre NÃO COMPRAR, R$149, R$249, R$399 por mês. "
        "Responda SÓ JSON com exatamente: "
        '{"preco":"nenhuma|149|249|399","objecao":"texto curto em português",'
        '"prova_necessaria":"texto curto","razao":"texto curto"}.')
def ask(p,model):
    b=json.dumps({"model":model,"prompt":prompt(p),"stream":False,"format":"json",
        "options":{"seed":42,"temperature":0.2,"num_predict":190,"num_ctx":2048}}).encode()
    req=Request("http://127.0.0.1:11434/api/generate",b,
        {"Content-Type":"application/json"},method="POST")
    with urlopen(req,timeout=180) as res:
        raw=json.loads(res.read().decode())["response"]
    obj=json.loads(raw)
    assert isinstance(obj,dict)
    obj["preco"]=str(obj.get("preco","nenhuma")).strip()
    if obj["preco"] not in OPTIONS: obj["preco"]="nenhuma"
    for f in ["objecao","prova_necessaria","razao"]:
        obj[f]=str(obj.get(f,"não informado")).replace("\n"," ")[:500]
    return obj
def main():
    ap=argparse.ArgumentParser()
    ap.add_argument("--out",default="results")
    ap.add_argument("--model",default="qwen2.5:1.5b")
    ap.add_argument("--dry-run",action="store_true")
    args=ap.parse_args(); dest=Path(args.out); dest.mkdir(parents=True,exist_ok=True)
    people=personas()
    if args.dry_run:
        print("OK: 30 perfis fictícios; nenhuma chamada LLM")
        return
    data=[]
    for p in people:
        try:
            reply=ask(p,args.model)
            data.append({"persona":p,"resposta":reply})
            print(f"Perfil {p['id']:02d}/30: {reply['preco']} (SINTÉTICO)",flush=True)
        except Exception as exc:
            data.append({"persona":p,"erro":str(exc)[:300]})
            print(f"Perfil {p['id']:02d}/30: falha {exc}",flush=True)
    counts=Counter(x["resposta"]["preco"] for x in data if "resposta" in x)
    lines=["# Teste OFFLINE RecuperaOS — compradores fictícios","",
        "**Não é execução do MiroFish, pesquisa com clientes nem prova de vendas.**","",
        f"Modelo local: {args.model}. Respostas válidas: {sum(counts.values())}/30.","",
        "| Preferência SIMULADA | Contagem fictícia |","|---|---:|"]
    for k in OPTIONS:lines.append(f"| {k} | {counts[k]} |")
    lines+=["","## Objeções fictícias por perfil",""]
    for x in data:
        p=x["persona"]
        if "resposta" in x:
            r=x["resposta"]
            lines.append(f"- {p['id']:02d}: {p['role']}, {p['os_mes']} OS/mês, {p['sistema']}; {r['objecao']} | Exigência: {r['prova_necessaria']}")
        else: lines.append(f"- {p['id']:02d}: falha, não contabilizado.")
    lines+=["","**Uso autorizado:** levantar objeções e hipóteses a testar com pessoas reais; ",
        "não estimar demanda, CAC, LTV, receita, conversão ou intenção de pagamento.",""]
    (dest/"report.md").write_text("\n".join(lines),encoding="utf-8")
    (dest/"raw.json").write_text(json.dumps({"model":args.model,"type":"synthetic_not_mirofish","results":data},indent=2,ensure_ascii=False)+"\n",encoding="utf-8")
    print("Respostas válidas:",sum(counts.values()),"de 30")
    if sum(counts.values())<25:raise RuntimeError("Teste inválido: menos de 25 respostas.")
if __name__=="__main__":main()
