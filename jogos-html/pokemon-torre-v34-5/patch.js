/* POKEMON TORRE V34.5 — Kanto 151 tamanhos, Recover e status compacto */
(function(){
'use strict';
const V345='34.5';
const SCALE=[0.788,0.95,1.186,0.763,0.965,1.16,0.734,0.95,1.15,0.7,0.893,1.09,0.7,0.868,1.075,0.7,0.965,1.14,0.7,0.968,0.7,1.054,0.956,1.21,0.803,1.039,0.763,1.025,0.7,0.914,1.117,0.734,0.933,1.129,0.868,1.117,0.763,1.04,0.839,1.075,0.809,1.1,0.734,0.914,1.104,0.7,1.025,0.845,1.09,0.7,0.968,0.7,1.025,0.809,1.11,0.734,1.025,0.788,1.128,0.763,0.95,1.117,0.828,0.992,1.14,0.809,1.015,1.15,0.788,0.95,1.16,0.828,1.1,0.7,0.95,1.129,0.845,1.11,0.874,1.1,0.7,1.025,0.914,0.899,1.119,0.86,1.11,0.828,1.054,0.7,1.09,0.887,1.025,1.14,1.21,0.845,1.1,0.7,1.067,0.734,1.054,0.7,1.136,0.7,1.025,1.09,1.079,0.979,0.763,1.054,0.845,1.128,1.04,0.95,1.076,0.7,1.054,0.763,1.067,0.809,1.04,1.067,1.015,1.079,1.04,1.067,1.015,1.004,0.828,1.21,1.097,0.757,0.7,1.025,0.989,1.008,0.914,0.7,1.025,0.734,1.067,1.044,1.144,1.035,1.025,1.061,0.939,1.172,1.201,1.061,0.803];
const HEAL={recover:.50,recovery:.50,recuperacao:.50,recuperar:.50,roost:.50,synthesis:.45,moonlight:.45,softboiled:.50,rest:.62,sintese:.45};
const KEY=s=>String(s||'').normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase().replace(/[^a-z0-9]/g,'');
const clamp=(a,min,max)=>Math.max(min,Math.min(max,a));
const nfmt=n=>Number(n).toFixed(2).replace('.',',');
const STAT={atk:'ATQ',def:'DEF',speed:'VEL',accuracy:'PREC'};
const oldDrawMon=BattleEngine.prototype.drawMon;
BattleEngine.prototype.drawMon=function(actor,id,enemy,now){
 const factor=SCALE[id-1]||.95,ctx=this.ctx;
 if(!actor||!ctx)return oldDrawMon.call(this,actor,id,enemy,now);
 ctx.save();ctx.translate(actor.x,actor.y);ctx.scale(factor,factor);ctx.translate(-actor.x,-actor.y);
 try{return oldDrawMon.call(this,actor,id,enemy,now);}finally{ctx.restore();}
};
function label(engine,side,text,color,category='stat'){
 if(typeof engine.v26Label==='function')engine.v26Label(side,text,color||'#b8fbd4',category);
}
const prevUse=BattleEngine.prototype.useMove;
BattleEngine.prototype.useMove=function(i){
 const b=battle,m=b?.active?current():null;
 if(!m||!Number.isInteger(i)||i<0||i>3)return prevUse.call(this,i);
 const s=skillSet(m)?.[i];if(!s)return prevUse.call(this,i);
 const now=performance.now(),heal=HEAL[KEY(s.name)]||(s.kind==='recover'?.50:0);
 if(heal){
  if(b.paused||m.hp<=0||!this.v25?.stats||cooldowns[i]>now||b.energy<s.cost)return;
  if(m.hp>=m.maxHp){label(this,'player','PV CHEIO','#b9f0ff','info');return;}
  const gained=Math.min(m.maxHp-m.hp,Math.max(1,Math.round(m.maxHp*heal)));
  b.energy-=s.cost;cooldowns[i]=now+Math.max(5200,s.cd||8400);
  if(this.attackActs)this.attackActs.player=this.time+.32;
  m.hp=Math.min(m.maxHp,m.hp+gained);
  this.v345Cures=(this.v345Cures||0)+1;
  label(this,'player','+'+gained+' PV · '+s.name,'#b6ffd5','heal');
  if(typeof this.particlesAt==='function')this.particlesAt(this.player.x,this.player.y-this.h*.11,'#95fbb6',9,42);
  log(D[m.id].name+' usou '+s.name+': +'+gained+' PV ('+Math.ceil(m.hp)+'/'+m.maxHp+')');
  this.updateHud(now);persist();return;
 }
 if(s.kind!=='status'&&s.kind!=='shield')return prevUse.call(this,i);
 const v=this.v25?.stats;
 const before=v?{ally:{...v.player},foe:{...v.enemy},conditions:[...(v.enemy.conditions||[])]}:null;
 const energy=b.energy;
 const output=prevUse.call(this,i);
 if(!before||battle!==b||!b.active||b.energy>=energy)return output;
 const changes=[];
 for(const [side,prev,after] of [['player',before.ally,v.player],['enemy',before.foe,v.enemy]]){
  for(const [k,display] of Object.entries(STAT)){
   const delta=(Number(after[k])||1)-(Number(prev[k])||1);
   if(Math.abs(delta)>.001)changes.push({side,text:display+' '+(delta>0?'+':'−')+nfmt(Math.abs(delta))+' · x'+nfmt(after[k]),color:delta>0?'#b8ffcf':'#ffc2af'});
  }
 }
 for(const status of (v.enemy.conditions||[]))if(!before.conditions.includes(status))changes.push({side:'enemy',text:status.toUpperCase(),color:'#f6c0ff'});
 if(changes.length){
  if(this.v26Labels)this.v26Labels=this.v26Labels.filter(x=>x.category!=='status'&&x.category!=='stat');
  for(const a of changes.slice(0,3))label(this,a.side,a.text,a.color,'stat');
 }
 return output;
};
// Substitui o texto grande por avisos discretos junto aos sprites.
BattleEngine.prototype.v26DrawLabels=function(ctx){
 const alive=(this.v26Labels||[]).filter(x=>x.life>0).slice(-6);
 const font=clamp(this.h*.014,7.5,9.2);ctx.save();
 for(const item of alive){
  const actor=item.side==='enemy'?this.enemy:this.player;if(!actor)continue;
  ctx.save();ctx.font='700 '+font+'px system-ui';ctx.textAlign='left';ctx.textBaseline='middle';
  const text=String(item.text||'').slice(0,26);
  const w=Math.min(this.w*.4,ctx.measureText(text).width+10),h=font+6;
  const x=clamp(actor.x+(item.side==='enemy'?-this.h*.10:this.h*.10)-(item.side==='enemy'?w:0),3,this.w-w-3);
  const y=clamp(item.y,12,this.h-12);
  ctx.globalAlpha=clamp(item.life/.23,0,.95);ctx.fillStyle='#07192ce0';ctx.fillRect(x,y-h/2,w,h);
  ctx.fillStyle=item.color||'#e7f9ff';ctx.fillText(text,x+4,y,w-7);ctx.restore();
 }
 ctx.restore();
};
const oldV25Draw=BattleEngine.prototype.v25Draw;
BattleEngine.prototype.v25Draw=function(ctx){
 const messages=this.v25?.impactMessage;
 if(!messages)return oldV25Draw.call(this,ctx);
 this.v25.impactMessage=[];
 try{oldV25Draw.call(this,ctx);}finally{this.v25.impactMessage=messages;}
 const font=clamp(this.h*.014,7.5,9.2);ctx.save();
 for(const [i,p] of messages.slice(-3).entries()){
  if(!p||p.life<=0)continue;
  const playerDist=Math.hypot(p.x-this.player.x,p.y-this.player.y),enemyDist=Math.hypot(p.x-this.enemy.x,p.y-this.enemy.y),ally=playerDist<enemyDist,actor=ally?this.player:this.enemy;
  ctx.font='700 '+font+'px system-ui';ctx.textBaseline='middle';ctx.textAlign='left';
  const text=String(p.text||'').slice(0,23);
  const w=Math.min(this.w*.4,ctx.measureText(text).width+9);
  const x=clamp(actor.x+(ally?this.h*.09:-this.h*.09)-(ally?0:w),3,this.w-w-3);
  const y=clamp(actor.y-this.h*.16+i*11,18,this.h-12);
  ctx.globalAlpha=clamp(p.life*1.4,0,.9);
  ctx.fillStyle='#091d2dd9';ctx.fillRect(x,y-font/2-3,w,font+6);
  ctx.fillStyle=p.color||'#e8faff';ctx.fillText(text,x+4,y,w-6);
 }
 ctx.restore();
};
const css=document.createElement('style');css.id='v345-compact';css.textContent=[
'.modal.combatModal .battleFooter{padding:1px 5px!important;margin-top:2px!important}',
'.modal.combatModal .skillgridV8{gap:5px!important;margin:3px 0!important}',
'.modal.combatModal .skillV8{padding:5px 7px!important;min-height:50px!important}',
'.modal.combatModal .skillName b{font-size:11px!important}',
'.modal.combatModal .skillName small{font-size:8px!important;margin-top:2px!important}',
'.modal.combatModal .skillMeta small{font-size:8px!important}',
'.modal.combatModal .battleMessage{min-height:24px!important;margin-top:3px!important;padding:4px 7px!important}',
'.modal.combatModal .v25EffectChip{font-size:8px!important;max-width:110px!important;padding:2px 4px!important}',
'@media(max-width:700px){.modal.combatModal .arenaPro{flex-grow:1.4!important;min-height:245px!important}.modal.combatModal .battleHeading{min-height:34px!important;margin-bottom:2px!important}.modal.combatModal .skillV8{min-height:46px!important;padding:4px 6px!important}.modal.combatModal .skillIcon{height:27px!important;min-width:27px!important;width:27px!important;font-size:16px!important}.modal.combatModal .skillName b{font-size:10px!important}.modal.combatModal .skillName small{font-size:8px!important}.modal.combatModal .miniBtn{font-size:9px!important;padding:4px!important}.modal.combatModal .v25EffectChip{font-size:7px!important}}'
].join('');document.head.appendChild(css);
window.PokemonTorreV345Diagnostics=()=>({version:V345,species:151,scales:SCALE,starterExample:{charmander:SCALE[3],charmeleon:SCALE[4],charizard:SCALE[5]},healMoves:Object.keys(HEAL),heals:engine?.v345Cures||0,compactText:true,largerArena:true});
})();
/* FIM POKEMON TORRE V34.5 */