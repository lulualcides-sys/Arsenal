/* Pokémon Torre V30.1 — reinício de campanha compatível com Android */
(function(){
 const keys=['pokeTorreKantoV7','pokeTorreKantoV8','pokeTorreKantoV29Backup','pokeTorreKantoV30Safety','pokeTorreKantoV30Missions'];
 const css=document.createElement('style');
 css.textContent='.v301ResetPanel{max-width:560px;margin:auto;padding:5px 2px 8px}.v301ResetPanel h2{margin:4px 0 13px;font-size:clamp(21px,5vw,28px)}.v301ResetPanel p{line-height:1.6;color:#cfdeed;font-size:14px}.v301Warning{border:1px solid #a97750;border-radius:13px;padding:13px 15px;background:#412c2888;color:#ffddbb;margin:12px 0 17px;font-size:13px;line-height:1.5}.v301ResetActions{display:flex;flex-wrap:wrap;gap:10px;margin-top:17px}.v301ResetActions button{flex:1 1 145px;min-height:44px}.v301ConfirmDelete{background:#903d4f!important;color:#fff!important;border:1px solid #c66d7a!important}.v301ResetError{color:#ffd2d7;font-size:13px;margin-top:9px}';
 document.head.appendChild(css);
 function showReset(){
  if(battle?.active)return;
  overlay('<div class="v301ResetPanel" role="dialog" aria-label="Confirmar reinício da campanha"><div class="overline">CONFIGURAÇÕES · NOVA JORNADA</div><h2>↻ Reiniciar campanha?</h2><p>Seu time, sua caixa, os ginásios, a Pokédex, moedas, missões e recompensas voltarão ao início.</p><div class="v301Warning"><b>Esta ação não pode ser desfeita.</b> Também remove os backups automáticos. Para guardar seu progresso, volte às opções e baixe um backup antes.</div><div class="v301ResetActions"><button class="btn ghost" id="v301CancelReset" type="button">Cancelar</button><button class="btn v301ConfirmDelete" id="v301ConfirmReset" type="button">Sim, começar de novo</button></div><div class="v301ResetError" id="v301ResetError" role="alert"></div></div>');
  $('v301CancelReset').onclick=()=>{close();render()};
  $('v301ConfirmReset').onclick=doReset;
 }
 function doReset(){
  const btn=$('v301ConfirmReset');if(btn)btn.disabled=true;
  const previous=save,clean=defaultSave();
  try{
   localStorage.setItem(SAVE_KEY,JSON.stringify(clean));
   const check=JSON.parse(localStorage.getItem(SAVE_KEY)||'null');
   if(!check||check.starter!==null||!Array.isArray(check.team)||check.team.length)throw Error('Gravação do novo início não confirmada.');
   for(const key of keys)localStorage.removeItem(key);
   save=clean;
   if(typeof v30MissionState!=='undefined')v30MissionState={};
   if(typeof v30LastCaught!=='undefined')v30LastCaught=0;
   stopTimers();battle=null;cooldowns=[0,0,0,0];
   if($('modal'))$('modal').classList.remove('combatModal');
   close();render();
   const banner=document.createElement('div');banner.id='v301ResetSuccess';banner.className='notice';
   banner.textContent='✅ Campanha reiniciada! Escolha seu Pokémon inicial.';
   $('main')?.prepend(banner);
  }catch(err){
   save=previous;if(btn)btn.disabled=false;
   const el=$('v301ResetError');if(el)el.textContent='Não foi possível salvar uma nova campanha. Libere armazenamento e tente novamente. '+String(err?.message||err);
   console.error('Falha ao reiniciar campanha:',err);
  }
 }
 document.addEventListener('click',e=>{
  const target=e.target?.closest?.('#v281Restart, #newBtn');
  if(!target||!target.isConnected)return;
  e.preventDefault();e.stopImmediatePropagation();showReset();
 },true);
})();