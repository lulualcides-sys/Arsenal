from pathlib import Path
p=Path('/mnt/data/Pokemon_Arena_Offline_V5.html')
s=p.read_text()
def rep(old,new,n=1):
 global s
 assert old in s, f'Not found: {old[:90]!r}'
 s=s.replace(old,new,n)

# Title, menus, help and two distinct arena biomes
rep('Pokémon Arena V5 — Aventura Definitiva','Pokémon Arena V6 — Edição Emerald')
rep('★ POKÉMON V5','★ POKÉMON V6')
rep('VERSÃO 5 · EDIÇÃO EXPANDIDA','VERSÃO 6 · EMERALD EDITION')
rep('<option value="water">💧 Arena Aquática</option>', '<option value="water">💧 Arena Aquática</option><option value="forest">🌿 Clareira da Floresta</option><option value="cave">🪨 Caverna Rochosa</option>')
rep('Explore, evolua seus Pokémon, vença dois desafios, descubra espécies, visite a loja e batalhe em tempo real. Tudo offline, no celular e no PC.', 'Explore e capture Pokémon em batalhas de ação. Agora com mira manual, pedras destrutíveis, adversários que usam cobertura e arenas de floresta e caverna. Offline no PC ou celular.')
rep('🏅 Dois chefes, criaturas para capturar, níveis e evolução · 🔴 Pokébolas e poções', '🏅 Chefes e evoluções · 🪨 Quebre obstáculos com ataques · 🎯 Toque no campo para mirar')
rep('</div><div id="battleActions">','</div><div id="battleActions">')
rep('<div id="worldStatus" style="display:none"></div>','<div id="worldStatus" style="display:none"></div><div id="emeraldStatus" style="display:none" aria-live="polite">🎯 AUTO · 🪨 0</div>')
rep('#pickGrid{max-height:240px;overflow-y:auto}', '#pickGrid{max-height:240px;overflow-y:auto}\n#emeraldStatus{position:absolute;right:10px;z-index:5;pointer-events:none;top:calc(max(9px,env(safe-area-inset-top)) + 150px);border:1px solid #85ad9c;border-radius:11px;padding:4px 8px;background:#071b2cb8;color:#d4ffdf;font:800 10px system-ui;max-width:70%;text-align:right;text-shadow:0 2px #080d1d}#game.adventure-explore #emeraldStatus{display:none!important}')

# Add high-level state and arena reset helpers. Rocks created from resize, not persistent save.
rep('let player=null,enemy=null,projectiles=[],particles=[],rings=[],beams=[],marks=[],floaters=[],ambient=[],rocks=[],keys=new Set()', 'let player=null,enemy=null,projectiles=[],particles=[],rings=[],beams=[],marks=[],floaters=[],ambient=[],rocks=[],debris=[],hazards=[],targetPoint=null,manualAimTime=0,brokenCount=0,keys=new Set()')
rep('rocks=[{x:157,y:worldH*.3,r:36},{x:567,y:worldH*.64,r:38}];rebuildAmbient();', 'resetRocks();rebuildAmbient();')
# Reset per battle. no need change exploration except cleared when entering battles
rep('projectiles=[];particles=[];rings=[];beams=[];marks=[];floaters=[];slowmo=0;', 'projectiles=[];particles=[];rings=[];beams=[];marks=[];floaters=[];debris=[];hazards=[];brokenCount=0;targetPoint=null;manualAimTime=0;resetRocks();slowmo=0;')
# second instance in triggerWild
rep('projectiles=[];particles=[];rings=[];beams=[];marks=[];floaters=[];slowmo=0;', 'projectiles=[];particles=[];rings=[];beams=[];marks=[];floaters=[];debris=[];hazards=[];brokenCount=0;targetPoint=null;manualAimTime=0;resetRocks();slowmo=0;')

