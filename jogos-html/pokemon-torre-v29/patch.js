/* POKEMON TORRE V29 — ONE PATCH: UI, moves, AI, arenas, statuses, dex, capture, mobile, saves and endgame */
const V29_VERSION='29.0';
// Progressão 2D V29: Brock 6, Misty 7, Surge 8, Erika 9, Koga 10,
// Sabrina 11, Blaine 12, Giovanni 13, Liga permanece independente.
function v29TrainerCount(g){return Number.isInteger(g)&&g>=0&&g<8?6+g:6}
for(let g=0;g<8;g++){
  // Corrige desníveis dos dados antigos para a equipa pré-líder respeitar o nível do ginásio.
  GYMS[g].min=Math.min(GYMS[g].min, Math.max(4,GYMS[g].max-8));
}
const v29TrainerTeam=teamOfTrainer;
teamOfTrainer=function(g,step){
 const team=v29TrainerTeam(g,step);
 if(g>=8 || step>=v29TrainerCount(g)) return team;
 const cap=Math.max(6,Math.min(GYMS[g].levelCap-1,GYMS[g].max-1));
 for(const member of team){
  if(member.level>cap){
    const corrected=mon(member.id,cap);
    Object.assign(member,corrected);
  }
 }
 return team;
};

const V29_SAVE_BACKUP_KEY='pokeTorreKantoV29Backup';
const v29Style=document.createElement('style');
v29Style.id='v29UnifiedStyle';
v29Style.textContent=`
/* Apenas sprites, sem simbolos/emojis gigantes embaixo, na equipe, caixa ou Pokedex */
.moncard .spritewrap,.dexCard .spritewrap,.list [data-team] .spritewrap,.swapgrid .spritewrap,.v27Odds .spritewrap{position:relative!important;isolation:isolate;overflow:hidden!important;vertical-align:middle}
.moncard .spritewrap .placeholder,.dexCard .spritewrap .placeholder,.list [data-team] .spritewrap .placeholder,.swapgrid .spritewrap .placeholder,.v27Odds .spritewrap .placeholder{display:none!important}
.moncard .spritewrap img.sprite,.dexCard .spritewrap img.sprite,.list [data-team] .spritewrap img.sprite,.swapgrid .spritewrap img.sprite,.v27Odds .spritewrap img.sprite{display:block!important;max-width:100%!important;max-height:100%!important;object-fit:contain!important;z-index:1}
.moncard .spritewrap:not(:has(img.sprite))::after,.dexCard .spritewrap:not(:has(img.sprite))::after,.list [data-team] .spritewrap:not(:has(img.sprite))::after,.v27Odds .spritewrap:not(:has(img.sprite))::after{content:'?';font:700 14px system-ui;color:#6b91a6;position:absolute;inset:0;display:grid;place-items:center;border:1px dashed #35516a60;border-radius:10px}
.moncard .spritewrap{width:64px!important;height:64px!important}.dexCard .spritewrap{width:60px!important;height:60px!important}
.list [data-team] .spritewrap,.swapgrid .spritewrap{width:52px!important;height:52px!important;min-width:52px!important}
.v27Odds .spritewrap{width:30px!important;height:30px!important}
.v29DexDetail{display:grid;grid-template-columns:minmax(100px,160px) minmax(0,1fr);gap:16px;align-items:start}
.v29DexArt{display:grid;place-items:center;border:1px solid #375970;border-radius:17px;background:#172d42;padding:10px;min-height:146px}.v29DexArt .spritewrap{width:110px;height:110px;overflow:hidden}.v29DexArt .placeholder{display:none}
.v29DexFacts{display:flex;flex-wrap:wrap;gap:7px;margin:12px 0}.v29DexFacts span{border:1px solid #36546f;background:#152b3e;color:#d7e8f4;border-radius:8px;padding:7px 9px;font-size:11px}
.dexCard.v29DexClickable{cursor:pointer;transition:border-color .18s,transform .18s}.dexCard.v29DexClickable:hover,.dexCard.v29DexClickable:focus-visible{border-color:#84d6cf;transform:translateY(-1px)}
.v29BallSelector{background:#132c3d;color:#dff5f5;border:1px solid #4a7890;border-radius:9px;padding:8px;font-size:11px;cursor:pointer;min-width:90px}
.v29Environment{position:absolute;top:18%;left:50%;transform:translateX(-50%);z-index:2;pointer-events:none;font-size:10px;letter-spacing:.12em;text-transform:uppercase;border:1px solid #ffffff31;background:#102b3b99;color:#e6f7fe;padding:4px 9px;border-radius:999px;opacity:.78;max-width:55%;text-align:center}
.v29Toast{border:1px solid #638c9c;background:#163246;border-radius:11px;color:#dceff5;padding:10px 12px;font-size:12px;line-height:1.5;margin:10px 0}
.v29Endgame{border:1px solid #6c79a9;border-radius:16px;padding:15px;background:linear-gradient(135deg,#182640,#142b39);margin-top:15px}
.v29EndgameButtons{display:flex;flex-wrap:wrap;gap:8px;margin-top:10px}.v29EndgameButtons .btn{flex:1 1 120px;font-size:12px}
.tower:not(.v27League .tower){grid-template-columns:repeat(auto-fit,minmax(44px,1fr))!important;gap:6px}
.tower:not(.v27League .tower) .stage{min-height:52px;padding:7px 2px}
.tower:not(.v27League .tower) .stage b{font-size:14px;margin-bottom:1px}
.tower:not(.v27League .tower) .stage small{font-size:8px}
.v29Info{font-size:11px;line-height:1.5;color:#bdd7e8;margin-top:6px}
@media(max-width:580px){.moncard .spritewrap{width:55px!important;height:55px!important}.dexCard .spritewrap{width:48px!important;height:48px!important}.v29DexDetail{grid-template-columns:95px 1fr;gap:10px}.v29DexArt .spritewrap{width:80px;height:80px}.v29DexArt{min-height:112px}.v29Environment{top:19%;font-size:9px;max-width:52%}}
@media(prefers-reduced-motion:reduce){.v27Throw,.v27ThrowBall,.v29DexClickable{animation:none!important;transition:none!important}}
`;
document.head.appendChild(v29Style);

