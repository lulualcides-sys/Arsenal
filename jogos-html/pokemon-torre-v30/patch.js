/* POKEMON TORRE V30 — PATCH UNIFICADO 2D: 10 MECANICAS + CAMERA + BACKUPS */
const V30_VERSION='30.0';
function v29TrainerCount(g){return Number.isInteger(g)&&g>=0&&g<8?6+g:6;}
// Estado local de habilidades; evita depender de auxiliares removidos em versões anteriores.
function sideState(side){
 if(!battle)return {atk:0,def:0,paralyze:0};
 if(!battle.v30Stats)battle.v30Stats={ally:{atk:0,def:0,paralyze:0},enemy:{atk:0,def:0,paralyze:0}};
 return battle.v30Stats[side==='enemy'?'enemy':'ally'];
}

const V30_SAFE_SAVE='pokeTorreKantoV30Safety';
const V30_MISSIONS_KEY='pokeTorreKantoV30Missions';
const V30_MOVE_TRAITS={
  3:{name:'Chicotes em Área',kind:'area',type:'grass',power:38,cost:34,cd:3400,icon:'🌿'},
  6:{name:'Chamas Persistentes',kind:'hazard',type:'fire',power:12,cost:39,cd:4100,icon:'🔥'},
  9:{name:'Onda Aquática',kind:'pierce',type:'water',power:48,cost:39,cd:4000,icon:'🌊'},
  25:{name:'Faísca Teleguiada',kind:'homing',type:'electric',power:38,cost:30,cd:3150,icon:'⚡'},
  26:{name:'Tempestade Elétrica',kind:'area',type:'electric',power:43,cost:39,cd:4200,icon:'🌩️'},
  31:{name:'Impacto de Nidoqueen',kind:'area',type:'ground',power:40,cost:36,cd:3800,icon:'💥'},
  34:{name:'Terremoto de Nidoking',kind:'area',type:'ground',power:43,cost:39,cd:4000,icon:'🌋'},
  59:{name:'Rastro de Fogo',kind:'hazard',type:'fire',power:13,cost:39,cd:4300,icon:'🔥'},
  64:{name:'Confusão Psíquica',kind:'homing',type:'psychic',power:37,cost:30,cd:3050,icon:'🔮'},
  65:{name:'Orbe Psíquico',kind:'homing',type:'psychic',power:43,cost:39,cd:4100,icon:'🔮'},
  68:{name:'Soco Sísmico',kind:'area',type:'fighting',power:39,cost:38,cd:4000,icon:'🥊'},
  76:{name:'Pedras em Área',kind:'area',type:'rock',power:42,cost:39,cd:4200,icon:'🪨'},
  94:{name:'Orbe Sombrio',kind:'homing',type:'ghost',power:40,cost:34,cd:3700,icon:'👻'},
  105:{name:'Osso Bumerangue',kind:'pierce',type:'ground',power:40,cost:33,cd:3600,icon:'🦴'},
  112:{name:'Terremoto',kind:'area',type:'ground',power:44,cost:40,cd:4500,icon:'⛰️'},
  121:{name:'Raio Aquático',kind:'pierce',type:'water',power:46,cost:39,cd:4150,icon:'🌟'},
  123:{name:'Lâminas Cortantes',kind:'pierce',type:'bug',power:43,cost:37,cd:3850,icon:'🦗'},
  125:{name:'Trovão Teleguiado',kind:'homing',type:'electric',power:43,cost:39,cd:4250,icon:'🌩️'},
  130:{name:'Fúria do Oceano',kind:'area',type:'water',power:45,cost:42,cd:4600,icon:'🌊'},
  131:{name:'Geada Persistente',kind:'hazard',type:'ice',power:12,cost:40,cd:4500,icon:'❄️'},
  143:{name:'Tremor de Snorlax',kind:'area',type:'normal',power:41,cost:37,cd:4000,icon:'💤'},
  144:{name:'Nevasca em Área',kind:'area',type:'ice',power:45,cost:42,cd:4500,icon:'❄️'},
  145:{name:'Raio de Zapdos',kind:'homing',type:'electric',power:45,cost:42,cd:4600,icon:'⚡'},
  146:{name:'Chamas de Moltres',kind:'hazard',type:'fire',power:15,cost:42,cd:4600,icon:'🔥'},
  149:{name:'Fúria Dracônica',kind:'pierce',type:'dragon',power:48,cost:43,cd:4700,icon:'🐉'},
  150:{name:'Onda de Mewtwo',kind:'area',type:'psychic',power:50,cost:45,cd:4800,icon:'🔮'},
  151:{name:'Orbe Místico',kind:'homing',type:'psychic',power:44,cost:39,cd:4500,icon:'✨'}
};
const v30BaseSkills=skillSet;
skillSet=function(m){const result=v30BaseSkills(m);const special=V30_MOVE_TRAITS[m.id];if(special){result[2]={...special,cat:'special'};}return result;};
const v30CSS=document.createElement('style');v30CSS.id='v30Css';v30CSS.textContent=`
.v30VersionTag{font-size:10px;color:#91e4ce;font-weight:800;letter-spacing:.08em;padding:3px 7px;border:1px solid #34765f;border-radius:8px}
.v30BossPhase{position:absolute;z-index:8;left:50%;top:19%;transform:translateX(-50%);background:#12273bdc;border:1px solid #d7b66b;color:#ffe3a2;font-size:10px;font-weight:800;letter-spacing:.06em;padding:6px 9px;border-radius:10px;max-width:67%;pointer-events:none;text-align:center}
.v30Ability{position:absolute;z-index:8;top:18%;left:3%;max-width:36%;font-weight:700;color:#c7f4df;font-size:10px;pointer-events:none;background:#152c3ba6;border:1px solid #91ddbe66;border-radius:7px;padding:4px 7px}
.v30Evolution{border:1px solid #d5c27b;border-radius:15px;padding:12px;background:linear-gradient(115deg,#182d49,#263447,#172d48);margin:12px 0;text-align:center;animation:v30Evolve 1.4s ease-in-out 1}
.v30Evolution .spritewrap{display:inline-flex;width:50px;height:50px;align-items:center;justify-content:center;vertical-align:middle;overflow:hidden}
.v30Evolution img.sprite{max-width:100%;max-height:100%;image-rendering:pixelated}.v30Evolution .placeholder{display:none}
@keyframes v30Evolve{0%{filter:brightness(1);transform:scale(.97)}35%{filter:brightness(3);transform:scale(1.03)}80%{filter:brightness(1.35)}100%{filter:brightness(1);transform:scale(1)}}
.v30Missions{border:1px solid #2f6171;background:linear-gradient(155deg,#142f40,#18283b);border-radius:13px;padding:12px 14px;margin:13px 0}.v30MissionRow{display:flex;align-items:center;justify-content:space-between;font-size:11px;gap:10px;border-bottom:1px solid #ffffff12;padding:6px 0;color:#d7eeef}.v30MissionRow:last-child{border-bottom:none}.v30MissionRow b{color:#a4ecdc}
.v30Stages{font-size:11px;margin:9px 0;color:#c5d9ec;line-height:1.4}
.skillgridV8{gap:7px!important}.skillV8{min-height:65px!important;padding:9px 11px!important}.skillName b{font-size:clamp(11px,2.4vw,14px)!important;line-height:1.14!important}.skillName small{font-size:10px!important}.skillMeta{flex-shrink:0!important}.coolMask{border-radius:10px!important;pointer-events:none!important}.coolText{top:6px!important;right:8px!important;left:auto!important;bottom:auto!important;transform:none!important;font:800 11px system-ui!important;background:#0b2035cf!important;border:1px solid #6489a5!important;border-radius:7px!important;padding:2px 5px!important;width:auto!important;height:auto!important;pointer-events:none!important}
.v30Reinforce{font-size:11px;color:#a2d3cb}
@media(max-width:700px){.skillV8{padding:7px 8px!important;min-height:62px!important}.skillName small{font-size:9px!important}.skillIcon{font-size:19px!important}.skillMeta small{font-size:9px!important}.v30BossPhase{top:20%;font-size:9px}.v30Ability{top:21%;font-size:9px}}
@media(prefers-reduced-motion:reduce){.v30Evolution{animation:none!important}}
`;document.head.appendChild(v30CSS);