# Insert new mechanics just before movement helper
mark='function moveVector(){'
addon='''// ===== EMERALD ARENA V6 — Ported concepts, new browser implementation =====
function resetRocks(){
 const h=Math.max(worldH,490);
 rocks=[{x:163,y:h*.34,r:34,hp:62,maxHp:62},{x:572,y:h*.63,r:37,hp:82,maxHp:82},{x:356,y:h*.46,r:29,hp:51,maxHp:51}];
 if(arena==='water')rocks[2].r=25;
}
function closestOnSegment(x,y,x1,y1,x2,y2){let dx=x2-x1,dy=y2-y1,len=dx*dx+dy*dy||1,t=clamp(((x-x1)*dx+(y-y1)*dy)/len,0,1);return {x:x1+dx*t,y:y1+dy*t,t}}
function firstCover(x1,y1,x2,y2,padding=0){let found=null,tmin=2;for(const rock of rocks){if(rock.hp<=0)continue;let q=closestOnSegment(rock.x,rock.y,x1,y1,x2,y2);if(Math.hypot(rock.x-q.x,rock.y-q.y)<rock.r+padding&&q.t<tmin){found=rock;tmin=q.t}}return found}
function smashRock(rock,amount,source){if(!rock||rock.hp<=0)return;rock.hp-=amount;burst(rock.x,rock.y,'#c7c3ae',Math.min(12,4+Math.floor(amount/8)),160);if(rock.hp<=0){rock.hp=0;brokenCount++;screenShake=Math.max(screenShake,6);floatText(rock.x,rock.y-58,'QUEBROU!','#fbe7a5',18);for(let i=0;i<16;i++){let a=rand(0,6.28),speed=rand(90,280),life=rand(.55,1.2);debris.push({x:rock.x,y:rock.y,vx:Math.cos(a)*speed,vy:Math.sin(a)*speed-90,life,max:life,size:rand(3,10),rot:rand(-3,3)})}beep(150,.18)}else {floatText(rock.x,rock.y-38,'-'+Math.round(amount),'#d9e7d4',14)}}
function smashNearby(x,y,radius,amount,source){for(const rock of rocks)if(rock.hp>0&&Math.hypot(rock.x-x,rock.y-y)<rock.r+radius)smashRock(rock,amount,source)}
function aimPointFor(by,target){if(by===player&&targetPoint&&manualAimTime>0)return nrm(targetPoint.x-by.x,targetPoint.y-by.y);return aim(by,target)}
function rockWaypoint(c,goal){const block=firstCover(c.x,c.y,goal.x,goal.y,31);if(!block)return goal;let dir=nrm(goal.x-c.x,goal.y-c.y),side=((Math.sin((90-clock)*.28)+1)>1?1:-1),width=block.r+77;let a={x:clamp(block.x-dir.y*width*side,48,672),y:clamp(block.y+dir.x*width*side,50,worldH-55)};let b={x:clamp(block.x+dir.y*width*side,48,672),y:clamp(block.y-dir.x*width*side,50,worldH-55)};let cost=p=>Math.hypot(c.x-p.x,c.y-p.y)+Math.hypot(goal.x-p.x,goal.y-p.y);return cost(a)<cost(b)?a:b}
function emitHazard(x,y,kind,owner){if(!['fire','water','electric','ghost'].includes(kind))return;hazards.push({x:clamp(x,25,695),y:clamp(y,25,worldH-35),kind,owner,life:kind==='fire'?4.2:6,max:kind==='fire'?4.2:6,pulse:0,r:kind==='electric'?47:kind==='water'?52:36});if(hazards.length>14)hazards.shift()}
function moveKind(id){return id==='charizard'?'fire':['blastoise'].includes(id)?'water':['pikachu','jolteon'].includes(id)?'electric':id==='gengar'?'ghost':null}
function updateHazards(dt){for(let i=hazards.length-1;i>=0;i--){let h=hazards[i];h.life-=dt;h.pulse-=dt;if(h.life<=0){hazards.splice(i,1);continue}let target=h.owner===player?enemy:player;if(target&&target.hp>0&&h.pulse<=0&&Math.hypot(h.x-target.x,h.y-target.y)<h.r){if(h.kind==='fire'){hit(target,5,'#ff9852');h.pulse=.65}else if(h.kind==='electric'){hit(target,4,'#fcdf80');h.pulse=.78}}}}
function renderHazards(){for(const h of hazards){ctx.save();let a=Math.min(.48,h.life/h.max*.5);ctx.globalAlpha=a;ctx.fillStyle=h.kind==='fire'?'#ff742a':h.kind==='electric'?'#f8e554':h.kind==='water'?'#6acbff':'#b69ffa';ctx.shadowBlur=13;ctx.shadowColor=ctx.fillStyle;ctx.beginPath();ctx.ellipse(h.x,h.y+9,h.r,Math.max(9,h.r*.55),0,0,Math.PI*2);ctx.fill();ctx.restore()}}
function renderDebris(){for(let p of debris){ctx.save();ctx.globalAlpha=clamp(p.life/p.max,0,1);ctx.translate(p.x,p.y);ctx.rotate(p.rot*(1-p.life/p.max));ctx.fillStyle='#b4b1a6';ctx.fillRect(-p.size/2,-p.size/2,p.size,p.size);ctx.restore()}}
function updateEmeraldStatus(){const el=$('emeraldStatus');if(mode==='explore'||!running){el.style.display='none';return}el.style.display='block';el.textContent=(manualAimTime>0?'🎯 MIRA MANUAL':'🎯 MIRA AUTOMÁTICA')+' · 🪨 '+brokenCount+' / 3'}
canvas.addEventListener('pointerdown',e=>{if(!running||mode!=='arena'||!player||finished)return;let rect=canvas.getBoundingClientRect(),x=(e.clientX-rect.left)/scale,y=(e.clientY-rect.top-arenaTop)/scale;if(e.clientY-rect.top<arenaTop||e.clientY-rect.top>arenaBottom)return;targetPoint={x:clamp(x,20,700),y:clamp(y,15,worldH-25)};manualAimTime=9;setToast('🎯 MIRA MANUAL • 9s',700);updateEmeraldStatus()});
'''
rep(mark,addon+'\n'+mark)
# Fix active obstacles, ghost phasing
rep('for(const rock of rocks){let dx=c.x-rock.x', "for(const rock of rocks){if(rock.hp<=0||c.id==='gengar')continue;let dx=c.x-rock.x")
rep('for(let rock of rocks){ctx.save();', 'for(let rock of rocks){if(rock.hp<=0)continue;ctx.save();')
rep('ctx.restore()}}\nfunction arenaDraw(){', '''if(rock.hp<rock.maxHp){ctx.fillStyle='#161c29';ctx.fillRect(-rock.r,-rock.r-22,rock.r*2,5);ctx.fillStyle='#ffcf72';ctx.fillRect(-rock.r,-rock.r-22,rock.r*2*clamp(rock.hp/rock.maxHp,0,1),5)}ctx.restore()}}
function arenaDraw(){''')
# Arena colors
rep("bg={league:'#625448',lava:'#322d35',water:'#2a5f82'}[arena]", "bg={league:'#625448',lava:'#322d35',water:'#2a5f82',forest:'#426347',cave:'#403d4e'}[arena]")
rep("if(arena==='league'){ctx.fillStyle=rng>.5?'#65574a':'#5e5044'", "if(arena==='league'||arena==='forest'||arena==='cave'){ctx.fillStyle=arena==='forest'?(rng>.5?'#486e4e':'#3d6347'):arena==='cave'?(rng>.5?'#494758':'#383946'):(rng>.5?'#65574a':'#5e5044')")
rep("if(arena==='league'){ctx.fillStyle=seededNoise(a.x*2+a.y)>.5?'#7b6b52aa':'#392e2c88'", "if(arena==='league'||arena==='forest'||arena==='cave'){ctx.fillStyle=arena==='forest'?'#84a76d88':arena==='cave'?'#9aa6b755':(seededNoise(a.x*2+a.y)>.5?'#7b6b52aa':'#392e2c88')")
rep('drawRocks();\n// Arena atmospheric', 'renderHazards();drawRocks();renderDebris();\n// Arena atmospheric')
rep('if(enemyWindup)drawEnemyWarning();if(player&&enemy)', 'if(enemyWindup)drawEnemyWarning();if(player&&enemy)')
# aim reticle at manual target, otherwise enemy
rep("ctx.beginPath();ctx.ellipse(enemy.x,enemy.y+2,49,21,0,0,Math.PI*2);ctx.stroke();ctx.restore()", "const point=manualAimTime>0&&targetPoint?targetPoint:enemy;ctx.beginPath();ctx.ellipse(point.x,point.y+2,49,21,0,0,Math.PI*2);ctx.stroke();if(manualAimTime>0){ctx.beginPath();ctx.moveTo(point.x-18,point.y);ctx.lineTo(point.x+18,point.y);ctx.moveTo(point.x,point.y-18);ctx.lineTo(point.x,point.y+18);ctx.stroke()}ctx.restore()")
# aim manual in cast
rep('const dir=aim(by,target);by.face=', 'const dir=aimPointFor(by,target);by.face=')
# Damage and rocks collision for each move type: beams have point to first rock
rep("if(type==='beam'){beams.push({x:by.x,y:by.y,dx:dir.x,dy:dir.y,color:col,ttl:.42,max:.42,range:570,width:35});", "if(type==='beam'){const cover=firstCover(by.x+dir.x*43,by.y+dir.y*43,by.x+dir.x*570,by.y+dir.y*570,15);if(cover)smashRock(cover,43,by);let beamRange=cover&&cover.hp>0?Math.max(40,Math.hypot(cover.x-by.x,cover.y-by.y)-cover.r):570;beams.push({x:by.x,y:by.y,dx:dir.x,dy:dir.y,color:col,ttl:.42,max:.42,range:beamRange,width:35});")
rep('if(perpendicular<64&&t<570)hit(target,34*pow,col,dir);impact', 'if(perpendicular<64&&t<beamRange)hit(target,34*pow,col,dir);if(moveKind(by.id))emitHazard(by.x+dir.x*Math.min(beamRange,480),by.y+dir.y*Math.min(beamRange,480),moveKind(by.id),by);impact')
rep("if(type==='lunge'){by.dash=.28", "if(type==='lunge'){smashNearby(by.x+dir.x*165,by.y+dir.y*165,65,30,by);by.dash=.28")
rep("if(type==='burst'){impact(by.x,by.y,col,170);", "if(type==='burst'){smashNearby(by.x,by.y,173,29,by);if(moveKind(by.id))emitHazard(by.x,by.y,moveKind(by.id),by);impact(by.x,by.y,col,170);")
rep("if(type==='ultimate'){impact(by.x,by.y,col,260);", "if(type==='ultimate'){smashNearby(by.x,by.y,285,58,by);if(moveKind(by.id))emitHazard(by.x,by.y,moveKind(by.id),by);impact(by.x,by.y,col,260);")
# Strengthen cover: no direct beam damage if cover exists at beam length; beamRange excludes.
# Slightly smarter AI movement: find waypoint around obstructing rock
rep("let strafe=Math.sin((90-clock)*1.9);mov=", "let strafe=Math.sin((90-clock)*1.9);let waypoint=rockWaypoint(c,player),nav=nrm(waypoint.x-c.x,waypoint.y-c.y);if(Math.hypot(waypoint.x-player.x,waypoint.y-player.y)>15){dir=nav;}mov=")
# Projectile continuous collision with cover: stop & shatter before enemy check, but at immediate point
rep("if(dist(p,p.target)<p.size+31&&p.target.hp>0){", "let cover=rocks.find(r=>r.hp>0&&Math.hypot(r.x-p.x,r.y-p.y)<r.r+p.size);if(cover){smashRock(cover,p.kind==='small'?12:26,p.source);projectiles.splice(i,1);continue}if(dist(p,p.target)<p.size+31&&p.target.hp>0){")
# hazard and debris update every battle, manual aim timer, correct one tick; update after projectile array loop
rep('for(const arr of [particles,rings,beams,floaters])', 'manualAimTime=Math.max(0,manualAimTime-dt);updateHazards(dt);for(let i=debris.length-1;i>=0;i--){let d=debris[i];d.life-=dt;d.x+=d.vx*dt;d.y+=d.vy*dt;d.vy+=280*dt;d.vx*=.975;if(d.life<=0)debris.splice(i,1)}for(const arr of [particles,rings,beams,floaters])')
rep('slowmo=Math.max(0,slowmo-dt);updateHud()', 'slowmo=Math.max(0,slowmo-dt);updateHud();updateEmeraldStatus()')
# save rocks & hazards reset on return main menu too; avoid lingering relics
rep("$('quickMenu').addEventListener('click',()=>{", "$('quickMenu').addEventListener('click',()=>{targetPoint=null;manualAimTime=0;")
# Styling for user guidance
rep('💻 WASD / setas · 1 a 4 para golpes · espaço para esquiva', '💻 WASD / setas · 1 a 4 golpes · espaço esquiva · toque no campo para mirar')
# name updated in UI
p2=Path('/mnt/data/Pokemon_Arena_Offline_V6_Emerald.html')
p2.write_text(s)
print('Created',p2,len(s),'bytes')
