from pathlib import Path
import json
from playwright.sync_api import sync_playwright
s=Path("jogos-html/pokemon-torre-v34-4/index.html").read_text(encoding="utf-8")
assert "PokemonTorreV344Diagnostics" in s
assert "V344_SHEET_DATA" in s
assert s.count("/* FIM POKEMON TORRE V34.4 */")==1
marker="\nrender();\n})();"
assert s.count(marker)==1
bridge=r"""
window.__v344Test={
 seed(){save.starter=25;save.team=[mon(25,64),mon(6,64),mon(34,64)];save.box=[];save.coins=2000;save.gym=1;save.stage=2;persist();render();return PokemonTorreV344Diagnostics();},
 start(){startBattle([mon(120,45),mon(121,46)],'TREINADOR DE KANTO',false);battle.paused=false;return !!battle.active;},
 cast(){
  let m=save.team[0],c=v32Catalogue(m),x=c.find(q=>q.available&&q.move.name==='Thunder');
  if(!x)return {error:'Thunder indisponivel'};
  m.v32Slots=[x.key,...v32DefaultSlots(m).slice(1)];
  battle.energy=100;cooldowns=[0,0,0,0];engine.useMove(0);
  return {move:skillSet(m)[0].name,fx:engine.v344Fx?.length||0,diag:PokemonTorreV344Diagnostics()};
 },
 renderSprite(){
  const now=performance.now();engine.draw(now);
  return {fx:engine.v344Fx?.length||0,loaded:PokemonTorreV344Diagnostics().loaded};
 },
 duo(){stopTimers();battle=null;save.gym=1;save.stage=2;
  startBattle([mon(41,50),mon(52,50)],'ROCKET',false);
  return {auto:!!battle.v31Duo&&!battle.v31Duo.v33Manual};}
};
"""
assert s.count("/* END V33.1 */")==1
s=s.replace("/* END V33.1 */","/* END V33.1 */\n"+bridge,1)
with sync_playwright() as pw:
 browser=pw.chromium.launch(headless=True,args=["--no-sandbox","--disable-gpu"])
 page=browser.new_page(viewport={"width":390,"height":844},is_mobile=True,has_touch=True,device_scale_factor=1)
 errors=[];page.on("pageerror",lambda e:errors.append(str(e)))
 page.set_content(s,wait_until="domcontentloaded",timeout=45000)
 diag=page.evaluate("window.__v344Test.seed()")
 assert diag['version']=='34.4' and len(diag['realSpriteSheets'])==8 and len(diag['types'])==18,diag
 page.wait_for_function("window.PokemonTorreV344Diagnostics().loaded.length===8",timeout=15000)
 assert page.evaluate("window.__v344Test.start()")
 shot=page.evaluate("window.__v344Test.cast()")
 assert shot.get('move')=='Thunder' and shot['fx']>0,shot
 drawn=page.evaluate("window.__v344Test.renderSprite()")
 assert drawn['loaded'] and len(drawn['loaded'])==8,drawn
 assert page.evaluate("window.__v344Test.duo()")['auto']
 assert not errors,errors
 print(json.dumps({'sprites_ready':drawn['loaded'],'types':len(diag['types']),'named_moves':len(diag['namedMoves']),'cast':shot['move'],'duo_auto':True,'js_errors':errors},ensure_ascii=False))
 browser.close()