// Golpes AOE, teleguiados, atravessantes e temporarios, sem novo loop de requestAnimationFrame.
const v30OriginalMove=BattleEngine.prototype.useMove;
BattleEngine.prototype.useMove=function(i){
 const m=current(),s=m&&skillSet(m)[i],b=battle;
 if(!b?.active||b.paused||!s||i!==2||!V30_MOVE_TRAITS[m.id])return v30OriginalMove.call(this,i);
 const now=performance.now();if((cooldowns[i]||0)>now||b.energy<s.cost||m.hp<=0)return;
 b.energy-=s.cost;cooldowns[i]=now+s.cd;this.attackActs.player=this.time+.46;
 this.v30Shots=this.v30Shots||[];this.v30Zones=this.v30Zones||[];
 const aim=this.aimVector(),sx=this.player.x,sy=this.player.y,color=TYPE_COLOR[s.type]||'#f8fbff';
 this.particlesAt(sx+aim.x*15,sy+aim.y*15,color,13,75);
 if(s.kind==='homing'||s.kind==='pierce'){
   if(this.v30Shots.length>14)this.v30Shots.shift();
   this.v30Shots.push({x:sx,y:sy,vx:aim.x*this.h*.60,vy:aim.y*this.h*.60,kind:s.kind,type:s.type,power:s.power,life:1.8,trail:[],hit:false});
 }else if(s.kind==='area'){
   this.v30Zones.push({kind:'area',x:this.enemy.x,y:this.enemy.y,type:s.type,power:s.power,life:.42,hit:false,r:this.h*.21});
   this.v19Impacts.push({x:this.enemy.x,y:this.enemy.y-this.h*.13,type:s.type,life:.4,max:.4,seed:Math.random()*6.28});
 }else if(s.kind==='hazard'){
   this.v30Zones.push({kind:'hazard',x:this.enemy.x,y:this.enemy.y,type:s.type,power:s.power,life:3.1,tick:.4,r:this.h*.18});
 }
 this.v30Zones=this.v30Zones.slice(-8);
 log(D[m.id].name+' usou '+s.name+'!');playSound('move');
 if(typeof v27EmitFx==='function')v27EmitFx(s.type,'enemy',1.4);
 if(typeof v27Cinematic==='function')v27Cinematic(this);
};
const v30OriginalUpdate=BattleEngine.prototype.update;
BattleEngine.prototype.update=function(dt,now){
 const result=v30OriginalUpdate.call(this,dt,now);if(!battle?.active)return result;
 // Montado no loop existente, com delta em segundos e limites rígidos de partículas.
 if(this.v30Shots){for(let j=this.v30Shots.length-1;j>=0;j--){const o=this.v30Shots[j];
  o.life-=dt;if(o.life<=0){this.v30Shots.splice(j,1);continue;}
  if(o.kind==='homing'&&foe()?.hp>0){let dx=this.enemy.x-o.x,dy=this.enemy.y-o.y,len=Math.hypot(dx,dy)||1;
   const speed=this.h*.58;o.vx=o.vx*.82+dx/len*speed*.18;o.vy=o.vy*.82+dy/len*speed*.18;}
  o.x+=o.vx*dt;o.y+=o.vy*dt;o.trail.push({x:o.x,y:o.y});if(o.trail.length>7)o.trail.shift();
  if(Math.hypot(o.x-this.enemy.x,o.y-this.enemy.y)<this.h*.085){this.hitTarget('enemy',o.type,o.power);o.hit=true;this.v30Shots.splice(j,1);}
 }}
 if(this.v30Zones){for(let j=this.v30Zones.length-1;j>=0;j--){const z=this.v30Zones[j];z.life-=dt;
  if(z.kind==='area'&&!z.hit){z.hit=true;if(this.dist({x:z.x,y:z.y},this.enemy)<z.r){this.hitTarget('enemy',z.type,z.power);}}
  if(z.kind==='hazard'){z.tick-=dt;if(z.tick<=0){z.tick=.68;if(this.dist({x:z.x,y:z.y},this.enemy)<z.r)this.hitTarget('enemy',z.type,z.power);}}
  if(z.life<=0)this.v30Zones.splice(j,1);
 }}
 // Fases do chefe: reduz o intervalo entre golpes, sem inflar HP nem dano bruto.
 if(battle.v30Boss&&battle.v30Phase>=2&&this.enemyAttackCD>1.8)this.enemyAttackCD=Math.max(1.1,this.enemyAttackCD-.2*dt);
 return result;
};
const v30OriginalDraw=BattleEngine.prototype.draw;
BattleEngine.prototype.draw=function(now){
 v30OriginalDraw.call(this,now);if(!battle?.active||(!this.v30Shots?.length&&!this.v30Zones?.length))return;
 const c=this.ctx;c.save();
 for(const z of this.v30Zones||[]){c.save();c.globalAlpha=Math.min(.42,Math.max(0,z.life))*.65;c.strokeStyle=TYPE_COLOR[z.type]||'#dcecff';c.lineWidth=2;c.beginPath();c.ellipse(z.x,z.y,z.r,z.r*.35,0,0,7);c.stroke();c.restore();}
 for(const p of this.v30Shots||[]){c.save();c.globalAlpha=.88;c.strokeStyle=TYPE_COLOR[p.type]||'#ebf5ff';c.lineWidth=2;c.beginPath();let last=p.trail[0]||p;c.moveTo(last.x,last.y);for(const q of p.trail)c.lineTo(q.x,q.y);c.stroke();c.fillStyle=TYPE_COLOR[p.type]||'#ebf5ff';c.beginPath();c.arc(p.x,p.y,4.2,0,7);c.fill();c.restore();}
 c.restore();
};

