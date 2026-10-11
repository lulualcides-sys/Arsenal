
/* POKEMON TORRE V34.3 — efeitos elaborados para todos os tipos */
(function(){
'use strict';
const V343='34.3';
const ARENA_BG = '#172839';
const TYPE_VFX={
 electric:{cast:'#7dd6ff',mid:'#3fa5ff',core:'#ffffff',style:'lightning'},
 fire:{cast:'#ffb347',mid:'#ff6b2e',core:'#fff1c1',style:'flame'},
 water:{cast:'#8fe8ff',mid:'#36b6ff',core:'#ffffff',style:'water'},
 ice:{cast:'#d6f6ff',mid:'#7fd8ff',core:'#ffffff',style:'ice'},
 grass:{cast:'#b5ff8d',mid:'#53c96a',core:'#efffde',style:'grass'},
 poison:{cast:'#d8a1ff',mid:'#8f4fe0',core:'#fff2ff',style:'poison'},
 psychic:{cast:'#ffb1fb',mid:'#e96dff',core:'#ffffff',style:'psychic'},
 ghost:{cast:'#caa8ff',mid:'#7d65ff',core:'#f8f1ff',style:'ghost'},
 dark:{cast:'#9ba5cf',mid:'#4b557d',core:'#ffffff',style:'dark'},
 ground:{cast:'#d6b084',mid:'#8c5a31',core:'#fff1dc',style:'earth'},
 rock:{cast:'#e6c495',mid:'#9c7445',core:'#fff5e8',style:'rock'},
 bug:{cast:'#d4ff75',mid:'#8dcb2f',core:'#fffeda',style:'bug'},
 flying:{cast:'#e8fbff',mid:'#b0e0ff',core:'#ffffff',style:'wind'},
 dragon:{cast:'#7fe1ff',mid:'#2d8bff',core:'#f6d0ff',style:'dragon'},
 steel:{cast:'#edf5ff',mid:'#93a9bd',core:'#ffffff',style:'steel'},
 fairy:{cast:'#ffd6f0',mid:'#ff8fdb',core:'#ffffff',style:'fairy'},
 fighting:{cast:'#ffd59a',mid:'#ff8f4f',core:'#fff7e8',style:'impact'},
 normal:{cast:'#f7eedf',mid:'#d9cdb8',core:'#ffffff',style:'impact'}
};
function v343Cfg(type){return TYPE_VFX[type]||TYPE_VFX.normal;}
function lerp(a,b,t){return a+(b-a)*t;}
function clamp(x,a,b){return Math.max(a,Math.min(b,x));}
function randSeed(seed){const x=Math.sin(seed*12.9898)*43758.5453;return x-Math.floor(x);}
function circle(ctx,x,y,r,color,alpha=1,blur=0){ctx.save();ctx.globalAlpha=alpha;ctx.fillStyle=color;ctx.shadowColor=color;ctx.shadowBlur=blur;ctx.beginPath();ctx.arc(x,y,r,0,Math.PI*2);ctx.fill();ctx.restore();}
function line(ctx,pts,w,color,alpha=1,blur=0){ctx.save();ctx.globalAlpha=alpha;ctx.strokeStyle=color;ctx.lineWidth=w;ctx.lineCap='round';ctx.lineJoin='round';ctx.shadowColor=color;ctx.shadowBlur=blur;ctx.beginPath();ctx.moveTo(pts[0].x,pts[0].y);for(const p of pts.slice(1))ctx.lineTo(p.x,p.y);ctx.stroke();ctx.restore();}
function bolt(ctx,x1,y1,x2,y2,seed,alpha=1,branch=4){const dx=x2-x1,dy=y2-y1,len=Math.hypot(dx,dy)||1,nx=-dy/len,ny=dx/len;const pts=[{x:x1,y:y1}];const seg=10,jit=Math.min(22,Math.max(8,len*.12));for(let i=1;i<seg;i++){const t=i/seg;const off=(randSeed(seed+i*4.1)*2-1)*jit*Math.sin(Math.PI*t);pts.push({x:x1+dx*t+nx*off,y:y1+dy*t+ny*off});}pts.push({x:x2,y:y2});line(ctx,pts,7,'#4ea4ff',alpha*.45,16);line(ctx,pts,3,'#a5ebff',alpha*.9,9);line(ctx,pts,1.2,'#ffffff',alpha,0);for(let i=2;i<pts.length-1;i+=Math.max(2,Math.floor(seg/branch))){const p=pts[i];const side=i%2?1:-1;const bl=len*.16;const q={x:p.x+nx*bl*side+dx*.06,y:p.y+ny*bl*side+dy*.04};const r={x:p.x+nx*bl*1.45*side+dx*.1,y:p.y+ny*bl*1.45*side+dy*.08};line(ctx,[p,q,r],1.2,'#caf7ff',alpha*.75,5);}}
function ribbon(ctx,x1,y1,x2,y2,seed,alpha,c1,c2,width=7,wave=12){const dx=x2-x1,dy=y2-y1,len=Math.hypot(dx,dy)||1,nx=-dy/len,ny=dx/len;const pts=[];for(let i=0;i<=14;i++){const t=i/14;const off=Math.sin(seed+i*.9)*wave*Math.sin(Math.PI*t);pts.push({x:x1+dx*t+nx*off,y:y1+dy*t+ny*off});}line(ctx,pts,width,c1,alpha*.45,14);line(ctx,pts,width*.56,c2,alpha*.95,7);line(ctx,pts,width*.2,'#ffffff',alpha*.95,0);}
function fanFlame(ctx,x1,y1,x2,y2,seed,alpha){const dx=x2-x1,dy=y2-y1,len=Math.hypot(dx,dy)||1,ang=Math.atan2(dy,dx),spread=.48;for(let i=0;i<7;i++){const t=i/6-0.5;const a=ang+t*spread;const l=len*(.55+randSeed(seed+i)*.45);const ex=x1+Math.cos(a)*l,ey=y1+Math.sin(a)*l;ribbon(ctx,x1,y1,ex,ey,seed+i*2.1,alpha*.8,'#ff7f2f','#ffd27a',5,4);circle(ctx,lerp(x1,ex,.7),lerp(y1,ey,.7),2.4,'#ffb347',alpha*.75,5);}for(let i=0;i<12;i++){const t=randSeed(seed+i*3.3);circle(ctx,lerp(x1,x2,t),lerp(y1,y2,t)-t*6,1.8+randSeed(seed+i)*1.8,'#ff944d',alpha*(1-t),4);}}
function waterJet(ctx,x1,y1,x2,y2,seed,alpha){ribbon(ctx,x1,y1,x2,y2,seed,alpha,'#3cbcff','#b7f0ff',8,8);for(let i=0;i<10;i++){const t=i/9;const rr=2.3*(1-t)+.8;circle(ctx,lerp(x1,x2,t),lerp(y1,y2,t)+(Math.sin(seed+t*14)*4),rr,'#d9fbff',alpha*(1-t),4);} }
function iceBeam(ctx,x1,y1,x2,y2,seed,alpha){ribbon(ctx,x1,y1,x2,y2,seed,alpha,'#92e3ff','#ffffff',6,4);for(let i=0;i<8;i++){const t=i/7;const x=lerp(x1,x2,t),y=lerp(y1,y2,t);line(ctx,[{x:x-3,y:y},{x:x+3,y:y},{x:x,y:y-3},{x:x,y:y+3}],1,'#eaffff',alpha*.7,0);}}
function leafTrail(ctx,x1,y1,x2,y2,seed,alpha){for(let i=0;i<8;i++){const t=i/7;const x=lerp(x1,x2,t),y=lerp(y1,y2,t)+Math.sin(seed+t*13)*8;const a=seed+t*8;ctx.save();ctx.translate(x,y);ctx.rotate(a);ctx.globalAlpha=alpha*(1-t*.6);ctx.fillStyle=i%2?'#53c96a':'#b5ff8d';ctx.beginPath();ctx.moveTo(-6,0);ctx.quadraticCurveTo(0,-4,6,0);ctx.quadraticCurveTo(0,4,-6,0);ctx.fill();ctx.restore();}line(ctx,[{x:x1,y:y1},{x:x2,y:y2}],1.4,'#93df69',alpha*.35,4);}
function poisonCloud(ctx,x1,y1,x2,y2,seed,alpha){for(let i=0;i<12;i++){const t=randSeed(seed+i*5.1);const x=lerp(x1,x2,t)+(randSeed(seed+i*7)-.5)*12;const y=lerp(y1,y2,t)+(randSeed(seed+i*9)-.5)*10;circle(ctx,x,y,4+randSeed(seed+i*11)*7,i%2?'#9d52df':'#d89cff',alpha*(.7-t*.4),10);} }
function psychicWave(ctx,x1,y1,x2,y2,seed,alpha){for(let i=0;i<4;i++){const t=(seed*.5+i*.22)%1;const x=lerp(x1,x2,t),y=lerp(y1,y2,t);ctx.save();ctx.translate(x,y);ctx.rotate(seed+i);ctx.globalAlpha=alpha*(1-t);ctx.strokeStyle=i%2?'#ff9bf7':'#ffffff';ctx.lineWidth=2;ctx.shadowColor='#ff8ef9';ctx.shadowBlur=8;ctx.beginPath();ctx.ellipse(0,0,10+i*4,4+i*2,0,0,Math.PI*2);ctx.stroke();ctx.restore();}ribbon(ctx,x1,y1,x2,y2,seed,alpha*.6,'#e96dff','#ffd9ff',4,14);}
function earthSpike(ctx,x1,y1,x2,y2,seed,alpha){const dx=x2-x1,dy=y2-y1;for(let i=0;i<6;i++){const t=i/5;const x=lerp(x1,x2,t),y=lerp(y1,y2,t);const h=10+randSeed(seed+i)*10;ctx.save();ctx.globalAlpha=alpha*(.4+.6*(1-t));ctx.fillStyle=i%2?'#8c5a31':'#d5aa74';ctx.beginPath();ctx.moveTo(x-5,y+6);ctx.lineTo(x,y-h);ctx.lineTo(x+6,y+5);ctx.closePath();ctx.fill();ctx.restore();} }
function rockShards(ctx,x1,y1,x2,y2,seed,alpha){for(let i=0;i<8;i++){const t=i/7;const x=lerp(x1,x2,t)+(randSeed(seed+i)-.5)*8,y=lerp(y1,y2,t)+(randSeed(seed+i*2)-.5)*6;ctx.save();ctx.translate(x,y);ctx.rotate(seed+i);ctx.globalAlpha=alpha*(1-t*.5);ctx.fillStyle=i%2?'#c99b66':'#8a673f';ctx.beginPath();ctx.moveTo(-5,-2);ctx.lineTo(-1,-6);ctx.lineTo(5,-1);ctx.lineTo(4,5);ctx.lineTo(-3,4);ctx.closePath();ctx.fill();ctx.restore();}}
function windSlash(ctx,x1,y1,x2,y2,seed,alpha){for(let i=0;i<3;i++){const off=(i-1)*8;ribbon(ctx,x1,y1+off,x2,y2+off,seed+i,alpha*.72,'#ccefff','#ffffff',3,6);} }
function ghostTrail(ctx,x1,y1,x2,y2,seed,alpha){ribbon(ctx,x1,y1,x2,y2,seed,alpha,'#6f61ff','#d4b9ff',5,18);for(let i=0;i<6;i++){const t=i/5;circle(ctx,lerp(x1,x2,t),lerp(y1,y2,t)-Math.sin(seed+t*9)*5,4.2*(1-t)+1.6,'#a17dff',alpha*(1-t),8);} }
function dragonSpiral(ctx,x1,y1,x2,y2,seed,alpha){for(let i=0;i<10;i++){const t=i/9;const a=seed+t*12;const rad=10*(1-t);circle(ctx,lerp(x1,x2,t)+Math.cos(a)*rad,lerp(y1,y2,t)+Math.sin(a)*rad*.6,2.3,'#6dd9ff',alpha*(1-t),5);circle(ctx,lerp(x1,x2,t)-Math.cos(a)*rad,lerp(y1,y2,t)-Math.sin(a)*rad*.6,1.9,'#f6b2ff',alpha*(1-t),4);} ribbon(ctx,x1,y1,x2,y2,seed,alpha*.45,'#2d8bff','#e9d0ff',4,4);}
function steelSlash(ctx,x1,y1,x2,y2,seed,alpha){for(let i=0;i<3;i++){const t=i/2;line(ctx,[{x:lerp(x1,x2,t)-10,y:lerp(y1,y2,t)-8},{x:lerp(x1,x2,t)+10,y:lerp(y1,y2,t)+8}],2.2,'#eef7ff',alpha*.9,4);line(ctx,[{x:lerp(x1,x2,t)-6,y:lerp(y1,y2,t)+8},{x:lerp(x1,x2,t)+12,y:lerp(y1,y2,t)-8}],1.2,'#9baec0',alpha*.8,2);} }
function impactBurst(ctx,x,y,seed,alpha,c1,c2){for(let i=0;i<10;i++){const a=(Math.PI*2*i)/10+seed;const r=8+randSeed(seed+i)*12;line(ctx,[{x,y},{x:x+Math.cos(a)*r,y:y+Math.sin(a)*r}],2,c1,alpha*.85,3);}circle(ctx,x,y,7,c2,alpha*.55,10);}
function fairyBurst(ctx,x,y,seed,alpha){for(let i=0;i<7;i++){const a=(Math.PI*2*i)/7+seed;const px=x+Math.cos(a)*12,py=y+Math.sin(a)*12;ctx.save();ctx.translate(px,py);ctx.rotate(a);ctx.globalAlpha=alpha;ctx.fillStyle=i%2?'#ff8fdb':'#ffffff';ctx.beginPath();ctx.moveTo(0,-4);ctx.lineTo(1.5,-1);ctx.lineTo(5,0);ctx.lineTo(1.5,1);ctx.lineTo(0,4);ctx.lineTo(-1.5,1);ctx.lineTo(-5,0);ctx.lineTo(-1.5,-1);ctx.closePath();ctx.fill();ctx.restore();}circle(ctx,x,y,8,'#ffd6f0',alpha*.5,9);}
function drawTravel(ctx,type,x1,y1,x2,y2,seed,alpha){const s=v343Cfg(type).style;switch(s){case'lightning':return bolt(ctx,x1,y1,x2,y2,seed,alpha,4);case'flame':return fanFlame(ctx,x1,y1,x2,y2,seed,alpha);case'water':return waterJet(ctx,x1,y1,x2,y2,seed,alpha);case'ice':return iceBeam(ctx,x1,y1,x2,y2,seed,alpha);case'grass':return leafTrail(ctx,x1,y1,x2,y2,seed,alpha);case'poison':return poisonCloud(ctx,x1,y1,x2,y2,seed,alpha);case'psychic':return psychicWave(ctx,x1,y1,x2,y2,seed,alpha);case'earth':return earthSpike(ctx,x1,y1,x2,y2,seed,alpha);case'rock':return rockShards(ctx,x1,y1,x2,y2,seed,alpha);case'wind':return windSlash(ctx,x1,y1,x2,y2,seed,alpha);case'ghost':case'dark':return ghostTrail(ctx,x1,y1,x2,y2,seed,alpha);case'dragon':return dragonSpiral(ctx,x1,y1,x2,y2,seed,alpha);case'steel':return steelSlash(ctx,x1,y1,x2,y2,seed,alpha);default:return impactBurst(ctx,(x1+x2)/2,(y1+y2)/2,seed,alpha,v343Cfg(type).mid,v343Cfg(type).core);} }
function drawImpact(ctx,type,x,y,seed,alpha){const cfg=v343Cfg(type);switch(cfg.style){case'lightning':bolt(ctx,x-18,y-8,x+18,y+8,seed,alpha,3);impactBurst(ctx,x,y,seed,alpha,'#9ce7ff','#ffffff');break;case'flame':impactBurst(ctx,x,y,seed,alpha,'#ff7a30','#ffe199');for(let i=0;i<9;i++)circle(ctx,x+(randSeed(seed+i)-.5)*20,y+(randSeed(seed+i*2)-.5)*14,2+randSeed(seed+i*3)*3,'#ff9a3a',alpha*.8,6);break;case'water':for(let i=0;i<12;i++){const a=(Math.PI*2*i)/12;line(ctx,[{x,y},{x:x+Math.cos(a)*(8+i%3*3),y:y+Math.sin(a)*(8+i%3*3)}],2,'#8fe8ff',alpha*.8,4);}circle(ctx,x,y,10,'#dffcff',alpha*.45,8);break;case'ice':impactBurst(ctx,x,y,seed,alpha,'#9ce9ff','#ffffff');for(let i=0;i<8;i++){const a=(Math.PI*2*i)/8;line(ctx,[{x,y},{x:x+Math.cos(a)*12,y:y+Math.sin(a)*12}],1.4,'#ffffff',alpha*.95,0);}break;case'grass':for(let i=0;i<8;i++){const a=(Math.PI*2*i)/8+seed;ctx.save();ctx.translate(x+Math.cos(a)*8,y+Math.sin(a)*8);ctx.rotate(a);ctx.globalAlpha=alpha;ctx.fillStyle=i%2?'#89da65':'#d9ff9c';ctx.beginPath();ctx.moveTo(-5,0);ctx.quadraticCurveTo(0,-3,5,0);ctx.quadraticCurveTo(0,3,-5,0);ctx.fill();ctx.restore();}break;case'poison':poisonCloud(ctx,x-10,y,x+10,y,seed,alpha);break;case'psychic':for(let i=0;i<3;i++){ctx.save();ctx.translate(x,y);ctx.rotate(seed+i*.5);ctx.globalAlpha=alpha*(1-i*.18);ctx.strokeStyle=i%2?'#ff9bf7':'#ffffff';ctx.lineWidth=2;ctx.shadowColor='#ff8ef9';ctx.shadowBlur=8;ctx.beginPath();ctx.ellipse(0,0,8+i*6,4+i*2,0,0,Math.PI*2);ctx.stroke();ctx.restore();}break;case'earth':case'rock':earthSpike(ctx,x-14,y+6,x+14,y+6,seed,alpha);rockShards(ctx,x-10,y,x+10,y,seed,alpha);break;case'wind':impactBurst(ctx,x,y,seed,alpha,'#dff7ff','#ffffff');break;case'ghost':case'dark':ghostTrail(ctx,x-12,y,x+12,y,seed,alpha);break;case'dragon':dragonSpiral(ctx,x-12,y,x+12,y,seed,alpha);break;case'steel':steelSlash(ctx,x-16,y-4,x+16,y+4,seed,alpha);impactBurst(ctx,x,y,seed,alpha,'#c7d3df','#ffffff');break;case'fairy':fairyBurst(ctx,x,y,seed,alpha);break;default:impactBurst(ctx,x,y,seed,alpha,cfg.mid,cfg.core);} }
const oldUse=BattleEngine.prototype.useMove;
BattleEngine.prototype.useMove=function(i){const b=battle,m=b?.active?current():null,s=m?skillSet(m)?.[i]:null;const now=performance.now();const before=(cooldowns||[])[i]||0;const res=oldUse.call(this,i);if(s&&b===battle&&b?.active&&(cooldowns||[])[i]>now&&(cooldowns||[])[i]!==before){this.v343Fx||(this.v343Fx=[]);this.v343Fx.push({kind:'cast',type:s.type||'normal',start:now,end:now+Math.max(240,s.kind==='beam'?420:300),seed:Math.random()*1000,from:'player'});if(this.v343Fx.length>40)this.v343Fx.shift();}return res;};
const oldHit=BattleEngine.prototype.hitTarget;
BattleEngine.prototype.hitTarget=function(side,type,power){const res=oldHit.call(this,side,type,power);if(battle?.active&&type){this.v343Fx||(this.v343Fx=[]);this.v343Fx.push({kind:'impact',type:type||'normal',start:performance.now(),end:performance.now()+360,seed:Math.random()*1000,from:side});if(this.v343Fx.length>50)this.v343Fx.shift();}return res;};
const oldProj=BattleEngine.prototype.drawProjectile;
BattleEngine.prototype.drawProjectile=function(p){const type=p?.type||'normal';if(['electric','fire','water','ice','grass','poison','psychic','ground','rock','ghost','dark','flying','dragon','steel','fairy'].includes(type)){const tail=p.tail?.[0]||{x:p.x-(p.vx||0)*.045,y:p.y-(p.vy||0)*.045};const ctx=this.ctx;ctx.save();circle(ctx,p.x,p.y,Math.max(5,(p.r||7)*1.55),ARENA_BG,1,0);drawTravel(ctx,type,tail.x,tail.y,p.x,p.y,performance.now()*.02+p.x*.01,.95);ctx.restore();return;}return oldProj.call(this,p);};
const oldDraw=BattleEngine.prototype.draw;
BattleEngine.prototype.draw=function(now){oldDraw.call(this,now);if(!battle?.active||!this.ctx)return;const ctx=this.ctx;const low=this.fps&&this.fps<27;const fx=(this.v343Fx||[]);ctx.save();for(const e of fx){if(now>e.end)continue;const a=clamp((e.end-now)/(e.end-e.start),0,1);const source=e.from==='enemy'?this.enemy:this.player;const target=e.from==='enemy'?this.player:this.enemy;if(e.kind==='cast'){drawTravel(ctx,e.type,source.x,source.y-this.h*.12,target.x,target.y-this.h*.12,e.seed+now*.003,low?a*.65:a);}else if(e.kind==='impact'){drawImpact(ctx,e.type,target.x,target.y-this.h*.1,e.seed+now*.003,low?a*.75:a);} }
 ctx.restore();this.v343Fx=fx.filter(e=>now<e.end);};
const style=document.createElement('style');style.id='v343_css';style.textContent=`
.skillBtn[data-type="electric"], .skillV8[data-type="electric"]{box-shadow:0 0 0 1px #3aa5ff44,inset 0 0 18px #7dd6ff22}
.skillBtn[data-type="fire"], .skillV8[data-type="fire"]{box-shadow:0 0 0 1px #ff8a3d44,inset 0 0 18px #ffb34722}
.skillBtn[data-type="water"], .skillV8[data-type="water"]{box-shadow:0 0 0 1px #4bbdff44,inset 0 0 18px #9deeff22}
.skillBtn[data-type="grass"], .skillV8[data-type="grass"]{box-shadow:0 0 0 1px #54cb6b44,inset 0 0 18px #b6ff8d22}
.skillBtn[data-type="psychic"], .skillV8[data-type="psychic"]{box-shadow:0 0 0 1px #e96dff44,inset 0 0 18px #ffb1fb22}
.skillBtn[data-type="poison"], .skillV8[data-type="poison"]{box-shadow:0 0 0 1px #8f4fe044,inset 0 0 18px #d8a1ff22}
`;document.head.appendChild(style);
window.PokemonTorreV343Diagnostics=()=>({version:V343,types:Object.keys(TYPE_VFX),fxCount:(engine&&engine.v343Fx?engine.v343Fx.length:0),styles:Object.fromEntries(Object.entries(TYPE_VFX).map(([k,v])=>[k,v.style]))});
})();
/* FIM POKEMON TORRE V34.3 */

