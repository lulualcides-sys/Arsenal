from pathlib import Path
from playwright.sync_api import sync_playwright
import json
p=Path("jogos-html/pokemon-torre-v34-3/index.html")
s=p.read_text(encoding="utf-8")
assert s.count("PokemonTorreV343SignatureDiagnostics")==1
assert s.count("PokemonTorreV343Diagnostics")==1
bridge=r"""
window.__v343Tests={
 seed(){save.starter=25;save.team=[mon(25,63),mon(6,63),mon(34,63)];save.box=[];save.coins=2000;save.gym=1;save.stage=1;persist();render();return [PokemonTorreV343Diagnostics(),PokemonTorreV343SignatureDiagnostics()];},
 start(){startBattle([mon(120,45),mon(121,49)],'⚔️ TREINADOR DE KANTO',false);battle.paused=false;return !!battle?.active;},
 cast(){const m=save.team[0],cat=v32Catalogue(m),e=cat.find(x=>x.available&&x.move.name==='Thunder');if(!e)return 'no Thunder';
 m.v32Slots=[e.key,...v32DefaultSlots(m).slice(1)];battle.energy=100;cooldowns=[0,0,0,0];engine.useMove(0);
 return {name:skillSet(m)[0].name,cd:cooldowns[0],fx:engine.v343Named?.length||0};},
 draw(name){engine.fps=55;engine.v343Named=[{kind:name,phase:'travel',from:'player',start:performance.now()-90,duration:450,seed:15},{kind:name,phase:'impact',from:'player',start:performance.now()-60,duration:440,seed:16}];engine.draw(performance.now());return true;},
 quality(fps){engine.fps=fps;return PokemonTorreV343SignatureDiagnostics().quality;}
};
"""
assert s.count("/* END V33.1 */")==1
s=s.replace("/* END V33.1 */","/* END V33.1 */\n"+bridge,1)
with sync_playwright() as pw:
 browser=pw.chromium.launch(headless=True,args=["--no-sandbox","--disable-gpu"])
 page=browser.new_page(viewport={"width":390,"height":844},is_mobile=True,has_touch=True)
 errors=[]
 page.on("pageerror",lambda e:errors.append(str(e)))
 page.set_content(s,wait_until="domcontentloaded",timeout=30000)
 diag=page.evaluate("window.__v343Tests.seed()")
 assert len(diag[0]["types"])==18,diag
 names=diag[1]["eleven"]
 assert len(names)==11 and len(set(names))==11,names
 assert page.evaluate("window.__v343Tests.start()")
 result=page.evaluate("window.__v343Tests.cast()")
 assert result.get("name")=="Thunder" and result["fx"]>0,result
 assert page.evaluate("window.__v343Tests.quality(20)")=="low"
 assert page.evaluate("window.__v343Tests.quality(60)")!="low"
 for name in names:
  assert page.evaluate("(name)=>window.__v343Tests.draw(name)",name)
 assert not errors,errors
 print(json.dumps({"types":18,"special_effects":names,"real_attack":result,"errors":errors},ensure_ascii=False))
 browser.close()