// Estilos de liderança e fases no último Pokémon; fases são progresso real da equipe do líder.
function v30BossName(){if(!battle?.active)return '';const g=Math.min(save.gym,12);return GYMS[g]?.leader||'Chefe';}
function v30PhaseView(){const el=$('arenaPro');if(!el||!battle?.v30Boss)return;
 let tag=el.querySelector('#v30BossPhase');if(!tag){tag=document.createElement('div');tag.id='v30BossPhase';tag.className='v30BossPhase';el.append(tag);}
 tag.textContent='👑 '+v30BossName()+' · FASE '+battle.v30Phase+'/'+battle.v30Total+' · '+(battle.enemies.length===0?'POKÉMON FINAL':'Estratégia adaptativa');
}
const v30OriginalStart=startBattle;
startBattle=function(enemies,label,wild){
 v30OriginalStart(enemies,label,wild);
 if(!battle?.active)return;
 const boss=!wild&&((save.gym<8&&save.stage===v29TrainerCount(save.gym))||save.gym>=8);
 battle.v30Boss=boss;battle.v30Phase=1;battle.v30Total=1+battle.enemies.length;
 battle.v30MissionFaint=0;
 if(boss){v30PhaseView();const monId=foe()?.id;if(monId){const abil=v30Ability(monId);if(abil==='Intimidate'){const st=sideState('ally');st.atk=Math.max(-3,(st.atk||0)-1);}}}
};
const v30OriginalNext=nextFoe;
nextFoe=function(){
 const boss=battle?.v30Boss;
 const result=v30OriginalNext();if(boss&&battle?.active){battle.v30Phase=Math.min(battle.v30Total,(battle.v30Phase||1)+1);v30PhaseView();}
 return result;
};