// 1. Golpes especiais 2D por especie. Cada objeto usa os tipos de projetil/feixe ja suportados pelo motor.
const V29_SIGNATURES={
 3:{name:'Chicote Selvagem',type:'grass',kind:'bolt',power:43,cost:31,cd:2900,icon:'🌿'},
 6:{name:'Lança-Chamas',type:'fire',kind:'beam',power:55,cost:42,cd:4200,icon:'🔥'},
 9:{name:'Hidro Bomba',type:'water',kind:'beam',power:54,cost:42,cd:4200,icon:'🌊'},
 12:{name:'Pó Místico',type:'bug',kind:'bolt',power:44,cost:30,cd:3000,icon:'🦋'},
 18:{name:'Furacão',type:'flying',kind:'beam',power:49,cost:37,cd:3900,icon:'🪶'},
 25:{name:'Raio do Pikachu',type:'electric',kind:'bolt',power:47,cost:34,cd:3250,icon:'⚡'},
 26:{name:'Trovão de Raichu',type:'electric',kind:'beam',power:54,cost:42,cd:4200,icon:'🌩️'},
 31:{name:'Slam de Nidoqueen',type:'normal',kind:'dash',power:39,cost:28,cd:2900,icon:'💥'},
 34:{name:'Slam de Nidoking',type:'normal',kind:'dash',power:42,cost:28,cd:2850,icon:'💥'},
 38:{name:'Fogo-Fátuo',type:'fire',kind:'bolt',power:45,cost:32,cd:3300,icon:'🔥'},
 55:{name:'Jato de Água',type:'water',kind:'bolt',power:44,cost:31,cd:3000,icon:'💧'},
 59:{name:'Explosão de Chamas',type:'fire',kind:'beam',power:53,cost:41,cd:4100,icon:'🔥'},
 65:{name:'Psíquico',type:'psychic',kind:'beam',power:54,cost:42,cd:4100,icon:'🔮'},
 68:{name:'Impacto de Machamp',type:'fighting',kind:'dash',power:44,cost:32,cd:3400,icon:'🥊'},
 76:{name:'Avalanche',type:'rock',kind:'bolt',power:50,cost:38,cd:3700,icon:'🪨'},
 89:{name:'Lodo Tóxico',type:'poison',kind:'bolt',power:48,cost:35,cd:3500,icon:'☣️'},
 91:{name:'Raio Congelante',type:'ice',kind:'beam',power:54,cost:42,cd:4400,icon:'🧊'},
 94:{name:'Bola Sombria',type:'ghost',kind:'bolt',power:51,cost:38,cd:3600,icon:'👻'},
 97:{name:'Onda Psíquica',type:'psychic',kind:'bolt',power:46,cost:33,cd:3200,icon:'🌀'},
 105:{name:'Osso Bumerangue',type:'ground',kind:'bolt',power:47,cost:34,cd:3400,icon:'🦴'},
 112:{name:'Terremoto',type:'ground',kind:'beam',power:52,cost:43,cd:4300,icon:'⛰️'},
 121:{name:'Laser de Starmie',type:'water',kind:'beam',power:52,cost:40,cd:3900,icon:'🌟'},
 123:{name:'Golpe de Foice',type:'bug',kind:'dash',power:46,cost:35,cd:3450,icon:'🦗'},
 125:{name:'Trovão de Electabuzz',type:'electric',kind:'beam',power:53,cost:41,cd:4100,icon:'🌩️'},
 126:{name:'Explosão Magmática',type:'fire',kind:'beam',power:53,cost:41,cd:4100,icon:'🔥'},
 130:{name:'Hidro Cauda',type:'water',kind:'dash',power:51,cost:39,cd:3800,icon:'🌊'},
 131:{name:'Rajada Congelante',type:'ice',kind:'beam',power:52,cost:42,cd:4200,icon:'❄️'},
 135:{name:'Faísca de Jolteon',type:'electric',kind:'bolt',power:50,cost:35,cd:3300,icon:'⚡'},
 143:{name:'Corpo Pesado',type:'normal',kind:'dash',power:46,cost:34,cd:3550,icon:'💤'},
 144:{name:'Nevasca de Articuno',type:'ice',kind:'beam',power:55,cost:45,cd:4500,icon:'❄️'},
 145:{name:'Raio de Zapdos',type:'electric',kind:'beam',power:55,cost:45,cd:4500,icon:'⚡'},
 146:{name:'Chama de Moltres',type:'fire',kind:'beam',power:55,cost:45,cd:4500,icon:'🔥'},
 149:{name:'Fúria do Dragão',type:'dragon',kind:'beam',power:55,cost:43,cd:4500,icon:'🐉'},
 150:{name:'Onda de Mewtwo',type:'psychic',kind:'beam',power:57,cost:46,cd:4600,icon:'🔮'},
 151:{name:'Energia de Mew',type:'psychic',kind:'bolt',power:49,cost:35,cd:3500,icon:'✨'}
};
const v29OldSkills=skillSet;
skillSet=function(m){const list=v29OldSkills(m);const sig=V29_SIGNATURES[m.id];if(sig)list[2]={...sig,cat:sig.kind==='dash'?'physical':'special'};return list};

