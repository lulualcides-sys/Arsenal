from playwright.sync_api import sync_playwright
from pathlib import Path
import json
h=Path('/mnt/data/Pokemon_Torre_Arena_V10_GitHub.html').read_text().replace('render();\n})();','window.__v8test={current:()=>current(),foe:()=>foe(),hit:(n)=>engine.hitTarget("enemy","electric",n),battle:()=>battle,save:()=>save,engine:()=>engine};render();\n})();')

def install(page,preset):
    page.evaluate('''(preset)=>{let d={pokeTorreKantoV7:JSON.stringify(preset)};Object.defineProperty(window,'localStorage',{configurable:true,value:{getItem:k=>d[k]||null,setItem:(k,v)=>d[k]=v}})}''',preset)
    page.set_content(h,wait_until='domcontentloaded')

with sync_playwright() as p:
 browser=p.chromium.launch(headless=True,executable_path='/usr/bin/chromium',args=['--no-sandbox'])
 def save(stage=0,level=14):return {'v':7,'starter':1,'team':[{'id':1,'level':level,'xp':0,'maxHp':60,'hp':60}], 'box':[], 'gym':0,'stage':stage,'routeUsed':{},'medals':[],'coins':35,'balls':5,'potions':3,'wins':0,'losses':0}
 page=browser.new_page(viewport={'width':390,'height':844})
 errors=[];page.on('pageerror',lambda e:errors.append(str(e)))
 install(page,save(6))
 assert 'LÍDER' in page.locator('#fightBtn').inner_text()
 page.locator('#fightBtn').click()
 for _ in range(10):
  if page.evaluate('window.__v8test.battle()===null'):break
  page.evaluate('window.__v8test.hit(300)')
  page.wait_for_timeout(100)
 print('AFTER FOES',page.evaluate('({b:window.__v8test.battle()?.foe?.id, gym:window.__v8test.save().gym, stage:window.__v8test.save().stage})'))
 assert page.evaluate('window.__v8test.save().gym')==1
 assert page.evaluate('window.__v8test.save().medals.length')==1
 assert page.locator('#nextStage').count()==1
 page.locator('#nextStage').click()
 assert 'Cascata Azul' in page.locator('body').inner_text()
 print('LEADER PROGRESSION PASS')
 page.close()
 page=browser.new_page(viewport={'width':390,'height':844}); errors2=[];page.on('pageerror',lambda e:errors2.append(str(e)))
 install(page,save(2));page.locator('#grassBtn').click()
 page.evaluate('Math.random=()=>0.0001')
 page.locator('#catchCombat').click()
 assert page.locator('#nextStage').count()==1
 assert page.evaluate('window.__v8test.save().team.length')==2
 print('WILD CAPTURE PASS')
 page.locator('#nextStage').click();page.locator('#teamBtn').click()
 assert page.locator('[data-team]').count()==2
 print('TEAM PASS', 'errors',errors,errors2)
 browser.close()