// Habilidades: Static, Levitate, Intimidate, Overgrow, Blaze e Torrent.
const V30_ABILITY={
 Intimidate:new Set([23,24,58,59,130,142]), Levitate:new Set([92,93,94,109,110]),
 Static:new Set([25,26,100,101,125,135,81,82]), Overgrow:new Set([1,2,3,43,44,45,69,70,71]),
 Blaze:new Set([4,5,6,37,38,58,59,77,78]), Torrent:new Set([7,8,9,60,61,62,72,73,120,121,129,130])
};
function v30Ability(id){for(const [k,values] of Object.entries(V30_ABILITY))if(values.has(id))return k;return '—';}
const v30OriginalDamage=damage;
damage=function(attacker,defender,type,power){
 const r=v30OriginalDamage(attacker,defender,type,power);if(!attacker||!defender)return r;
 const allyMon=battle?.active?current():null;
 const atkStat=allyMon&&attacker===allyMon?sideState('ally'):sideState('enemy');
 const defStat=allyMon&&defender===allyMon?sideState('ally'):sideState('enemy');
 r.hit=Math.max(0,Math.round(r.hit * Math.max(.45,1+(atkStat.atk||0)*.14) / Math.max(.45,1+(defStat.def||0)*.14)));
 if(type==='ground'&&v30Ability(defender.id)==='Levitate'){r.hit=0;r.mult=0;return r;}
 const ab=v30Ability(attacker.id),low=attacker.hp<=attacker.maxHp/3;
 if(low&&((ab==='Blaze'&&type==='fire')||(ab==='Torrent'&&type==='water')||(ab==='Overgrow'&&type==='grass')))r.hit=Math.min(9999,Math.round(r.hit*1.30));
 return r;
};
const v30OriginalHit=BattleEngine.prototype.hitTarget;
BattleEngine.prototype.hitTarget=function(who,type,power){
 const defender=who==='enemy'?foe():current(),attacker=who==='enemy'?current():foe();
 if(!battle?.active||!defender||!attacker)return;
 if(type==='ground'&&v30Ability(defender.id)==='Levitate'){
  this.damageLabels.push({x:who==='enemy'?this.enemy.x:this.player.x,y:(who==='enemy'?this.enemy.y:this.player.y)-this.h*.20,text:'LEVITATE · IMUNE',life:.95,color:'#c1edff'});return;
 }
 const hp=defender.hp;
 const r=v30OriginalHit.call(this,who,type,power);
 if(battle?.active&&defender.hp<hp){
  if(v30Ability(defender.id)==='Static'&&Math.random()<.17){const effectSide=who==='enemy'?'ally':'enemy';const st=sideState(effectSide);st.paralyze=1;}
  if(who==='enemy')v30AdvanceMission('damage',Math.max(1,hp-defender.hp));
 }
 return r;
};