// 2. Animacao de arremesso ja existente: refinamento para nao esconder HP ou interface.
const v29TrainerStyle=document.createElement('style');
v29TrainerStyle.textContent=`.v27Throw{max-width:96px;max-height:98px;bottom:16%;opacity:.95}.v27ThrowTrainer{filter:drop-shadow(0 3px 4px #0008)}.v27Throw.right{right:3%}.v27Throw.left{left:3%}@media(max-width:600px){.v27Throw{transform:scale(.84);transform-origin:bottom left}.v27Throw.right{transform-origin:bottom right}}`;
document.head.appendChild(v29TrainerStyle);

// 3. Personalidade de cada lider na IA, apenas em batalhas de chefe.
const V29_AI={rock:{tempo:1.1,space:1},water:{tempo:.83,space:1.08},electric:{tempo:.90,space:1.10},grass:{tempo:1.0,space:1},poison:{tempo:.95,space:1.03},psychic:{tempo:.86,space:1.12},fire:{tempo:.90,space:1.04},ground:{tempo:1.16,space:.93},ice:{tempo:.94,space:1.05},fighting:{tempo:.86,space:.96},ghost:{tempo:.92,space:1.08},dragon:{tempo:.87,space:1.04}};
const v29OldEnemy=BattleEngine.prototype.update;
BattleEngine.prototype.update=function(dt,now){
 const priorCD=this.enemyAttackCD;
 const result=v29OldEnemy.call(this,dt,now);
 if(!battle?.active)return result;
 if((save.stage===v29TrainerCount(save.gym)||save.gym>=8)&&!battle.wild){
  const cfg=V29_AI[GYMS[Math.min(save.gym,12)]?.type]||{tempo:1,space:1};
  if(Number.isFinite(this.enemyAttackCD)&&this.enemyAttackCD>1.2&&priorCD<=0.2){this.enemyAttackCD*=cfg.tempo;}
  if(cfg.space>1&&this.dist(this.player,this.enemy)<this.h*.26&&this.foeDodgeCD<.4){this.foeDodgeCD=.4;this.enemyAttackCD=Math.max(this.enemyAttackCD,.35);}
 }
 return result;
};

