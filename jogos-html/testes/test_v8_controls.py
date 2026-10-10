from playwright.sync_api import sync_playwright
from pathlib import Path
h=Path('/mnt/data/Pokemon_Torre_Arena_V8.html').read_text().replace('render();\n})();','window.__v8test={engine:()=>engine,battle:()=>battle};render();\n})();')
with sync_playwright() as p:
 b=p.chromium.launch(headless=True,executable_path='/usr/bin/chromium',args=['--no-sandbox'])
 page=b.new_page(viewport={'width':390,'height':844})
 errors=[];page.on('pageerror',lambda e:errors.append(str(e)))
 page.evaluate('''()=>{let d={};Object.defineProperty(window,'localStorage',{configurable:true,value:{getItem:k=>d[k]||null,setItem:(k,v)=>d[k]=v}})}''')
 page.set_content(h)
 page.locator('[data-starter="4"]').click();page.locator('#fightBtn').click()
 page.wait_for_timeout(250)
 x0=page.evaluate('window.__v8test.engine().player.x')
 joy=page.locator('#joyZone').bounding_box()
 x=joy['x']+joy['width']/2;y=joy['y']+joy['height']/2
 page.mouse.move(x,y);page.mouse.down();page.mouse.move(x+37,y,steps=3);page.wait_for_timeout(450);page.mouse.up()
 x1=page.evaluate('window.__v8test.engine().player.x')
 print('JOYSTICK MOVE',round(x0),round(x1),'DELTA',round(x1-x0))
 assert x1>x0+8,(x0,x1)
 page.locator('[data-skill="2"]').click();page.wait_for_timeout(200)
 page.screenshot(path='/mnt/data/Torre_V8_Efeito_390.png',full_page=False)
 page.wait_for_timeout(5400)
 print('AI HP',page.locator('#allyHpText').inner_text(),'log',page.locator('#battleLog').inner_text(),'errors',errors)
 assert not errors
 b.close()