// Evolução após combate: tela informativa não modal, não interrompe a progressão.
let v30EvolutionQueue=[];
const v30OriginalXP=awardXP;
awardXP=function(m,amount){const prev=m.id;const events=v30OriginalXP(m,amount);if(m.id!==prev){v30EvolutionQueue.push({from:prev,to:m.id,level:m.level});}return events;};
const v30OriginalResult=resultScreen;
resultScreen=function(title,description,win,canCatch){
 v30OriginalResult(title,description,win,canCatch);
 if(!v30EvolutionQueue.length)return;
 const root=$('modal');if(!root){v30EvolutionQueue=[];return;}
 const holder=document.createElement('div');holder.className='v30Evolution';
 for(const e of v30EvolutionQueue.splice(0,5)){const row=document.createElement('div');row.innerHTML='✨ '+img(e.from)+' <strong>'+D[e.from].name+' → '+D[e.to].name+'</strong> '+img(e.to)+' <small>Nv.'+e.level+'</small>';holder.append(row);}
 root.append(holder);
};

// Rivais e Team Rocket espalhados pelos 13 confrontos do último ginásio.
const v30OriginalLaunch=launchTrainer;
launchTrainer=function(){
 if(save.gym>=8)return v30OriginalLaunch();
 const st=save.stage;if(st===8||st===11){if(!requireTeam()){showItems();return;}
  const g=save.gym,p=GYMS[g],rocket=st===11,ids=rocket?[V27_ROCKET[(g+5)%V27_ROCKET.length],V27_ROCKET[(g+9)%V27_ROCKET.length]]:[V27_RIVALS[g%V27_RIVALS.length],133];
  const queue=ids.map((id,i)=>mon(id,Math.min(p.max-1,p.min+2+Math.floor(st*.65)+i)));
  startBattle(queue,rocket?'🚀 MISSÃO ROCKET · CHEFE':'⚔️ RIVAL BLUE · REVANCHE',false);return;
 }
 return v30OriginalLaunch();
};

