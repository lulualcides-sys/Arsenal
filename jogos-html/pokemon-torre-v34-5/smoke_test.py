from pathlib import Path
from playwright.sync_api import sync_playwright
import json
s=Path("jogos-html/pokemon-torre-v34-5/index.html").read_text(encoding="utf-8")
assert s.count("PokemonTorreV345Diagnostics")==1
marker="\nrender();\n})();"
assert s.count(marker)==1
api=r"""
window.__test345={
 seed(){
  save.starter=65;save.team=[mon(65,60),mon(4,60),mon(6,60)];save.box=[];save.coins=2000;save.gym=2;save.stage=1;persist();render();
  return PokemonTorreV345Diagnostics();
 },
 recover(slot){
  stopTimers();battle=null;const m=save.team[0],cat=v32Catalogue(m);
  const rec=cat.find(x=>x.move.name==='Recover'&&x.available);if(!rec)return {error:'Recover nao esta disponivel'};
  m.v32Slots=[...v32DefaultSlots(m)];m.v32Slots[slot]=rec.key;
  const ability=skillSet(m)[slot]?.name;
  const coins=save.coins;
  m.hp=Math.max(1,m.maxHp-72);
  startBattle([mon(74,42)],'TESTE RECOVER',false);
  engine.v25.entry=[];battle.paused=false;battle.energy=100;cooldowns=[0,0,0,0];
  const beforeHP=m.hp,energy=battle.energy;
  engine.useMove(slot);
  const afterHP=m.hp,afterEnergy=battle.energy,afterCooldown=cooldowns[slot];
  engine.useMove(slot);
  return {ability,beforeHP,afterHP,max:m.maxHp,energySpent:energy-afterEnergy,cooldown:afterCooldown,cooldownHeld:cooldowns[slot]===afterCooldown,coinsUnchanged:save.coins===coins,heals:engine.v345Cures};
 },
 status(){
  stopTimers();battle=null;const m=save.team[0],cat=v32Catalogue(m),move=cat.find(x=>x.move.name==='Calm Mind'&&x.available);
  if(!move)return {error:'Calm Mind not found'};
  m.v32Slots=[...v32DefaultSlots(m)];m.v32Slots[1]=move.key;
  const used=skillSet(m)[1]?.name;
  startBattle([mon(74,42)],'TESTE STATUS',false);engine.v25.entry=[];battle.paused=false;battle.energy=100;cooldowns=[0,0,0,0];
  const b=engine.v25.stats.player.atk;
  const energy=battle.energy;engine.useMove(1);
  return {used,before:b,after:engine.v25.stats.player.atk,energySpent:energy-battle.energy,labels:(engine.v26Labels||[]).map(x=>x.text).slice(-4)};
 },
 sprites(){
  const recorded=[],ctx=engine.ctx,old=ctx.scale;
  ctx.scale=function(x,y){recorded.push(Number(x.toFixed(3)));return old.call(this,x,y)};
  try{engine.drawMon(engine.player,4,false,performance.now());engine.drawMon(engine.player,6,false,performance.now());}
  finally{ctx.scale=old}
  return recorded;
 },
 arena(){
  renderBattle();
  const a=document.querySelector('.arenaPro'),f=document.querySelector('.battleFooter'),t=document.querySelector('.skillName b');
  return {height:a?.getBoundingClientRect().height,width:a?.getBoundingClientRect().width,footerHeight:f?.getBoundingClientRect().height,font:t?parseFloat(getComputedStyle(t).fontSize):0};
 },
 duo(){
  stopTimers();battle=null;save.gym=1;save.stage=1;startBattle([mon(41,40),mon(52,40)],'ROCKET',false);
  return {auto:!!battle.v31Duo&&!battle.v31Duo.v33Manual};
 }
};
"""
s=s.replace(marker,"\n"+api+marker)
with sync_playwright() as p:
 b=p.chromium.launch(headless=True,args=["--no-sandbox","--disable-gpu"])
 page=b.new_page(viewport={"width":390,"height":844},is_mobile=True,has_touch=True,device_scale_factor=1)
 errors=[];page.on("pageerror",lambda e:errors.append(str(e)))
 page.set_content(s,wait_until="domcontentloaded",timeout=45000)
 diag=page.evaluate("window.__test345.seed()")
 assert diag["species"]==151 and len(diag["scales"])==151,diag
 assert diag['starterExample']['charmander']<diag['starterExample']['charmeleon']<diag['starterExample']['charizard'],diag
 assert min(diag["scales"])>=.69 and max(diag["scales"])<=1.22,diag
 recover=page.evaluate("window.__test345.recover(2)")
 assert recover.get('ability')=='Recover' and recover['afterHP']>recover['beforeHP'] and recover['afterHP']<=recover['max'] and recover['energySpent']>0 and recover['cooldownHeld'] and recover['coinsUnchanged'],recover
 status=page.evaluate("window.__test345.status()")
 assert status.get('used')=='Calm Mind' and status['after']>status['before'] and status['energySpent']>0,status
 scales=page.evaluate("window.__test345.sprites()")
 assert any(abs(x-diag['scales'][3])<.001 for x in scales) and any(abs(x-diag['scales'][5])<.001 for x in scales),scales
 arena=page.evaluate("window.__test345.arena()")
 assert arena['height']>220 and arena['font']<=12,arena
 duo=page.evaluate("window.__test345.duo()");assert duo['auto'],duo
 assert not errors,errors
 print(json.dumps({"species":151,"scale":diag['starterExample'],"recover":recover,"status":status,"arena":arena,"duo":duo,"page_errors":errors},ensure_ascii=False))
 b.close()
