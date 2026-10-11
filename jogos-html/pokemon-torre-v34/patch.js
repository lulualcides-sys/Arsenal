/* POKEMON TORRE V34 — 2D: luta dupla automatica, golpes, chefes, terreno, ficha, captura e estabilidade */
(function(){
'use strict';
const V34='34.0';
const BADGE='✦';
const safe=(s)=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const clamp=(n,min,max)=>Math.min(max,Math.max(min,n));
function state(){if(!save.v34 || typeof save.v34!=='object')save.v34={};let s=save.v34;
 if(!s.stats)s.stats={battles:0,wins:0,losses:0,combo:0,dodges:0,bestStreak:0,streak:0,rewards:0,crits:0};
 if(!s.records)s.records=[];
 if(!s.tutorial)s.tutorial={};
 if(!s.settings)s.settings={quality:'auto'};
 return s;}
state();
const typeMoves={
 water:['Surf','Hydro Pump','Waterfall','Bubble Beam'],electric:['Thunderbolt','Thunder','Volt Tackle','Discharge'],fire:['Flamethrower','Fire Blast','Fire Spin','Ember'],
 grass:['Razor Leaf','Solar Beam','Petal Dance','Vine Whip'],psychic:['Psychic','Psybeam','Confusion','Recover'],poison:['Poison Jab','Sludge Bomb','Toxic','Acid'],
 ground:['Earthquake','Earth Power','Dig','Mud-Slap'],rock:['Rock Slide','Stone Edge','Rock Throw','Ancient Power'],ice:['Ice Beam','Blizzard','Ice Shard','Aurora Beam'],
 ghost:['Shadow Ball','Night Shade','Lick','Confuse Ray'],fighting:['Karate Chop','Cross Chop','Brick Break','Low Kick'],flying:['Air Slash','Wing Attack','Gust','Fly'],
 bug:['X-Scissor','Leech Life','Bug Bite','Pin Missile'],dragon:['Dragon Breath','Dragon Claw','Dragon Rage','Outrage'],normal:['Body Slam','Headbutt','Hyper Beam','Swift'],
 steel:['Iron Tail','Metal Claw','Iron Defense'],dark:['Bite','Crunch','Pursuit'],fairy:['Moonlight','Fairy Wind']
};
// Compatibilidade extra por espécie, não apenas por tipo.
const species={
 3:['Sleep Powder','Leech Seed','Solar Beam'],6:['Dragon Claw','Flamethrower','Fire Spin'],9:['Hydro Pump','Rapid Spin','Skull Bash'],
 12:['Sleep Powder','Stun Spore','Psybeam'],25:['Thunderbolt','Thunder Wave','Agility'],26:['Thunder','Thunderbolt','Quick Attack'],
 31:['Earthquake','Body Slam','Poison Jab'],34:['Megahorn','Earth Power','Poison Jab','Thrash'],
 38:['Fire Spin','Confuse Ray'],45:['Petal Dance','Solar Beam','Sleep Powder'],
 59:['Flamethrower','Extreme Speed','Crunch'],65:['Psychic','Recover','Reflect','Future Sight'],64:['Confusion','Recover','Reflect'],
 68:['Cross Chop','Karate Chop','Submission'],76:['Earthquake','Rock Slide','Explosion'],80:['Psychic','Surf','Amnesia'],
 89:['Sludge Bomb','Minimize','Acid'],94:['Shadow Ball','Hypnosis','Dream Eater'],95:['Rock Slide','Bind','Earthquake'],
 105:['Bonemerang','Bone Club','Earthquake'],112:['Rock Slide','Earthquake','Megahorn'],
 121:['Surf','Psychic','Ice Beam'],123:['X-Scissor','Wing Attack','Swords Dance'],
 130:['Hydro Pump','Dragon Rage','Hyper Beam'],131:['Surf','Ice Beam','Blizzard'],
 143:['Body Slam','Rest','Hyper Beam'],144:['Ice Beam','Blizzard','Agility'],145:['Thunderbolt','Thunder','Drill Peck'],
 146:['Flamethrower','Fire Blast','Wing Attack'],149:['Dragon Claw','Dragon Rage','Hyper Beam'],150:['Psychic','Recover','Barrier'],151:['Psychic','Metronome','Transform']
};
const moveTraits={
 'Recover':['psychic','recover',0,8800,35], 'Rest':['psychic','recover',0,9300,36], 'Reflect':['psychic','shield',0,6900,28],
 'Hypnosis':['psychic','status',0,7300,24],'Toxic':['poison','status',0,7800,29],'Sleep Powder':['grass','status',0,7800,25],
 'Thunder Wave':['electric','status',0,7400,25],'Stun Spore':['grass','status',0,7300,25],
 'Swords Dance':['normal','status',0,6800,24],'Iron Defense':['steel','shield',0,7000,27],
 'Agility':['psychic','status',0,6500,22],'Metronome':['normal','bolt',32,3400,28],
 'Earthquake':['ground','area',56,6300,43],'Surf':['water','area',52,5200,36],
 'Hydro Pump':['water','beam',60,5700,42],'Thunder':['electric','homing',61,10000,46],
 'Thunderbolt':['electric','bolt',45,3200,29],'Psychic':['psychic','homing',50,10000,35],
 'Shadow Ball':['ghost','homing',48,10000,33],'Solar Beam':['grass','beam',62,5900,44],
 'Hyper Beam':['normal','beam',70,8500,52],'Fire Spin':['fire','hazard',39,4800,28],
 'Blizzard':['ice','area',56,5900,43],'Rock Slide':['rock','area',48,5100,34],
 'X-Scissor':['bug','dash',42,2400,25],'Poison Jab':['poison','dash',43,2400,24],
 'Body Slam':['normal','dash',40,2500,22],'Megahorn':['bug','dash',57,4400,36],
 'Future Sight':['psychic','homing',55,10000,39],'Ice Beam':['ice','beam',49,3900,34]
};
const aliases={'Lança-Chamas':'Flamethrower','Raio':'Thunderbolt','Confusion':'Confusion','Hidro Bomba':'Hydro Pump','Terremoto':'Earthquake','Surf':'Surf','Psíquico':'Psychic','Slam':'Body Slam'};
const v34CatalogPrev=v32Catalogue;
function asMove(name,type,lvl){
 const t=moveTraits[name]||[type,(name.includes('Beam')||name.includes('Raio')?'beam':name.includes('Spin')?'hazard':'bolt'),32+Math.min(19,lvl*.22),2600+Math.min(1800,lvl*11),23+Math.min(16,lvl*.2)];
 return {name,type:t[0],kind:t[1],power:t[2],cd:t[3],cost:t[4],cat:t[2]>0?'special':'status',icon:(V32_ADD_MOVES[t[0]]?.icon)||'✨'};
}
// Não remove os golpes já equipados das versões anteriores.
v32Catalogue=function(m){
 const existing=v34CatalogPrev(m);if(!m||!D[m.id])return existing;
 const seen=new Set(existing.map(x=>x.key));const d=D[m.id];const names=[...(species[m.id]||[])];
 for(const t of [d.type,d.type2])if(t)names.push(...(typeMoves[t]||[]));
 const add=(name,n)=>{const same=existing.find(x=>x.move.name===name||aliases[x.move.name]===name);if(same)return;
  const type=Object.entries(typeMoves).find(([,ns])=>ns.includes(name))?.[0]||
    (Object.entries(moveTraits).find(([nm])=>nm===name)?.[1]?.[0])||d.type;
  const level=clamp(5+Math.floor(n/2)*7,5,78),move=asMove(name,type,level),key=v32MoveKey(move);
  if(seen.has(key))return;seen.add(key);existing.push({key,move,level,tm:false,available:m.level>=level});};
 names.forEach(add);
 // Para Pokémon da mesma linhagem, os conjuntos-base antigos permanecem disponíveis.
 return existing;
};
const prevRender=render, prevTeam=showTeam, prevDex=showPokedex;
const qualityCSS=document.createElement('style');qualityCSS.id='v34Style';qualityCSS.textContent=`
.v34Panel{background:#142c3e;border:1px solid #42687c;border-radius:13px;padding:12px;margin:10px 0;color:#d5eefb}
.v34Panel h3{margin:2px 0 10px;font-size:17px}.v34Actions{display:flex;gap:8px;flex-wrap:wrap;margin:9px 0}
.v34Actions>*{flex:1 1 115px;min-height:40px}.v34Profile{display:grid;grid-template-columns:88px 1fr;gap:12px;align-items:start}
.v34Profile img{max-width:84px;height:84px;object-fit:contain;image-rendering:pixelated}.v34Grid{display:grid;grid-template-columns:1fr 1fr;gap:8px}
.v34Datum{padding:7px 9px;border-radius:8px;background:#213c50;font-size:12px}.v34Datum strong{color:#ffdfa0}
.v34TrainerTag{color:#adcad9;font-size:11px}.v34AutoDuo{display:block;text-align:center;padding:7px;border:1px solid #5e9a98;border-radius:9px;margin:5px 0;color:#beffe5;background:#113c3b;font-size:11px}
.v34Callout{position:absolute;top:16%;left:50%;transform:translateX(-50%);z-index:22;color:#ffe4a9;background:#1c3149f2;border:1px solid #e8ba6c;border-radius:10px;padding:7px 9px;font-size:11px;pointer-events:none;max-width:70%;text-align:center}
.v34Indicator{font-size:10px;color:#c5ecf6;margin-left:5px}.v34Reward{font-size:11px;color:#bbecd2}.v34DexButton{display:block;margin:5px auto 0;padding:5px 9px;border-radius:7px;border:1px solid #4d8295;color:#c7edff;background:#143044;font-size:10px;cursor:pointer}
.v34ArenaMark{position:absolute;bottom:10px;left:50%;transform:translateX(-50%);color:#d9e0ee;opacity:.7;font-size:10px;pointer-events:none}
#v33DoubleControls,#v331DuoNotice{display:none!important}
@media(max-width:480px){.v34Grid{grid-template-columns:1fr}.v34Profile{grid-template-columns:72px 1fr}.v34Panel{padding:10px}}
`;document.head.appendChild(qualityCSS);
function mvName(m){return D[m.id]?.name||'Pokémon';}
function profile(m,compare=false){if(battle?.active||!m)return;
 const all=[...save.team,...save.box],idx=all.indexOf(m),p=D[m.id],nat=typeof v32Nature==='function'?v32Nature(m):{name:'Equilibrado'},moves=v32Catalogue(m),four=skillSet(m);
 let compareRow='';if(compare){const other=all.find(q=>q!==m&&q.id!==m.id)||all.find(q=>q!==m);if(other){const d=D[other.id];compareRow='<h3>⚖️ Comparação com '+safe(d.name)+'</h3><div class="v34Grid">'+[['Vida',m.maxHp,other.maxHp],['Nível',m.level,other.level],['Ataque base',p.atk,d.atk],['Defesa base',p.def,d.def],['Velocidade',p.spd,d.spd]].map(v=>'<div class="v34Datum">'+v[0]+': <b>'+v[1]+'</b> vs '+v[2]+'</div>').join('')+'</div>';}}
 overlay('<div class="sectionhead"><h2>📋 '+safe(p.name)+' · Nv.'+m.level+'</h2><button class="btn tiny ghost" id="v34Close">✕</button></div><div class="v34Panel v34Profile">'+img(m.id)+'<div><b>#'+String(m.id).padStart(3,'0')+' '+safe(p.name)+'</b><p class="v34TrainerTag">'+(TYPE_NAME[p.type]||p.type)+(p.type2?' / '+(TYPE_NAME[p.type2]||p.type2):'')+' · '+safe(nat.name)+' · '+(m.shiny?'✨ SHINY':'Normal')+'</p><div class="v34Datum">PV '+Math.ceil(m.hp)+'/'+m.maxHp+' · Nv. '+m.level+'</div><p class="v34TrainerTag">Item: '+safe(m.held||'Nenhum')+' · Treinamento: '+Object.values(m.v33Train||{}).reduce((a,b)=>a+(Number(b)||0),0)+' pontos</p></div></div><div class="v34Panel"><h3>⚔️ Golpes equipados</h3>'+four.map((x,i)=>'<div class="v34Datum">'+(i+1)+'. '+safe(x.name)+' · '+(TYPE_NAME[x.type]||x.type)+' · '+x.cost+' energia · '+(x.cd/1000).toFixed(1)+'s</div>').join('')+'<p class="v34TrainerTag">'+moves.filter(x=>x.available).length+' aprendidos de '+moves.length+' disponíveis · evoluções no menu da equipe</p></div><div class="v34Panel">'+compareRow+'</div><div class="v34Actions"><button class="btn ghost" id="v34Compare">⚖️ Comparar</button><button class="btn ghost" id="v34MoveBack">🧠 Trocar golpes</button><button class="btn gold" id="v34TeamBack">Voltar à equipe</button></div>');
 $('v34Close').onclick=prevTeam;$('v34TeamBack').onclick=showTeam;$('v34Compare').onclick=()=>profile(m,true);$('v34MoveBack').onclick=()=>{showTeam();const editor=$('v331MovesShortcut');if(editor)editor.click();};
}
showTeam=function(){prevTeam();if(battle?.active)return;document.querySelectorAll('[data-team]').forEach((row,i)=>{const m=[...save.team,...save.box][i];if(!m)return;const b=document.createElement('button');b.className='v34DexButton';b.textContent='📋 Ficha e atributos';b.type='button';b.onclick=()=>profile(m);row.insertAdjacentElement('afterend',b);});};
showPokedex=function(){prevDex();if(battle?.active)return;
 document.querySelectorAll('.dexGrid .dexCard').forEach((card,index)=>{const id=index+1;if(!save.seen.includes(id))return;const m=[...save.team,...save.box].find(x=>x.id===id)||mon(id,Math.max(5,save.gym*4+5));
 const b=document.createElement('button');b.type='button';b.className='v34DexButton';b.textContent='Golpes e detalhes';b.onclick=()=>{const info=v32Catalogue(m);const names=info.slice(0,35).map(x=>safe(x.move.name)+' <small> Nv.'+x.level+'</small>');overlay('<div class="sectionhead"><h2>📖 '+safe(D[id].name)+'</h2><button class="btn tiny ghost" id="v34DexClose">✕</button></div><div class="v34Panel">'+img(id)+'<p class="v34TrainerTag">'+(TYPE_NAME[D[id].type]||D[id].type)+' · '+(save.caught.includes(id)?'CAPTURADO':'VISTO')+' · '+((save.shinyCaught||[]).includes(id)?'✨ SHINY REGISTRADO':'')+'</p><h3>Movimentos compatíveis</h3><div class="v34Grid">'+names.map(n=>'<div class="v34Datum">'+n+'</div>').join('')+'</div></div><button class="btn ghost wide" id="v34DexReturn">Voltar à Pokédex</button>');$('v34DexClose').onclick=showPokedex;$('v34DexReturn').onclick=showPokedex;};card.append(b);
 });};
// 4: treinadores de Kanto — preserva sprites de líderes só nos desafios reais.
const KANTO_TRAINER_CLASSES=[['Jovem','youngster-gen1'],['Pescador','fisherman-gen1'],['Cientista','scientist-gen1'],['Caçador de Insetos','bugcatcher-gen1'],['Montanhista','hiker-gen1'],['Karateca','blackbelt-gen1'],['Criador de Pássaros','birdkeeper-gen1'],['Nadador','swimmerm-gen2'],['Domador','tamer-gen1'],['Supernerd','supernerd-gen1'],['Treinadora','jrtrainerf-gen1'],['Cavalheiro','gentleman-gen1']];
const prevBattleRender=renderBattle;
renderBattle=function(){prevBattleRender();const tag=$('v31Trainer');if(!tag||!battle?.active||battle.wild)return;
 const isLeader=/LÍDER\s/i.test(battle.label||'')&&save.gym<8;if(isLeader)return;
 const specials=/LABORATÓRIO|LENDÁRIO|TORRE|REVANCHE|RIVAL|ROCKET/i.test(battle.label||'');if(specials)return;
 const row=KANTO_TRAINER_CLASSES[(save.gym*5+save.stage)%KANTO_TRAINER_CLASSES.length];if(!row)return;
 const image=tag.querySelector('img');if(image){image.src='https://play.pokemonshowdown.com/sprites/trainers/'+row[1]+'.png';image.alt=row[0];}
 const label=tag.querySelector('.v31TrainerLabel');if(label)label.textContent=row[0]+' de Kanto';};
// 10: volta ao motor de ataque automático já presente no V31, sem duplicar loops.
function setAutoDuo(){const duo=battle?.v31Duo;if(!duo)return;
 duo.v33Manual=false;duo.v33Target='main';if(!Number.isFinite(duo.clockAlly)||duo.clockAlly>100)duo.clockAlly=.7;
 const old=$('v33DoubleControls');if(old)old.remove();$('v331DuoNotice')?.remove();let tag=$('v34DuoChip');if(!tag){tag=document.createElement('div');tag.className='v34AutoDuo';tag.id='v34DuoChip';const footer=document.querySelector('.battleFooter');footer?.querySelector('.skillgridV8')?.insertAdjacentElement('afterend',tag);}
 if(tag)tag.textContent='⚔️ '+mvName(duo.ally)+' ataca automaticamente · Você controla o Pokémon principal';
}
const prevStart=startBattle;
startBattle=function(enemies,label,wild){const r=prevStart(enemies,label,wild);if(battle?.active){setAutoDuo();battle.v34={start:performance.now(),hits:0,dodges:0,combo:0,lastAttack:null,rewarded:false,highestHp:current()?.hp||0};}return r;};
const prevUpdate=BattleEngine.prototype.update;
BattleEngine.prototype.update=function(dt,now){const b=battle,duo=b?.v31Duo;
 if(duo?.v33Manual){duo.v33Manual=false;if(duo.clockAlly>100)duo.clockAlly=.7;}
 const r=prevUpdate.call(this,dt,now);
 if(!battle?.active||!battle.v34||battle.paused)return r;
 const a=battle.v34;
 if(duo){if(duo.enemy?.hp<=0){duo.enemy=null;duo.v33Target='main';}if(!$('v34DuoChip')&&$('arenaPro'))setAutoDuo();}
 // 3: posicionamento por tipo — velocidade moderada e longe dos HUDs.
 const enemy=foe();if(enemy&&this.enemy&&this.player){const t=D[enemy.id]?.type;
  const rx=this.enemy.x-this.player.x,ry=this.enemy.y-this.player.y,dist=Math.hypot(rx,ry)||1;
  if(['psychic','ghost','water'].includes(t)&&dist<this.h*.22){this.enemy.x+=rx/dist*dt*12;this.enemy.y+=ry/dist*dt*9;}
  if(['fighting','ground','rock'].includes(t)&&dist>this.h*.29){this.enemy.x-=rx/dist*dt*10;this.enemy.y-=ry/dist*dt*7;}
  if(t==='electric'&&dist<this.h*.31){this.enemy.x+=Math.sin(now/500)*dt*9;}
  if(typeof this.bounds==='function')this.bounds(this.enemy);
 }
 // 6: chefe avisa o ataque carregado; sem novo timer de animação.
 if(battle.v33Boss>=0){
  if(!a.nextBoss)a.nextBoss=now+8500;
  if(!a.cast&&now>=a.nextBoss){a.cast={end:now+1050,type:V33_LEADERS[battle.v33Boss].type};a.nextBoss=now+9300;
   let chip=document.createElement('div');chip.className='v34Callout';chip.id='v34BossCast';chip.textContent='⚠️ '+V33_LEADERS[battle.v33Boss].name+' prepara um golpe especial!';$('arenaPro')?.append(chip);
  }
  if(a.cast&&now>=a.cast.end){const cast=a.cast;a.cast=null;$('v34BossCast')?.remove();if(battle?.active&&this.player&&this.enemy){
   const near=Math.hypot(this.player.x-this.enemy.x,this.player.y-this.enemy.y)<this.h*.64;
   if(near){this.hitTarget('enemy',cast.type,33);this.particlesAt(this.player.x,this.player.y,'#ffe39b',9,48);}
  }}
 }
 return r;};
// 2: efeitos ligados ao frame existente, limitados e sem alterar o tamanho dos sprites.
const prevDraw=BattleEngine.prototype.draw;
BattleEngine.prototype.draw=function(now){prevDraw.call(this,now);if(!battle?.active||!battle.v34||!this.ctx)return;
 const x=this.ctx,a=battle.v34,fx=a.fx;if(!fx||now-fx.at>480)return;
 let quality=state().settings.quality==='low'||(this.fps>0&&this.fps<28)?4:9;
 const progress=clamp((now-fx.at)/480,0,1),cx=fx.x,cy=fx.y;
 x.save();x.strokeStyle=fx.color;x.fillStyle=fx.color;x.globalAlpha=.53*(1-progress);x.lineWidth=2;
 for(let i=0;i<quality;i++){const ang=i*2*Math.PI/quality+fx.at*.003,len=12+progress*27;
  x.beginPath();x.moveTo(cx+Math.cos(ang)*6,cy+Math.sin(ang)*6);
  if(fx.type==='electric'){const mx=cx+Math.cos(ang)*(len*.6),my=cy+Math.sin(ang)*(len*.6);x.lineTo(mx+Math.sin(ang)*5,my);}
  else if(fx.type==='water'){x.arc(cx,cy,Math.max(3,len*.55),ang,ang+.6);}
  else if(fx.type==='ground'){x.lineTo(cx+Math.cos(ang)*len*.6,cy+Math.sin(ang)*len*.6);}
  x.lineTo(cx+Math.cos(ang)*len,cy+Math.sin(ang)*len);x.stroke();
 }
 x.restore();};
const prevUse=BattleEngine.prototype.useMove;
BattleEngine.prototype.useMove=function(i){const b=battle,s=b?.active?skillSet(current())[i]:null,now=performance.now(),valid=s&&b&&!b.paused&&current()?.hp>0&&cooldowns[i]<=now&&b.energy>=s.cost;
 if(valid&&b.v34){const a=b.v34;a.lastAttack=s.type;const color=(TYPE_COLOR[s.type]||'#fff');a.fx={type:s.type,color,at:now,x:this.enemy?.x||this.w/2,y:this.enemy?.y||this.h/2};a.hits++;}
 return prevUse.call(this,i);};
// 7: golpe muito forte pode interromper ataque carregado, mas apenas quando acerta.
const prevHit=BattleEngine.prototype.hitTarget;
BattleEngine.prototype.hitTarget=function(who,type,power){const before=who==='enemy'?current()?.hp:foe()?.hp,b=battle;const result=prevHit.call(this,who,type,power);
 if(!b?.active||battle!==b||!b.v34)return result;
 const after=who==='enemy'?current()?.hp:foe()?.hp;
 if(who!=='enemy'&&Number(before)>Number(after)&&b.v34.cast&&power>=44){b.v34.cast=null;$('v34BossCast')?.remove();v31Toast('⚡ Ataque do líder interrompido!');}
 if(before===after){b.v34.dodges++;}return result;};
// Combos de campo — bônus pequenos, limitados e sem multiplicadores cumulativos permanentes.
const prevDamage=damage;
damage=function(att,def,type,power){const r=prevDamage(att,def,type,power);if(!r?.hit||!battle?.active||!battle.v34)return r;
 const a=battle.v34,now=performance.now();let bonus=1,label='';
 if(type==='water')a.wetUntil=now+4800;
 if(type==='grass')a.grassUntil=now+5200;
 if(type==='ground')a.crackedUntil=now+5500;
 if(type==='electric'&&a.wetUntil>now){bonus=1.12;label='ÁGUA + ELÉTRICO';a.wetUntil=0;}
 else if(type==='fire'&&a.grassUntil>now){bonus=1.10;label='PLANTA + FOGO';a.grassUntil=0;}
 else if(type==='ice'&&a.wetUntil>now){bonus=1.08;label='ÁGUA + GELO';a.wetUntil=0;}
 else if(type==='rock'&&a.crackedUntil>now){bonus=1.11;label='TERRA + PEDRA';a.crackedUntil=0;}
 if(bonus>1){r.hit=Math.max(1,Math.round(r.hit*bonus));a.combo++;if(typeof v31Toast==='function')v31Toast('✦ COMBO '+label+' +'+Math.round((bonus-1)*100)+'%');}
 return r;};
// 8: captura com três balanços, bônus de status do jogo anterior e chance rara de captura crítica.
// Preserve o sorteio original, o Shiny e as Pokébolas das versões anteriores.
const v34CaptureUpdate=BattleEngine.prototype.v25Update;
BattleEngine.prototype.v25Update=function(dt){
 const cap=this.v25?.capture;
 if(cap && !cap.v34Prepared){
  cap.v34Prepared=true;cap.duration=2.85;cap.critical=Math.random()<.035;
  if(cap.critical){state().stats.crits++;if(!cap.success && Math.random()<.55)cap.success=true;}
 }
 return v34CaptureUpdate.call(this,dt);
};
const v34CaptureDraw=BattleEngine.prototype.v25Draw;
BattleEngine.prototype.v25Draw=function(c){
 v34CaptureDraw.call(this,c);
 const cap=this.v25?.capture;if(!cap||!cap.v34Prepared||cap.time<1.42||cap.time>2.76)return;
 const t=clamp((cap.time-1.42)/1.33,0,1),amp=(1-t)*.32;
 const theta=Math.sin(t*Math.PI*6)*amp;
 if(this.v25Ball)this.v25Ball(c,cap.toX,cap.toY+this.h*.035,this.h*.024,theta);
 c.save();c.textAlign='center';c.font='900 '+Math.max(10,this.h*.021)+'px system-ui';c.fillStyle=cap.critical?'#ffe78b':'#d4efff';c.globalAlpha=.65+.35*Math.sin(t*Math.PI);
 c.fillText(cap.critical?'✦ CAPTURA CRÍTICA':'●  ●  ●',cap.toX,cap.toY+this.h*.085);c.restore();
};

// 9: recompensas pequenas por desempenho; nunca em laboratório e nunca duas vezes.
const prevFinish=finishBattle;
finishBattle=function(win){if(!battle?.active)return;const b=battle,a=b.v34,mode=b.v33Type;
 const eligible=!!(win&&a&&mode!=='lab'&&b.v32Mode!=='lab');
 const hits=a?.hits||0,combo=a?.combo||0,dodges=a?.dodges||0,health=current()?.hp||0;
 const bonus=eligible&&!a.rewarded?Math.min(35,(health>0?8:0)+(combo>0?Math.min(12,combo*4):0)+(dodges>=3?10:0)+(hits>=4?5:0)):0;
 if(a)a.rewarded=true;
 const out=prevFinish(win);
 if(a&&mode!=='lab'){
  const s=state();s.stats.battles++;s.stats.wins+=win?1:0;s.stats.losses+=win?0:1;s.stats.combo+=combo;s.stats.dodges+=dodges;
  s.stats.streak=win?s.stats.streak+1:0;s.stats.bestStreak=Math.max(s.stats.bestStreak,s.stats.streak);
  s.records.unshift({at:Date.now(),win:!!win,enemy:mvName(b.foe||{}),mode:b.label||'',combo,bonus});s.records=s.records.slice(0,40);
  if(bonus>0){save.coins+=bonus;s.stats.rewards+=bonus;persist();document.querySelector('.result')?.insertAdjacentHTML('afterend','<p class="v34Reward">✦ Bônus de desempenho: +'+bonus+' moedas</p>');}
 }
 return out;};
// 5, 9, 11: menu ficha, Pokédex, histórico.
render=function(){prevRender();if(!save.starter||battle?.active)return;
 const ver=$('v30VersionTag');if(ver)ver.textContent='V34 · 2D';
 const root=$('main');if(!root||$('v34Menu'))return;const parent=root.querySelector('.gymHero')||root.querySelector('.v27League')||root.firstElementChild;
 if(!parent)return;const box=document.createElement('div');box.id='v34Menu';box.className='v34Actions';box.innerHTML='<button class="btn ghost" type="button" id="v34Stats">📊 Histórico V34</button><button class="btn ghost" type="button" id="v34Quality">⚙️ Qualidade: '+safe(state().settings.quality)+'</button>';
 parent.insertAdjacentElement('afterend',box);$('v34Stats').onclick=historyMenu;$('v34Quality').onclick=()=>{const q=state().settings.quality;state().settings.quality=q==='auto'?'low':q==='low'?'high':'auto';persist();render();const label=$('v34Quality');if(label)label.textContent='⚙️ Qualidade: '+state().settings.quality;};
};
function historyMenu(){const s=state().stats;const rows=state().records;
 overlay('<div class="sectionhead"><h2>📊 Histórico V34</h2><button class="btn tiny ghost" id="v34StatClose">✕</button></div><div class="v34Grid">'+[['Batalhas',s.battles],['Vitórias',s.wins],['Derrotas',s.losses],['Maior sequência',s.bestStreak],['Combos',s.combo],['Bônus em moedas',s.rewards],['Recorde Torre',save.v32?.tower?.best||0],['Shiny registrados',(save.shinyCaught||[]).length]].map(x=>'<div class="v34Datum">'+x[0]+': <strong>'+x[1]+'</strong></div>').join('')+'</div><div class="v34Panel"><h3>Últimos confrontos</h3>'+ (rows.slice(0,15).map(x=>'<p class="v34TrainerTag">'+new Date(x.at).toLocaleDateString('pt-BR')+' · '+(x.win?'✅ Vitória':'❌ Derrota')+' · '+safe(x.mode)+' · '+x.combo+' combos</p>').join('')||'<p>Ainda não há batalhas registradas na V34.</p>')+'</div><button class="btn ghost wide" id="v34StatBack">Voltar</button>');$('v34StatClose').onclick=close;$('v34StatBack').onclick=close;
}
window.PokemonTorreV34Diagnostics=()=>({version:V34,species:151,moveCatalog:save.team.map(m=>({id:m.id,total:v32Catalogue(m).length,learned:v32Catalogue(m).filter(x=>x.available).length})),duoAuto:!!battle?.v31Duo&&!battle.v31Duo.v33Manual,combo:battle?.v34?.combo||0,stats:{...state().stats},trainer:battle?.label||null,quality:state().settings.quality});
})();
/* END POKEMON TORRE V34 */