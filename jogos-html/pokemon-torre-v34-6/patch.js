/* POKEMON TORRE V34.6 — clima vivo, golpes conforme 15 vídeos e lista ordenada */
(function(){
'use strict';
const REV='34.6';
const clamp=(n,a,b)=>Math.max(a,Math.min(b,n));
const nrm=(s)=>String(s||'').normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase().replace(/[^a-z0-9]/g,'');
const rgba=(a)=>'rgba('+a.join(',')+')';
const fxStyles={
 thunderbolt:{kind:'bolt',color:'#fcf3a0',duration:370},
 thunder:{kind:'thunder',color:'#d0ecff',duration:570},
 flamethrower:{kind:'flame',color:'#ffa34f',duration:530},
 lancachamas:{kind:'flame',color:'#ffa34f',duration:530},
 fireblast:{kind:'fireblast',color:'#ff9944',duration:600},
 explosaodefogo:{kind:'fireblast',color:'#ff9944',duration:600},
 surf:{kind:'surf',color:'#a3eaff',duration:620},
 hydropump:{kind:'pump',color:'#a3eaff',duration:520},
 hidrobomba:{kind:'pump',color:'#a3eaff',duration:520},
 icebeam:{kind:'ice',color:'#d6f6ff',duration:470},
 raiodegelo:{kind:'ice',color:'#d6f6ff',duration:470},
 psychic:{kind:'psychic',color:'#ebafff',duration:520},
 psiquico:{kind:'psychic',color:'#ebafff',duration:520},
 shadowball:{kind:'shadow',color:'#b694ff',duration:560},
 boladesombra:{kind:'shadow',color:'#b694ff',duration:560},
 earthquake:{kind:'quake',color:'#f5c58f',duration:650},
 terremoto:{kind:'quake',color:'#f5c58f',duration:650},
 rockslide:{kind:'rocks',color:'#f5c58f',duration:600},
 deslizamentodepedra:{kind:'rocks',color:'#f5c58f',duration:600}
};
const THEME_NAMES={fog:'NEVOEIRO',volcano:'VULCÃO',sun:'SOL FORTE',rain:'CHUVA',storm:'TEMPESTADE',sand:'AREIA',clear:'CÉU LIMPO'};
function env(){
 const b=battle;if(!b?.active)return 'clear';
 const label=String(b.label||'').toLowerCase();
 if(/vulc[aã]o|volcano|lava|blaine|cinnabar/.test(label)||save.gym===6)return 'volcano';
 if(/nevoeiro|fog|mist|bruma/.test(label)||b.v32Weather==='fog'||save.gym===4||save.gym===5)return 'fog';
 if(b.v32Weather==='sun'||/sol forte|ensolarado/.test(label))return 'sun';
 if(['rain','sand','storm'].includes(b.v32Weather))return b.v32Weather;
 return 'clear';
}
function flag(n){return (Math.sin(n*13.345+1.75)*14758.234)%1;}
function rnd(n){let x=flag(n);return x<0?x+1:x;}
function stroke(ctx,p,clr,width,alpha){if(p.length<2)return;ctx.save();ctx.lineCap='round';ctx.lineJoin='round';ctx.strokeStyle=clr;ctx.lineWidth=width;ctx.globalAlpha=alpha;ctx.beginPath();ctx.moveTo(p[0][0],p[0][1]);for(let i=1;i<p.length;i++)ctx.lineTo(p[i][0],p[i][1]);ctx.stroke();ctx.restore();}
function bolt(ctx,x1,y1,x2,y2,seed,progress,alpha){
 const dx=x2-x1,dy=y2-y1,l=Math.hypot(dx,dy)||1,px=-dy/l,py=dx/l;
 const a=[[x1,y1]],segments=12,ends=clamp(Math.ceil(segments*progress),1,segments);
 for(let i=1;i<=ends;i++){const t=i/segments,off=(rnd(seed+i*7)-.5)*Math.min(27,l*.16)*Math.sin(Math.PI*t);a.push([x1+dx*t+px*off,y1+dy*t+py*off]);}
 stroke(ctx,a,'#4257ad',6,alpha*.28);stroke(ctx,a,'#f7d56a',3.0,alpha*.82);stroke(ctx,a,'#fff9cd',1.15,alpha);
 for(let i=2;i<a.length-1;i+=3){const p=a[i],sg=i%2?1:-1;stroke(ctx,[p,[p[0]+px*l*.105*sg+dx*.05,p[1]+py*l*.105*sg+dy*.05],[p[0]+px*l*.17*sg+dx*.08,p[1]+py*l*.17*sg+dy*.08]],'#fff7ae',1.15,alpha*.78);}
}
function ground(ctx,mark,now){const elapsed=(now-mark.at)/mark.life;if(elapsed>1)return;const a=clamp(.55*(1-elapsed),0,.55),x=mark.x,y=mark.y;
 if(mark.type==='quake'||mark.type==='rocks'){
  for(let k=0;k<6;k++){const angle=k*1.047+mark.seed*.06,points=[[x,y]];for(let j=1;j<=3;j++){const r=j*(10+mark.power*.13),tw=(rnd(mark.seed+k*8+j)-.5)*8;points.push([x+Math.cos(angle)*r+tw,y+Math.sin(angle)*r*.55+tw*.30]);}stroke(ctx,points,'#49382c',2.2,a);stroke(ctx,points,'#e8c29b',.8,a*.55);}
 }else if(mark.type==='fireblast'||mark.type==='flame'){
  ctx.save();ctx.globalAlpha=a*.6;ctx.fillStyle='#3c2724';ctx.beginPath();ctx.ellipse(x,y,mark.power*.65,mark.power*.28,.04,0,Math.PI*2);ctx.fill();ctx.restore();
 }else if(mark.type==='poison'||mark.type==='shadow'){
  ctx.save();ctx.globalAlpha=a*.42;ctx.fillStyle='#8651a4';ctx.beginPath();ctx.ellipse(x,y,mark.power*.48,mark.power*.22,0,0,Math.PI*2);ctx.fill();ctx.restore();
 }else if(mark.type==='surf'||mark.type==='pump'){
  ctx.save();ctx.globalAlpha=a*.23;ctx.fillStyle='#8fdef4';ctx.beginPath();ctx.ellipse(x,y,mark.power*.54,mark.power*.20,0,0,Math.PI*2);ctx.fill();ctx.restore();
 }
}
function drawAttack(ctx,e,now,engine){
 const t=clamp((now-e.at)/e.duration,0,1),a=clamp(Math.min(t*5,(1-t)*5,1),0,1),w=engine.w,h=engine.h;
 const x=e.x1,y=e.y1,X=e.x2,Y=e.y2,dx=X-x,dy=Y-y,len=Math.hypot(dx,dy)||1,perp=[-dy/len,dx/len];
 const tip=[x+dx*clamp(t*1.65,0,1),y+dy*clamp(t*1.65,0,1)];
 if(e.kind==='bolt'){bolt(ctx,x,y,X,Y,e.seed,t*1.7,a);return;}
 if(e.kind==='thunder'){
  const startX=X+Math.sin(e.seed)*h*.03;
  bolt(ctx,startX,-h*.05,X,Y,e.seed,t*1.5,a);bolt(ctx,startX+16,-h*.12,X+8,Y-12,e.seed+3,t*1.4,a*.58);return;
 }
 if(e.kind==='flame'||e.kind==='fireblast'){
  const jets=e.kind==='fireblast'?7:5,angle=Math.atan2(dy,dx);
  for(let j=0;j<jets;j++){const q=(j-(jets-1)/2)/(jets-1),rad=angle+q*(e.kind==='fireblast'?.68:.24),dist=len*clamp(t*1.55,0,1)*(e.kind==='fireblast'?.8+Math.abs(q)*.32:1);
    const p=[x+Math.cos(rad)*dist,y+Math.sin(rad)*dist];const mid=[x+Math.cos(rad)*dist*.58+perp[0]*Math.sin(now*.011+j)*5,y+Math.sin(rad)*dist*.58+perp[1]*Math.sin(now*.011+j)*5];
    stroke(ctx,[[x,y],mid,p],j%2?'#ff7130':'#ffc458',2.5+(1-Math.abs(q))*5,a*.78);
    if(j%2===0&&t>.23){ctx.save();ctx.globalAlpha=a*.8;ctx.fillStyle='#ffd685';ctx.fillRect(p[0]-2,p[1]-2,4,4);ctx.restore();}
  }return;
 }
 if(e.kind==='surf'||e.kind==='pump'){
  const n=e.kind==='surf'?4:2;
  for(let j=0;j<n;j++){const offset=(j-(n-1)/2)*(e.kind==='surf'?10:5),p=[];
   for(let k=0;k<=9;k++){const q=k/9*t*1.6;p.push([x+dx*clamp(q,0,1)+perp[0]*(offset+Math.sin(q*17+now*.008+j)*5),y+dy*clamp(q,0,1)+perp[1]*(offset+Math.sin(q*17+now*.008+j)*5)]);}
   stroke(ctx,p,j%2?'#e4ffff':'#68caff',e.kind==='surf'?6:3.6,a*.75);
  }return;
 }
 if(e.kind==='ice'){
  stroke(ctx,[[x,y],[tip[0],tip[1]]],'#d6fbff',5,a*.68);
  for(let j=0;j<12;j++){const q=j/12*t*1.6,c=[x+dx*clamp(q,0,1),y+dy*clamp(q,0,1)],r=4+rnd(j+e.seed)*5;
   stroke(ctx,[[c[0]-r,c[1]],[c[0]+r,c[1]],[c[0],c[1]-r],[c[0],c[1]+r]],'#eaffff',.8,a*.8);
  }return;
 }
 if(e.kind==='psychic'||e.kind==='shadow'){
  for(let j=0;j<4;j++){const tt=clamp(t*1.3-j*.13,0,1),cx=x+dx*tt,cy=y+dy*tt;
   ctx.save();ctx.globalAlpha=a*.62;ctx.strokeStyle=e.kind==='psychic'?'#db8cff':'#7c63b6';ctx.lineWidth=2;ctx.beginPath();
   ctx.ellipse(cx,cy,9+j*4,5+j*3,t*4+j,0,Math.PI*2);ctx.stroke();ctx.restore();
  }return;
 }
 if(e.kind==='quake'||e.kind==='rocks'){
  for(let j=0;j<7;j++){const q=j/6,px=X+(rnd(e.seed+j*3)-.5)*h*.22,py=Y+(rnd(e.seed+j*8)-.5)*h*.12;
   if(e.kind==='quake'){
    if(t>q*.15)stroke(ctx,[[px-8,py+2],[px+1,py-6],[px+8,py+4]],'#f4bd7c',2.8,a*.73);
   }else{
    const yy=py-h*.45*(1-t)+Math.sin(now*.015+j)*2;
    ctx.save();ctx.globalAlpha=a*.74;ctx.fillStyle=j%2?'#b88b58':'#e6c298';ctx.beginPath();ctx.moveTo(px-6,yy);ctx.lineTo(px,yy-8);ctx.lineTo(px+7,yy-2);ctx.lineTo(px+2,yy+7);ctx.closePath();ctx.fill();ctx.restore();
   }
  }return;
 }
}
function atmosphere(engine,now){
 const c=engine.ctx,w=engine.w,h=engine.h,mode=env(),low=engine.fps<32;
 if(mode==='clear')return;
 c.save();
 if(mode==='fog'){
  for(let j=0;j<(low?3:6);j++){const x=((now*(j%2?-.009:.011)+j*154)%(w+180)+w+180)%(w+180)-90;
    const y=h*(.20+j*.125),g=c.createLinearGradient(x-110,y,x+110,y);
    g.addColorStop(0,'rgba(217,228,239,0)');g.addColorStop(.5,'rgba(215,234,239,.10)');g.addColorStop(1,'rgba(217,229,239,0)');
    c.fillStyle=g;c.beginPath();c.ellipse(x,y,105,20+j*2,0,0,Math.PI*2);c.fill();
  }
 }else if(mode==='volcano'){
  const groundG=c.createLinearGradient(0,h*.65,0,h);
  groundG.addColorStop(0,'rgba(255,99,31,0)');groundG.addColorStop(1,'rgba(255,83,9,.15)');
  c.fillStyle=groundG;c.fillRect(0,h*.65,w,h*.35);
  for(let i=0;i<(low?9:18);i++){const phase=(now*.000065*(.6+i%4*.23)+rnd(i*19.5))%1;
   const x=(rnd(i*7.2)*w+Math.sin(now*.001+i)*8),y=h*(.92-phase*.68),sz=1.2+(i%3);
   c.globalAlpha=(1-phase)*.64;c.fillStyle=i%3===0?'#fff4a1':i%3===1?'#ff9a41':'#f35b2b';c.fillRect(x,y,sz,sz);
  }c.globalAlpha=1;
 }else if(mode==='sun'){
  const g=c.createLinearGradient(0,0,0,h);
  g.addColorStop(0,'rgba(255,222,125,.14)');g.addColorStop(1,'rgba(255,223,125,0)');
  c.fillStyle=g;c.fillRect(0,0,w,h);
  for(let i=0;i<(low?2:4);i++){const drift=Math.sin(now*.00025+i)*w*.025;
   c.fillStyle='rgba(255,245,182,.045)';c.beginPath();c.moveTo(w*(.60+i*.085)+drift,0);
   c.lineTo(w*(.78+i*.09)+drift,0);c.lineTo(w*(.55+i*.12)+drift,h);c.lineTo(w*(.41+i*.09)+drift,h);c.fill();}
 }else if(mode==='rain'||mode==='storm'){
  c.strokeStyle='rgba(181,225,249,.22)';c.lineWidth=1;
  for(let i=0;i<(low?12:26);i++){const x=(rnd(i*13)*w+now*.06)%w,y=(rnd(i*17)*h+now*.19)%h;
   c.beginPath();c.moveTo(x,y);c.lineTo(x-5,y+12);c.stroke();}
 }else if(mode==='sand'){
  c.fillStyle='rgba(223,174,109,.07)';c.fillRect(0,0,w,h);
 }
 c.restore();
}
function orderEditor(){
 const list=document.querySelector('#modal .v331MoveList');if(!list)return false;
 const items=[...list.querySelectorAll(':scope > .v331Choice')];if(!items.length)return false;
 const num=(str,re)=>{const match=String(str||'').match(re);return match?Number(match[1]):0;};
 const records=items.map((element,index)=>{
   const small=element.querySelector('small')?.textContent||'';
   const cost=num(small,/(\d+)\s*energia/i),power=num(small,/(\d+)\s*força/i),cool=num(small,/([\d.,]+)\s*s\b/i);
   return {element,index,cost,power,cool};
 });
 records.sort((a,b)=>(a.cost===0?0:1)-(b.cost===0?0:1)||b.power-a.power||a.cost-b.cost||a.cool-b.cool||a.index-b.index);
 for(const item of records)list.appendChild(item.element);
 list.setAttribute('data-v346-sorted','1');
 return true;
}
const prevOverlay=overlay;
overlay=function(){const result=prevOverlay.apply(this,arguments);orderEditor();return result;};
const prevUse=BattleEngine.prototype.useMove;
BattleEngine.prototype.useMove=function(i){
 const b=battle,m=b?.active?current():null,s=m?skillSet(m)?.[i]:null,now=performance.now(),prior=cooldowns[i]||0;
 const result=prevUse.call(this,i);
 if(s&&b===battle&&b?.active&&cooldowns[i]>now&&cooldowns[i]!==prior){
  const style=fxStyles[nrm(s.name)];
  if(style){
   const src=this.player,dst=this.enemy;
   this.v346Attacks||=[];this.v346Attacks.push({kind:style.kind,at:now,duration:style.duration,seed:Math.random()*1000,x1:src.x,y1:src.y-this.h*.1,x2:dst.x,y2:dst.y-this.h*.08});
   if(this.v346Attacks.length>7)this.v346Attacks.shift();
  }
 }
 return result;
};
const prevHit=BattleEngine.prototype.hitTarget;
BattleEngine.prototype.hitTarget=function(who,type,power){
 const target=who==='enemy'?this.enemy:this.player,now=performance.now(),v=this.v346Attacks?.[this.v346Attacks.length-1],result=prevHit.call(this,who,type,power);
 if(target&&battle?.active&&who==='enemy'&&v&&now-v.at<1400&&['quake','rocks','fireblast','flame','surf','pump','shadow'].includes(v.kind)){
  this.v346Marks||=[];this.v346Marks.push({type:v.kind,x:target.x,y:target.y+this.h*.06,at:now,life:3500,power:this.h*.095,seed:v.seed});
  if(this.v346Marks.length>15)this.v346Marks.shift();
 }
 return result;
};
const prevDrawMon=BattleEngine.prototype.drawMon;
BattleEngine.prototype.drawMon=function(actor,id,isEnemy,now){
 if(this.v346Marks&&this.v346GroundAt!==now){
   this.v346GroundAt=now;
   const ctx=this.ctx;ctx.save();
   for(const m of this.v346Marks)ground(ctx,m,now);
   ctx.restore();
 }
 return prevDrawMon.call(this,actor,id,isEnemy,now);
};
const prevDraw=BattleEngine.prototype.draw;
BattleEngine.prototype.draw=function(now){
 prevDraw.call(this,now);
 if(!battle?.active||!this.ctx)return;
 this.v346Marks=(this.v346Marks||[]).filter(m=>now-m.at<m.life);
 atmosphere(this,now);
 const ctx=this.ctx;ctx.save();
 const animations=this.v346Attacks||[],low=this.fps<30;
 for(const a of animations.slice(low?-2:-5))if(now-a.at<a.duration)drawAttack(ctx,a,now,this);
 ctx.restore();
 this.v346Attacks=animations.filter(a=>now-a.at<a.duration);
};
const prevStart=startBattle;
startBattle=function(enemies,label,wild){
 const result=prevStart(enemies,label,wild);
 if(battle?.active){
  if(/nevoeiro|fog|mist|bruma/i.test(label||''))battle.v32Weather='fog';
  if(engine){engine.v346Attacks=[];engine.v346Marks=[];}
 }
 return result;
};
const css=document.createElement('style');css.id='v346-design';css.textContent=
 '.v331MoveList .v331Choice{min-height:52px!important;padding:8px 10px!important;gap:7px!important}' +
 '.v331Choice b{font-size:11px!important}.v331Choice small{font-size:9px!important;line-height:1.25!important}' +
 '.v331Choice .pillSmall{font-size:9px!important;min-width:53px!important}' +
 '.v331MoveList[data-v346-sorted="1"]{scroll-behavior:smooth}' +
 '@media(max-width:480px){.v331Slots{gap:5px!important}.v331Slot{padding:8px!important}.v331Slot b{font-size:11px!important}.v331Slot small{font-size:9px!important}.v331MoveList .v331Choice{min-height:49px!important;padding:7px 9px!important}}';
document.head.appendChild(css);
window.PokemonTorreV346Diagnostics=()=>({version:REV,weather:env(),environments:Object.keys(THEME_NAMES),signatureMoves:Object.keys(fxStyles),sortEnabled:!!document.querySelector('[data-v346-sorted="1"]'),activeFx:engine?.v346Attacks?.length||0,marks:engine?.v346Marks?.length||0});
})();
/* FIM POKEMON TORRE V34.6 */