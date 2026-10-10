from playwright.sync_api import sync_playwright
from pathlib import Path
s=Path('/mnt/data/Pokemon_Arena_V9_Emerald_Battle.html').read_text().replace('render();\n})();','window.__gameTest={save:()=>save,battle:()=>battle,engine:()=>engine,hit:(damage)=>engine.hitTarget("enemy","electric",damage)};render();\n})();')
preset={'v':8,'starter':1,'team':[{'id':1,'level':6,'xp':0,'maxHp':38,'hp':38}],'box':[],'gym':0,'stage':0,'routeUsed':{},'medals':[],'coins':50,'balls':5,'potions':3,'wins':0,'losses':0}
with sync_playwright() as p:
 b=p.chromium.launch(headless=True,executable_path='/usr/bin/chromium',args=['--no-sandbox','--disable-dev-shm-usage'])
 for size in [(390,844),(1280,800)]:
  page=b.new_page(viewport={'width':size[0],'height':size[1]},device_scale_factor=1)
  errors=[];page.on('pageerror',lambda e:errors.append(str(e)))
  page.evaluate('''(preset)=>{let d={pokeTorreKantoV8:JSON.stringify(preset)};Object.defineProperty(window,'localStorage',{configurable:true,value:{getItem:k=>d[k]||null,setItem:(k,v)=>d[k]=v}})}''',preset)
  page.set_content(s,wait_until='domcontentloaded')
  page.locator('#fightBtn').click()
  page.wait_for_timeout(1600)
  path=f'/mnt/data/Pokemon_V9_Combat_{size[0]}.png'
  page.screenshot(path=path,full_page=False)
  print('SCREEN',path,'fps',page.locator('#fpsChip').inner_text(), 'error',errors[:3])
  assert not errors,errors
  # Attack UI and manual fire controls
  page.locator('[data-skill="1"]').click()
  page.wait_for_timeout(150)
  remaining=page.locator('#energyNumber').inner_text()
  print('ENERGY after hit',remaining,'rocks',page.evaluate('window.__gameTest.engine().rocks.map(x=>x.hp)'))
  assert int(remaining)<100
  page.close()
 b.close()