// 4. Tema de arena discreto e leve; nenhuma imagem sobreposta aos Pokemon.
const V29_ARENA_LABELS={rock:'🪨 PISO ROCHOSO',water:'💧 PISCINA',electric:'⚡ USINA',grass:'🌿 JARDIM',poison:'☣️ NÉVOA',psychic:'🔮 MENTE',fire:'🔥 VULCÃO',ground:'⛰️ DESERTO',ice:'❄️ GELO',fighting:'🥊 DOJO',ghost:'👻 SOMBRAS',dragon:'🐉 DRAGÕES'};
const v29OldBattleRender=renderBattle;
renderBattle=function(){
 v29OldBattleRender();
 const arena=$('arenaPro');if(!arena||!battle?.active)return;
 const type=GYMS[Math.min(save.gym,12)]?.type||'normal';
 const mood=document.createElement('div');mood.className='v29Environment';mood.textContent=V29_ARENA_LABELS[type]||'ARENA 2D';arena.appendChild(mood);
 if(battle.wild)v29CaptureControls();
};

// 5. Efeitos de status adicionais, aplicados sem confundir melhoria com escudo.
Object.assign(V25_STATUS,{
 'Will-O-Wisp':{mode:'condition',effect:'burn',label:'QUEIMADO',detail:'O adversário sofreu queimadura'},
 'Pó de Gelo':{mode:'condition',effect:'freeze',label:'CONGELADO',detail:'O adversário foi congelado temporariamente'}
});
const v29Stats=BattleEngine.prototype.v25Initialize;
BattleEngine.prototype.v25Initialize=function(){const result=v29Stats.call(this);this.v29StatusClock=0;this.v29FreezeLeft=0;return result};
const v29StatusSkills=skillSet;
skillSet=function(m){const out=v29StatusSkills(m);const t=D[m.id]?.type,t2=D[m.id]?.type2;if(t==='fire'){out[3]={name:'Will-O-Wisp',type:'fire',kind:'status',cat:'status',power:0,cost:26,cd:6400,icon:'🔥'}}if(t==='ice'||t2==='ice'){out[3]={name:'Pó de Gelo',type:'ice',kind:'status',cat:'status',power:0,cost:28,cd:6800,icon:'❄️'}}return out};
const v29OldStatusUpdate=BattleEngine.prototype.update;
BattleEngine.prototype.update=function(dt,now){
 const r=v29OldStatusUpdate.call(this,dt,now);
 if(!battle?.active||!this.v25?.stats?.enemy)return r;
 const status=this.v25.stats.enemy,conditions=status.conditions||[];
 if(conditions.includes('burn')){this.v29StatusClock=(this.v29StatusClock||0)+dt;
  if(this.v29StatusClock>=3.5){this.v29StatusClock=0;const m=foe();if(m?.hp>1){const d=Math.max(1,Math.floor(m.maxHp*.035));m.hp=Math.max(1,m.hp-d);this.v25Popup(this.enemy.x,this.enemy.y-this.h*.25,'QUEIMADURA -'+d,'#ffc090')}}}
 if(conditions.includes('freeze')){
  this.v29FreezeLeft=(this.v29FreezeLeft||0)+dt;
  this.enemyAttackCD=Math.max(this.enemyAttackCD,.32);
  if(this.v29FreezeLeft>2.5){status.conditions=status.conditions.filter(x=>x!=='freeze');this.v29FreezeLeft=0;this.v25Popup(this.enemy.x,this.enemy.y-this.h*.25,'DESCONGELOU','#c5f8ff');}
 }
 return r;
};