/* V34.3 Signature moves: frame-driven trails and impacts for 11 named attacks */
(function(){
'use strict';
const SIGNATURES={
 'thunderbolt':'thunderbolt','raio':'thunderbolt','choque do trovão':'thunderbolt',
 'thunder':'thunder','trovão':'thunder',
 'flamethrower':'flamethrower','lança-chamas':'flamethrower',
 'fire blast':'fireblast','explosão de fogo':'fireblast',
 'surf':'surf','surfar':'surf',
 'hydro pump':'hydropump','hidro bomba':'hydropump',
 'ice beam':'icebeam','raio de gelo':'icebeam',
 'psychic':'psychic','psíquico':'psychic',
 'shadow ball':'shadowball','bola sombria':'shadowball',
 'earthquake':'earthquake','terremoto':'earthquake',
 'rock slide':'rockslide','avalanche de pedras':'rockslide'
};
function signature(name){return SIGNATURES[String(name||'').normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase()] || SIGNATURES[String(name||'').toLowerCase()] || null;}
function q01(n){return Math.min(1,Math.max(0,n));}
function vfxQuality(eng){const quality=save?.v34?.settings?.quality;const reduce=window.matchMedia?.('(prefers-reduced-motion: reduce)')?.matches;return reduce||quality==='baixo'||(eng.fps>0&&eng.fps<32)?'low':quality==='alto'&&eng.fps>=48?'high':'medium';}
function rand(n){const x=Math.sin(n*79.7+14.13)*42319.19;return x-Math.floor(x);}
function mix(a,b,t){return a+(b-a)*t;}
function stroke(ctx,points,color,width,opacity=1,glow=0){ctx.save();ctx.lineWidth=width;ctx.strokeStyle=color;ctx.globalAlpha=q01(opacity);ctx.shadowColor=color;ctx.shadowBlur=glow;ctx.lineJoin='round';ctx.lineCap='round';ctx.beginPath();points.forEach((p,i)=>i?ctx.lineTo(p.x,p.y):ctx.moveTo(p.x,p.y));ctx.stroke();ctx.restore();}
function shard(ctx,x,y,angle,size,color,alpha=1){ctx.save();ctx.translate(x,y);ctx.rotate(angle);ctx.globalAlpha=q01(alpha);ctx.fillStyle=color;ctx.beginPath();ctx.moveTo(-size*.66,size*.45);ctx.lineTo(-size*.1,-size);ctx.lineTo(size*.65,-size*.3);ctx.lineTo(size*.35,size*.66);ctx.closePath();ctx.fill();ctx.restore();}
function ring(ctx,x,y,rx,ry,color,alpha=1,rotation=0){ctx.save();ctx.translate(x,y);ctx.rotate(rotation);ctx.strokeStyle=color;ctx.lineWidth=2;ctx.globalAlpha=q01(alpha);ctx.shadowColor=color;ctx.shadowBlur=5;ctx.beginPath();ctx.ellipse(0,0,rx,ry,0,0,Math.PI*2);ctx.stroke();ctx.restore();}
function flame(ctx,ox,oy,tx,ty,seed,alpha,quality){const x=tx-ox,y=ty-oy,len=Math.hypot(x,y)||1,perp={x:-y/len,y:x/len};const n=quality==='low'?3:quality==='high'?9:6;for(let i=0;i<n;i++){const w=(i-(n-1)/2)/n,l=(.64+rand(seed+i*3)*.31),px=ox+x*l+perp.x*w*len*.18,py=oy+y*l+perp.y*w*len*.18;const pts=[{x:ox,y:oy},{x:ox+x*.22+perp.x*w*len*.04,y:oy+y*.22+perp.y*w*len*.04},{x:ox+x*.47+perp.x*w*len*.1,y:oy+y*.47+perp.y*w*len*.1},{x:px,y:py}];stroke(ctx,pts,i%2?'#ff712c':'#ffa43d',quality==='low'?4.5:7,alpha*.7,quality==='low'?0:9);stroke(ctx,pts,'#ffe8ad',quality==='low'?1.6:2,alpha*.9,0);} }
function lightning(ctx,x,y,tx,ty,seed,alpha,branches,low=false){const dx=tx-x,dy=ty-y,l=Math.hypot(dx,dy)||1,nx=-dy/l,ny=dx/l;const pts=[{x,y}],N=low?7:12;for(let i=1;i<N;i++){const t=i/N,off=(rand(seed+i*2.11)-.5)*Math.min(37,l*.23)*Math.sin(Math.PI*t);pts.push({x:x+dx*t+nx*off,y:y+dy*t+ny*off});}pts.push({x:tx,y:ty});stroke(ctx,pts,'#358eff',low?4:7,alpha*.55,low?0:12);stroke(ctx,pts,'#b9f2ff',low?2:3.3,alpha,low?0:5);stroke(ctx,pts,'#ffffff',.85,alpha,0);for(let i=2;i<N-1;i+=low?4:2){const p=pts[i],dir=i%2?1:-1,t=low?11:21;stroke(ctx,[p,{x:p.x+nx*t*dir+dx*.055,y:p.y+ny*t*dir+dy*.055},{x:p.x+nx*t*1.4*dir+dx*.09,y:p.y+ny*t*1.4*dir+dy*.09}],'#c9f8ff',1.2,alpha*.85,0);} }
function spray(ctx,x,y,tx,ty,seed,alpha,quality){const low=quality==='low',waves=low?2:5;for(let j=0;j<waves;j++){const pts=[];for(let i=0;i<=14;i++){const t=i/14,off=Math.sin(t*13+seed+j)*((j%2?1:-1)*4+j*2)*Math.sin(Math.PI*t);pts.push({x:mix(x,tx,t),y:mix(y,ty,t)+off});}stroke(ctx,pts,j%2?'#2eacff':'#72e0ff',low?4:6,alpha*.65,low?0:8);stroke(ctx,pts,'#e8ffff',1.4,alpha,0);} }
function signatureVfx(ctx,name,phase,ax,ay,bx,by,progress,opacity,seed,quality){
 const low=quality==='low',n=low?5:quality==='high'?16:10,p=q01(progress),a=q01(opacity);if(a<.025)return;
 if(phase==='impact'){
  switch(name){
   case 'thunderbolt':case 'thunder':for(let i=0;i<(low?3:7);i++){const ang=2*Math.PI*i/(low?3:7);lightning(ctx,bx,by,bx+Math.cos(ang)*(17+20*p),by+Math.sin(ang)*(17+20*p),seed+i,a*(1-p),2,low);}break;
   case 'flamethrower':case 'fireblast':for(let i=0;i<n;i++){const ang=i*2.399+seed,rr=(8+rand(i+seed)*18)*p;shard(ctx,bx+Math.cos(ang)*rr,by+Math.sin(ang)*rr,ang,4+6*(1-p),i%2?'#ff7026':'#ffcd73',a*(1-p));}break;
   case 'surf':case 'hydropump':for(let i=0;i<n;i++){const ang=i*2.4+seed,r=(12+rand(seed+i)*23)*p;ring(ctx,bx+Math.cos(ang)*r,by+Math.sin(ang)*r,2.8,4.2,'#c0f8ff',a*(1-p),ang);}ring(ctx,bx,by,10+16*p,5+8*p,'#90ddff',a*(1-p));break;
   case 'icebeam':for(let i=0;i<n;i++){const ang=i*2.399+seed,r=(7+24*p);shard(ctx,bx+Math.cos(ang)*r,by+Math.sin(ang)*r,ang,5+8*p,i%2?'#c2f8ff':'#ffffff',a*(1-p));}break;
   case 'psychic':for(let i=0;i<(low?2:4);i++)ring(ctx,bx,by,8+18*p+i*6,3+8*p+i*2,i%2?'#f8adff':'#a985ff',a*(1-p),seed+i*.43);break;
   case 'shadowball':for(let i=0;i<n;i++){const ang=i*2.399+seed;shard(ctx,bx+Math.cos(ang)*(8+24*p),by+Math.sin(ang)*(8+24*p),ang,5,'#8e65c7',a*(1-p));}break;
   case 'earthquake':for(let i=0;i<(low?3:7);i++){const dir=i*2.4+seed,d=26*p;stroke(ctx,[{x:bx,y:by},{x:bx+Math.cos(dir)*d*.55,y:by+Math.sin(dir)*d*.35},{x:bx+Math.cos(dir+(.4*(i%2?1:-1)))*d,y:by+Math.sin(dir)*d*.55}],'#d9ad75',low?1.5:2.3,a*(1-p),0);}break;
   case 'rockslide':for(let i=0;i<n;i++){const x=bx+(rand(seed+i)-.5)*38,y=by-18+25*p+rand(seed+i*3)*13;shard(ctx,x,y,seed+i,4+rand(i+seed)*5,i%2?'#ae8451':'#e3bd82',a*(1-p));}break;
  }
  return;
 }
 switch(name){
  case 'thunderbolt':{for(let j=0;j<(low?1:2);j++)lightning(ctx,ax,ay,bx,by,seed+j*5+Math.floor(p*12),a*.9,4,low);break;}
  case 'thunder':{const top=by-120-(low?0:45);lightning(ctx,bx+(rand(seed)-.5)*9,top,bx,by,seed+Math.floor(p*11),a,6,low);if(!low)lightning(ctx,ax,ay,bx,by,seed+5,a*.5,3,false);break;}
  case 'flamethrower':{flame(ctx,ax,ay,mix(ax,bx,p),mix(ay,by,p),seed+p*4,a,quality);break;}
  case 'fireblast':{flame(ctx,ax,ay,bx,by,seed+p*4,a,quality);const rad=(low?23:37)*(.4+.6*p);for(let i=0;i<5;i++){const angle=(i*4*Math.PI/5)+seed*.02;stroke(ctx,[{x:bx,y:by},{x:bx+Math.cos(angle)*rad,y:by+Math.sin(angle)*rad}],'#ffb753',low?2:4,a,low?0:8);}break;}
  case 'surf':{const w=low?68:108,x=bx-45*p,y=by+19-25*p;for(let k=0;k<(low?2:4);k++){const pts=[];for(let i=0;i<=16;i++){const t=i/16;pts.push({x:x-w/2+t*w,y:y+Math.sin(t*7.2-p*4.5+k*.9)*(4+k*2)});}stroke(ctx,pts,k%2?'#b8faff':'#37b7ff',low?3.5:5,a*(1-p*.4),low?0:6);}break;}
  case 'hydropump':{spray(ctx,ax,ay,bx,by,seed+p*4,a,quality);if(!low){const x=mix(ax,bx,p),y=mix(ay,by,p);for(let i=0;i<6;i++){const ang=i*2.4+seed;ring(ctx,x+Math.cos(ang)*11,y+Math.sin(ang)*7,2,3,'#f2ffff',a*.75,ang);}}break;}
  case 'icebeam':{stroke(ctx,[{x:ax,y:ay},{x:bx,y:by}],'#91dbfb',low?4:8,a*.7,low?0:10);stroke(ctx,[{x:ax,y:ay},{x:bx,y:by}],'#f8ffff',low?1.7:3,a,0);for(let i=0;i<(low?3:9);i++){const t=(i+(p*3)%1)/(low?3:9),x=mix(ax,bx,t),y=mix(ay,by,t);shard(ctx,x,y+(i%2?7:-7),seed+i,3.5,'#bcf5ff',a);}break;}
  case 'psychic':{const x=mix(ax,bx,p),y=mix(ay,by,p);for(let i=0;i<(low?2:5);i++)ring(ctx,x,y,7+i*5,4+i*2,i%2?'#ffd2ff':'#df7cff',a*(1-i*.13),seed+p*4+i*.4);break;}
  case 'shadowball':{const x=mix(ax,bx,p),y=mix(ay,by,p);for(let i=0;i<(low?4:12);i++){const ang=i*2.399+seed+p*6,r=5+(i%4)*2.5;shard(ctx,x+Math.cos(ang)*r,y+Math.sin(ang)*r,ang,3+(i%3),'#b899fc',a*.75);}ring(ctx,x,y,8,4,'#7365cf',a*.8,seed+p*6);break;}
  case 'earthquake':{const dx=bx-ax,dy=by-ay;for(let j=0;j<(low?1:3);j++){const pts=[{x:ax,y:ay+18}];for(let i=1;i<=9;i++){const t=i/9;pts.push({x:ax+dx*t,y:ay+18+dy*t+(rand(seed+i+j*11)-.5)*12});}stroke(ctx,pts,j===0?'#6e442b':'#dfb07a',j===0?low?4:6:2,a*(1-p*.3),low?0:4);}break;}
  case 'rockslide':{for(let i=0;i<n;i++){const x=bx+(rand(seed+i)-.5)*66,y=by-90+95*((p+i/n)%1);shard(ctx,x,y,seed+i+p*3,5+rand(i+seed*2)*6,i%2?'#a88453':'#d4b27c',a);}break;}
 }
}
const baseUse=BattleEngine.prototype.useMove;
BattleEngine.prototype.useMove=function(i){const b=battle,mon=b?.active?current():null,move=mon?skillSet(mon)?.[i]:null,kind=signature(move?.name);const now=performance.now();const before=(cooldowns||[])[i]||0;const previousProjectiles=this.projectiles?.length||0;const previousSpecial=this.v30Shots?.length||0;
 if(kind&&move?.power>0)this.v343Pending={kind,type:move.type,at:now};
 const ret=baseUse.call(this,i);
 if(!kind||!b?.active||b!==battle||(cooldowns||[])[i]<=now||(cooldowns||[])[i]===before)return ret;
 const quality=vfxQuality(this);this.v343Named||(this.v343Named=[]);
 this.v343Named.push({kind,phase:'travel',from:'player',start:now,duration:quality==='low'?290:420,seed:Math.random()*200});this.v343Named=this.v343Named.slice(-8);
 if(this.projectiles)for(let k=previousProjectiles;k<this.projectiles.length;k++)this.projectiles[k].v343Signature=kind;
 if(this.v30Shots)for(let k=previousSpecial;k<this.v30Shots.length;k++)this.v30Shots[k].v343Signature=kind;
 this.v343Pending={kind,type:move.type,at:now};return ret;
};
const baseHit=BattleEngine.prototype.hitTarget;
BattleEngine.prototype.hitTarget=function(side,type,power){const pending=this.v343Pending;const matched=pending&&side==='enemy'&&pending.type===type&&performance.now()-pending.at<2400;const ret=baseHit.call(this,side,type,power);if(battle?.active&&matched){this.v343Named||(this.v343Named=[]);this.v343Named.push({kind:pending.kind,phase:'impact',from:'player',start:performance.now(),duration:410,seed:Math.random()*200});this.v343Named=this.v343Named.slice(-10);}return ret;};
const baseProjectile=BattleEngine.prototype.drawProjectile;
BattleEngine.prototype.drawProjectile=function(p){if(!p?.v343Signature)return baseProjectile.call(this,p);const tail=p.tail?.[0]||{x:p.x-(p.vx||0)*.045,y:p.y-(p.vy||0)*.045};const q=vfxQuality(this);signatureVfx(this.ctx,p.v343Signature,'travel',tail.x,tail.y,p.x,p.y,.75,.95,p.x*.13+p.y*.17,q);};
const baseDraw=BattleEngine.prototype.draw;
BattleEngine.prototype.draw=function(now){baseDraw.call(this,now);if(!battle?.active||!this.ctx||!this.player||!this.enemy)return;const fx=this.v343Named||[];if(!fx.length)return;const ctx=this.ctx,q=vfxQuality(this);ctx.save();for(const e of fx){const dur=e.duration||350,t=q01((now-e.start)/dur);if(t>=1)continue;const source=e.from==='enemy'?this.enemy:this.player,target=e.from==='enemy'?this.player:this.enemy;signatureVfx(ctx,e.kind,e.phase,source.x,source.y-this.h*.13,target.x,target.y-this.h*.11,t,(1-t*.8)*(q==='low'?.72:1),e.seed,q);}ctx.restore();this.v343Named=fx.filter(e=>now-e.start<e.duration).slice(-8);};
// V34.3 base already uses a single FX queue. Do not allocate timers, DOM nodes or requestAnimationFrame per attack.
window.PokemonTorreV343SignatureDiagnostics=()=>({signatureCount:Object.keys(SIGNATURES).length,eleven:['thunderbolt','thunder','flamethrower','fireblast','surf','hydropump','icebeam','psychic','shadowball','earthquake','rockslide'],quality:battle?.active&&engine?vfxQuality(engine):'auto',queue:engine?.v343Named?.length||0});
})();
/* FIM V34.3 GOLPES INDIVIDUAIS */