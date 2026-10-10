from http.server import ThreadingHTTPServer, SimpleHTTPRequestHandler
from functools import partial
import threading
from playwright.sync_api import sync_playwright
srv=ThreadingHTTPServer(('127.0.0.1',18992),partial(SimpleHTTPRequestHandler,directory='/mnt/data'))
threading.Thread(target=srv.serve_forever,daemon=True).start()
with sync_playwright() as p:
 b=p.chromium.launch(headless=True,executable_path='/usr/bin/chromium',args=['--no-sandbox','--disable-dev-shm-usage'])
 page=b.new_page(viewport={'width':390,'height':844});errors=[]
 page.on('pageerror',lambda e:errors.append(str(e)))
 try:
  page.goto('http://127.0.0.1:18992/v6_debug.html',wait_until='load',timeout=12000)
  page.evaluate('localStorage.setItem("pokemonArenaV2Save", JSON.stringify({balls:25,caught:["gengar","eevee"],wins:3,xp:200,coins:55,potions:7,levels:{pikachu:9},levelXP:{},badges:2,rivalWins:2,active:"pikachu",starter:"pikachu",seen:["pikachu","gengar","eevee"]}))')
  page.reload();page.wait_for_timeout(200)
  print('stats:',page.locator('#saveStats').inner_text())
  page.locator('#startBtn').click();page.wait_for_timeout(200)
  page.evaluate('window.__v6debug.damageRockAt(2,90)')
  print('before resize',page.evaluate('window.__v6debug.stats.rocks[2].hp'),page.evaluate('window.__v6debug.stats.brokenCount'))
  page.set_viewport_size({'width':360,'height':760});page.wait_for_timeout(200)
  print('after resize',page.evaluate('window.__v6debug.stats.rocks[2].hp'))
  page.locator('#quickMenu').click();page.locator('#adventureBtn').click();page.wait_for_timeout(300)
  print('adventure loaded',page.evaluate('window.__v6debug.stats.mode'))
  print('errors:',errors)
 finally:b.close();srv.shutdown()
