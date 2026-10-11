/* POKEMON TORRE V34.2 — líderes de Kanto FRLG, golpes de status reais e efeitos vetoriais 2D */
(function(){
'use strict';
const V342='34.2';
// FireRed/LeafGreen: ordem e níveis fixos. A progressão de 6–13 treinadores permanece.
const KANTO_LEADERS_FRLG=[
 {name:'Brock',type:'rock',team:[[74,12],[95,14]]},
 {name:'Misty',type:'water',team:[[120,18],[121,21]]},
 {name:'Lt. Surge',type:'electric',team:[[100,21],[25,18],[26,24]]},
 {name:'Erika',type:'grass',team:[[71,29],[114,24],[45,29]]},
 {name:'Koga',type:'poison',team:[[109,37],[89,39],[109,37],[110,43]]},
 {name:'Sabrina',type:'psychic',team:[[64,38],[122,37],[49,38],[65,43]]},
 {name:'Blaine',type:'fire',team:[[58,42],[77,40],[78,42],[59,47]]},
 {name:'Giovanni',type:'ground',team:[[111,45],[51,42],[31,44],[34,45],[111,50]]}
];
for(let g=0;g<8;g++){
 const spec=KANTO_LEADERS_FRLG[g],gym=GYMS[g];
 Object.assign(gym,{leader:spec.name,type:spec.type,boss:spec.team.map(t=>t[0]),max:Math.max(...spec.team.map(t=>t[1]))});
 if(typeof V28_KANTO_LEADERS!=='undefined'&&V28_KANTO_LEADERS[g]){
  V28_KANTO_LEADERS[g].ids=spec.team.map(p=>[...p]);
  V28_KANTO_LEADERS[g].leader=spec.name;
 }
}
function isGymLeaderLabel(label){return /(?:^|\s)(?:👑\s*)?LÍDER\b/i.test(label||'')&&!/RIVAL|ROCKET|LIGA|REVANCHE|LABORATÓRIO/i.test(label||'');}
function gymRoster(g){return KANTO_LEADERS_FRLG[g].team.map(([id,level])=>mon(id,level));}
const v342PreviousTeam=teamOfTrainer;
teamOfTrainer=function(g,stage){
 if(Number.isInteger(g)&&g>=0&&g<8&&stage===v29TrainerCount(g))return gymRoster(g);
 return v342PreviousTeam(g,stage);
};
// A proteção extra também corrige desafios iniciados por um menu que ignorou teamOfTrainer.
const v342Start=startBattle;
startBattle=function(enemies,label,wild){
 const g=save.gym;
 if(!wild&&g>=0&&g<8&&isGymLeaderLabel(label)&&save.stage===v29TrainerCount(g)){
  enemies=gymRoster(g);
 }
 return v342Start(enemies,label,wild);
};
// Quando duas instâncias da mesma espécie aparecem no time, preserve ambas e os níveis individuais.
// Correção crítica: V30 usava os números globais 8 e 11 para Rival/Rocket,
// mas eles são exatamente os estágios finais de Surge e Sabrina.
// A condição de LÍDER sempre tem precedência.
const v342LaunchPrevious=launchTrainer;
launchTrainer=function(){
 const g=save.gym,stage=save.stage;
 if(g>=0&&g<8&&stage===v29TrainerCount(g)){
  if(!requireTeam()){showItems();return;}
  return startBattle(gymRoster(g),'👑 LÍDER '+KANTO_LEADERS_FRLG[g].name,false);
 }
 return v342LaunchPrevious();
};
const v342Next=nextFoe;
nextFoe=function(){const b=battle,leader=b?.v342GymLeader;if(!b?.active||!leader)return v342Next();
 return v342Next();
};
const v342StartFlag=startBattle;
startBattle=function(enemies,label,wild){const result=v342StartFlag(enemies,label,wild);
 if(battle?.active&&!wild&&isGymLeaderLabel(label)&&save.gym<8&&save.stage===v29TrainerCount(save.gym)){
  battle.v342GymLeader=save.gym;
  const box=document.querySelector('.battleHeading');
  if(box&&!box.querySelector('#v342LeaderRoster')){
   const roster=document.createElement('div');roster.id='v342LeaderRoster';roster.className='v342LeaderRoster';
   roster.textContent='EQUIPE OFICIAL · '+KANTO_LEADERS_FRLG[save.gym].team.map(([id,l])=>D[id].name+' Nv.'+l).join(' · ');
   box.append(roster);
  }
 }
 return result;
};
// Catálogo estendido somente para tipos/espécies compatíveis, mantendo os golpes escolhidos.
// [tipo, nivel, custo, recarga (ms), categoria, intensidade]
const STATUS_DEFS={
 'Growl':['normal',6,16,3400,'atkdown',.15], 'Tail Whip':['normal',7,17,3600,'defdown',.16],
 'Leer':['normal',9,18,3800,'defdown',.17], 'Sand Attack':['ground',9,20,4200,'accuracydown',.16],
 'Screech':['normal',27,29,6400,'defdown',.31], 'Scary Face':['normal',19,22,5000,'speeddown',.23],
 'Double Team':['normal',18,25,7200,'evasion',.0], 'Agility':['psychic',16,24,6600,'speedup',.26],
 'Swords Dance':['normal',27,30,7500,'atkup',.34], 'Calm Mind':['psychic',29,28,7500,'mindup',.18],
 'Nasty Plot':['dark',35,33,8800,'atkup',.36], 'Bulk Up':['fighting',30,30,7400,'bulk',.20],
 'Harden':['normal',7,17,4000,'defup',.17], 'Iron Defense':['steel',30,30,7500,'defup',.35],
 'Amnesia':['psychic',26,26,6900,'defup',.23], 'Withdraw':['water',10,19,4100,'defup',.19],
 'Defense Curl':['normal',9,18,4200,'defup',.19], 'Reflect':['psychic',20,26,7500,'reflect',.20],
 'Light Screen':['psychic',21,26,7500,'reflect',.18], 'Protect':['normal',17,30,10000,'protect',0],
 'Safeguard':['normal',26,28,8800,'cleanse',0], 'Haze':['ice',31,26,8100,'haze',0],
 'Thunder Wave':['electric',16,26,7700,'paralysis',0], 'Stun Spore':['grass',15,25,7400,'paralysis',0],
 'Poison Powder':['poison',14,25,8000,'poison',0], 'Toxic':['poison',33,34,10000,'poison',0],
 'Will-O-Wisp':['fire',28,28,8600,'burn',0], 'Confuse Ray':['ghost',22,28,7600,'confusion',0],
 'Supersonic':['normal',21,25,7000,'confusion',0], 'Hypnosis':['psychic',27,29,9200,'sleep',0],
 'Sleep Powder':['grass',29,30,9700,'sleep',0], 'Spore':['grass',34,34,10100,'sleep',0],
 'Leech Seed':['grass',15,27,8600,'seed',0], 'Recover':['psychic',24,36,9000,'heal',.32],
 'Roost':['flying',30,35,9200,'heal',.32], 'Synthesis':['grass',25,35,9400,'heal',.34],
 'Moonlight':['fairy',30,35,9400,'heal',.34], 'Rest':['psychic',32,40,11000,'heal',.45],
 'Rain Dance':['water',24,25,8700,'rain',0], 'Sunny Day':['fire',24,25,8700,'sun',0],
 'Sandstorm':['rock',24,25,8700,'sand',0], 'Charge':['electric',21,22,6600,'atkup',.19],
 'Growth':['grass',19,24,5900,'atkup',.19], 'Minimize':['normal',28,26,7700,'evasion',0]
};
const STATUS_BY_TYPE={
 normal:['Growl','Tail Whip','Leer','Double Team','Protect','Rest'],
 electric:['Thunder Wave','Charge','Agility','Light Screen'],water:['Withdraw','Rain Dance','Haze','Protect'],
 fire:['Will-O-Wisp','Sunny Day','Smokescreen','Protect'],grass:['Growth','Leech Seed','Stun Spore','Sleep Powder','Synthesis'],
 poison:['Poison Powder','Toxic','Screech'],psychic:['Calm Mind','Reflect','Light Screen','Recover','Hypnosis'],
 ground:['Sand Attack','Sandstorm','Scary Face'],rock:['Harden','Defense Curl','Sandstorm','Iron Defense'],
 ghost:['Confuse Ray','Hypnosis','Will-O-Wisp'],fighting:['Bulk Up','Leer','Swords Dance'],
 bug:['String Shot','Supersonic','Harden'],ice:['Haze','Amnesia','Light Screen'],
 flying:['Agility','Roost','Double Team'],dark:['Nasty Plot','Scary Face','Taunt'],
 steel:['Iron Defense','Light Screen'],fairy:['Moonlight','Safeguard'],dragon:['Agility','Safeguard','Dragon Dance']
};
// Extras escolhidos por espécie; espécies não recebem golpes de status sem compatibilidade.
const STATUS_SPECIES={
 3:['Sleep Powder','Leech Seed','Synthesis'],6:['Dragon Dance','Roost','Smokescreen'],
 12:['Sleep Powder','Stun Spore'],25:['Thunder Wave','Agility','Double Team'],26:['Thunder Wave','Light Screen'],
 31:['Tail Whip','Toxic'],34:['Leer','Toxic'],38:['Confuse Ray','Will-O-Wisp'],
 45:['Sleep Powder','Petal Dance'],49:['Sleep Powder','Supersonic'],59:['Agility','Roar'],
 65:['Reflect','Recover','Calm Mind'],80:['Amnesia','Rest'],94:['Hypnosis','Confuse Ray','Will-O-Wisp'],
 103:['Sleep Powder','Leech Seed'],110:['Toxic','Haze'],121:['Recover','Light Screen'],
 130:['Dragon Dance','Leer'],143:['Rest','Amnesia'],149:['Dragon Dance','Roost'],
 150:['Recover','Calm Mind','Reflect'],151:['Recover','Transform','Safeguard']
};
Object.assign(STATUS_DEFS,{
 'Smokescreen':['normal',10,20,5100,'accuracydown',.20],
 'String Shot':['bug',8,18,4500,'speeddown',.22],
 'Dragon Dance':['dragon',34,30,8000,'dance',.20],
 'Roar':['normal',20,20,5400,'atkdown',.16],
 'Taunt':['dark',20,22,6200,'accuracydown',.16]
});
const v342Catalog=v32Catalogue;
v32Catalogue=function(m){const base=v342Catalog(m);if(!m||!D[m.id])return base;
 const p=D[m.id],names=new Set([...(STATUS_BY_TYPE[p.type]||[]),...(STATUS_BY_TYPE[p.type2]||[]),...(STATUS_SPECIES[m.id]||[])]);
 const existing=new Set(base.map(x=>x.key));
 for(const name of names){const entry=STATUS_DEFS[name];if(!entry)continue;
  const [type,level,cost,cd]=entry,move={name,type,kind:'status',cat:'status',power:0,cost,cd,icon:'✧'};
  const key=v32MoveKey(move);if(existing.has(key))continue;
  base.push({key,move,level,tm:false,available:m.level>=level});existing.add(key);
 }
 return base;
};
// Estatísticas já existentes no motor V25 — status agora pode estar em qualquer posição 1–4.
const v342OldUse=BattleEngine.prototype.useMove;
BattleEngine.prototype.useMove=function(i){
 const b=battle,m=b?.active?current():null,s=m&&skillSet(m)?.[i];
 const cfg=s&&STATUS_DEFS[s.name];
 if(!cfg||!s||s.kind!=='status')return v342OldUse.call(this,i);
 if(!Number.isInteger(i)||i<0||i>3||!b.active||b.paused||!this.v25?.stats||m.hp<=0)return;
 const now=performance.now();if((cooldowns[i]||0)>now||b.energy<s.cost)return;
 const action=cfg[4],delta=cfg[5];const self=this.v25.stats.player,enemy=this.v25.stats.enemy;
 const enemyTypes=[D[b.foe.id]?.type,D[b.foe.id]?.type2];
 if(action==='poison'&&enemyTypes.some(t=>['poison','steel'].includes(t))){log('Não afeta o adversário!');this.v25Popup(this.enemy.x,this.enemy.y-this.h*.27,'NÃO AFETA','#ffddd5');return;}
 if(action==='paralysis'&&enemyTypes.includes('ground')){log('Não afeta o adversário terrestre!');return;}
 if(action==='sleep'&&enemyTypes.includes('grass')&&/Powder|Spore/.test(s.name)){log('Pó não afeta Pokémon de Planta!');return;}
 b.energy-=s.cost;cooldowns[i]=now+Math.max(1000,s.cd);this.attackActs.player=this.time+.4;
 const buff=(st,field,amount)=>st[field]=Math.min(1.9,Math.max(.45,(st[field]||1)+amount));
 const cond=(name,duration)=>{if(!enemy.conditions.includes(name))enemy.conditions.push(name);this.v342CondTimers||={};this.v342CondTimers[name]=now+duration;};
 let target=this.enemy,label='',tint='#e4d2ff';
 switch(action){
 case 'atkdown':buff(enemy,'atk',-delta);label='ATK ↓';break;
 case 'defdown':buff(enemy,'def',-delta);label='DEF ↓';break;
 case 'speeddown':buff(enemy,'speed',-delta);label='VEL ↓';break;
 case 'accuracydown':buff(enemy,'accuracy',-delta);label='PRECISÃO ↓';break;
 case 'atkup':buff(self,'atk',delta);label='ATK ↑';target=this.player;break;
 case 'defup':buff(self,'def',delta);label='DEF ↑';target=this.player;break;
 case 'speedup':buff(self,'speed',delta);label='VEL ↑';target=this.player;break;
 case 'mindup':buff(self,'atk',delta);buff(self,'def',delta*.5);label='ATK/DEF ↑';target=this.player;break;
 case 'bulk':buff(self,'atk',delta);buff(self,'def',delta);label='ATK/DEF ↑';target=this.player;break;
 case 'dance':buff(self,'atk',delta);buff(self,'speed',delta);label='ATK/VEL ↑';target=this.player;break;
 case 'reflect':buff(self,'def',delta);this.player.guard=Math.max(this.player.guard,1.7);target=this.player;label='BARREIRA ↑';break;
 case 'protect':this.player.guard=Math.max(this.player.guard,2.0);this.player.inv=Math.max(this.player.inv,.48);target=this.player;label='PROTEGIDO';break;
 case 'cleanse':self.conditions.length=0;this.player.guard=Math.max(this.player.guard,1.4);target=this.player;label='PROTEÇÃO';break;
 case 'haze':for(const st of [self,enemy])st.atk=st.def=st.speed=st.accuracy=1;label='ATRIBUTOS RESETADOS';break;
 case 'paralysis':cond('paralysis',6500);label='PARALISADO';break;
 case 'poison':cond('poison',11500);label='ENVENENADO';break;
 case 'confusion':cond('confusion',6500);label='CONFUSO';break;
 case 'sleep':cond('sleep',2800);this.enemyAttackCD=Math.max(this.enemyAttackCD,2.8);label='DORMINDO';break;
 case 'burn':cond('burn',9500);label='QUEIMADO';break;
 case 'seed':cond('seed',10500);label='SEMENTES';break;
 case 'heal':{const heal=Math.max(1,Math.round(m.maxHp*delta));m.hp=Math.min(m.maxHp,m.hp+heal);target=this.player;label='PV +'+heal;break;}
 case 'evasion':this.player.inv=Math.max(this.player.inv,1.15);target=this.player;label='ESQUIVA ↑';break;
 case 'rain':b.v32Weather='rain';label='CHUVA';target=this.player;break;
 case 'sun':b.v32Weather='sun';label='SOL FORTE';target=this.player;break;
 case 'sand':b.v32Weather='sand';label='TEMPESTADE';target=this.player;break;
 default:b.energy+=s.cost;cooldowns[i]=0;return v342OldUse.call(this,i);
 }
 if(typeof this.v25Popup==='function')this.v25Popup(target.x,target.y-this.h*.32,label,tint);
 this.v342StatusFx||=[];this.v342StatusFx.push({name:s.name,x:target===this.player?'player':'enemy',start:now,end:now+620,color:TYPE_COLOR[s.type]||'#d6f3ff'});
 if(this.v342StatusFx.length>10)this.v342StatusFx.shift();
 log(D[m.id].name+' usou '+s.name+'! '+label);
 try{v25StatusChip(target===this.player?'ally':'enemy',label)}catch(_){}
};
const v342PrevUpdate=BattleEngine.prototype.update;
BattleEngine.prototype.update=function(dt,now){
 const res=v342PrevUpdate.call(this,dt,now);if(!battle?.active||!this.v25)return res;
 const stats=this.v25.stats.enemy,timers=this.v342CondTimers||{};
 for(const [condition,end] of Object.entries(timers))if(now>=end){stats.conditions=stats.conditions.filter(x=>x!==condition);delete timers[condition];}
 if(stats.conditions.includes('sleep'))this.enemyAttackCD=Math.max(this.enemyAttackCD,Math.min(.26,(timers.sleep-now)/1000));
 if(stats.conditions.includes('burn')||stats.conditions.includes('seed')){
  this.v342DamageTicker=(this.v342DamageTicker||0)+dt;
  if(this.v342DamageTicker>=2.0){this.v342DamageTicker=0;const foeMon=foe();if(foeMon){
   const burn=stats.conditions.includes('burn'),seed=stats.conditions.includes('seed');
   const amount=Math.max(1,Math.round(foeMon.maxHp*(burn?.025:.019)));
   foeMon.hp=Math.max(1,foeMon.hp-amount);
   if(seed&&current())current().hp=Math.min(current().maxHp,current().hp+amount);
   this.v25Popup(this.enemy.x,this.enemy.y-this.h*.22,(burn?'QUEIMADURA':'DRENADO')+' -'+amount,burn?'#ffb894':'#a6e8a1');
  }}
 }
 return res;
};
// RESET de efeitos ao trocar o inimigo, para que veneno/sono não passem a outro Pokémon.
const v342OldNewEnemy=BattleEngine.prototype.newEnemy;
BattleEngine.prototype.newEnemy=function(){
 this.v342CondTimers={};this.v342DamageTicker=0;
 const result=v342OldNewEnemy.call(this);
 if(this.v25?.stats?.enemy){this.v25.stats.enemy.conditions=[];this.v25.stats.enemy.ticker=0;}
 return result;
};
// Raios não são esferas: um caminho poligonal com ramificações no Canvas existente.
function v342Bolt(ctx,x1,y1,x2,y2,segments,seed,alpha=1,branches=true){
 const dx=x2-x1,dy=y2-y1,length=Math.hypot(dx,dy)||1,nx=-dy/length,ny=dx/length;
 if(length<3)return;
 const pts=[{x:x1,y:y1}];
 const wiggle=Math.min(24,Math.max(7,length*.12));
 for(let i=1;i<segments;i++){
  const t=i/segments,w=Math.sin(t*Math.PI)*wiggle;
  const r=Math.sin(seed*7.23+i*31.17)*Math.cos(seed*.71+i*17.23);
  pts.push({x:x1+dx*t+nx*r*w,y:y1+dy*t+ny*r*w});
 }pts.push({x:x2,y:y2});
 const trace=()=>{ctx.beginPath();ctx.moveTo(x1,y1);for(const p of pts.slice(1))ctx.lineTo(p.x,p.y);ctx.stroke();};
 ctx.save();ctx.globalAlpha=alpha;ctx.lineJoin='miter';ctx.lineCap='round';
 ctx.shadowColor='#79d8ff';ctx.shadowBlur=16;ctx.strokeStyle='#3e9fff';ctx.lineWidth=7;trace();
 ctx.shadowBlur=9;ctx.strokeStyle='#a8e6ff';ctx.lineWidth=3.5;trace();
 ctx.shadowBlur=2;ctx.strokeStyle='#ffffff';ctx.lineWidth=1.35;trace();
 if(branches){ctx.strokeStyle='#9ce8ff';ctx.shadowBlur=6;ctx.lineWidth=1.35;
  for(let i=2;i<pts.length-1;i+=Math.max(2,Math.floor(segments/4))){const p=pts[i];const side=i%2?1:-1,bl=length*.13;
   ctx.beginPath();ctx.moveTo(p.x,p.y);ctx.lineTo(p.x+nx*bl*side+dx*.05,p.y+ny*bl*side+dy*.05);
   ctx.lineTo(p.x+nx*bl*1.5*side+dx*.08,p.y+ny*bl*1.5*side+dy*.08);ctx.stroke();
  }
 }
 ctx.restore();
}
const v342Projectile=BattleEngine.prototype.drawProjectile;
BattleEngine.prototype.drawProjectile=function(p){
 if(p.type!=='electric')return v342Projectile.call(this,p);
 // Substitui integralmente o círculo elétrico legado pelo raio ramificado.
 const tail=p.tail?.[0]||{x:p.x-p.vx*.045,y:p.y-p.vy*.045};
 v342Bolt(this.ctx,tail.x,tail.y,p.x,p.y,8,this.time*10+(p.x+p.y)*.019,.95,true);
};
const v342Draw=BattleEngine.prototype.draw;
BattleEngine.prototype.draw=function(now){
 v342Draw.call(this,now);if(!battle?.active)return;
 const ctx=this.ctx,b=battle;const low=this.fps&&this.fps<28;
 ctx.save();
 for(const a of this.v342Lightning||[]){const elapsed=now-a.start;if(elapsed>=a.duration)continue;
  const fade=Math.max(0,1-elapsed/a.duration);
  const start=a.from==='enemy'?this.enemy:this.player,target=a.from==='enemy'?this.player:this.enemy;
  v342Bolt(ctx,start.x,start.y-this.h*.13,target.x,target.y-this.h*.12,low?8:12,now*.025+a.seed,fade*.89,!low);
 }
 // Projéteis teleguiados elétricos desenhados como arcos no espaço, não como bolas.
 for(const p of this.v30Shots||[]){if(p.type!=='electric')continue;
  const previous=p.trail?.[0]||{x:p.x-p.vx*.04,y:p.y-p.vy*.04};
  v342Bolt(ctx,previous.x,previous.y,p.x,p.y,7,now*.02+p.x*.01,.95,!low);
 }
 for(const a of this.v342StatusFx||[]){const f=(a.end-now)/(a.end-a.start);if(f<=0)continue;
  const target=a.x==='player'?this.player:this.enemy,rad=this.h*.065*(1.3-f);
  ctx.globalAlpha=.75*f;ctx.strokeStyle=a.color;ctx.shadowColor=a.color;ctx.shadowBlur=6;
  ctx.lineWidth=2;ctx.beginPath();ctx.ellipse(target.x,target.y-this.h*.12,rad,rad*.62,-.2,Math.PI*.18,Math.PI*1.82);ctx.stroke();
  for(let k=0;k<(low?4:9);k++){
   const angle=(k/(low?4:9))*Math.PI*2+now*.002;
   const px=target.x+Math.cos(angle)*rad,py=target.y-this.h*.12+Math.sin(angle)*rad*.56;
   ctx.beginPath();ctx.moveTo(px-2,py-2);ctx.lineTo(px+2,py+2);ctx.moveTo(px+2,py-2);ctx.lineTo(px-2,py+2);ctx.stroke();
  }
 }
 ctx.restore();
 this.v342Lightning=(this.v342Lightning||[]).filter(x=>now-x.start<x.duration);
 this.v342StatusFx=(this.v342StatusFx||[]).filter(x=>now<x.end);
};
const v342VisualUse=BattleEngine.prototype.useMove;
BattleEngine.prototype.useMove=function(i){
 const b=battle,m=b?.active?current():null,s=m?skillSet(m)[i]:null,now=performance.now(),before=cooldowns[i];
 const result=v342VisualUse.call(this,i);
 if(s?.type==='electric'&&s.power>0&&b===battle&&b?.active&&cooldowns[i]>now&&cooldowns[i]!==before){
  this.v342Lightning||=[];
  this.v342Lightning.push({from:'player',start:now,duration:s.kind==='beam'?360:225,seed:Math.random()*80});
  if(this.v342Lightning.length>6)this.v342Lightning.shift();
 }
 return result;
};
const v342VisualHit=BattleEngine.prototype.hitTarget;
BattleEngine.prototype.hitTarget=function(side,type,power){
 const result=v342VisualHit.call(this,side,type,power);
 if(type==='electric'&&battle?.active){this.v342Lightning||=[];this.v342Lightning.push({from:side==='enemy'?'player':'enemy',start:performance.now(),duration:160,seed:Math.random()*100});}
 return result;
};
const v342Css=document.createElement('style');v342Css.id='v342Css';v342Css.textContent=`
.v342LeaderRoster{flex:1 0 100%;font-size:10px;line-height:1.5;color:#dbf5fe;padding:6px 9px;border-left:2px solid #75bff4;background:#143047aa;border-radius:6px;margin-top:5px;max-width:100%}
.battleHeading{flex-wrap:wrap}
.skillV8.kind-status .skillAura{opacity:.2}
.skillV8.kind-status{border-color:#69889f!important}
.skillV8.kind-status .skillIcon{filter:none}
@media(max-width:500px){.v342LeaderRoster{font-size:9px}.skillV8.kind-status .skillIcon{font-size:15px}}
`;document.head.append(v342Css);
window.PokemonTorreV342Diagnostics=()=>({version:V342,leaders:KANTO_LEADERS_FRLG.map((x,i)=>({name:GYMS[i].leader,team:teamOfTrainer(i,v29TrainerCount(i)).map(m=>[m.id,m.level])})),statuses:Object.keys(STATUS_DEFS).length,exampleStatusMoves:v32Catalogue(mon(25,55)).filter(x=>x.move.cat==='status').map(x=>x.move.name),electricDraw:'lightning-path-canvas',singleplayer:true});
})();
/* FIM POKEMON TORRE V34.2 */
