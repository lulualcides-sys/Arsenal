from playwright.sync_api import sync_playwright
from pathlib import Path
s=Path('/mnt/data/Pokemon_Torre_Arena_V10_GitHub.html').read_text().replace('render();\n})();', 'window.__gameTest={save:()=>save,battle:()=>battle,engine:()=>engine,hit:(x)=>engine.hitTarget("enemy","fire",x)};render();\n})();')
preset={'v':9,'starter':4,'team':[{'id':4,'level':5,'xp':0,'maxHp':25,'hp':25}],'box':[],'gym':0,'stage':0,'routeUsed':{},'medals':[],'coins':50,'balls':5,'potions':3,'wins':0,'losses':0}
with sync_playwright() as p:
 b=p.chromium.launch(headless=True,executable_path='/usr/bin/chromium',args=['--no-sandbox','--disable-dev-shm-usage','--disable-gpu-sandbox'])
 for width,height in [(390,844),(360,760),(1280,800)]:
  page=b.new_page(viewport={'width':width,'height':height},device_scale_factor=1,has_touch=(width<500),is_mobile=(width<500))
  errors=[];page.on('pageerror',lambda e:errors.append(str(e)))
  page.evaluate('''(preset)=>{let d={pokeTorreKantoV9:JSON.stringify(preset)};Object.defineProperty(window,'localStorage',{configurable:true,value:{getItem:k=>d[k]||null,setItem:(k,v)=>d[k]=v}})}''',preset)
  page.set_content(s,wait_until='domcontentloaded')
  page.locator('#fightBtn').click()
  page.wait_for_timeout(1400)
  shot=f'/mnt/data/Pokemon_V10_Batalha_{width}.png'
  page.screenshot(path=shot,full_page=False)
  dimensions=page.evaluate('''()=>({canvas:document.querySelector('#battleCanvas').getBoundingClientRect().toJSON(),modal:document.querySelector('.combatModal').getBoundingClientRect().toJSON(),scrollHeight:document.querySelector('.combatModal').scrollHeight,clientHeight:document.querySelector('.combatModal').clientHeight,skills:[...document.querySelectorAll('[data-skill]')].map(x=>x.getBoundingClientRect().toJSON())})''')
  print('SCREEN',width,height,'FPS',page.locator('#fpsChip').inner_text(),'CANVAS HEIGHT',round(dimensions['canvas']['height']),'SCROLL', dimensions['scrollHeight'],dimensions['clientHeight'],'ERRORS',errors[:3], flush=True)
  assert not errors,errors
  assert dimensions['canvas']['height']>220
  assert dimensions['scrollHeight']<=dimensions['clientHeight']+2, dimensions
  assert all(v['bottom']<=height for v in dimensions['skills']),dimensions
  page.locator('[data-skill="1"]').click()
  page.wait_for_timeout(110)
  n=int(page.locator('#energyNumber').inner_text())
  print('energy',n,'waypoint-test',page.evaluate('''()=>{let e=window.__gameTest.engine();let r=e.rocks[0];return e.findWaypoint({x:r.x-100,y:r.y},{x:r.x+100,y:r.y})}'''),'errors',errors)
  assert n<100
  page.close()
 b.close()
