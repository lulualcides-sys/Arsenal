/* POKEMON TORRE V30.1 — shiny na caca, 10s teleguiado, animacao de desmaio e reacao dos lideres */
(function () {
  const V301_SHINY_MIN = 0.01, V301_SHINY_MAX = 0.03, V301_HOMING_COOLDOWN = 10000;
  for (const move of Object.values(V30_MOVE_TRAITS)) {
    if (move && move.kind === 'homing') move.cd = V301_HOMING_COOLDOWN;
  }
  if (!Array.isArray(save.shinyCaught)) save.shinyCaught = [];
  const css = document.createElement('style');
  css.id = 'v301FeatureCSS';
  css.textContent = `
    .v301ShinyFlag{display:inline-block;color:#ffdc70;font-size:10px;font-weight:850;line-height:1.4;margin-left:4px;text-shadow:0 1px 4px #0009}
    .v301ShinyCard{border-color:#dfba5a!important;box-shadow:inset 0 0 0 1px #dfba5a33}
    .v301ShinyCard .sprite{filter:hue-rotate(95deg) saturate(1.7) brightness(1.1)}
    .v301ShinyCard .placeholder{display:none!important}
    .v301FaintLabel{position:absolute;z-index:15;left:50%;top:37%;transform:translate(-50%,-50%);padding:6px 12px;border:1px solid #f0d3bb77;border-radius:10px;color:#f7ece4;font-size:11px;letter-spacing:.08em;background:#13202cd9;pointer-events:none;animation:v301FadeOut .7s ease-in forwards}
    .v301LeaderQuote{background:#1c3345;color:#f9e4ad;border:1px solid #806947;padding:14px 16px;border-radius:13px;margin:12px auto;max-width:560px;text-align:center;font-size:14px;line-height:1.5}
    @keyframes v301FadeOut{0%{opacity:0;transform:translate(-50%,-40%)}20%{opacity:1;transform:translate(-50%,-50%)}80%{opacity:1}100%{opacity:0;transform:translate(-50%,-80%)}}
    @media(prefers-reduced-motion:reduce){.v301FaintLabel{animation:none}}
  `;
  document.head.appendChild(css);
  const startPrevious = startBattle;
  startBattle = function(enemies, label, wild) {
    if (wild && enemies && enemies[0] && !enemies[0].shiny) {
      const rate = V301_SHINY_MIN + Math.random() * (V301_SHINY_MAX - V301_SHINY_MIN);
      enemies[0].shiny = Math.random() < rate;
      enemies[0].shinyRoll = rate;
    }
    return startPrevious(enemies, label, wild);
  };
  const persistPrevious = persist;
  persist = function() {
    const list = new Set(Array.isArray(save.shinyCaught) ? save.shinyCaught : []);
    for (const m of [...(save.team||[]), ...(save.box||[])]) if(m?.shiny && D[m.id]) list.add(m.id);
    save.shinyCaught = [...list].filter(id=>Number.isInteger(id) && id>=1 && id<=151);
    return persistPrevious();
  };
  const thumbPrevious=thumb;
  thumb = function(m) {
    const html=thumbPrevious(m);
    if (!m?.shiny) return html;
    return html.replace('class="moncard"', 'class="moncard v301ShinyCard"')
      .replace('</strong>', '</strong><span class="v301ShinyFlag">✦ SHINY</span>');
  };
  const pokedexPrevious=showPokedex;
  showPokedex=function(){
    pokedexPrevious();
    const shiny = new Set(save.shinyCaught||[]);
    document.querySelectorAll('.dexGrid .dexCard').forEach((card,index)=>{
      if(!shiny.has(index+1))return;
      card.classList.add('v301ShinyCard');
      const label=document.createElement('small');label.className='v301ShinyFlag';label.textContent='✦ SHINY CAPTURADO';card.appendChild(label);
    });
    const head=$('modal')?.querySelector('.sectionhead');
    if(head){const label=document.createElement('span');label.className='pill';label.textContent='✨ '+shiny.size+' Shiny';head.appendChild(label);}
  };
  const teamPrevious=showTeam;
  showTeam=function(){
    teamPrevious();
    const all=[...(save.team||[]),...(save.box||[])];
    document.querySelectorAll('[data-team]').forEach(button=>{
      const m=all[Number(button.dataset.team)];
      if(!m?.shiny)return;
      button.classList.add('v301ShinyCard');
      const flag=document.createElement('span');flag.className='v301ShinyFlag';flag.textContent='✦ SHINY';button.appendChild(flag);
    });
  };
  const battleRenderPrevious=renderBattle;
  renderBattle=function(){
    battleRenderPrevious();
    if(!battle?.active)return;
    if(battle.foe?.shiny){const n=$('enemyTitle');if(n&&!n.querySelector('.v301ShinyFlag'))n.insertAdjacentHTML('beforeend','<span class="v301ShinyFlag">✦ SHINY</span>');}
    if(current()?.shiny){const n=$('allyTitle');if(n&&!n.querySelector('.v301ShinyFlag'))n.insertAdjacentHTML('beforeend','<span class="v301ShinyFlag">✦ SHINY</span>');}
  };
  const monDrawPrevious=BattleEngine.prototype.drawMon;
  BattleEngine.prototype.drawMon=function(entity,id,isEnemy,now){
    const monster=isEnemy?battle?.foe:(battle?.active?current():null);
    const ctx=this.ctx,shiny=monster?.shiny && monster.id===id;
    const faint=this.v301Faint && this.v301Faint.side === (isEnemy?'enemy':'ally') ? this.v301Faint : null;
    if(!shiny&&!faint)return monDrawPrevious.call(this,entity,id,isEnemy,now);
    ctx.save();
    if(shiny)ctx.filter='hue-rotate(95deg) saturate(1.7) brightness(1.1)';
    if(faint){const t=Math.min(1,Math.max(0,(performance.now()-faint.start)/faint.duration));ctx.globalAlpha=1-t;ctx.translate(0,t*t*30);}
    try{return monDrawPrevious.call(this,entity,id,isEnemy,now);}
    finally{ctx.restore();}
  };
  function faint(side, done) {
    if(!battle?.active || !engine || battle.v301Fainting)return done();
    const b=battle;
    b.v301Fainting=true;
    b.paused=true;
    engine.v301Faint={side,start:performance.now(),duration:700};
    const arena=$('arenaPro');
    if(arena){const label=document.createElement('div');label.className='v301FaintLabel';label.textContent=(side==='enemy'?D[b.foe.id]?.name:D[current()?.id]?.name || 'Pokémon')+' desmaiou!';arena.appendChild(label);}
    setTimeout(()=>{
      if(battle!==b || !b.active)return;
      if(engine)engine.v301Faint=null;
      b.v301Fainting=false;
      b.paused=false;
      done();
    },730);
  }
  const LEADER_LINES=[
    'Brock: Você venceu com determinação. Essa Insígnia é merecida.',
    'Misty: Uau, você superou minha equipe! Preciso treinar ainda mais.',
    'Lt. Surge: Essa me pegou de surpresa! Você lutou muito bem, soldado.',
    'Erika: Que batalha encantadora. Aceito minha derrota com respeito.',
    'Koga: Sua estratégia atravessou minhas ilusões. Meus parabéns.',
    'Sabrina: Não previ tamanho talento. Você conquistou essa vitória.',
    'Blaine: Hahaha! Minhas chamas não foram suficientes desta vez.',
    'Giovanni: Impressionante. Sua força está acima do que eu esperava.'
  ];
  const finishPrevious=finishBattle;
  finishBattle=function(win){
    if(!battle?.active)return;
    const b=battle;
    const leader=win && !b.wild && save.gym>=0 && save.gym<8 &&
      save.stage===v29TrainerCount(save.gym) && /LÍDER/.test(b.label||'');
    const leaderIndex=leader?save.gym:-1;
    const complete=()=>{
      if(!b.active)return;
      finishPrevious(win);
      if(leaderIndex>=0){const modal=$('modal');if(modal){const quote=document.createElement('div');quote.className='v301LeaderQuote';quote.setAttribute('aria-label','Reação do líder derrotado');quote.textContent='💬 '+LEADER_LINES[leaderIndex];const btn=$('nextStage');if(btn)btn.before(quote);else modal.appendChild(quote);}}
    };
    if(b.v301SkipFaint){b.v301SkipFaint=false;complete();return;}
    if(win || current()?.hp<=0){faint(win?'enemy':'ally',complete);return;}
    complete();
  };
  const nextPrevious=nextFoe;
  nextFoe=function(){
    if(!battle?.active || battle.v301Fainting)return;
    const b=battle;
    const last=b.enemies.length===0;
    faint('enemy',()=>{
      if(last)b.v301SkipFaint=true;
      nextPrevious();
    });
  };
  window.PokemonTorre301Diagnostics=()=>({
    shinyCaught:[...(save.shinyCaught||[])],currentShiny:!!battle?.foe?.shiny,
    homingCooldowns:Object.fromEntries(Object.entries(V30_MOVE_TRAITS).filter(([,m])=>m.kind==='homing').map(([id,m])=>[id,m.cd])),
    isFainting:!!battle?.v301Fainting,resetAvailable:!!document.querySelector('#v281SettingsButton')
  });
})();
/* POKEMON TORRE V30.1 — fim */