// 6. Pokedex com detalhes, ataques, evolucoes, rotas e fraquezas calculadas.
function v29DexDetails(id){
 const p=D[id];if(!p)return;
 const types=[p.type,p.type2].filter(Boolean),weak=Object.keys(TYPE_NAME).map(t=>({type:t,adv:advantage(t,p)})).filter(x=>x.adv>1.01).sort((a,b)=>b.adv-a.adv);
 const evolution=p.evolve&&D[p.evolve]?D[p.evolve].name+' (Nv. '+p.at+')':'Sem evolução por nível';
 const routes=[];for(let g=0;g<8;g++){const o=v27WildOdds(g).find(x=>x.id===id);if(o)routes.push('Rota '+(g+1)+' — '+o.pct.toFixed(1).replace('.',',')+'%');}
 const known=save.seen.includes(id)||save.caught.includes(id);if(!known)return;
 const moves=skillSet(mon(id,Math.max(5,Math.min(50,GYMS[Math.min(save.gym,7)].max))));
 overlay(`<div class="sectionhead"><div><div class="overline">POKÉDEX · KANTO</div><h2>#${String(id).padStart(3,'0')} ${p.name}</h2></div><button id="v29DexClose" class="btn tiny ghost">✕</button></div><div class="v29DexDetail"><div class="v29DexArt">${img(id)}</div><div><div class="v29DexFacts"><span>${types.map(t=>TYPE_NAME[t]).join(' / ')}</span><span>HP ${p.hp}</span><span>ATK ${p.atk}</span><span>DEF ${p.def}</span><span>VEL ${p.spd}</span></div><div class="v29Info"><b>Fraquezas:</b> ${weak.length?weak.map(x=>TYPE_NAME[x.type]+' x'+x.adv).join(' · '):'Nenhuma detectada'}.</div><div class="v29Info"><b>Evolução:</b> ${evolution}.</div><div class="v29Info"><b>Golpes:</b> ${moves.map(m=>m.name).join(' · ')}.</div><div class="v29Info"><b>Encontrar:</b> ${routes.length?routes.join(' · '):'Espécie especial, presente em encontros e desafios específicos'}.</div></div></div><button id="v29DexBack" class="btn ghost wide" style="margin-top:15px">← Voltar à Pokédex</button>`);
 $('v29DexClose').onclick=close;$('v29DexBack').onclick=showPokedex;
}
const v29OldDex=showPokedex;
showPokedex=function(){v29OldDex();document.querySelectorAll('.dexGrid .dexCard').forEach((card,i)=>{
 const id=i+1;if(!save.seen.includes(id)&&!save.caught.includes(id))return;
 card.classList.add('v29DexClickable');card.tabIndex=0;card.setAttribute('role','button');card.setAttribute('aria-label','Detalhes de '+D[id].name);
 card.onclick=()=>v29DexDetails(id);card.onkeydown=e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();v29DexDetails(id)}};
});};

// 7. Limite adaptativo de particulas no Android e dispositivos em economia de movimento.
const v29OldParticles=BattleEngine.prototype.particlesAt;
BattleEngine.prototype.particlesAt=function(x,y,color,count=18,speed=120){
 const low=(this.fps>0&&this.fps<42)||window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
 return v29OldParticles.call(this,x,y,color,Math.min(low?12:28,count),speed);
};

