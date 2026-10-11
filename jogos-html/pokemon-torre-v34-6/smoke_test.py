from pathlib import Path
from playwright.sync_api import sync_playwright
import json
s=Path("jogos-html/pokemon-torre-v34-6/index.html").read_text(encoding="utf-8")
assert s.count("PokemonTorreV346Diagnostics")==1
assert s.count("/* FIM POKEMON TORRE V34.6 */")==1
marker="\nrender();\n})();"
assert s.count(marker)==1
bridge=r"""
window.__346Test={
 seed(){
  save.starter=58;save.team=[mon(58,57),mon(6,60),mon(65,60)];save.box=[];save.coins=2000;save.gym=2;save.stage=1;persist();render();
  return PokemonTorreV346Diagnostics();
 },
 editor(){
  showTeam();
  const access=document.querySelector("#v331MovesShortcut");
  if(!access)return {error:"Atalho nao encontrado"};
  access.click();
  document.querySelector('[data-v331-pokemon="0"]')?.click();
  const buttons=[...document.querySelectorAll('#modal .v331MoveList .v331Choice')];
  return {count:buttons.length,costs:buttons.map(b=>Number(b.querySelector("small")?.textContent.match(/(\d+)\s*energia/i)?.[1]||0)),
   power:buttons.map(b=>Number(b.querySelector("small")?.textContent.match(/(\d+)\s*força/i)?.[1]||0)),
   data:document.querySelector('#modal .v331MoveList')?.getAttribute('data-v346-sorted'),
   first:buttons[0]?.querySelector('b')?.textContent};
 },
 weather(mode){
  stopTimers();battle=null;close();
  save.gym=mode==='volcano'?6:mode==='fog'?5:1;save.stage=1;
  startBattle([mon(74,45),mon(75,45)],mode==='fog'?'BRUMA NO GINASIO':'TREINADOR KANTO',false);
  battle.v32Weather=mode==='sun'?'sun':mode==='fog'?'fog':'clear';
  engine.v25.entry=[];battle.paused=false;
  engine.draw(performance.now());
  return PokemonTorreV346Diagnostics().weather;
 },
 attack(){
  stopTimers();battle=null;save.gym=1;save.stage=1;
  const m=save.team[0],cat=v32Catalogue(m),move=cat.find(x=>x.available&&(/Lança-Chamas|Flamethrower/.test(x.move.name)));
  if(!move)return {error:'Flamethrower indisponivel'};
  m.v32Slots=[move.key,...v32DefaultSlots(m).slice(1)];
  startBattle([mon(74,40),mon(75,40)],'TESTE LANCACHAMAS',false);
  engine.v25.entry=[];battle.paused=false;battle.energy=100;cooldowns=[0,0,0,0];
  engine.useMove(0);engine.draw(performance.now());
  return {name:skillSet(m)[0].name,animations:engine.v346Attacks?.length||0};
 },
 duo(){
  stopTimers();battle=null;save.gym=1;save.stage=1;
  startBattle([mon(41,40),mon(52,40)],'ROCKET',false);
  return {auto:!!battle.v31Duo&&!battle.v31Duo.v33Manual};
 }
};
"""
assert s.count("/* END V33.1 */")==1
s=s.replace("/* END V33.1 */","/* END V33.1 */\n"+bridge,1)
with sync_playwright() as p:
 b=p.chromium.launch(headless=True,args=["--no-sandbox","--disable-gpu"])
 page=b.new_page(viewport={"width":390,"height":844},is_mobile=True,has_touch=True,device_scale_factor=1)
 errors=[];page.on("pageerror",lambda e:errors.append(str(e)))
 page.set_content(s,wait_until="domcontentloaded",timeout=45000)
 diag=page.evaluate("window.__346Test.seed()")
 assert diag['version']=='34.6' and all(x in diag['environments'] for x in ['fog','volcano','sun']),diag
 ui=page.evaluate("window.__346Test.editor()")
 assert ui.get('data')=='1' and ui['count']>=10,ui
 c,power=ui['costs'],ui['power']
 assert all(c[i]==0 or c[i+1]>0 for i in range(len(c)-1)),ui
 assert all(power[i]>=power[i+1] for i in range(len(c)-1) if c[i]>0 and c[i+1]>0),ui
 modes={x:page.evaluate("(x)=>window.__346Test.weather(x)",x) for x in ['fog','volcano','sun']}
 assert modes=={'fog':'fog','volcano':'volcano','sun':'sun'},modes
 action=page.evaluate("window.__346Test.attack()")
 assert action.get('animations',0)>0,action
 duo=page.evaluate("window.__346Test.duo()");assert duo['auto'],duo
 assert not errors,errors
 print(json.dumps({'sorted':ui['count'],'first':ui['first'],'weathers':modes,'signature':action,'duo':duo,'errors':errors},ensure_ascii=False))
 b.close()
