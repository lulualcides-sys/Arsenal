// Pokémon Torre V28.1 — visual e menu: nao alterar batalha nem salvamentos.
(function () {
 const css = String.raw`
 .v27Odds .spritewrap{width:30px!important;height:30px!important;min-width:0;min-height:0;display:grid!important;place-items:center!important;overflow:hidden!important;isolation:isolate}
 .v27Odds .spritewrap img.sprite{display:block!important;width:100%!important;height:100%!important;max-width:100%!important;max-height:100%!important;object-fit:contain!important;image-rendering:pixelated}
 .v27Odds .spritewrap .placeholder{font-size:16px!important;line-height:1!important;max-width:26px;max-height:26px;overflow:hidden}
 .v27Odds .spritewrap:has(img.sprite) .placeholder{display:none!important}
 .v27Odds .v27OddsName{min-width:0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
 .v281OptionsButton{appearance:none;border:1px solid #35536b;color:#b9cbdd;background:#112439;border-radius:50%;width:31px;height:31px;display:inline-grid;place-items:center;font-size:15px;cursor:pointer;opacity:.86}
 .v281OptionsButton:hover,.v281OptionsButton:focus-visible{opacity:1;border-color:#88adbb}
 .v281Danger{background:transparent;border-color:#73515e;color:#e5afb6;font-size:12px}
 .v281SettingsActions{display:flex;flex-wrap:wrap;gap:8px;margin-top:16px}
 .v281SettingsActions .btn{flex:1 1 145px}
 @media(max-width:500px){.v27Odds .spritewrap{width:26px!important;height:26px!important}.v27Odds .spritewrap .placeholder{font-size:14px!important;max-width:22px;max-height:22px}}
 `;
 const style = document.createElement('style');style.id='v281Style';style.textContent=css;document.head.appendChild(style);
 const oldRender=render;
 function openSettings() {
  if(battle)return;
  overlay(`<div class="sectionhead"><div><div class="overline">POKÉMON TORRE · CONFIGURAÇÕES</div><h2>⚙️ Opções</h2></div><button class="btn tiny ghost" id="v281Close">✕</button></div><p class="desc">Seu progresso é salvo automaticamente neste navegador. Salve uma cópia antes de reiniciar, se desejar.</p><div class="v281SettingsActions"><button type="button" class="btn ghost" id="v281Backup">💾 Baixar backup</button><button type="button" class="btn ghost" id="v281Exit">Voltar ao jogo</button></div><hr class="divider"><p class="desc">Nova jornada: apaga equipe, caixa, moedas, insígnias e progresso da campanha deste navegador.</p><button type="button" class="btn ghost v281Danger" id="v281Restart">↻ Reiniciar campanha</button>`);
  $('v281Close').onclick=close;
  $('v281Exit').onclick=close;
  $('v281Backup').onclick=()=>{
   const blob=new Blob([JSON.stringify(save,null,2)],{type:'application/json'});
   const u=URL.createObjectURL(blob),a=document.createElement('a');
   a.href=u;a.download='pokemon-torre-backup-antes-reset.json';document.body.appendChild(a);a.click();a.remove();
   setTimeout(()=>URL.revokeObjectURL(u),2000);
  };
  $('v281Restart').onclick=()=>{
   const phrase=prompt('Para apagar a campanha, digite REINICIAR (em letras maiúsculas):','');
   if(phrase!=='REINICIAR')return;
   if(!confirm('Apagar definitivamente sua equipe, moedas e todas as insígnias? O reset não poderá ser desfeito sem um backup.'))return;
   stopTimers();battle=null;save=defaultSave();persist();close();render();
  };
 }
 render=function(){
  oldRender();if(battle)return;
  const host=$('resources');
  if(host&&!$('v281SettingsButton')){
   const b=document.createElement('button');b.type='button';b.id='v281SettingsButton';
   b.className='v281OptionsButton';b.textContent='⚙️';b.title='Opções da campanha';
   b.setAttribute('aria-label','Opções da campanha');b.onclick=openSettings;host.appendChild(b);
  }
 };
})();
