/* Pokémon Torre V34.7 — seleção de sprites dos jogos referenciados */
(function(){
'use strict';
const ROOT='https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-iii/';
const GAMES=['firered-leafgreen','emerald','ruby-sapphire'];
const EMERALD=new Set([3,6,9,12,18,26,31,34,38,45,49,59,65,94,95,103,110,121,130,131,134,135,136,143,144,145,146,149,150,151]);
const RUBY=new Set([24,36,40,53,55,62,73,87,97,112,113,115,122,124,125,126,132,138,139,140,141,142,147,148]);
const byName={};
for(let i=1;i<=151;i++){
 const n=D[i]?.name;
 if(n)byName[n.toLocaleLowerCase('pt-BR')]=i;
}
function edition(id){
 if(EMERALD.has(Number(id)))return 'emerald';
 if(RUBY.has(Number(id)))return 'ruby-sapphire';
 return 'firered-leafgreen';
}
function urls(id,shiny){
 const main=edition(id),all=[main,...GAMES.filter(x=>x!==main)];
 return all.map(game=>ROOT+game+'/'+(shiny?'shiny/':'')+id+'.png');
}
function ready(pic){return Boolean(pic?.complete&&pic.naturalWidth>0);}
function loadGameImage(id,game,shiny){
 const image=new Image();image.decoding='async';image.crossOrigin='anonymous';
 image.src=ROOT+game+'/'+(shiny?'shiny/':'')+id+'.png';
 return image;
}
const loaded=new Map();
function selection(id,shiny=false){
 id=Number(id);const key=id+(shiny?'s':'n');if(loaded.has(key))return loaded.get(key);
 const games=[edition(id),...GAMES.filter(x=>x!==edition(id))];
 const info={selected:games[0],image:null,failures:0,ready:false};
 function next(k){
  if(k>=games.length){info.image=null;return;}
  const img=loadGameImage(id,games[k],shiny);info.image=img;info.selected=games[k];
  img.onload=()=>{info.ready=ready(img)};
  img.onerror=()=>{info.failures++;next(k+1)};
  if(ready(img))info.ready=true;
 }
 next(0);loaded.set(key,info);return info;
}
// A arena usa prioritariamente as animações de Mystery Dungeon (andar, atacar, levar golpe).
// Não elimina os sprites locais: se a conexão falhar, continua com o visual atual.
const previousDraw=BattleEngine.prototype.drawMon;
BattleEngine.prototype.drawMon=function(actor,id,enemy,now){
 const e=this.assets?.get(id);
 if(!e)return previousDraw.call(this,actor,id,enemy,now);
 const special=enemy?foe():current(),shiny=Boolean(special?.shiny||special?.isShiny);
 const action=actor.flash>0?'Hurt':(this.attackActs?.[enemy?'enemy':'player']||0)>this.time?'Attack':
   (Math.hypot(actor.x-(actor._animX||actor.x),actor.y-(actor._animY||actor.y))>.4?'Walk':'Idle');
 const sh=e.sheets?.[action],md=e.meta?.[action];
 const idle=e.sheets?.Idle,im=e.meta?.Idle;
 const pmdAvailable=(ready(sh)&&md?.width>0&&md?.height>0)||(ready(idle)&&im?.width>0&&im?.height>0);
 const keepCustom=e.custom,keepStatic=e.customStatic,keepArt=e.art;
 if(pmdAvailable&&!shiny){
   e.custom={};e.customStatic=null;
 }else if(!pmdAvailable){
   // FireRed/Emerald/Ruby sprite alternativo apenas quando faltam as animações 2D.
   const chosen=selection(id,shiny);
   if(chosen.ready&&ready(chosen.image)){
     e.custom={};e.customStatic=chosen.image;
   }
 }else if(shiny){
   const chosen=selection(id,true);
   if(chosen.ready&&ready(chosen.image)){
     e.custom={};e.customStatic=chosen.image;
   }
 }
 try{return previousDraw.call(this,actor,id,enemy,now);}
 finally{e.custom=keepCustom;e.customStatic=keepStatic;e.art=keepArt;}
};
// As fichas, Pokédex e equipe recebem sprites clássicos HD-pixel conforme a espécie.
function enhancePortrait(pic){
 if(!pic||pic.dataset.v347Processed)return;
 const name=(pic.getAttribute('alt')||'').toLocaleLowerCase('pt-BR'),id=byName[name];
 if(!id)return;
 pic.dataset.v347Processed='1';
 const fallback=pic.getAttribute('src')||'';
 const seq=urls(id,false),ref={index:0};
 pic.addEventListener('error',()=>{
   ref.index+=1;
   if(ref.index<seq.length)pic.src=seq[ref.index];
   else if(fallback && !pic.dataset.v347Fallback){pic.dataset.v347Fallback='1';pic.src=fallback;}
 });
 pic.src=seq[0];
 pic.style.imageRendering='pixelated';
 pic.style.objectFit='contain';
 pic.dataset.v347Source=edition(id);
}
let scheduled=false;
function refresh(){
 document.querySelectorAll('.spritewrap img.sprite').forEach(enhancePortrait);
 const team=document.querySelectorAll('.moncard .spritewrap img.sprite');
 for(const pic of team)pic.style.imageRendering='pixelated';
}
const observer=new MutationObserver(()=>{
 if(scheduled)return;scheduled=true;
 queueMicrotask(()=>{scheduled=false;refresh()});
});
observer.observe(document.body,{childList:true,subtree:true});
refresh();
const style=document.createElement('style');
style.id='v347PokemonSpriteStyle';
style.textContent='.spritewrap .sprite{object-fit:contain!important;image-rendering:pixelated!important}.moncard .spritewrap{overflow:visible}.dexCard .spritewrap .sprite{image-rendering:pixelated!important}';
document.head.appendChild(style);
window.PokemonTorreV347SpriteDiagnostics=()=>({
 version:'34.7-sprites',
 games:GAMES,
 mainSource:'Mystery Dungeon / PMDCollab — em movimento',
 alternatives:['FireRed / LeafGreen','Emerald','Ruby / Sapphire'],
 mappedSpecies:151,
 preferences:{emerald:[...EMERALD].length,ruby:[...RUBY].length,firered:151-EMERALD.size-RUBY.size},
 currentTeam:(save?.team||[]).map(m=>({id:m.id,edition:edition(m.id),shiny:Boolean(m.shiny||m.isShiny)})),
 portraits:document.querySelectorAll('[data-v347-processed]').length
});
})();
/* FIM SPRITES V34.7 */