// Três objetivos permanentes por jornada (não dependem de servidor externo).
const V30_MISSIONS=[{id:'victories',title:'Vença 12 treinadores',target:12,unit:'victory',coins:60},{id:'damage',title:'Cause 350 pontos de dano',target:350,unit:'damage',coins:85},{id:'capture',title:'Capture 3 Pokémon',target:3,unit:'capture',coins:70}];
let v30MissionState={};try{v30MissionState=JSON.parse(localStorage.getItem(V30_MISSIONS_KEY)||'{}')||{};}catch{}
function v30SaveMissions(){try{localStorage.setItem(V30_MISSIONS_KEY,JSON.stringify(v30MissionState));}catch{}}
function v30AdvanceMission(unit,amount=1){for(const m of V30_MISSIONS){if(m.unit!==unit)continue;
 const st=v30MissionState[m.id]||(v30MissionState[m.id]={n:0,claimed:false});if(st.claimed)continue;st.n=Math.min(m.target,(st.n||0)+amount);
 if(st.n>=m.target){st.claimed=true;save.coins+=m.coins;persist();const l=$('battleLog');if(l)l.textContent='🎁 Missão concluída: '+m.title+' · +'+m.coins+' moedas!';}
 }v30SaveMissions();}
const v30OriginalFinish=finishBattle;
finishBattle=function(win){if(!battle?.active)return;
 const boss=battle.v30Boss,rocket=/ROCKET/.test(battle.label||''),rival=/RIVAL/.test(battle.label||''),wild=battle.wild;
 const completed=win;
 const result=v30OriginalFinish(win);
 if(completed){if(!wild)v30AdvanceMission('victory',1);if(rocket||rival){save.coins+=rocket?18:12;persist();}}
 return result;
};
const v30OldCaught=save.caught?save.caught.length:0;
const v30OriginalPersist=persist;
persist=function(){
 // 3 backups circulares, verificação mínima antes de substituir o último backup.
 try{if(save.starter&&save.team?.length){let a=[];try{a=JSON.parse(localStorage.getItem(V30_SAFE_SAVE)||'[]')||[];}catch{}
  const ss={ts:Date.now(),gym:save.gym,stage:save.stage,team:save.team.length,state:JSON.parse(JSON.stringify(save))};
  if(!a.length||a[0].gym!==ss.gym||a[0].stage!==ss.stage||ss.ts-a[0].ts>60000){a.unshift(ss);a=a.slice(0,3);localStorage.setItem(V30_SAFE_SAVE,JSON.stringify(a));}
  if(save.caught?.length>v30LastCaught){v30AdvanceMission('capture',save.caught.length-v30LastCaught);v30LastCaught=save.caught.length;}
 }}catch(e){console.warn('Backup V30 não disponível:',e)}
 return v30OriginalPersist();
};
let v30LastCaught=v30OldCaught;
function v30ShowMissions(){const node=document.createElement('div');node.className='v30Missions';node.innerHTML='<strong>🎯 Missões de treinador</strong>'+V30_MISSIONS.map(m=>{const s=v30MissionState[m.id]||{n:0,claimed:false};return '<div class="v30MissionRow"><span>'+m.title+'</span><b>'+(s.claimed?'✓ +'+m.coins+' 🪙':Math.floor(s.n||0)+'/'+m.target)+'</b></div>';}).join('');return node;}
const v30OriginalRender=render;
render=function(){v30OriginalRender();
 if(battle?.active)return;
 const bar=$('resources');if(bar&&!$('v30VersionTag')){const tag=document.createElement('span');tag.id='v30VersionTag';tag.className='v30VersionTag';tag.textContent='V30 · 2D';bar.appendChild(tag);}
 const place=document.querySelector('#main .gymHero')||document.querySelector('#main .v29Endgame');
 if(place&&!document.querySelector('.v30Missions'))place.insertAdjacentElement('afterend',v30ShowMissions());
 const gear=$('v281SettingsButton');if(gear&&!gear.dataset.v30){gear.dataset.v30='1';const old=gear.onclick;gear.onclick=()=>{old?.();
 const area=document.querySelector('.v281SettingsActions');if(!area||$('v30Recovery'))return;const b=document.createElement('button');b.className='btn ghost';b.id='v30Recovery';b.textContent='🛟 Recuperar salvamento seguro';area.append(b);
 b.onclick=()=>{try{const snapshots=JSON.parse(localStorage.getItem(V30_SAFE_SAVE)||'[]');const item=snapshots.find(x=>x?.state?.team?.length&&x.state.gym>=0&&x.state.gym<=13);if(!item){alert('Nenhum salvamento seguro encontrado.');return;}
 if(!confirm('Restaurar progresso de '+new Date(item.ts).toLocaleString('pt-BR')+'?'))return;
 save={...defaultSave(),...item.state};save.team=save.team.filter(m=>D[m.id]&&m.level>=1).slice(0,6);save.box=(save.box||[]).filter(m=>D[m.id]).slice(0,100);if(!save.team.length)throw Error('invalido');persist();close();render();
 }catch(e){alert('Backup indisponível ou inválido neste navegador.')}};};}
};

