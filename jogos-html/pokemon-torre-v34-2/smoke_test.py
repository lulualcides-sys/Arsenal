from pathlib import Path
from playwright.sync_api import sync_playwright
from json import dumps
s=Path("jogos-html/pokemon-torre-v34-2/index.html").read_text()
marker="/* FIM POKEMON TORRE V34.2 */"
assert s.count(marker)==1
bridge="""
window.__test342={
 seed(){save.starter=25;save.team=[mon(25,60),mon(65,60),mon(34,60)];save.box=[];save.coins=1000;save.gym=1;save.stage=7;persist();render();return PokemonTorreV342Diagnostics()},
 leader(g){stopTimers();battle=null;save.gym=g;save.stage=v29TrainerCount(g);launchTrainer();const b=battle;const out={team:[[b.foe.id,b.foe.level],...b.enemies.map(m=>[m.id,m.level])],leader:b.v342GymLeader,label:b.label,roster:!!document.querySelector('#v342LeaderRoster')};stopTimers();battle=null;close();return out},
 status(){save.gym=1;save.stage=1;const m=save.team[0],cat=v32Catalogue(m),move=cat.find(x=>x.move.name==='Thunder Wave'&&x.available&&x.move.kind==='status');if(!move)return {error:'Thunder Wave not learned'};
 m.v32Slots=[move.key,...skillSet(m).slice(1).map(v32MoveKey)];
 startBattle([mon(120,21)],'⚔️ TESTE',false);engine.v25.entry=[];battle.paused=false;cooldowns=[0,0,0,0];
 const before=battle.energy;engine.useMove(0);
 return {conditions:engine.v25.stats.enemy.conditions,energySpent:before-battle.energy,name:skillSet(m)[0].name};
 },
 electric(){const old=engine.ctx.arc;let count=0;engine.ctx.arc=function(...args){count++;return old.apply(this,args)};engine.drawProjectile({type:'electric',x:400,y:200,vx:330,vy:-120,tail:[{x:348,y:220},{x:370,y:214}],r:7,from:'player'});engine.ctx.arc=old;return count}
};
"""
s=s.replace(marker,marker+"\n"+bridge,1)
expected=[[[74,12],[95,14]],[[120,18],[121,21]],[[100,21],[25,18],[26,24]],[[71,29],[114,24],[45,29]],[[109,37],[89,39],[109,37],[110,43]],[[64,38],[122,37],[49,38],[65,43]],[[58,42],[77,40],[78,42],[59,47]],[[111,45],[51,42],[31,44],[34,45],[111,50]]]
with sync_playwright() as pw:
 browser=pw.chromium.launch(headless=True,args=["--no-sandbox","--disable-gpu"])
 page=browser.new_page(viewport={"width":393,"height":852},is_mobile=True,has_touch=True)
 errors=[];page.on("pageerror",lambda e:errors.append(str(e)))
 page.set_content(s,wait_until="domcontentloaded",timeout=30000)
 diag=page.evaluate("window.__test342.seed()")
 assert diag["statuses"]>=40,diag
 assert [x["team"] for x in diag["leaders"]]==expected,diag
 for g in range(8):
  result=page.evaluate("(g)=>window.__test342.leader(g)",g)
  assert result["team"]==expected[g] and result["leader"]==g and result["roster"],result
 status=page.evaluate("window.__test342.status()")
 assert status.get("name")=="Thunder Wave" and "paralysis" in status["conditions"] and status["energySpent"]>0,status
 assert page.evaluate("window.__test342.electric()")==0,"Projectile contains orb instead of lightning"
 assert not errors,errors
 print(dumps({"leaders_verified":8,"moves_of_status":diag["statuses"],"paralysis":status,"electric_orbs":0,"page_errors":errors}))
 browser.close()
