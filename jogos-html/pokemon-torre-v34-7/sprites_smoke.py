from pathlib import Path
from playwright.sync_api import sync_playwright
import json
html=Path("jogos-html/pokemon-torre-v34-7/index.html").read_text(encoding="utf-8")
marker="\nrender();\n})();"
assert html.count(marker)==1
bridge=r"""
window.__347Test={
 seed(){
  save.starter=4;
  save.team=[mon(4,25),mon(6,45),mon(25,36)];
  save.box=[];
  render();
  return PokemonTorreV347SpriteDiagnostics();
 },
 art(){
  showTeam();
  const imgs=[...document.querySelectorAll('.spritewrap img.sprite')];
  return {sources:imgs.map(x=>({id:x.alt,url:x.src,source:x.dataset.v347Source})).slice(0,4),
   processed:document.querySelectorAll('[data-v347-processed]').length};
 },
 battle(){
  startBattle([mon(58,31),mon(59,40)],'TREINADOR KANTO',false);
  const e=engine.assets.get(4);
  const before=Boolean(e?.sheets?.Idle);
  const now=performance.now();
  engine.drawMon(engine.player,4,false,now);
  const after=Boolean(e?.custom&&e.customStatic);
  return {ready:before,keptCustom:after,active:!!battle?.active};
 },
 oldVersion(){return typeof PokemonTorreV346Diagnostics==='function';}
};
"""
html=html.replace(marker,"\n"+bridge+marker)
with sync_playwright() as p:
 browser=p.chromium.launch(headless=True,args=["--no-sandbox","--disable-gpu"])
 page=browser.new_page(viewport={"width":393,"height":852},is_mobile=True,has_touch=True)
 errors=[];page.on("pageerror",lambda e:errors.append(str(e)))
 page.set_content(html,wait_until="domcontentloaded",timeout=45000)
 info=page.evaluate("window.__347Test.seed()")
 assert info["version"]=="34.7-sprites" and info["mappedSpecies"]==151,info
 assert sum(info['preferences'].values())==151,info
 assert len(info['games'])==3,info
 assert page.evaluate("window.__347Test.oldVersion()")
 art=page.evaluate("window.__347Test.art()")
 assert art['processed']>=3,art
 assert art["sources"] and all("generation-iii" in item["url"] and item["source"] for item in art["sources"][:3]),art
 state=page.evaluate("window.__347Test.battle()")
 assert state["active"] and state["ready"] and state["keptCustom"],state
 assert not errors,errors
 print(json.dumps({"species":151,"byGame":info['preferences'],"sources":art["sources"][:3],"render":state,"errors":errors},ensure_ascii=False))
 browser.close()
