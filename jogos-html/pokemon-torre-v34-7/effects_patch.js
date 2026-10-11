/* V34.7 — efeitos clássicos FireRed em PNG, com fallback ao motor atual */
(function(){
'use strict';
const CDN='https://raw.githubusercontent.com/pret/pokefirered/master/graphics/battle_anims/sprites/';
const TYPE_SHEETS={
 fire:['fire_plume','small_ember','explosion'],water:['water_column','water_impact','bubble_burst'],
 grass:['razor_leaf','vine','roots'],ground:['flying_dirt','mud_sand_0','dirt_mound'],
 rock:['rocks','flat_rock','impact'],ice:['ice_crystals_0','ice_spikes','ice_chunk'],
 poison:['poison_powder','poison_bubble','toxic_bubble'],psychic:['spiral','rainbow_rings','movement_waves'],
 ghost:['shadow_ball','ghostly_spirit','purple_flame'],dark:['black_smoke','void_lines','purple_swipe'],
 flying:['air_wave','gust','white_feather'],bug:['spider_web','needle','web_thread'],
 normal:['impact','slash','speed_dust'],fighting:['punch_impact','slam_hit','claw_slash'],
 steel:['torn_metal','metal_ball','shock_3'],dragon:['blue_flames','breath','blue_burst'],
 fairy:['sparkle_4','pink_heart_2','pink_cloud']
};
const SPECIAL={
 'lancachamas':'fire_plume','flamethrower':'fire_plume','explosaodefogo':'explosion',
 'fireblast':'explosion','brasa':'small_ember','ember':'small_ember','surf':'water_column',
 'hydropump':'water_impact','hidrobomba':'water_impact','raiofolha':'razor_leaf',
 'razorleaf':'razor_leaf','vinewhip':'vine','chicotedevinhas':'vine',
 'earthquake':'dirt_mound','terremoto':'dirt_mound',
 'osso bumerangue':'bone','ossobumerangue':'bone','bonemerang':'bone',
 'sludgebomb':'poison_bubble','sleep powder':'poison_powder','sleeppowder':'poison_powder',
 'toxic':'toxic_bubble','icebeam':'ice_spikes','raiodegelo':'ice_spikes',
 'shadowball':'shadow_ball','boladesombra':'shadow_ball','psychic':'spiral',
 'psi quico':'spiral','psíquico':'spiral','rockslide':'rocks','deslizamentodepedra':'rocks',
 'tapa de lama':'mud_sand_0','tapadelama':'mud_sand_0','sandattack':'flying_dirt'
};
function norm(s){return String(s||'').normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/[^a-z0-9]/ig,'').toLowerCase();}
const MAP={};for(const [k,v] of Object.entries(SPECIAL))MAP[norm(k)]=v;
const files=[...new Set(Object.values(TYPE_SHEETS).flat().concat(Object.values(MAP)))];
const art={};
for(const name of files){
 const pic=new Image();pic.decoding='async';pic.crossOrigin='anonymous';
 pic.src=CDN+name+'.png';art[name]=pic;
}
function loaded(a){return !!(a&&a.complete&&a.naturalWidth>0&&a.naturalHeight>0);}
function choose(move,type,impact=false){
 const name=norm(move),special=MAP[name];
 if(special)return special;
 const list=TYPE_SHEETS[type]||TYPE_SHEETS.normal;
 return list[impact?1:0]||list[0];
}
function frame(ctx,name,x,y,progress,size=1,alpha=.9,rotation=0){
 const pic=art[name];if(!loaded(pic))return false;
 const sw=pic.naturalWidth,sh=pic.naturalHeight;
 const count=sh>=sw&&sh%sw===0?Math.max(1,Math.min(32,sh/sw)):1;
 const sy=sw*Math.floor(Math.max(0,Math.min(.999,progress))*count),height=count>1?sw:sh;
 const target=Math.max(14,Math.min(64,36*size)),scale=Math.min(1.55,height/Math.max(1,sw));
 ctx.save();ctx.imageSmoothingEnabled=false;ctx.globalAlpha=Math.max(0,Math.min(.94,alpha));
 ctx.translate(x,y);ctx.rotate(rotation);
 ctx.drawImage(pic,0,sy,sw,height,-target/2,-target*scale/2,target,target*scale);
 ctx.restore();return true;
}
function add(e,fx){
 e.v347Sprites||=[];
 e.v347Sprites.push(fx);
 if(e.v347Sprites.length>28)e.v347Sprites.splice(0,e.v347Sprites.length-28);
}
const oldUse=BattleEngine.prototype.useMove;
BattleEngine.prototype.useMove=function(i){
 const b=battle,m=b?.active?current():null,s=m&&skillSet(m)?.[i];
 const now=performance.now(),before=(cooldowns||[])[i]||0;
 const res=oldUse.call(this,i);
 if(s?.type!=='electric'&&b?.active&&b===battle&&(cooldowns||[])[i]>now&&(cooldowns||[])[i]!==before){
  const a=this.player,z=this.enemy;
  add(this,{kind:'travel',name:choose(s.name,s.type),type:s.type,at:now,duration:s.kind==='beam'?690:490,
     x1:a.x,y1:a.y-this.h*.18,x2:z.x,y2:z.y-this.h*.16,seed:Math.random()*100,move:s.name});
  this.v347Last={move:s.name,type:s.type,at:now};
 }
 return res;
};
const oldHit=BattleEngine.prototype.hitTarget;
BattleEngine.prototype.hitTarget=function(side,type,power){
 const result=oldHit.call(this,side,type,power);
 if(battle?.active&&type!=='electric'){
  const recent=this.v347Last;
  const name=recent?.type===type&&performance.now()-recent.at<2000?recent.move:'';
  const target=side==='enemy'?this.player:this.enemy,now=performance.now();
  if(target)add(this,{kind:'impact',name:choose(name,type,true),type,at:now,duration:340,
    x:target.x,y:target.y-this.h*.14});
 }
 return result;
};
const oldProjectile=BattleEngine.prototype.drawProjectile;
BattleEngine.prototype.drawProjectile=function(p){
 if(p.type==='electric')return oldProjectile.call(this,p);
 if(p.type&&TYPE_SHEETS[p.type]){
  const recent=this.v347Last,match=recent?.type===p.type&&performance.now()-recent.at<1700;
  const file=choose(match?recent.move:'',p.type,false);
  const direction=Math.atan2(p.vy||0,p.vx||1);
  if(frame(this.ctx,file,p.x,p.y,(performance.now()/360)%1,.68,.86,direction))return;
 }
 return oldProjectile.call(this,p);
};
const oldDraw=BattleEngine.prototype.draw;
BattleEngine.prototype.draw=function(now){
 // Remove só os ataques genéricos NÃO elétricos das camadas anteriores.
 const old346=this.v346Attacks,old343=this.v343Fx,old344=this.v344Fx,oldNamed=this.v343Named;
 if(old346)this.v346Attacks=old346.filter(x=>x.kind==='bolt'||x.kind==='thunder');
 if(old343)this.v343Fx=old343.filter(x=>x.type==='electric');
 if(old344)this.v344Fx=old344.filter(x=>x.spec?.type==='electric');
 if(oldNamed)this.v343Named=oldNamed.filter(x=>x.type==='electric');
 try{oldDraw.call(this,now);}finally{
  if(old346)this.v346Attacks=old346.filter(x=>now-x.at<x.duration);
  if(old343)this.v343Fx=old343.filter(x=>now<x.end);
  if(old344)this.v344Fx=old344.filter(x=>now-x.start<x.duration);
  if(oldNamed)this.v343Named=oldNamed;
 }
 if(!battle?.active)return;
 const ctx=this.ctx,low=!!this.fps&&this.fps<29;
 const src=this.v347Sprites||[];
 for(const v of src.slice(low?-6:-18)){
  const t=(now-v.at)/v.duration;
  if(t<0||t>=1)continue;
  if(v.kind==='travel'){
   const t1=Math.min(1,t*1.6),x=v.x1+(v.x2-v.x1)*t1,y=v.y1+(v.y2-v.y1)*t1;
   frame(ctx,v.name,x,y,t,low?.80:1,t<.85?.9:(1-t)*5,Math.atan2(v.y2-v.y1,v.x2-v.x1));
  }else if(v.kind==='impact')frame(ctx,v.name,v.x,v.y,t,1.18,(1-t)*.9);
 }
 this.v347Sprites=src.filter(x=>now-x.at<x.duration);
 // Condições de status visíveis no corpo, sem alterar HP/dano/cooldowns.
 const state=this.v25?.stats;
 if(state){
  const sides=[{actor:this.player,conditions:state.player?.conditions||[]},
    {actor:this.enemy,conditions:state.enemy?.conditions||[]}];
  for(const {actor,conditions} of sides){
   if(!actor||!conditions?.length)continue;
   for(let k=0;k<Math.min(3,conditions.length);k++){
    const status=conditions[k],image=({
      paralysis:'shock_2',frozen:'ice_chunk',freeze:'ice_chunk',
      burn:'fire_plume',poison:'toxic_bubble',sleep:'snore_z',confusion:'spiral'
    })[status];if(!image)continue;
    const phase=now*.004+k*2.1,x=actor.x+Math.sin(phase)*this.h*.055,
      y=actor.y-this.h*.17+Math.cos(phase*1.2)*this.h*.045;
    frame(ctx,image,x,y,(now/760)%1,.48,.72);
   }
  }
 }
};
window.PokemonTorreV347MoveDiagnostics=()=>({version:'34.7-FRLG-moves',sources:files.length,
  moveTypes:Object.keys(TYPE_SHEETS).length,spriteEffects:engine?.v347Sprites?.length||0,
  loaded:Object.keys(art).filter(x=>loaded(art[x])).length,lightningUntouched:true});
})();
/* FIM GOLPES CLASSICOS V34.7 */