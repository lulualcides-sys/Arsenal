/* Pokémon Torre V32 · patch 2D: Liga, golpes equipáveis, TMs, loja, Torre, clima, captura, temperamentos, áudio e testes */
(function(){
'use strict';
const V32_VERSION='32.0';
const V32_NATURES=[
 {id:'audaz',name:'Audaz',desc:'+4% de dano',atk:1.04,def:1},
 {id:'cauteloso',name:'Cauteloso',desc:'+4% de resistência',atk:1,def:.96},
 {id:'veloz',name:'Veloz',desc:'Movimento veloz',atk:1,def:1},
 {id:'equilibrado',name:'Equilibrado',desc:'Sem bônus ou penalidade',atk:1,def:1},
 {id:'calmo',name:'Calmo',desc:'+3% de resistência',atk:1,def:.97}
];
const V32_TM={
 electric:{id:'tm-electric',name:'TM Raio',type:'electric',price:145,power:44,cost:32,cd:3300,kind:'bolt',icon:'⚡',level:1},
 water:{id:'tm-water',name:'TM Pulso d’Água',type:'water',price:140,power:43,cost:30,cd:3400,kind:'bolt',icon:'💧',level:1},
 fire:{id:'tm-fire',name:'TM Explosão de Fogo',type:'fire',price:150,power:49,cost:37,cd:4800,kind:'beam',icon:'🔥',level:1},
 grass:{id:'tm-grass',name:'TM Bomba de Sementes',type:'grass',price:140,power:45,cost:31,cd:3700,kind:'bolt',icon:'🍃',level:1},
 psychic:{id:'tm-psychic',name:'TM Confusion',type:'psychic',price:150,power:41,cost:28,cd:3450,kind:'bolt',icon:'🔮',level:1},
 ground:{id:'tm-ground',name:'TM Terremoto',type:'ground',price:175,power:51,cost:43,cd:5800,kind:'area',icon:'🪨',level:1},
 normal:{id:'tm-normal',name:'TM Slam',type:'normal',price:90,power:32,cost:0,cd:1550,kind:'dash',icon:'💥',level:1},
 poison:{id:'tm-poison',name:'TM Ácido',type:'poison',price:130,power:40,cost:29,cd:3150,kind:'bolt',icon:'☣️',level:1},
 ice:{id:'tm-ice',name:'TM Raio de Gelo',type:'ice',price:160,power:48,cost:38,cd:4400,kind:'beam',icon:'❄️',level:1},
 ghost:{id:'tm-ghost',name:'TM Bola Sombria',type:'ghost',price:150,power:45,cost:37,cd:4200,kind:'bolt',icon:'👻',level:1}
};
const V32_ADD_MOVES={
 fire:{name:'Rajada Flamejante',type:'fire',kind:'bolt',power:34,cost:22,cd:2350,icon:'🔥',level:12},
 water:{name:'Onda de Bolhas',type:'water',kind:'bolt',power:33,cost:22,cd:2250,icon:'🫧',level:12},
 electric:{name:'Descarga Elétrica',type:'electric',kind:'area',power:39,cost:32,cd:4150,icon:'⚡',level:18},
 grass:{name:'Folhas Cortantes',type:'grass',kind:'bolt',power:36,cost:22,cd:2300,icon:'🍃',level:12},
 psychic:{name:'Onda Mental',type:'psychic',kind:'bolt',power:36,cost:24,cd:2550,icon:'🔮',level:15},
 ground:{name:'Abalo Terrestre',type:'ground',kind:'area',power:40,cost:32,cd:4450,icon:'🪨',level:17},
 poison:{name:'Névoa Tóxica',type:'poison',kind:'bolt',power:36,cost:22,cd:2550,icon:'☣️',level:14},
 ice:{name:'Estilhaços de Gelo',type:'ice',kind:'bolt',power:37,cost:24,cd:2500,icon:'❄️',level:14},
 ghost:{name:'Sombra Viva',type:'ghost',kind:'bolt',power:37,cost:24,cd:2700,icon:'👻',level:14},
 rock:{name:'Pedra Afiada',type:'rock',kind:'bolt',power:38,cost:24,cd:2600,icon:'🪨',level:14},
 fighting:{name:'Golpe Concentrado',type:'fighting',kind:'dash',power:41,cost:25,cd:3100,icon:'🥊',level:14},
 flying:{name:'Vento Cortante',type:'flying',kind:'bolt',power:35,cost:22,cd:2450,icon:'🪶',level:14},
 bug:{name:'Agulhas Velozes',type:'bug',kind:'bolt',power:35,cost:22,cd:2450,icon:'🐛',level:14},
 dragon:{name:'Sopro de Dragão',type:'dragon',kind:'beam',power:43,cost:31,cd:4300,icon:'🐉',level:20},
 steel:{name:'Lâmina de Metal',type:'steel',kind:'dash',power:40,cost:24,cd:3150,icon:'⚙️',level:16},
 dark:{name:'Pulso Sombrio',type:'dark',kind:'bolt',power:41,cost:27,cd:2950,icon:'🌘',level:16},
 normal:{name:'Impacto Poderoso',type:'normal',kind:'dash',power:29,cost:0,cd:1150,icon:'💥',level:12}
};
const V32_WEATHERS={
 clear:{name:'Céu limpo',icon:'☀️',bonus:{},penalty:{}},
 rain:{name:'Chuva',icon:'🌧️',bonus:{water:1.2},penalty:{fire:.82}},
 sun:{name:'Sol forte',icon:'🌞',bonus:{fire:1.2},penalty:{water:.82}},
 sand:{name:'Tempestade de areia',icon:'🌪️',bonus:{rock:1.12,ground:1.12},penalty:{}},
 storm:{name:'Tempestade elétrica',icon:'⛈️',bonus:{electric:1.12},penalty:{}}
};
const V32_SHOP_EXTRA=[{id:'ball',name:'Pokébola',price:12},{id:'superball',name:'Super Ball',price:32},{id:'ultraball',name:'Ultra Ball',price:65}];
const v32MonBase=mon;
mon=function(id,level){const m=v32MonBase(id,level);m.v32Nature=V32_NATURES[Math.floor(Math.random()*V32_NATURES.length)].id;return m;};
function v32Ensure(){
 if(!save.v32||typeof save.v32!=='object') save.v32={};
 const c=save.v32;
 if(!Array.isArray(c.tms))c.tms=[];
 if(!c.tower||typeof c.tower!=='object')c.tower={floor:1,best:0,wins:0};
 c.tower.floor=Math.max(1,Math.min(999,Math.floor(Number(c.tower.floor)||1)));
 c.tower.best=Math.max(0,Math.min(999,Math.floor(Number(c.tower.best)||0)));
 if(!c.league||typeof c.league!=='object')c.league={stage:0,wins:0,championships:0};
 if(!Number.isFinite(c.volume))c.volume=35;
 c.volume=Math.max(0,Math.min(100,c.volume));
 for(const m of [...(save.team||[]),...(save.box||[])]){
  if(!m||!D[m.id])continue;
  if(!V32_NATURES.some(n=>n.id===m.v32Nature))m.v32Nature=V32_NATURES[(m.id+m.level)%V32_NATURES.length].id;
  if(!Array.isArray(m.v32Slots)||m.v32Slots.length!==4)m.v32Slots=null;
 }
 return c;
}
v32Ensure();
const v32Style=document.createElement('style');v32Style.id='v32Style';v32Style.textContent=`
.v32Banner{margin:9px 0 12px;border:1px solid #355968;border-radius:12px;background:#132d3ddd;padding:10px 12px;font-size:12px;line-height:1.5;color:#cbe7ed}
.v32Actions{display:flex;gap:7px;flex-wrap:wrap;margin:9px 0 14px}.v32Actions .btn{font-size:11px;padding:9px 10px}
.v32SwapBtn{font-size:11px;border:1px solid #417b87;border-radius:10px;padding:7px 10px;margin:4px 0 9px 9px;display:inline-flex;gap:6px;align-items:center;background:#163447;color:#dcfcfc;cursor:pointer}
.v32MoveRow{border:1px solid #345568;background:#172d40;border-radius:11px;padding:9px 11px;margin:7px 0;display:flex;justify-content:space-between;align-items:center;gap:9px;color:#def6ff;width:100%;text-align:left}
.v32MoveRow.selected{border-color:#88e3c8;background:#1d443f}.v32MoveRow.locked{opacity:.5;cursor:not-allowed}
.v32MoveRow b{display:block;font-size:13px}.v32MoveRow small{display:block;color:#adc8d5;font-size:10px;padding-top:3px}.v32MoveRow .pillSmall{flex-shrink:0}
.v32Grid{display:grid;grid-template-columns:1fr 1fr;gap:10px}.v32Box{border:1px solid #355669;border-radius:12px;padding:10px;background:#11283c}
.v32Weather{position:absolute;top:4px;left:50%;transform:translateX(-50%);z-index:8;background:#172a39df;color:#edf8fd;padding:5px 10px;font-size:10px;border-radius:11px;border:1px solid #53788a;pointer-events:none}
.v32TowerCard{padding:17px 12px;border-radius:14px;border:1px solid #578e93;background:linear-gradient(145deg,#19384a,#17243a);max-width:580px;margin:0 auto 14px}
.v32TowerCard h2{font-size:clamp(22px,4vw,30px);margin:8px 0 12px}
.v32SoundControl{padding:10px;background:#182e3d;border-radius:11px;border:1px solid #486778;margin:12px 0;display:flex;align-items:center;gap:9px;flex-wrap:wrap}
.v32SoundControl input{width:140px;max-width:45vw;accent-color:#65b8ae}
.v32Info{font-size:11px;color:#b7d6e6;line-height:1.55}
@media(max-width:510px){.v32Grid{grid-template-columns:1fr}.v32SwapBtn{margin-left:0}.v32Actions .btn{flex:1 1 125px}}
`;document.head.appendChild(v32Style);
const v32MoveKey=m=>(m.name||'')+'|'+(m.type||'normal')+'|'+(m.kind||'bolt');
const v32BaseSkills=skillSet;
function v32Catalogue(monster){
 if(!monster||!D[monster.id])return [];
 const p=D[monster.id],base=v32BaseSkills(monster),known=new Map();
 function add(move,level=1,tm=false){if(!move||!move.name)return;const item={...move,cat:move.cat||(move.power?'special':'status')};if(item.kind==='homing')item.cd=Math.max(10000,item.cd||0);
  const key=v32MoveKey(item);if(!known.has(key))known.set(key,{key,move:item,level,tm,available:!tm?monster.level>=level:save.v32.tms.includes(item.type)});
 }
 for(const x of base)add(x);
 const types=[...new Set([p.type,p.type2].filter(Boolean))];
 for(const t of types){const e=V32_ADD_MOVES[t];if(e)add(e,e.level);}
 if(p.type!=='normal'&&p.type2!=='normal')add(V32_ADD_MOVES.normal,Math.max(10,V32_ADD_MOVES.normal.level));
 for(const [type,m] of Object.entries(V32_TM)){
  if(type==='normal'||types.includes(type))add({...m,cat:'special',name:m.name.replace(/^TM /,''),type},1,true);
 }
 return [...known.values()];
}
function v32DefaultSlots(m){const b=v32BaseSkills(m),pool=v32Catalogue(m);return b.map(move=>v32MoveKey(move)).map((key,i)=>pool.some(x=>x.key===key)?key:pool[i]?.key).slice(0,4);}
skillSet=function(m){
 const basic=v32BaseSkills(m);if(!m||!Array.isArray(m.v32Slots)||m.v32Slots.length!==4)return basic;
 const pool=v32Catalogue(m);const base=v32DefaultSlots(m);
 return m.v32Slots.map((key,i)=>{
  const match=pool.find(x=>x.key===key&&x.available);
  return match?{...match.move}:{...basic[i]};
 });
};
function v32MoveScreen(m){
 if(battle?.active)return;
 v32Ensure();const all=[...save.team,...save.box];if(!all.includes(m))return;
 const cat=v32Catalogue(m),selected=Array.isArray(m.v32Slots)?m.v32Slots:v32DefaultSlots(m);let slot=0;
 function paint(){
  const rows=cat.map(x=>{
    const selectedThis=selected[slot]===x.key;let unlock=x.tm?'TM da loja':`Nv. ${x.level}`;
    const locked=!x.available;
    return `<button type="button" class="v32MoveRow ${locked?'locked':''} ${selectedThis?'selected':''}" data-v32-learn="${cat.indexOf(x)}" ${locked?'disabled':''}><span><b>${x.move.icon||'✨'} ${x.move.name}</b><small>${TYPE_NAME[x.move.type]||x.move.type} · ${x.move.power||0} força · ${x.move.cost||0} energia · ${(x.move.cd/1000).toFixed(1)}s ${locked?'· Desbloqueio: '+unlock:''}</small></span><span class="pillSmall">${selectedThis?'EQUIPADO':locked?'BLOQUEADO':'APRENDER'}</span></button>`;
  }).join('');
  overlay(`<div class="sectionhead"><div><div class="overline">GERENCIAR GOLPES · V32</div><h2>🧠 ${D[m.id].name} · Nv. ${m.level}</h2></div><button class="btn tiny ghost" id="v32ReturnTeam">✕</button></div><p class="desc">Selecione uma das quatro posições e depois escolha um golpe disponível. A troca é permanente até você alterar novamente, e não custa moedas.</p><div class="v32Banner">${v32Nature(m).name}: ${v32Nature(m).desc}. Novos golpes aparecem ao subir de nível ou comprar TMs compatíveis no PokéMart.</div><div class="v32Grid"><div class="v32Box"><h3>Quatro golpes equipados</h3>${selected.map((k,i)=>{const x=cat.find(c=>c.key===k)||cat.find(c=>c.key===v32DefaultSlots(m)[i]);const p=x?.move||skillSet(m)[i];return `<button type="button" class="v32MoveRow ${slot===i?'selected':''}" data-v32-slot="${i}"><span><b>${i+1}. ${p?.icon||'✨'} ${p?.name||'Golpe'}</b><small>${TYPE_NAME[p?.type]||'Normal'} · ${p?.cost||0} energia</small></span><span class="pillSmall">${slot===i?'TROCAR':'ESCOLHER'}</span></button>`}).join('')}</div><div class="v32Box"><h3>Golpes disponíveis (${cat.filter(x=>x.available).length})</h3><div style="max-height:55vh;overflow-y:auto">${rows}</div></div></div><div class="v32Actions"><button type="button" class="btn ghost" id="v32ResetMoves">↻ Golpes padrão</button><button type="button" class="btn primary" id="v32DoneMoves">✓ Voltar à equipe</button></div>`);
  $('v32ReturnTeam').onclick=showTeam;$('v32DoneMoves').onclick=showTeam;
  $('v32ResetMoves').onclick=()=>{m.v32Slots=null;persist();showTeam()};
  document.querySelectorAll('[data-v32-slot]').forEach(b=>b.onclick=()=>{slot=Number(b.dataset.v32Slot);paint()});
  document.querySelectorAll('[data-v32-learn]').forEach(b=>b.onclick=()=>{
   const e=cat[Number(b.dataset.v32Learn)];if(!e?.available)return;
   if(selected.some((k,i)=>k===e.key&&i!==slot))return v31Toast('Esse golpe já está em outro espaço.');
   selected[slot]=e.key;m.v32Slots=selected.slice();persist();v31Toast(e.move.name+' equipado!');paint();
  });
 }
 paint();
}
const v32TeamOld=showTeam;
showTeam=function(){v32Ensure();v32TeamOld();if(battle?.active)return;
 const monsters=[...save.team,...save.box];
 document.querySelectorAll('[data-team]').forEach(row=>{
  const m=monsters[+row.dataset.team];if(!m)return;
  const btn=document.createElement('button');btn.type='button';btn.className='v32SwapBtn';btn.textContent='🧠 Trocar golpes · '+v32Nature(m).name;
  btn.onclick=()=>v32MoveScreen(m);row.insertAdjacentElement('afterend',btn);
 });
};
function v32Nature(m){return V32_NATURES.find(n=>n.id===m?.v32Nature)||V32_NATURES[3];}
const v32DamageOld=damage;
damage=function(att,def,type,power){const result=v32DamageOld(att,def,type,power);if(!result||result.hit<=0)return result;
 let mod=v32Nature(att).atk/v32Nature(def).def;
 const currentWeather=battle?.v32Weather;const w=V32_WEATHERS[currentWeather];
 if(w){mod*=w.bonus[type]||1;mod*=w.penalty[type]||1;}
 result.hit=Math.max(1,Math.round(result.hit*mod));return result;
};
const v32StartOld=startBattle;
startBattle=function(enemies,label,wild){v32Ensure();v32StartOld(enemies,label,wild);if(!battle?.active)return;
 if(!battle.v32Weather){const g=save.gym;const choices=wild?['clear','rain','sun','sand','clear','clear']:g===1?['rain','rain','clear']:g===6?['sun','sun','clear']:g===7?['sand','sand','clear']:g===2?['storm','storm','clear']:['clear','rain','sun','sand','clear'];battle.v32Weather=choices[Math.floor(Math.random()*choices.length)];}
 v32ShowWeather();
};
function v32ShowWeather(){if(!battle?.active)return;const arena=$('arenaPro');if(!arena)return;
 const w=V32_WEATHERS[battle.v32Weather]||V32_WEATHERS.clear;let chip=arena.querySelector('#v32Weather');if(chip)chip.remove();chip=document.createElement('div');chip.id='v32Weather';chip.className='v32Weather';chip.textContent=w.icon+' '+w.name;arena.append(chip);
}
const v32RenderBattleOld=renderBattle;
renderBattle=function(){v32RenderBattleOld();v32ShowWeather();};
// Captura: o núcleo da V29 já utiliza tipos de Pokébolas e animação; o cálculo incorpora status no HTML montado.
const v32ShopOld=showShop;
showShop=function(){v32Ensure();v32ShopOld();if(battle?.active)return;
 const root=$('modal');if(!root)return;
 const holder=document.createElement('div');holder.className='v31Pane';holder.id='v32TMs';
 holder.innerHTML=`<h3>💿 TMs — Golpes para aprender</h3><p class="v32Info">TMs compradas ficam disponíveis para Pokémon compatíveis e podem ser equipadas em 🎒 Equipe → Trocar golpes.</p><div class="shopList">${Object.values(V32_TM).map(tm=>`<div class="shopItem"><div class="shopEmoji">${tm.icon}</div><div class="shopInfo"><strong>${tm.name}</strong><small>${TYPE_NAME[tm.type]||tm.type} · compatibilidade por tipo</small></div><button type="button" class="btn tiny ${save.v32.tms.includes(tm.type)?'ghost':'gold'}" data-v32-tm="${tm.type}" ${save.v32.tms.includes(tm.type)||save.coins<tm.price?'disabled':''}>${save.v32.tms.includes(tm.type)?'✓ COMPRADA':'🪙 '+tm.price}</button></div>`).join('')}</div>`;
 const back=$('shopBack');if(back)back.before(holder);else root.append(holder);
 root.querySelectorAll('[data-v32-tm]').forEach(b=>b.onclick=()=>{const tm=V32_TM[b.dataset.v32Tm];if(!tm||save.coins<tm.price||save.v32.tms.includes(tm.type))return;
  save.coins-=tm.price;save.v32.tms.push(tm.type);persist();render();showShop();});
};
const v32RenderOld=render;
render=function(){v32Ensure();v32RenderOld();if(!save.starter||battle?.active)return;
 const root=$('main'),area=root?.querySelector('.gymHero')||root?.querySelector('.v27League')||root?.querySelector('.panel');if(!area||$('v32Menu'))return;
 const tools=document.createElement('div');tools.id='v32Menu';tools.className='v32Actions';
 tools.innerHTML='<button class="btn ghost" type="button" id="v32TowerMenu">♾️ Torre de Desafios</button>'+(save.gym>=13?'<button class="btn ghost" type="button" id="v32LeagueMenu">🏆 Revanche da Liga</button>':'')+'<button class="btn ghost" type="button" id="v32SoundMenu">🎵 Áudio</button>';
 area.insertAdjacentElement('afterend',tools);
 $('v32TowerMenu').onclick=v32TowerMenu;
 if($('v32LeagueMenu'))$('v32LeagueMenu').onclick=v32LeagueMenu;
 $('v32SoundMenu').onclick=v32SoundMenu;
 const tag=$('v30VersionTag');if(tag)tag.textContent='V32 · 2D';
};
function v32TowerMenu(){if(battle?.active)return;v32Ensure();const info=save.v32.tower;
 overlay(`<div class="v32TowerCard"><div class="overline">♾️ DESAFIO EXTRA · SEM ALTERAR OS GINÁSIOS</div><h2>Torre Infinita</h2><p class="desc">Enfrente adversários cada vez mais fortes. A cada 10 andares, você luta contra um chefe e recebe moedas extras. Se perder, recomeça no primeiro andar, sem perder Pokémon capturados.</p><div class="v32Banner">Andar atual <b>${info.floor}</b> · Recorde <b>${info.best}</b> · Vitórias <b>${info.wins||0}</b></div><div class="v32Actions"><button class="btn gold" id="v32TowerFight">⚔️ Entrar no andar ${info.floor}</button><button class="btn ghost" id="v32TowerBack">Voltar</button></div></div>`);
 $('v32TowerBack').onclick=()=>{close();render()};$('v32TowerFight').onclick=()=>v32StartTower();
}
function v32StartTower(){if(!requireTeam())return showItems();const floor=save.v32.tower.floor;const level=Math.max(5,Math.min(100,8+floor*2));
 const count=floor%10===0?3:Math.min(3,1+Math.floor(floor/5));const ids=[];
 for(let i=0;i<count;i++)ids.push(1+((floor*31+i*43+Math.floor(Math.random()*151))%151));
 const enemies=ids.map(id=>mon(id,level));startBattle(enemies,`♾️ TORRE · ANDAR ${floor}${floor%10===0?' · CHEFE':''}`,false);
 if(battle?.active){battle.v32Mode='tower';battle.v32Floor=floor;}
}
function v32LeagueMenu(){if(battle?.active)return;const p=save.v32.league;const stage=Math.max(0,Math.min(4,p.stage));const names=['Lorelei','Bruno','Agatha','Lance','Blue'];
 overlay(`<div class="v32TowerCard"><div class="overline">🏆 REVANCHE DE KANTO · TORNEIO COMPLETO</div><h2>Liga Pokémon — Revanche</h2><p class="desc">Enfrente novamente Lorelei, Bruno, Agatha, Lance e o campeão Blue em sequência, com níveis mais altos. A campanha original e os oito ginásios ficam preservados.</p><div class="v32Banner">Próximo: <b>${names[stage]}</b> (${stage+1}/5) · Campeonatos repetidos: <b>${p.championships||0}</b></div><div class="v32Actions"><button class="btn gold" id="v32LeagueFight">⚔️ Enfrentar ${names[stage]}</button><button class="btn ghost" id="v32LeagueBack">Voltar</button></div></div>`);
 $('v32LeagueBack').onclick=()=>{close();render()};$('v32LeagueFight').onclick=()=>v32StartLeague();
}
function v32StartLeague(){if(!requireTeam())return showItems();if(save.gym<13)return;
 const stage=Math.max(0,Math.min(4,save.v32.league.stage));const team=teamOfTrainer(8+stage,6);const foes=team.map((m,i)=>mon(m.id,Math.min(100,m.level+8+Math.min(24,(save.v32.league.championships||0)*3))));
 startBattle(foes,`🏆 REVANCHE DA LIGA · ${['LORELEI','BRUNO','AGATHA','LANCE','BLUE'][stage]}`,false);
 if(battle?.active){battle.v32Mode='league';battle.v32LeagueStage=stage;}
}
const v32FinishOld=finishBattle;
finishBattle=function(win){
 if(!battle?.active||!['tower','league'].includes(battle.v32Mode))return v32FinishOld(win);
 const mode=battle.v32Mode,stage=mode==='tower'?battle.v32Floor:battle.v32LeagueStage;
 battle.active=false;stopTimers();battle=null;
 if(mode==='tower'){
  const info=save.v32.tower;
  if(win){info.best=Math.max(info.best,stage);info.wins=(info.wins||0)+1;info.floor=Math.min(999,stage+1);
   const money=20+Math.min(120,stage*4)+(stage%10===0?200:0);save.coins+=money;save.wins++;
   for(const m of save.team){if(m.hp>0){awardXP(m,24+stage);m.hp=Math.min(m.maxHp,m.hp+Math.ceil(m.maxHp*.17));}}
   if(stage%10===0)save.superPotions=(save.superPotions||0)+1;
   persist();resultScreen('♾️ ANDAR '+stage+' CONCLUÍDO!','+ moedas e experiência! Próximo andar: '+info.floor+(stage%10===0?' · Chefe derrotado! Superpoção recebida.':''),true,false);
  }else{info.floor=1;save.losses++;for(const m of save.team)m.hp=Math.max(1,Math.ceil(m.maxHp*.55));persist();resultScreen('♾️ TORRE · DESAFIO ENCERRADO','Seu recorde foi mantido. Reinicie no primeiro andar quando quiser.',false,false);}
 }else{
  const info=save.v32.league;if(win){save.wins++;save.coins+=120+(stage*50);for(const m of save.team){if(m.hp>0){awardXP(m,45+stage*10);m.hp=Math.min(m.maxHp,m.hp+Math.ceil(m.maxHp*.22));}}
   info.wins=(info.wins||0)+1;info.stage=(stage+1)%5;if(stage===4){info.championships=(info.championships||0)+1;save.coins+=400;}persist();
   resultScreen(stage===4?'🏆 CAMPEÃO NOVAMENTE!':'🏆 REVANCHE VENCIDA','Vitória contra '+['Lorelei','Bruno','Agatha','Lance','Blue'][stage]+'. '+(stage===4?'Torneio concluído! Bônus de 400 moedas.':'Próximo desafiante desbloqueado.'),true,false);
  }else{info.stage=0;save.losses++;for(const m of save.team)m.hp=Math.max(1,Math.ceil(m.maxHp*.5));persist();resultScreen('💔 REVANCHE ENCERRADA','A sequência da Liga volta para Lorelei; sua campanha original permanece salva.',false,false);}
 }
};
// Áudio local gerado com WebAudio: música curta em loop só quando usuário habilitar, sem downloads externos.
let v32AudioTimer=null,v32AudioStep=0;
function v32StopMusic(){if(v32AudioTimer){clearInterval(v32AudioTimer);v32AudioTimer=null;}}
function v32Note(frequency,duration=.13){if(!soundEnabled||save.v32.volume<=0||document.hidden)return;
 try{audioCtx=audioCtx||new(window.AudioContext||window.webkitAudioContext)();if(audioCtx.state==='suspended')audioCtx.resume();
  const now=audioCtx.currentTime,osc=audioCtx.createOscillator(),gain=audioCtx.createGain();osc.type='triangle';
  osc.frequency.setValueAtTime(frequency,now);gain.gain.setValueAtTime(.0001,now);gain.gain.linearRampToValueAtTime(save.v32.volume*.00028,now+.015);gain.gain.exponentialRampToValueAtTime(.0001,now+duration);
  osc.connect(gain).connect(audioCtx.destination);osc.start(now);osc.stop(now+duration+.01);
 }catch(e){console.warn('V32 som indisponível:',e);v32StopMusic();}
}
function v32RefreshAudio(){v32StopMusic();if(!soundEnabled||!save.v32.volume)return;
 const melody=[329.6,392,440,392,293.7,349.2,392,293.7,329.6,392,523.25,493.9,440,392,329.6,293.7];
 v32AudioTimer=setInterval(()=>{v32Note(melody[v32AudioStep++%melody.length],.19)},500);
}
document.addEventListener('visibilitychange',()=>{if(document.hidden)v32StopMusic();else if(soundEnabled)v32RefreshAudio()});
function v32SoundMenu(){v32Ensure();if(battle?.active)return;
 overlay(`<div class="sectionhead"><h2>🎵 Áudio da Torre</h2><button class="btn tiny ghost" id="v32SoundClose">✕</button></div><p class="desc">Trilha sintetizada e efeitos sonoros diretamente no navegador. Controle o volume ou desligue sem afetar o combate.</p><div class="v32SoundControl"><button class="btn ${soundEnabled?'gold':'ghost'}" id="v32SoundToggle">${soundEnabled?'🔊 Desligar':'🔇 Ligar'} áudio</button><label for="v32SoundRange">Volume <b id="v32SoundLevel">${save.v32.volume}%</b></label><input type="range" min="0" max="100" id="v32SoundRange" value="${save.v32.volume}"></div><button class="btn ghost wide" id="v32SoundReturn">Voltar</button>`);
 $('v32SoundClose').onclick=close;$('v32SoundReturn').onclick=close;
 $('v32SoundToggle').onclick=()=>{soundEnabled=!soundEnabled;persist();v32RefreshAudio();v32SoundMenu();};
 $('v32SoundRange').oninput=e=>{save.v32.volume=Number(e.target.value);$('v32SoundLevel').textContent=save.v32.volume+'%';persist();v32RefreshAudio();};
}
// Personalidade Veloz: deslocamento um pouco mais rápido, sem afetar a mira nem teleporte.
const v32UpdateOld=BattleEngine.prototype.update;
BattleEngine.prototype.update=function(dt,now){
 const can=!!(battle?.active&&!battle.paused&&this.player&&current()?.v32Nature==='veloz');
 const x=this.player?.x||0,y=this.player?.y||0;
 const result=v32UpdateOld.call(this,dt,now);
 if(can&&battle?.active&&!battle.paused&&this.player){
  this.player.x+=(this.player.x-x)*.07;this.player.y+=(this.player.y-y)*.07;
  if(typeof this.collideRocks==='function')this.collideRocks(this.player);
  if(typeof this.bounds==='function')this.bounds(this.player);
 }
 return result;
};
const v32BattleSoundOld=BattleEngine.prototype.useMove;
BattleEngine.prototype.useMove=function(i){
 const s=battle?.active?skillSet(current())[i]:null;
 const now=performance.now(),can=!!(s&&battle&&!battle.paused&&cooldowns[i]<=now&&battle.energy>=s.cost);
 const result=v32BattleSoundOld.call(this,i);
 if(can&&soundEnabled&&s){const sounds={electric:659,psychic:520,water:392,fire:261.6,ground:196,rock:220,ice:784,poison:293.7,grass:349.2};v32Note(sounds[s.type]||440,.09);}
 return result;
};
window.PokemonTorreV32Diagnostics=()=>({version:V32_VERSION,tms:[...save.v32.tms],tower:{...save.v32.tower},league:{...save.v32.league},team:save.team.map(m=>({id:m.id,slots:skillSet(m).map(s=>s.name),nature:v32Nature(m).name})),weather:battle?.v32Weather||'none',musicOn:!!v32AudioTimer,shinyRange:[.01,.03],homeCooldown:skillSet(save.team[0]||mon(25,5)).filter(x=>x.kind==='homing').map(x=>x.cd)});
})();
/* FIM POKEMON TORRE V32 */
