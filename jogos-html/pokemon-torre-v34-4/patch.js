/* Pokemon Torre V34.4 - Sprite FX reais: Ansimuz CC0 via Moonfang. */
(function(){
'use strict';
const V344='34.4';
const SHEETS={};
for(const [key,data] of Object.entries(V344_SHEET_DATA)){
 const image=new Image();image.decoding='async';image.src=data.src;
 SHEETS[key]={image,frames:data.frames,ready:false};
 image.onload=()=>{SHEETS[key].ready=true;};
 if(image.complete&&image.naturalWidth)SHEETS[key].ready=true;
}
const LOOK={
 electric:{sheet:'lightning',filter:'none'},fire:{sheet:'firebomb',filter:'none'},
 water:{sheet:'soul',filter:'hue-rotate(0deg) saturate(1.3)'},ice:{sheet:'ring',filter:'hue-rotate(0deg) brightness(1.5)'},
 grass:{sheet:'ring',filter:'hue-rotate(86deg) saturate(1.4)'},poison:{sheet:'darkbolt',filter:'hue-rotate(6deg) saturate(1.2)'},
 psychic:{sheet:'darkbolt',filter:'hue-rotate(48deg) saturate(1.6)'},ghost:{sheet:'darkbolt',filter:'none'},
 dark:{sheet:'darkbolt',filter:'hue-rotate(28deg) brightness(.75)'},ground:{sheet:'firebomb',filter:'hue-rotate(37deg) saturate(.55)'},
 rock:{sheet:'firebomb',filter:'hue-rotate(35deg) saturate(.45)'},bug:{sheet:'spark',filter:'hue-rotate(90deg) saturate(1.6)'},
 flying:{sheet:'soul',filter:'saturate(.3) brightness(1.7)'},dragon:{sheet:'dragon',filter:'hue-rotate(210deg) saturate(1.5)'},
 steel:{sheet:'spark',filter:'saturate(0) brightness(1.45)'},fairy:{sheet:'ring',filter:'hue-rotate(105deg) saturate(2)'},
 fighting:{sheet:'spark',filter:'hue-rotate(185deg) saturate(1.5)'},normal:{sheet:'spark',filter:'saturate(.3) brightness(1.5)'}
};
const MOVES={
 thunderbolt:{sheet:'lightning',type:'electric',size:1.02,duration:390},
 thunder:{sheet:'lightning',type:'electric',size:1.52,duration:630},
 flamethrower:{sheet:'firebomb',type:'fire',size:.90,duration:430},
 fireblast:{sheet:'firebomb',type:'fire',size:1.52,duration:630},
 surf:{sheet:'soul',type:'water',size:1.60,duration:620},
 hydropump:{sheet:'soul',type:'water',size:1.05,duration:440},
 icebeam:{sheet:'ring',type:'ice',size:1.04,duration:470},
 psychic:{sheet:'darkbolt',type:'psychic',size:1.18,duration:480},
 shadowball:{sheet:'darkbolt',type:'ghost',size:1.10,duration:480},
 earthquake:{sheet:'firebomb',type:'ground',size:1.55,duration:600},
 rockslide:{sheet:'firebomb',type:'rock',size:1.20,duration:510}
};
const MAX_FX=12;
function normalize(n){return String(n||'').normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase().replace(/[^a-z0-9]/g,'');}
const ALIASES={'lancachamas':'flamethrower','rajadadefogo':'fireblast','raio':'thunderbolt','trovão':'thunder','hidrobomba':'hydropump','terremoto':'earthquake','deslizamentodepedra':'rockslide','boladesombra':'shadowball','raiodegelo':'icebeam'};
function spec(n,type){
 const key=normalize(n),m=MOVES[ALIASES[key]||key];
 return m?{...m,name:n}:{...(LOOK[type]||LOOK.normal),type:type||'normal',name:n,size:1,duration:450};
}
function drawSprite(ctx,x,y,spec,t,opacity,size,now){
 const asset=SHEETS[spec.sheet]||SHEETS.spark;
 if(!asset?.ready||!asset.image.naturalWidth)return false;
 const image=asset.image,count=asset.frames;
 const srcW=image.naturalWidth/count,srcH=image.naturalHeight;
 if(!srcW||!srcH)return false;
 const frame=Math.max(0,Math.min(count-1,Math.floor(t*count)));
 const naturalScale=Math.min(1.7,Math.max(.75,size||1));
 const maxW=Math.max(38,Math.min(90,ctx.canvas.width/(window.devicePixelRatio||1)*.22));
 const base=maxW*naturalScale;
 const tall=spec.sheet==='lightning',ratio=Math.max(.42,Math.min(2.3,srcH/srcW));
 const destW=tall?base*.70:base,destH=tall?base*1.7:base*Math.min(1.30,ratio);
 ctx.save();
 ctx.imageSmoothingEnabled=false;
 ctx.globalAlpha=Math.min(.94,Math.max(0,opacity));
 ctx.filter=spec.filter||(LOOK[spec.type]||LOOK.normal).filter||'none';
 ctx.drawImage(image,frame*srcW,0,srcW,srcH,x-destW*.5,y-destH*.56,destW,destH);
 ctx.restore();
 return true;
}
function addFx(engine,entry){
 engine.v344Fx ||= [];
 engine.v344Fx.push(entry);
 if(engine.v344Fx.length>MAX_FX)engine.v344Fx.splice(0,engine.v344Fx.length-MAX_FX);
}
const prevUse=BattleEngine.prototype.useMove;
BattleEngine.prototype.useMove=function(i){
 const b=battle,m=b?.active?current():null,move=m?skillSet(m)?.[i]:null;
 const now=performance.now(),before=(cooldowns||[])[i]||0;
 const out=prevUse.call(this,i);
 if(b?.active&&b===battle&&move&&cooldowns[i]>now&&cooldowns[i]!==before){
   const sp=spec(move.name,move.type),strength=move.kind==='status'?.75:1;
   addFx(this,{kind:'cast',spec:sp,from:'player',start:now,duration:sp.duration*strength,
      pulse:move.kind==='status',size:sp.size||1});
   this.v344LastMove={name:move.name,type:move.type,time:now};
 }
 return out;
};
const prevHit=BattleEngine.prototype.hitTarget;
BattleEngine.prototype.hitTarget=function(who,type,power){
 const before=performance.now();
 const out=prevHit.call(this,who,type,power);
 if(battle?.active){
  const lm=this.v344LastMove;
  const name=who==='enemy'&&lm?.type===type&&before-lm.time<2600?lm.name:'';
  const s=spec(name,type);
  addFx(this,{kind:'impact',spec:s,from:who==='enemy'?'player':'enemy',start:before,duration:s.duration*.85,size:s.size});
 }
 return out;
};
const prevProjectile=BattleEngine.prototype.drawProjectile;
BattleEngine.prototype.drawProjectile=function(p){
 const type=p?.type||'normal';
 if(!LOOK[type])return prevProjectile.call(this,p);
 const src=p.tail?.[0]||{x:p.x-(p.vx||0)*.045,y:p.y-(p.vy||0)*.045};
 const lm=this.v344LastMove;
 const s=spec(p.from==='player'&&lm?.type===type&&performance.now()-lm.time<1700?lm.name:'',type);
 const t=(performance.now()/Math.max(190,s.duration))%1;
 if(!drawSprite(this.ctx,p.x,p.y,s,t,.84,s.size*.55,performance.now()))return prevProjectile.call(this,p);
};
const prevDraw=BattleEngine.prototype.draw;
BattleEngine.prototype.draw=function(now){
 const hold={v342Lightning:this.v342Lightning,v343Fx:this.v343Fx,v343Named:this.v343Named,v30Shots:this.v30Shots,v19Beams:this.v19Beams,v19Impacts:this.v19Impacts};
 this.v342Lightning=[];this.v343Fx=[];this.v343Named=[];
 this.v30Shots=[];this.v19Beams=[];this.v19Impacts=[];
 try{prevDraw.call(this,now);}finally{
  this.v342Lightning=hold.v342Lightning;this.v343Fx=hold.v343Fx;this.v343Named=hold.v343Named;
  this.v30Shots=hold.v30Shots;this.v19Beams=hold.v19Beams;this.v19Impacts=hold.v19Impacts;
 }
 if(!battle?.active||!this.ctx)return;
 const ctx=this.ctx,low=this.fps<30;
 ctx.save();
 const list=this.v344Fx||[];
 for(const e of list){
  const time=now-e.start,frac=time/e.duration;
  if(frac>=1||frac<0)continue;
  const p=e.from==='enemy'?this.enemy:this.player;
  const dest=e.from==='enemy'?this.player:this.enemy;
  const x=e.kind==='impact'?dest.x:p.x+(dest.x-p.x)*Math.min(1,frac*1.5),
        y=e.kind==='impact'?dest.y-this.h*.16:p.y-this.h*.12+(dest.y-p.y)*Math.min(1,frac*1.5);
  const a=frac<.12?frac/.12:frac>.82?(1-frac)/.18:1;
  if(low&&e!==list[list.length-1])continue;
  drawSprite(ctx,x,y,e.spec,frac,a*.88,e.size*(e.kind==='impact'?1.1:.83),now);
 }
 // Homing e disparos especiais: mesmas spritesheets, sem a bolinha original.
 for(const p of (hold.v30Shots||[]).slice(-8)){
  const lm=this.v344LastMove;
  const s=spec(lm?.type===p.type?lm.name:'',p.type);
  drawSprite(ctx,p.x,p.y,s,(now/Math.max(170,s.duration))%1,.75,s.size*.49,now);
 }
 ctx.restore();
 this.v344Fx=list.filter(e=>now-e.start<e.duration).slice(-MAX_FX);
};
const css=document.createElement('style');
css.id='v344_sprite_styles';css.textContent='.skillV8 .skillIcon{filter:none!important;image-rendering:pixelated}.skillV8.kind-status .skillIcon{opacity:.96}';
document.head.appendChild(css);
window.PokemonTorreV344Diagnostics=()=>({version:V344,realSpriteSheets:Object.keys(SHEETS),
 loaded:Object.entries(SHEETS).filter(([,s])=>s.ready).map(([k])=>k),
 types:Object.keys(LOOK),namedMoves:Object.keys(MOVES),queue:engine?.v344Fx?.length||0});
})();
/* FIM POKEMON TORRE V34.4 */