// IA ajusta a frequência e as esquivas progressivamente, sem escalar o HP artificialmente.
const v30AIOriginal=BattleEngine.prototype.update;
BattleEngine.prototype.update=function(dt,now){const old=v30AIOriginal.call(this,dt,now);if(!battle?.active||battle.wild)return old;
 const g=save.gym,step=save.stage,difficulty=Math.min(1,g/10+(step/16));
 if(sideState('enemy').paralyze&&this.enemyAttackCD<.8)this.enemyAttackCD=.8;
 if(this.enemyAttackCD>1.65){this.enemyAttackCD=Math.max(1.25,this.enemyAttackCD-dt*.22*difficulty);}
 if(difficulty>.5&&this.foeDodgeCD>2.6)this.foeDodgeCD=2.6;
 return old;
};

// Câmera 2D e redução de falhas em FPS baixo; nenhum sprite aumenta de escala na luta.
const v30CameraOld=v27Cinematic;
v27Cinematic=function(ref){if(!ref?.canvas||!battle?.active)return;
 const mobile=window.matchMedia?.('(max-width:650px)').matches,reduced=window.matchMedia?.('(prefers-reduced-motion:reduce)').matches;
 if(reduced||ref.fps<26)return;
 const x=mobile?.35:.65;
 ref.canvas.animate?.([{transform:'translate(0,0)'},{transform:'translate('+x+'%,.12%)'},{transform:'translate(0,0)'}],{duration:320,easing:'ease-out'});
};
const v30ParticleOld=BattleEngine.prototype.particlesAt;
BattleEngine.prototype.particlesAt=function(x,y,color,count=18,speed=120){
 const d=this.fps>0&&this.fps<36?9:this.fps>0&&this.fps<48?15:27;
 if((this.particles?.length||0)>120)return;
 return v30ParticleOld.call(this,x,y,color,Math.min(count,d),speed);
};
window.PokemonTorreDiagnostics=()=>({version:V30_VERSION,active:!!battle?.active,gym:save.gym,stage:save.stage,monsters:save.team.length,wasm:!!v28Wasm,phaser:!!v27Scene,fps:engine?.fps??null,missions:v30MissionState,backup:!!localStorage.getItem(V30_SAFE_SAVE),bossPhase:battle?.v30Phase||null});
/* POKEMON TORRE V30 END */