// 8. Backup automatico nao destrutivo. Mantem a chave de save, sem migracao forçada.
const v29OldPersist=persist;
persist=function(){v29OldPersist();try{
 if(save.starter&&Array.isArray(save.team)&&save.team.length){
  const snapshot={time:Date.now(),save:JSON.parse(JSON.stringify(save))};
  localStorage.setItem(V29_SAVE_BACKUP_KEY,JSON.stringify(snapshot));
 }
}catch(e){console.warn('Backup automatico nao disponivel',e)}};
const v29OldRender=render;
render=function(){v29OldRender();const gear=$('v281SettingsButton');if(gear&&!gear.dataset.v29){gear.dataset.v29='1';const previous=gear.onclick;gear.onclick=()=>{
 previous?.();const actions=document.querySelector('.v281SettingsActions');if(!actions||$('v29RestoreBackup'))return;
 const btn=document.createElement('button');btn.type='button';btn.id='v29RestoreBackup';btn.className='btn ghost';btn.textContent='↺ Recuperar backup automático';actions.appendChild(btn);
 btn.onclick=()=>{try{const obj=JSON.parse(localStorage.getItem(V29_SAVE_BACKUP_KEY)||'null');const data=obj?.save;
 if(!data||!Array.isArray(data.team)||!data.team.length||!Number.isInteger(data.gym)||data.gym<0||data.gym>13)throw Error('Backup inválido');
 if(!confirm('Restaurar o último backup? O progresso atual será substituído.'))return;
 save={...defaultSave(),...data};save.team=save.team.filter(m=>D[m.id]&&m.level>=1).slice(0,6);save.box=(save.box||[]).filter(m=>D[m.id]).slice(0,100);if(!save.team.length)throw Error('Equipe inválida');persist();close();render();
 }catch(e){alert('Não há backup automático válido neste navegador.')}};
 };}};

// 9. Great Ball e Ultra Ball com chances melhores; seletor discreto nas batalhas selvagens.
if(!KANTO_SHOP.some(x=>x.id==='superball'))KANTO_SHOP.push({id:'superball',name:'Super Ball',icon:'🔵',price:28,detail:'Chance de captura 1,35x'});
if(!KANTO_SHOP.some(x=>x.id==='ultraball'))KANTO_SHOP.push({id:'ultraball',name:'Ultra Ball',icon:'🟡',price:52,detail:'Chance de captura 1,7x'});
save.superBalls=Math.max(0,Number(save.superBalls)||0);save.ultraBalls=Math.max(0,Number(save.ultraBalls)||0);
const v29OldShop=showShop;
showShop=function(){v29OldShop();document.querySelectorAll('[data-buy="superball"],[data-buy="ultraball"]').forEach(b=>{b.onclick=()=>{
 const key=b.dataset.buy,item=KANTO_SHOP.find(x=>x.id===key);if(!item||save.coins<item.price)return;
 save.coins-=item.price;if(key==='superball')save.superBalls++;else save.ultraBalls++;persist();render();showShop();
 };});};
function v29AvailableBall(){return ['ball','superball','ultraball'].find(k=>k==='ball'?save.balls>0:k==='superball'?save.superBalls>0:save.ultraBalls>0)||'ball';}
function v29CaptureControls(){const target=$('catchCombat');if(!target)return;
 const options=document.createElement('select');options.id='v29BallSelect';options.className='v29BallSelector';options.setAttribute('aria-label','Escolher Pokébola');
 const stock={ball:save.balls,superball:save.superBalls,ultraball:save.ultraBalls};
 for(const [id,label] of [['ball','🔴 Pokébola'],['superball','🔵 Super Ball'],['ultraball','🟡 Ultra Ball']]){
  const el=document.createElement('option');el.value=id;el.textContent=label+' · '+stock[id];el.disabled=stock[id]<=0;options.appendChild(el);
 }
 options.value=v29AvailableBall();target.insertAdjacentElement('beforebegin',options);
 target.textContent='🔴 Capturar';target.disabled=stock.ball+stock.superball+stock.ultraball===0;
 options.onchange=()=>{battle.v29Ball=options.value;target.textContent='🔴 Capturar ('+(options.value==='ultraball'?'Ultra':options.value==='superball'?'Super':'Pokébola')+')';};
};
catchMon=function(){
 if(!battle?.active||!battle.wild||battle.paused||!engine?.v25?.stats)return;
 let id=$('v29BallSelect')?.value||battle.v29Ball||v29AvailableBall();const store=id==='ultraball'?'ultraBalls':id==='superball'?'superBalls':'balls';
 if(!save[store])return;
 const m=foe();if(!m)return;
 const mult=id==='ultraball'?1.7:id==='superball'?1.35:1;
 const rarity=KANTO_LEGENDS.has(m.id)?.53:1;
 const chance=Math.max(.05,Math.min(.98,(.17+.72*(1-m.hp/m.maxHp))*mult*rarity));
 save[store]--;persist();
 engine.v25.capture={time:0,duration:1.65,fromX:engine.player.x,fromY:engine.player.y-engine.h*.16,toX:engine.enemy.x,toY:engine.enemy.y-engine.h*.15,success:Math.random()<chance,spark:false,shake:false};
 battle.paused=true;log((id==='ultraball'?'Ultra Ball':id==='superball'?'Super Ball':'Pokébola')+' lançada! Chance '+Math.round(chance*100)+'%');playSound('dash');
 const selector=$('v29BallSelect');if(selector){const option=selector.querySelector(`option[value="${id}"]`);if(option){option.textContent=option.textContent.replace(/\d+$/,save[store]);option.disabled=save[store]===0;}}
};

