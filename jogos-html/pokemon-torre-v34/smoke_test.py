"""Browser smoke tests for Pokémon Torre V34, including save/moves/double battle."""
from pathlib import Path
from playwright.sync_api import sync_playwright
import json

source=Path("jogos-html/pokemon-torre-v34/index.html").read_text(encoding="utf-8")
marker="\nrender();\n})();\n</script>"
assert source.count(marker)==1, "Main game initialization marker changed"
assert "PokemonTorreV34Diagnostics" in source
harness = r"""
window.__v34Test={
 seed(){
  save.starter=25;save.team=[mon(25,54),mon(6,54),mon(34,54)];save.box=[];
  save.gym=1;save.stage=3;save.coins=500;save.balls=10;persist();render();
  return window.PokemonTorreV34Diagnostics();
 },
 valid(){
  const failed=[];for(let id=1;id<=151;id++){const m=mon(id,55),skills=skillSet(m);
   if(skills.length!==4||skills.some(x=>!x||!x.name||!Number.isFinite(x.cd)||x.cd<=0))failed.push(id);
  }return failed;
 },
 team(){
  showTeam();
  return {moves:!!document.querySelector("#v331MovesShortcut"),
   profile:!!document.querySelector(".v34DexButton"),
   count:document.querySelectorAll("[data-team]").length};
 },
 moves(){
  document.querySelector("#v331MovesShortcut")?.click();
  document.querySelector('[data-v331-pokemon="0"]')?.click();
  const count=document.querySelectorAll("[data-v331-slot]").length;
  const names=skillSet(save.team[0]).map(m=>m.name);
  const opts=[...document.querySelectorAll('[data-v331-pick]:not(:disabled)')];
  const choose=opts.find(el=>!names.includes(el.querySelector("b")?.textContent?.replace(/^[^ ]+ /,"")||""));
  if(choose)choose.click();
  return {count,options:opts.length,before:names,after:skillSet(save.team[0]).map(m=>m.name)};
 },
 duo(){
  close();startBattle([mon(41,50),mon(52,50),mon(61,50)],"🚀 ROCKET DE KANTO",false);
  const d=battle?.v31Duo;return {
   active:!!battle?.active,auto:!!d&&!d.v33Manual,
   controls:!!document.querySelector("#v33DoubleControls"),
   clock:d?.clockAlly,enemyHP:d?.enemy?.hp,diagnostics:!!window.PokemonTorreV34Diagnostics()
  };
 },
 duoAfter(){const d=battle?.v31Duo;return {
  active:!!battle?.active,auto:!!d&&!d.v33Manual,
  enemyHP:d?.enemy?.hp??0,allyHP:d?.ally?.hp??0,
  controls:!!document.querySelector("#v33DoubleControls")
 }},
 hit(){if(!battle?.active)return {active:false};
  battle.paused=false;battle.energy=100;cooldowns=[0,0,0,0];
  const before=[...cooldowns];engine.useMove(0);engine.useMove(1);
  return {active:true,after:[...cooldowns],energy:battle.energy,before};
 }
};"""
testpage=source.replace(marker,"\n"+harness+marker)

with sync_playwright() as pw:
    browser=pw.chromium.launch(headless=True,args=["--no-sandbox","--disable-gpu"])
    page=browser.new_page(viewport={"width":390,"height":844},is_mobile=True,has_touch=True,device_scale_factor=1)
    errors=[]
    page.on("pageerror",lambda err:errors.append(str(err)))
    page.set_content(testpage,wait_until="domcontentloaded",timeout=30000)
    assert page.evaluate("!!window.PokemonTorreV34Diagnostics"), f"V34 missing; errors: {errors}"
    info=page.evaluate("window.__v34Test.seed()")
    assert info["version"]=="34.0",info
    failed=page.evaluate("window.__v34Test.valid()")
    assert not failed,f"Invalid move slots: {failed}"
    team=page.evaluate("window.__v34Test.team()")
    assert team["moves"] and team["profile"] and team["count"]==3,team
    moves=page.evaluate("window.__v34Test.moves()")
    assert moves["count"]==4 and moves["options"]>=4,moves
    # Team and trainer switch: the V34 game must not use gym leaders for regular fights.
    duo=page.evaluate("window.__v34Test.duo()")
    assert duo["active"] and duo["auto"] and not duo["controls"],duo
    page.wait_for_timeout(2400)
    hit=page.evaluate("window.__v34Test.hit()")
    assert hit["active"] and hit["after"][0]>hit["before"][0],hit
    page.wait_for_timeout(3000)
    end=page.evaluate("window.__v34Test.duoAfter()")
    assert end["auto"] and not end["controls"],end
    assert not errors,f"Browser runtime errors: {errors[:5]}"
    print(json.dumps({"version":info["version"],"species":151,"team":team,"moves":moves,"duo_start":duo,"hits":hit,"duo_end":end,"js_errors":errors},ensure_ascii=False))
    browser.close()
