/* POKEMON TORRE V31 - PACOTE UNICO 2D / 10 ATUALIZACOES
   Conserva o motor, SAVE_KEY, V30.1, WASM e o funcionamento offline do HTML. */
(function(){
'use strict';
const V31_VERSION='31.0';
const V31_HELD={leftovers:{name:'Leftovers',price:145,icon:'🍎',description:'Recupera PV aos poucos'},quick:{name:'Quick Claw',price:125,icon:'⚡',description:'Movimenta-se mais rápido'},mystic:{name:'Mystic Water',price:125,icon:'💧',description:'+12% aos golpes de água'},charcoal:{name:'Charcoal',price:125,icon:'🔥',description:'+12% aos golpes de fogo'},focus:{name:'Focus Band',price:160,icon:'🛡️',description:'Chance de resistir a um golpe fatal'}};
const V31_ACH=[{id:'first',name:'Primeira vitória',coins:30,check:s=>s.wins>=1},{id:'ten',name:'10 vitórias',coins:80,check:s=>s.wins>=10},{id:'gym',name:'Primeira insígnia',coins:90,check:s=>s.medals.length>=1},{id:'four',name:'Quatro insígnias',coins:180,check:s=>s.medals.length>=4},{id:'league',name:'Campeão de Kanto',coins:350,check:s=>s.gym>=8},{id:'shiny',name:'Primeiro Shiny capturado',coins:140,check:s=>(s.shinyCaught||[]).length>=1},{id:'dex',name:'Pokédex de Kanto completa',coins:500,check:s=>(s.caught||[]).filter(id=>id<=151).length>=151},{id:'noKO',name:'Vença um líder sem desmaios',coins:120,check:s=>(s.v31CleanGym||0)>=1}];
const V31_SIG={
  6:{name:'Lança-Chamas',type:'fire',kind:'beam',power:55,cost:40,cd:4800,icon:'🔥'},
  9:{name:'Hidro Bomba',type:'water',kind:'beam',power:56,cost:42,cd:4900,icon:'🌊'},
  25:{name:'Thunder',type:'electric',kind:'homing',power:45,cost:38,cd:10000,icon:'🌩️',condition:'paralyze'},
  26:{name:'Thunder',type:'electric',kind:'homing',power:47,cost:39,cd:10000,icon:'🌩️',condition:'paralyze'},
  34:{name:'Earthquake',type:'ground',kind:'area',power:52,cost:42,cd:5700,icon:'🌋'},
  31:{name:'Earthquake',type:'ground',kind:'area',power:48,cost:40,cd:5600,icon:'🌋'},
  65:{name:'Psíquico',type:'psychic',kind:'homing',power:46,cost:39,cd:10000,icon:'🔮'},
  94:{name:'Bola Sombria',type:'ghost',kind:'homing',power:45,cost:40,cd:10000,icon:'👻'},
  112:{name:'Earthquake',type:'ground',kind:'area',power:53,cost:43,cd:5750,icon:'🌋'},
  143:{name:'Hyper Beam',type:'normal',kind:'beam',power:66,cost:50,cd:7800,icon:'☄️',recovery:1500},
  130:{name:'Hidro Bomba',type:'water',kind:'area',power:51,cost:41,cd:5100,icon:'🌊'},
  145:{name:'Thunder',type:'electric',kind:'homing',power:54,cost:45,cd:10000,icon:'⚡',condition:'paralyze'},
  149:{name:'Hyper Beam',type:'normal',kind:'beam',power:64,cost:48,cd:7900,icon:'☄️',recovery:1600},
  150:{name:'Psíquico',type:'psychic',kind:'homing',power:55,cost:44,cd:10000,icon:'🔮'},
  121:{name:'Recover',type:'psychic',kind:'recover',power:0,cost:38,cd:9500,icon:'💚'},
  64:{name:'Recover',type:'psychic',kind:'recover',power:0,cost:38,cd:9500,icon:'💚'},
  132:{name:'Transformação',type:'normal',kind:'illusion',power:0,cost:28,cd:9500,icon:'✨'},
  137:{name:'Recover',type:'normal',kind:'recover',power:0,cost:38,cd:9500,icon:'💚'}
};
const V31_SUPPORT=new Set([63,64,65,92,93,94,122,123,130,132]);
function v31EnsureSave(){
 if(!Array.isArray(save.v31Items))save.v31Items=[];
 if(!save.v31Achievements||typeof save.v31Achievements!=='object')save.v31Achievements={};
 if(!save.v31Difficulty||!['casual','normal','mestre'].includes(save.v31Difficulty))save.v31Difficulty='normal';
 if(!Array.isArray(save.v31Presets))save.v31Presets=[];
 for(const m of [...(save.team||[]),...(save.box||[])]){
  if(m && !m.v31Uid)m.v31Uid='p'+Math.random().toString(36).slice(2,11)+Date.now().toString(36);
 }
}
v31EnsureSave();
const css=document.createElement('style');css.id='v31Style';css.textContent=`
.v31Trainer{position:absolute;z-index:3;right:2%;top:34%;width:52px;display:grid;place-items:center;pointer-events:none;opacity:.75;filter:drop-shadow(0 2px 3px #0009)}
.v31Trainer img{width:48px;height:68px;object-fit:contain;image-rendering:pixelated}
.v31TrainerLabel{font-size:9px;color:#f4eccc;background:#0e1b2dbd;padding:2px 5px;border-radius:5px;max-width:70px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
.v31Status{display:inline-block;vertical-align:middle;background:#0b2e3ddb;color:#f8d6ab;border-radius:5px;padding:2px 5px;margin-left:5px;font-size:9px;font-weight:800}
.v31Glow{position:absolute;inset:0;z-index:2;opacity:0;pointer-events:none;transition:opacity .12s;mix-blend-mode:screen;background:radial-gradient(circle at 55% 50%,var(--v31-color,#ffd78a) 0%,transparent 52%)}
.v31Badge{display:inline-block;background:#0b2c33dd;border:1px solid #5696a0;color:#d2fff0;border-radius:8px;padding:3px 7px;font-size:10px;font-weight:800}
.v31Pane{border:1px solid #48677b;background:#132939;border-radius:14px;padding:13px;margin:12px 0}
.v31Pane h3{margin:2px 0 9px;font-size:15px;color:#e4f0fc}.v31Actions{display:flex;flex-wrap:wrap;gap:7px;margin:10px 0}.v31Actions .btn{flex:1 1 130px;min-height:40px}
.v31Fav{position:absolute;right:10px;top:7px;z-index:5;padding:3px 7px;cursor:pointer;color:#ffe494;background:#203446;border:1px solid #48677b;border-radius:7px;font-size:12px}
.v31Held{font-size:10px;color:#afe7e0;line-height:1.4}.v31Info{font-size:11px;color:#cbdce9;line-height:1.55}
.v31Shiny{object-fit:contain;image-rendering:pixelated!important}.v31DuoChip{position:absolute;z-index:6;top:23%;right:11px;font-size:10px;color:#d6f5ff;background:#11283acb;border:1px solid #a0d8ed88;border-radius:9px;padding:4px 7px;pointer-events:none}
.v31Message{position:fixed;z-index:9999;left:50%;bottom:8%;transform:translateX(-50%);max-width:min(480px,88vw);border:1px solid #76cab8;border-radius:12px;padding:9px 13px;color:#e9fff2;font-size:12px;font-weight:750;background:#142e36eb;box-shadow:0 6px 22px #0008;pointer-events:none;animation:v31Toast .3s ease-out}
@keyframes v31Toast{from{opacity:0;transform:translate(-50%,12px)}to{opacity:1;transform:translate(-50%,0)}}
@media(max-width:600px){.v31Trainer{right:1%;top:31%;width:35px}.v31Trainer img{width:32px;height:43px}.v31TrainerLabel{font-size:8px;max-width:40px}.v31DuoChip{font-size:9px;top:25%}.v31Pane{padding:10px}}
@media(prefers-reduced-motion:reduce){.v31Message{animation:none}.v31Glow{transition:none}}
`;
document.head.appendChild(css);
function v31Toast(message){document.querySelector('.v31Message')?.remove();const el=document.createElement('div');el.className='v31Message';el.textContent=message;document.body.append(el);setTimeout(()=>el.remove(),2300);}
function v31ShinyImage(id){return 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/'+id+'.png';}
const shinyImgs={};function v31Img(id){if(!shinyImgs[id]){let a=new Image();a.crossOrigin='anonymous';a.decoding='async';a.src=v31ShinyImage(id);shinyImgs[id]=a;}return shinyImgs[id];}
function v31ReplaceShiny(container,mon){if(!mon?.shiny||!container)return;
 const pic=container.querySelector('.spritewrap img.sprite');if(!pic)return;
 pic.dataset.v31Shiny='1';pic.classList.add('v31Shiny');pic.onerror=function(){this.onerror=null;this.style.filter='hue-rotate(95deg) saturate(1.8)';};pic.src=v31ShinyImage(mon.id);
 const placeholder=container.querySelector('.spritewrap .placeholder');if(placeholder)placeholder.style.display='none';
}
// 1: movesets com recuperacao, ilusoes, Earthquake, Thunder e recuperacao do Hyper Beam.
const skillPrev=skillSet;
skillSet=function(m){const skills=skillPrev(m),custom=V31_SIG[m?.id];if(custom)skills[2]={...custom,cat:custom.power?'special':'status'};
 if(m && V31_SUPPORT.has(m.id) && m.id!==132)skills[3]={name:'Double Team',type:'normal',cat:'status',kind:'illusion',power:0,cost:24,cd:8600,icon:'✨'};
 // Golpes teleguiados nunca recarregam antes de dez segundos.
 for(const s of skills)if(s?.kind==='homing')s.cd=Math.max(10000,s.cd||0);
 return skills;};
function v31StateSide(side){return typeof sideState==='function'?sideState(side):null;}
const movePrev=BattleEngine.prototype.useMove;
BattleEngine.prototype.useMove=function(i){const m=battle?.active?current():null,s=m?skillSet(m)[i]:null;
 if(!s||!battle?.active||battle.paused)return movePrev.call(this,i);
 const now=performance.now();if((cooldowns[i]||0)>now||battle.energy<s.cost||m.hp<=0)return;
 if(this.v31RecoverUntil && now<this.v31RecoverUntil){log('Hyper Beam: recuperando energia!');return;}
 if(s.kind==='recover'||s.kind==='illusion'){
  battle.energy-=s.cost;cooldowns[i]=now+s.cd;
  if(s.kind==='recover'){const gained=Math.max(1,Math.round(m.maxHp*.32));m.hp=Math.min(m.maxHp,m.hp+gained);this.particlesAt(this.player.x,this.player.y,'#88f3b6',19,90);log(D[m.id].name+' recuperou '+gained+' PV!');}
  else{this.player.inv=Math.max(this.player.inv,1.05);this.player.dodgeCd=0;this.particlesAt(this.player.x,this.player.y,'#b6e8ff',17,110);log(D[m.id].name+' criou cópias ilusórias!');}
  persist();return;
 }
 const res=movePrev.call(this,i);
 if((cooldowns[i]||0)>now && s.name==='Hyper Beam')this.v31RecoverUntil=now+1500;
 if((cooldowns[i]||0)>now){this.v31LastUsed=s;const count=this.v31Repeat?.id===m.id&&this.v31Repeat?.slot===i?(this.v31Repeat.count||0)+1:1;this.v31Repeat={id:m.id,slot:i,count,at:now};
  if(s.kind==='area'||s.name==='Thunder'){this.v31Flash={color:TYPE_COLOR[s.type]||'#ffdacc',time:performance.now(),length:240};}
 }
 return res;
};
// 2: particulas/iluminacao temporarias, sem loop de renderizacao adicional.
const drawPrev=BattleEngine.prototype.draw;
BattleEngine.prototype.draw=function(now){drawPrev.call(this,now);if(!battle?.active)return;
 const f=this.v31Flash;if(f&&now-f.time<f.length){const ctx=this.ctx;ctx.save();ctx.globalAlpha=Math.max(0,1-(now-f.time)/f.length)*.18;ctx.fillStyle=f.color;ctx.fillRect(0,0,this.w,this.h);ctx.restore();}
};
// 3: lider em posicao discreta atras do adversario; reaproveita imagens ja usadas no jogo.
const renderBattlePrev=renderBattle;
renderBattle=function(){renderBattlePrev();if(!battle?.active)return;
 const area=$('arenaPro');if(!area)return;
 if(!battle.wild&&save.gym<8){const label=GYMS[save.gym].leader;const box=document.createElement('div');box.className='v31Trainer';box.id='v31Trainer';
 const source=typeof V27_TRAINER_GIFS!=='undefined'?V27_TRAINER_GIFS[label]:null;
 if(source){const pic=document.createElement('img');pic.src=source;pic.alt='Treinador '+label;pic.onerror=()=>pic.remove();box.append(pic);}
 const desc=document.createElement('div');desc.className='v31TrainerLabel';desc.textContent=label;box.append(desc);area.append(box);
 }
 const glow=document.createElement('div');glow.className='v31Glow';glow.id='v31Glow';area.append(glow);
 const m=current();if(m?.shiny){const label=$('allyTitle');if(label&&!label.querySelector('.v31Status'))label.insertAdjacentHTML('beforeend','<span class="v31Status">✨ Shiny</span>');}
};
// 4: sprites Shiny com paleta por especie. Fallback generico apenas sem sprite disponivel.
const monDrawPrev=BattleEngine.prototype.drawMon;
BattleEngine.prototype.drawMon=function(entity,id,isEnemy,now){const pokemon=isEnemy?battle?.foe:(battle?.active?current():null);
 if(!pokemon?.shiny||pokemon.id!==id)return monDrawPrev.call(this,entity,id,isEnemy,now);
 const picture=v31Img(id),entry=this.assets?.get(id);
 if(entry && picture.complete&&picture.naturalWidth){const oldStatic=entry.customStatic,oldCustom=entry.custom;
  entry.customStatic=picture;entry.custom={Idle:picture,Walk:picture,Attack:picture,Hurt:picture};
  try{return monDrawPrev.call(this,entity,id,isEnemy,now);}finally{entry.customStatic=oldStatic;entry.custom=oldCustom;}
 }
 const ctx=this.ctx;ctx.save();ctx.filter='hue-rotate(95deg) saturate(1.7)';try{return monDrawPrev.call(this,entity,id,isEnemy,now);}finally{ctx.restore();}
};
// 5: encontros de dupla assistidos. Os Pokemon secundários têm PV individuais e atacam em paralelo.
const startPrev=startBattle;
startBattle=function(enemies,label,wild){startPrev(enemies,label,wild);if(!battle?.active)return;
 const duo=!wild&&/ROCKET|RIVAL/.test(label||'') && save.team.filter(m=>m.hp>0).length>=2 && battle.enemies?.length>=1;
 if(duo){const idx=save.team.findIndex((m,i)=>i!==battle.pIndex&&m.hp>0);const enemy=battle.enemies.shift();battle.v31Duo={ally:save.team[idx],enemy,clockAlly:1.6,clockEnemy:2.7};
  engine?.loadArt(enemy.id);engine?.loadArt(battle.v31Duo.ally.id);const div=document.createElement('div');div.className='v31DuoChip';div.id='v31DuoChip';div.textContent='⚔️ DUPLA · '+D[battle.v31Duo.ally.id].name+' × '+D[enemy.id].name; $('arenaPro')?.append(div);
 }
 battle.v31NoKo=true;battle.v31EnemyType=foe()?.id;
};
const updatePrev=BattleEngine.prototype.update;
BattleEngine.prototype.update=function(dt,now){const beforeX=this.player.x,beforeY=this.player.y;const result=updatePrev.call(this,dt,now);if(!battle?.active||battle.paused)return result;
 if(current()?.held==='quick'){this.player.x+=(this.player.x-beforeX)*.14;this.player.y+=(this.player.y-beforeY)*.14;this.collideRocks(this.player);}
 if(this.v31RecoverUntil && performance.now()<this.v31RecoverUntil){this.enemyAttackCD=Math.max(this.enemyAttackCD,.25);}
 const d=battle.v31Duo;
 if(d){d.clockAlly-=dt;d.clockEnemy-=dt;
  if(d.ally.hp>0&&d.clockAlly<=0){d.clockAlly=2.4;let t=d.enemy?.hp>0?d.enemy:foe();if(t&&t.hp>0){const hit=damage(d.ally,t,D[d.ally.id].type,25).hit;t.hp=Math.max(0,t.hp-hit);this.damageLabels.push({x:this.enemy.x+this.h*.10,y:this.enemy.y-this.h*.16,text:'APOIO -'+hit,life:.8,color:'#b3fff1'});this.particlesAt(this.enemy.x+this.h*.1,this.enemy.y,D[d.ally.id].type==='fire'?'#ffb58e':'#86dfff',10,80);}}
  if(d.enemy?.hp>0&&d.clockEnemy<=0){d.clockEnemy=3.0;const target=d.ally.hp>0?d.ally:current();const hit=damage(d.enemy,target,D[d.enemy.id].type,19).hit;target.hp=Math.max(0,target.hp-hit);if(target===d.ally&&target.hp<=0)battle.v31NoKo=false;this.damageLabels.push({x:this.player.x-this.h*.12,y:this.player.y-this.h*.18,text:'DUPLA -'+hit,life:.8,color:'#ffd5b9'});}
 }
 if(battle.v31Boss&&this.v31Repeat?.count>=3){this.foeDodgeCD=Math.min(this.foeDodgeCD,.9);this.enemyAttackCD=Math.min(this.enemyAttackCD,1.95);}
 const tier=save.v31Difficulty||'normal';if(tier==='casual')this.enemyAttackCD=Math.max(this.enemyAttackCD,1.9);if(tier==='mestre')this.enemyAttackCD=Math.min(this.enemyAttackCD,2.05);
 if(this.v31LeftoverTimer===undefined)this.v31LeftoverTimer=0;
 this.v31LeftoverTimer+=dt;if(this.v31LeftoverTimer>=4){this.v31LeftoverTimer=0;for(const p of save.team){if(p.hp>0&&p.held==='leftovers')p.hp=Math.min(p.maxHp,p.hp+Math.max(1,Math.round(p.maxHp*.035)));}}
 return result;
};
const drawDuoPrev=BattleEngine.prototype.draw;
BattleEngine.prototype.draw=function(now){drawDuoPrev.call(this,now);const d=battle?.v31Duo;if(!battle?.active||!d)return;
 const ctx=this.ctx,positions=[{m:d.ally,x:this.player.x-this.h*.19,y:this.player.y+this.h*.12},{m:d.enemy,x:this.enemy.x+this.h*.19,y:this.enemy.y+this.h*.12}];
 for(const pos of positions){const {m,x,y}=pos;if(!m||m.hp<=0)continue;const entry=this.assets?.get(m.id);const pic=m.shiny?v31Img(m.id):entry?.customStatic||entry?.art;ctx.save();ctx.globalAlpha=.85;
  if(pic?.complete&&pic.naturalWidth){const width=this.h*.087;ctx.imageSmoothingEnabled=false;ctx.drawImage(pic,x-width/2,y-width*.65,width,width);}
  else{ctx.font='12px sans-serif';ctx.textAlign='center';ctx.fillStyle='#fff';ctx.fillText(D[m.id].name,x,y);}
  ctx.fillStyle='#12222d';ctx.fillRect(x-19,y+12,38,4);ctx.fillStyle='#83ddbc';ctx.fillRect(x-19,y+12,38*Math.max(0,m.hp/m.maxHp),4);ctx.restore();
 }
};
const nextPrev=nextFoe;
nextFoe=function(){const duo=battle?.v31Duo;
 // Se o parceiro rival sobreviveu, entra no lugar do Pokémon principal derrotado.
 if(duo && battle?.enemies?.length===0 && duo.enemy?.hp>0){battle.enemies.push(duo.enemy);duo.enemy=null;}
 return nextPrev();
};
// 6: equipe/caixa: favoritos, ordenacao da caixa e predefinicoes de equipes.
function v31InventoryPanel(){return `<div class="v31Pane"><h3>🎒 Organizar equipe e caixa</h3><p class="v31Info">Marque favoritos ⭐. Organize somente a caixa; a ordem de batalha da equipe não muda.</p><div class="v31Actions"><button class="btn ghost" id="v31SortLevel">Nível ↓</button><button class="btn ghost" id="v31SortName">Nome A–Z</button><button class="btn ghost" id="v31SavePreset">Salvar equipe</button><button class="btn ghost" id="v31LoadPreset">Carregar equipe</button></div><div class="v31Info">Itens equipáveis: ${save.v31Items.length} no inventário. Selecione uma estrela ou Pokémon para equipar.</div></div>`;}
const showTeamPrev=showTeam;
showTeam=function(){v31EnsureSave();showTeamPrev();const root=$('modal');if(!root)return;
 root.insertAdjacentHTML('beforeend',v31InventoryPanel());
 document.querySelectorAll('[data-team]').forEach(el=>{const index=+el.dataset.team,m=[...save.team,...save.box][index];if(!m)return;el.style.position='relative';const b=document.createElement('button');b.type='button';b.className='v31Fav';b.textContent=m.fav?'★':'☆';b.setAttribute('aria-label','Favorito e item para '+D[m.id].name);b.onclick=e=>{e.stopPropagation();showV31MonOptions(m);};el.append(b);v31ReplaceShiny(el,m);
  if(m.held){const held=document.createElement('small');held.className='v31Held';held.textContent='🎒 '+V31_HELD[m.held]?.name;el.append(held);}
 });
 $('v31SortLevel').onclick=()=>{save.box.sort((a,b)=>b.level-a.level);persist();showTeam();};
 $('v31SortName').onclick=()=>{save.box.sort((a,b)=>D[a.id].name.localeCompare(D[b.id].name,'pt'));persist();showTeam();};
 $('v31SavePreset').onclick=()=>{save.v31Presets=[save.team.map(m=>m.v31Uid)];persist();v31Toast('Equipe favorita salva!');};
 $('v31LoadPreset').onclick=()=>{const list=save.v31Presets[0]||[];if(!list.length)return v31Toast('Salve primeiro uma equipe.');const all=[...save.team,...save.box];const selected=list.map(uid=>all.find(m=>m.v31Uid===uid)).filter(Boolean);if(!selected.length)return v31Toast('Equipe salva não encontrada.');const wanted=new Set(selected);save.team=selected.slice(0,6);save.box=all.filter(m=>!wanted.has(m)).concat(selected.slice(6));persist();showTeam();};
};
function showV31MonOptions(m){const choices=Object.entries(V31_HELD).map(([key,item])=>`<option value="${key}" ${m.held===key?'selected':''} ${!save.v31Items.includes(key)&&m.held!==key?'disabled':''}>${item.icon} ${item.name}${!save.v31Items.includes(key)&&m.held!==key?' · comprar na loja':''}</option>`).join('');
 overlay(`<div class="sectionhead"><div><div class="overline">GERENCIAR POKÉMON</div><h2>${D[m.id].name} · Nv.${m.level}</h2></div></div><div class="v31Pane"><p class="v31Info">${img(m.id)} <br>Item atual: ${V31_HELD[m.held]?.name||'Nenhum'}</p><div class="v31Actions"><button class="btn ghost" id="v31ToggleFav">${m.fav?'★ Desmarcar favorito':'☆ Marcar favorito'}</button></div><label class="v31Info" for="v31HeldSelect">Equipar item</label><select id="v31HeldSelect"><option value="">Nenhum</option>${choices}</select><div class="v31Actions"><button class="btn" id="v31Equip">Salvar</button><button class="btn ghost" id="v31BackTeam">Voltar</button></div></div>`);
 const item=$('v31HeldSelect');item.value=m.held||'';$('v31ToggleFav').onclick=()=>{m.fav=!m.fav;persist();showV31MonOptions(m);};
 $('v31Equip').onclick=()=>{const chosen=item.value;if(chosen&&!save.v31Items.includes(chosen)&&m.held!==chosen)return v31Toast('Compre o item na PokéMart.');if(m.held&&m.held!==chosen)save.v31Items.push(m.held);if(chosen&&chosen!==m.held)save.v31Items.splice(save.v31Items.indexOf(chosen),1);m.held=chosen||null;persist();showTeam();};
 $('v31BackTeam').onclick=showTeam;
}
// 7: itens equipaveis. Multiplicador aplicado apenas ao Pokemon segurando item.
for(const [id,p] of Object.entries(V31_HELD))if(!KANTO_SHOP.some(s=>s.id===id))KANTO_SHOP.push({id,name:p.name,icon:p.icon,price:p.price,detail:p.description});
const shopPrev=showShop;
showShop=function(){shopPrev();document.querySelectorAll('[data-buy]').forEach(btn=>{const id=btn.dataset.buy;if(!V31_HELD[id])return;btn.onclick=()=>{const item=V31_HELD[id];if(save.coins<item.price)return;save.coins-=item.price;save.v31Items.push(id);persist();render();showShop();v31Toast(item.name+' comprado! Equipe pelo menu 🎒.');};});};
const damagePrev=damage;
damage=function(att,def,type,power){const r=damagePrev(att,def,type,power);if(!att||!def)return r;
 if((att.held==='mystic'&&type==='water')||(att.held==='charcoal'&&type==='fire'))r.hit=Math.round(r.hit*1.12);
 if(def.held==='focus'&&def.hp<=r.hit&&def.hp>1&&Math.random()<.1)r.hit=Math.max(0,def.hp-1);
 return r;
};
// 8: IA adaptativa e modalidades de dificuldade; aplica os ajustes depois do movimento base.
const moveStatPrev=BattleEngine.prototype.hitTarget;
BattleEngine.prototype.hitTarget=function(side,type,power){const ally=side==='player'?current():null;const before=ally?.hp??0;const r=moveStatPrev.call(this,side,type,power);
 if(side==='player'&&ally?.hp<=0&&before>0&&battle)battle.v31NoKo=false;
 if(side==='enemy'&&type==='electric'&&this.v31LastUsed?.condition==='paralyze'&&Math.random()<.25){const st=v31StateSide('enemy');if(st)st.paralyze=1;this.damageLabels.push({x:this.enemy.x,y:this.enemy.y-55,text:'PARALISADO',life:1,color:'#ffe38c'});}
 return r;
};
const framePrev=BattleEngine.prototype.frame;
BattleEngine.prototype.frame=function(now){if(!this.running)return;
 try{return framePrev.call(this,now);}catch(error){console.error('Pokémon Torre V31: falha isolada no desenho/combate',error);this.v31LastError=String(error);if(battle?.active){battle.paused=true;log('A batalha foi pausada por segurança. Reabra o jogo para recuperar sua equipe.');}this.running=false;}
};
const particlePrev=BattleEngine.prototype.particlesAt;
BattleEngine.prototype.particlesAt=function(x,y,color,count=18,speed=120){if((this.particles?.length||0)>95)return;return particlePrev.call(this,x,y,color,Math.min(count,this.fps>0&&this.fps<30?7:22),speed);};
// 9: conquistas e recompensas pagas uma vez. Sem servidor e sem dias ficticios.
const persistPrev=persist;let v31Checking=false;
persist=function(){if(v31Checking)return persistPrev();v31Checking=true;try{v31EnsureSave();let unlocked=[];
 for(const a of V31_ACH){if(!save.v31Achievements[a.id]&&a.check(save)){save.v31Achievements[a.id]=Date.now();save.coins+=a.coins;unlocked.push(a.name+' +'+a.coins+' 🪙');}}
 const r=persistPrev();if(unlocked.length)v31Toast('🏆 '+unlocked.join(' · '));return r;
 }finally{v31Checking=false;}
};
const finishPrev=finishBattle;
finishBattle=function(win){if(battle?.active&&win&&!battle.wild&&save.gym<8&&save.stage===v29TrainerCount(save.gym)&&battle.v31NoKo)save.v31CleanGym=(save.v31CleanGym||0)+1;
 return finishPrev(win);
};
const dexPrev=showPokedex;
showPokedex=function(){dexPrev();document.querySelectorAll('.dexCard').forEach((node,i)=>{const id=i+1;if((save.shinyCaught||[]).includes(id)){v31ReplaceShiny(node,{id,shiny:true});node.classList.add('v301ShinyCard');}});};
// 10: configuracoes e medalhas no menu. Nao muda a campanha salvo por clique explicito.
const renderPrev=render;
render=function(){v31EnsureSave();renderPrev();if(battle?.active)return;
 const bar=$('resources');if(bar){const tag=$('v30VersionTag');if(tag)tag.textContent='V31 · 2D';}
 const area=document.querySelector('#main .v30Missions')||document.querySelector('#main .gymHero')||document.querySelector('#main .v29Endgame');
 if(area&&!$('v31Achievements')){const panel=document.createElement('div');panel.className='v31Pane';panel.id='v31Achievements';panel.innerHTML='<h3>🏆 Conquistas</h3><div class="v31Info">'+V31_ACH.map(a=>'<div>'+((save.v31Achievements||{})[a.id]?'✅':'▫️')+' '+a.name+' · +'+a.coins+' 🪙</div>').join('')+'</div>';area.insertAdjacentElement('afterend',panel);}
 const gear=$('v281SettingsButton');if(gear&&!gear.dataset.v31){gear.dataset.v31='1';const old=gear.onclick;gear.onclick=()=>{old?.();const box=document.querySelector('.v281SettingsActions');if(!box||$('v31Difficulty'))return;
 const row=document.createElement('div');row.className='v31Pane';row.innerHTML='<h3>⚔️ Dificuldade</h3><p class="v31Info">Altere a IA dos próximos encontros; não reinicia o progresso.</p><select id="v31Difficulty"><option value="casual">Casual</option><option value="normal">Normal</option><option value="mestre">Mestre</option></select>';
 box.insertAdjacentElement('afterend',row);const select=$('v31Difficulty');select.value=save.v31Difficulty;select.onchange=()=>{save.v31Difficulty=select.value;persist();v31Toast('Dificuldade: '+select.options[select.selectedIndex].text);};
 };}
};
window.PokemonTorreV31Diagnostics=()=>({version:V31_VERSION,gym:save.gym,stage:save.stage,shiny:(save.shinyCaught||[]).length,items:save.v31Items.length,difficulty:save.v31Difficulty,achievements:Object.keys(save.v31Achievements||{}),duo:!!battle?.v31Duo,errors:engine?.v31LastError||null,moves:Object.keys(V31_SIG).length,source:'local 2D'});
})();
/* FIM V31 */