// 10. Pos-jogo: desafios lendarios apos completar a Elite Four (sem alterar a campanha).
const V29_LEGENDARY=[144,145,146,150,151];
const v29OldWin=renderWin;
renderWin=function(){v29OldWin();if(save.gym<13)return;
 const panel=document.querySelector('#main section');if(!panel)return;
 const block=document.createElement('section');block.className='v29Endgame';
 block.innerHTML='<h3>✨ Desafios lendários de Kanto</h3><p class="desc">Campeão de Kanto: enfrente e tente capturar Articuno, Zapdos, Moltres, Mewtwo e Mew. Leve Pokébolas e uma equipe preparada.</p><div class="v29EndgameButtons"></div>';
 const row=block.querySelector('.v29EndgameButtons');const mart=document.createElement('button');mart.className='btn gold';mart.textContent='🛍️ Comprar Pokébolas';mart.onclick=showShop;row.appendChild(mart);for(const id of V29_LEGENDARY){const b=document.createElement('button');b.className='btn ghost';b.textContent=D[id].name;b.onclick=()=>{
 if(!requireTeam()){showItems();return}if(save.balls+save.superBalls+save.ultraBalls<1){alert('Compre Pokébolas para iniciar o desafio.');return;}
 startBattle([mon(id,id===150?75:68)],'✨ DESAFIO LENDÁRIO · '+D[id].name,true);
 };row.appendChild(b)}panel.appendChild(block);
};

// As lutas lendarias NAO devem incrementar os ginásios ou a Liga finalizada.
const v29OldFinishBattle=finishBattle;
finishBattle=function(win){
 if(!battle?.active)return;
 if(save.gym===13&&battle.wild){
  const name=foe()?D[foe().id].name:'Pokémon lendário';
  battle.active=false;stopTimers();
  if(win){save.wins++;save.coins+=40;for(const m of save.team){if(m.hp>0){awardXP(m,42);m.hp=Math.min(m.maxHp,m.hp+Math.ceil(m.maxHp*.12));}}}
  else{save.losses++;for(const m of save.team)m.hp=Math.max(1,Math.ceil(m.maxHp*.55));}
  persist();resultScreen(win?'✨ DESAFIO LENDÁRIO VENCIDO':'💔 DESAFIO ENCERRADO',win?name+' foi derrotado. Volte para tentar capturá-lo!':'Você pode tentar novamente no pós-jogo.',win,false);
  return;
 }
 return v29OldFinishBattle(win);
};
// Corrige botao de encontros selvagens para aceitar qualquer classe de Pokebola.
const v29OldRenderFinal=render;
render=function(){v29OldRenderFinal();const grass=$('grassBtn');if(grass&&save.gym<8){const used=save.routeUsed[save.gym+'-'+save.stage]||0;grass.disabled=!(save.stage>=1&&save.stage<=v29TrainerCount(save.gym)&&used<3&&(save.balls+save.superBalls+save.ultraBalls)>0);}};
// Diagnostico nao invasivo para regressao em Android e navegadores desktop.
window.PokemonTorreDiagnostics=()=>({version:V29_VERSION,active:!!battle?.active,gym:save.gym,stage:save.stage,monsters:save.team.length,wasm:!!v28Wasm,phaser:!!v27Scene,fps:engine?.fps??null});