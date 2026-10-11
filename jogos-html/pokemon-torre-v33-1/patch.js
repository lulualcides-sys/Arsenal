/* POKEMON TORRE V33.1 | fix multi-moves, Kanto trainer sprites, double battle attacks */
(function(){
 'use strict';
 const V331='33.1';
 const MOVE_DEFS={
 normal:[['Investida','dash',1,19],['Arranhão','dash',4,22],['Golpe de Corpo','dash',9,30],['Slam','dash',15,37],['Corte','dash',21,37],['Cabeçada','dash',28,41],['Ataque Duplo','dash',34,43],['Mega Soco','dash',41,48],['Golpe Duplo','dash',49,49],['Hiper Raio','beam',60,64],['Impacto Estelar','pierce',72,56]],
 fire:[['Brasa','bolt',1,22],['Roda de Fogo','dash',6,27],['Chama','bolt',11,32],['Chama Circular','area',19,37],['Lança-Chamas','beam',27,47],['Punho de Fogo','dash',35,48],['Rajada Ígnea','pierce',44,52],['Giro de Fogo','hazard',53,47],['Explosão de Fogo','area',65,60],['Labareda Final','beam',78,66]],
 water:[['Bolhas','bolt',1,21],['Pistola d’Água','bolt',6,25],['Jato d’Água','bolt',11,30],['Aqua Jet','dash',18,33],['Pulso de Água','bolt',25,42],['Cachoeira','dash',34,47],['Mergulho','dash',41,50],['Onda Gigante','area',51,54],['Hidro Bomba','beam',63,62],['Tsunami','pierce',77,67]],
 grass:[['Absorver','bolt',1,19],['Chicote de Vinha','bolt',5,27],['Folha Navalha','pierce',11,31],['Mega Dreno','bolt',18,37],['Raízes Violentas','area',25,40],['Chicote Duplo','dash',33,46],['Bomba de Sementes','bolt',42,49],['Pétalas Cortantes','area',51,54],['Raio Solar','beam',65,64],['Tempestade de Folhas','pierce',76,66]],
 electric:[['Choque do Trovão','bolt',1,23],['Faísca','bolt',5,27],['Onda Elétrica','bolt',10,32],['Carga Relâmpago','dash',17,36],['Descarga','area',24,42],['Raio','bolt',32,47],['Choque Magnético','homing',40,48],['Campo Elétrico','hazard',48,48],['Trovão','homing',61,62],['Tempestade de Raios','area',76,66]],
 psychic:[['Confusion','bolt',1,22],['Telecinese','bolt',6,28],['Onda Mental','bolt',12,31],['Confusão','bolt',18,36],['Psíquico','homing',27,43],['Barreira Psíquica','shield',34,0],['Psicocorte','pierce',43,50],['Pulsação Mental','area',52,53],['Premonição','homing',63,58],['Tempestade Psíquica','area',77,66]],
 poison:[['Ferrão Venenoso','bolt',1,22],['Picada Tóxica','dash',6,26],['Ácido','bolt',12,33],['Névoa Venenosa','area',19,39],['Golpe de Veneno','dash',27,44],['Bomba de Lodo','area',36,49],['Lama Corrosiva','hazard',46,48],['Rajada Ácida','pierce',55,54],['Toxina Pesada','bolt',65,62]],
 ground:[['Tapa de Lama','bolt',1,23],['Lançamento de Areia','bolt',7,29],['Soco de Terra','dash',13,34],['Fenda Rasa','area',21,39],['Lança de Areia','pierce',30,44],['Tremor','area',39,49],['Abalo Terrestre','area',48,53],['Terremoto','area',60,62],['Grande Fissura','area',76,68]],
 rock:[['Arremesso de Pedra','bolt',1,23],['Pedrada','bolt',6,28],['Cascalho','pierce',12,33],['Rochedo','dash',20,37],['Deslizamento','area',28,42],['Pedra Afiada','pierce',37,48],['Martelo Rochoso','dash',45,52],['Avalanche','area',54,57],['Chuva de Meteoritos','area',73,67]],
 ice:[['Caco de Gelo','bolt',1,24],['Vento Gelado','bolt',8,30],['Sopro Congelante','bolt',16,36],['Fragmentos de Gelo','pierce',24,42],['Raio de Gelo','beam',32,47],['Impacto Glacial','dash',41,51],['Campo Gelado','hazard',50,54],['Nevasca','area',62,61],['Tempestade de Neve','area',76,67]],
 ghost:[['Lambida','dash',1,23],['Sombra','bolt',7,29],['Assombração','bolt',13,34],['Garra Sombria','dash',22,40],['Bola Sombria','homing',30,45],['Maldição Espectral','area',39,48],['Pulso Fantasma','pierce',48,53],['Esfera Escura','homing',59,59],['Trevas Eternas','area',75,65]],
 fighting:[['Soco','dash',1,24],['Chute','dash',6,29],['Golpe de Karatê','dash',12,33],['Investida Forte','dash',19,39],['Soco Cruzado','dash',27,43],['Quebra-Tijolo','dash',36,48],['Golpe de Aura','bolt',46,54],['Onda de Choque','area',56,58],['Soco Dinâmico','dash',72,67]],
 flying:[['Rajada','bolt',1,24],['Bicada','dash',6,28],['Vento Cortante','pierce',13,34],['Ataque de Asa','dash',20,39],['Aerocorte','pierce',28,44],['Furacão','area',38,48],['Pique','dash',49,55],['Vendaval','area',61,60],['Céu Tempestuoso','area',74,65]],
 bug:[['Picada','dash',1,23],['Ataque de Inseto','dash',7,28],['Ferroada','dash',14,33],['Agulhas','pierce',21,38],['Corte X','dash',29,44],['Enxame','area',38,50],['Ferrão Duplo','dash',47,53],['Teia Cortante','pierce',58,59],['Tempestade de Insetos','area',75,65]],
 dragon:[['Sopro de Dragão','bolt',1,26],['Garra Dracônica','dash',8,33],['Onda Dracônica','bolt',17,39],['Investida Dragão','dash',26,45],['Raiva do Dragão','bolt',34,49],['Pulso de Dragão','pierce',44,53],['Tempestade Dracônica','area',55,58],['Hiper Raio Dragão','beam',68,65],['Fúria Ancestral','area',80,69]],
 dark:[['Mordida','dash',1,25],['Ataque Sombrio','dash',8,31],['Golpe Noturno','dash',16,37],['Pulso Sombrio','bolt',24,43],['Fúria Noturna','pierce',33,48],['Escuridão','area',43,52],['Sombra Perseguidora','homing',54,57],['Impacto das Trevas','area',67,64]],
 steel:[['Garra de Metal','dash',1,25],['Choque Metálico','bolt',8,31],['Corte de Aço','dash',16,38],['Canhão Metálico','bolt',26,44],['Lâmina Prateada','pierce',36,49],['Parede de Aço','shield',45,0],['Tempestade Metálica','area',57,57],['Canhão de Ferro','beam',71,65]],
 fairy:[['Vento de Fada','bolt',1,23],['Encanto','bolt',7,30],['Brilho Mágico','bolt',15,36],['Luz da Lua','recover',24,0],['Raio Encantado','pierce',34,47],['Impacto Féerico','area',44,52],['Explosão de Estrelas','area',59,59],['Poder da Lua','beam',72,64]]
 };
 const V331_SMALL_CATALOG={129:['Salpicar','Investida','Chicote','Ataque de Corpo','Salto'],11:['Endurecer','Investida'],14:['Endurecer','Investida'],132:['Transformar','Investida','Mimetismo','Ataque de Corpo']};
 const V331_EXTRA_TM={normal:'TM Universal',fighting:'TM Lutador'};
 const v331PreviousCatalogue=v32Catalogue;
 const v331Key=v32MoveKey;
 function v331AsMove(row,type){
  const [name,kind,level,power]=row,heavy=power>=60;
  const cost=kind==='shield'||kind==='recover'?24:kind==='dash'?Math.max(0,Math.round((power-26)*.55)):Math.round(power*.58);
  const cd=kind==='homing'?10000:kind==='area'?4600:kind==='hazard'?6300:kind==='pierce'?3200:kind==='beam'?heavy?6800:4000:kind==='recover'?8500:kind==='shield'?5800:kind==='dash'?1400:2300;
  return {name,type,kind,cat:power?'special':'status',power,level,cost:Math.min(55,cost),cd,icon:V32_ADD_MOVES[type]?.icon||'✨'};
 }
 v32Catalogue=function(m){
  if(!m||!D[m.id])return [];
  const base=v331PreviousCatalogue(m),p=D[m.id],types=[...new Set([p.type,p.type2].filter(Boolean))];
  const keys=new Set(base.map(x=>x.key));
  const restricted=V331_SMALL_CATALOG[m.id];
  for(const t of [...new Set(['normal',...types])]){
   for(const row of MOVE_DEFS[t]||[]){
    if(restricted && !restricted.includes(row[0]))continue;
    const move=v331AsMove(row,t),key=v331Key(move);
    if(keys.has(key))continue;keys.add(key);
    base.push({key,move,level:move.level,tm:false,available:m.level>=move.level});
   }
  }
  // A assinatura da espécie continua disponível; a quantidade de opções cresce com o nível.
  return base.sort((a,b)=>(a.level||1)-(b.level||1)||a.move.name.localeCompare(b.move.name,'pt'));
 };
 // A equipe ganha um acesso claramente visível; o botão antigo permanece como compatibilidade.
 const v331PreviousTeam=showTeam;
 showTeam=function(){
  v331PreviousTeam();if(battle?.active)return;
  const root=$('modal'),head=root?.querySelector('.sectionhead');if(!head)return;
  if(root.querySelector('#v331MovesShortcut'))return;
  const button=document.createElement('button');button.id='v331MovesShortcut';button.type='button';button.className='btn gold v331Shortcut';button.textContent='🧠 TROCAR OS 4 GOLPES DO POKÉMON';
  button.onclick=v331ChoosePokemon;head.insertAdjacentElement('afterend',button);
  root.querySelectorAll('.v32SwapBtn').forEach((old,i)=>{old.textContent='🧠 GOLPES · '+D[[...save.team,...save.box][i]?.id]?.name;old.onclick=()=>v331MovesEditor([...save.team,...save.box][i]);});
 };
 function v331ChoosePokemon(){if(battle?.active)return;
  const all=[...save.team,...save.box];
  overlay('<div class="sectionhead"><div><div class="overline">V33.1 · CENTRAL DE GOLPES</div><h2>🧠 Escolha o Pokémon</h2></div><button class="btn tiny ghost" id="v331BackTeam">✕</button></div><p class="desc">Cada Pokémon pode equipar quatro golpes. A lista cresce conforme o nível e respeita seus tipos e TMs.</p><div class="v331PokemonList">'+all.map((m,i)=>'<button type="button" class="v331Pokemon" data-v331-pokemon="'+i+'">'+img(m.id)+'<span><b>'+D[m.id].name+' · Nv. '+m.level+'</b><small>'+v32Catalogue(m).filter(x=>x.available).length+' golpes liberados · '+v32Catalogue(m).length+' no catálogo</small></span><span>Editar →</span></button>').join('')+'</div>');
  $('v331BackTeam').onclick=showTeam;
  document.querySelectorAll('[data-v331-pokemon]').forEach(el=>el.onclick=()=>v331MovesEditor(all[+el.dataset.v331Pokemon]));
 }
 function v331MovesEditor(m){if(!m||battle?.active)return;
  const all=[...save.team,...save.box];if(!all.includes(m))return;
  let slot=0,filter='available';
  function paint(){
   const cat=v32Catalogue(m),defaults=v32DefaultSlots(m);
   const selected=(Array.isArray(m.v32Slots)&&m.v32Slots.length===4?m.v32Slots:defaults).slice();
   const chosen=selected.map((key,i)=>cat.find(x=>x.key===key)||cat.find(x=>x.key===defaults[i]));
   const available=cat.filter(x=>filter==='all'||(filter==='available'?x.available:!x.available));
   const controls=chosen.map((x,i)=>'<button class="v331Slot '+(slot===i?'active':'')+'" data-v331-slot="'+i+'"><b>'+(i+1)+'. '+(x?.move.icon||'✦')+' '+(x?.move.name||'Golpe')+'</b><small>'+(x?.move.cost||0)+' energia · '+(((x?.move.cd||1000)/1000).toFixed(1))+'s</small></button>').join('');
   const moves=available.map(x=>'<button class="v331Choice '+(selected.includes(x.key)?'equipped':'')+'" data-v331-pick="'+cat.indexOf(x)+'" '+(x.available?'':'disabled')+'><span><b>'+(x.move.icon||'✦')+' '+x.move.name+'</b><small>'+(TYPE_NAME[x.move.type]||x.move.type)+' · '+(x.move.power||'Defesa')+' força · '+x.move.cost+' energia · '+(x.move.cd/1000).toFixed(1)+'s</small></span><span class="pillSmall">'+(selected.includes(x.key)?'EM USO':x.available?'EQUIPAR':'Nv. '+x.level)+'</span></button>').join('');
   overlay('<div class="sectionhead"><div><div class="overline">PERSONALIZAR · '+D[m.id].name+'</div><h2>🧠 '+D[m.id].name+' · Nv. '+m.level+'</h2></div><button class="btn tiny ghost" id="v331BackMoves">✕</button></div><p class="desc">1. Escolha um dos quatro espaços. 2. Toque no novo golpe. A mudança é salva automaticamente.</p><div class="v331Slots">'+controls+'</div><div class="v331Tabs"><button class="btn tiny '+(filter==='available'?'gold':'ghost')+'" data-v331-filter="available">Liberados ('+cat.filter(x=>x.available).length+')</button><button class="btn tiny '+(filter==='all'?'gold':'ghost')+'" data-v331-filter="all">Todos ('+cat.length+')</button><button class="btn tiny '+(filter==='locked'?'gold':'ghost')+'" data-v331-filter="locked">Futuros</button></div><div class="v331MoveList">'+moves+'</div><div class="v331Actions"><button class="btn ghost" id="v331DefaultMoves">↻ Restaurar golpes</button><button class="btn gold" id="v331Done">✓ Pronto</button></div><div class="v331Feedback" id="v331Feedback" aria-live="polite"></div>');
   $('v331BackMoves').onclick=v331ChoosePokemon;$('v331Done').onclick=showTeam;
   $('v331DefaultMoves').onclick=()=>{m.v32Slots=null;persist();paint()};
   document.querySelectorAll('[data-v331-slot]').forEach(el=>el.onclick=()=>{slot=+el.dataset.v331Slot;paint()});
   document.querySelectorAll('[data-v331-filter]').forEach(el=>el.onclick=()=>{filter=el.dataset.v331Filter;paint()});
   document.querySelectorAll('[data-v331-pick]').forEach(el=>el.onclick=()=>{
    const x=cat[+el.dataset.v331Pick];if(!x||!x.available)return;
    const list=selected.slice();if(list.some((key,i)=>key===x.key && i!==slot)){const note=$('v331Feedback');if(note)note.textContent='Este golpe já ocupa outra posição.';return;}
    list[slot]=x.key;m.v32Slots=list;persist();
    const selectedNow=skillSet(m)[slot];
    if(selectedNow?.name!==x.move.name){m.v32Slots=selected;persist();const note=$('v331Feedback');if(note)note.textContent='Não foi possível equipar '+x.move.name;return;}
    paint();const note=$('v331Feedback');if(note)note.textContent='✓ '+x.move.name+' equipado e salvo na posição '+(slot+1);
   });
  }
  paint();
 }
 // Classes de treinadores de Kanto (Sprites da Pok. Showdown, sprites originais nao alterados).
 const V331_TRAINERS={
   0:[['Jovem','youngster-gen1'],['Montanhista','hiker-gen1'],['Caçador de Insetos','bugcatcher-gen1']],
   1:[['Nadador','swimmerm-gen2'],['Garota','lass-gen1'],['Treinadora','jrtrainerf-gen1']],
   2:[['Roqueiro','rocker-gen1'],['Jovem','youngster-gen1'],['Treinador','acetrainer-gen1']],
   3:[['Beleza','beauty-gen1'],['Treinadora','jrtrainerf-gen1'],['Garota','lass-gen1']],
   4:[['Domador','tamer-gen1'],['Caçador de Insetos','bugcatcher-gen1'],['Montanhista','hiker-gen1']],
   5:[['Psíquico','psychic-gen1'],['Malabarista','juggler-gen1'],['Treinadora','jrtrainerf-gen1']],
   6:[['Cientista','supernerd-gen1'],['Ladrão','burglar-gen1'],['Cavalheiro','gentleman-gen1']],
   7:[['Montanhista','hiker-gen1'],['Domador','tamer-gen1'],['Treinador','acetrainer-gen1']]
 };
 function v331TrainerInfo(){
  const b=battle;if(!b?.active||b.wild)return null;
  const name=b.label||'';if(/LABORATÓRIO|LENDÁRIO|TORRE|REVANCHE DA LIGA/i.test(name))return null;
  if(/LÍDER\s/i.test(name) && save.gym<8)return {title:GYMS[save.gym].leader,src:V27_TRAINER_GIFS[GYMS[save.gym].leader]||'',leader:true};
  if(/ROCKET/i.test(name))return {title:'Recruta Rocket',src:'https://play.pokemonshowdown.com/sprites/trainers/rocketgrunt.png'};
  if(/RIVAL/i.test(name))return {title:'Rival Blue',src:'https://play.pokemonshowdown.com/sprites/trainers/blue-gen1.png'};
  const list=V331_TRAINERS[save.gym]||V331_TRAINERS[0],step=Math.max(0,save.stage||0),x=list[step%list.length];
  return {title:x[0]+' de Kanto',src:'https://play.pokemonshowdown.com/sprites/trainers/'+x[1]+'.png'};
 }
 function v331FixTrainer(){
  const box=$('v31Trainer');if(!box)return;
  const info=v331TrainerInfo();if(!info){box.remove();return;}
  box.innerHTML='';const pic=document.createElement('img');pic.src=info.src;pic.alt=info.title;pic.loading='lazy';pic.onerror=()=>{pic.remove();const mark=document.createElement('span');mark.className='v331TrainerFallback';mark.textContent='♟';box.prepend(mark);};
  const label=document.createElement('div');label.className='v31TrainerLabel';label.textContent=info.title;
  box.append(pic,label);box.title=info.title;
 }
 const prevBattleRender=renderBattle;
 renderBattle=function(){prevBattleRender();v331FixTrainer();};
 function v331ArrangeDouble(){
  const controls=$('v33DoubleControls'),foot=document.querySelector('.battleFooter'),grid=foot?.querySelector('.skillgridV8');
  if(!controls||!foot||!grid)return;
  if(controls.parentElement!==foot)grid.insertAdjacentElement('afterend',controls);
  controls.classList.add('v331DuoBar');
  const message=$('v331DuoNotice');if(!message){const el=document.createElement('div');el.id='v331DuoNotice';el.className='v331DuoNotice';el.textContent='⚔️ Seus quatro golpes funcionam normalmente. Toque no alvo A ou B; os botões abaixo controlam o parceiro.';grid.insertAdjacentElement('beforebegin',el);}
 }
 const oldDuoTools=v33BattleTools;
 v33BattleTools=function(){oldDuoTools();v331ArrangeDouble();};
 const prevStart=startBattle;
 startBattle=function(enemies,label,wild){const result=prevStart(enemies,label,wild);v331ArrangeDouble();v331FixTrainer();return result;};
 const v331OldSkillClick=useSkill;
 useSkill=function(i){
  if(battle?.active&&battle.paused&&battle.v31Duo&&engine)return engine.useMove(i);
  return v331OldSkillClick(i);
 };
 const oldUseMove=BattleEngine.prototype.useMove;
 function v331OverlayFeedback(msg){const line=$('v331BattleNotice');if(line){line.textContent=msg;return;}const parent=document.querySelector('.battleFooter');if(!parent)return;const el=document.createElement('span');el.id='v331BattleNotice';el.className='v331BattleNotice';el.textContent=msg;parent.prepend(el);setTimeout(()=>el.remove(),1600);}
 BattleEngine.prototype.useMove=function(i){
  const b=battle;if(!b?.active||i<0||i>3||!Number.isInteger(i))return;
  const monNow=current(),s=skillSet(monNow)[i],now=performance.now();if(!s)return;
  if(b.paused){
   if(b.v31Duo && this.running && (this.v25?.entry?.length||this.v301Faint) && !this.v25?.capture){this.v331Queued={slot:i,b};v331OverlayFeedback('Pokémon entrando! Golpe '+(i+1)+' na fila.');return;}
   if(b.v31Duo && this.running && !this.v25?.entry?.length && !this.v25?.capture && !b.v301Fainting && $('swapSheet')?.classList.contains('hide'))b.paused=false;
   else{v331OverlayFeedback('Aguarde a animação de entrada para atacar.');return;}
  }
  if(cooldowns[i]>now){v331OverlayFeedback(s.name+' recarregando.');return;}
  if(b.energy<s.cost){v331OverlayFeedback('Energia insuficiente para '+s.name+'.');return;}
  if(monNow.hp<=0)return;
  if(this.v33Windup&&now<this.v33Windup.until){v331OverlayFeedback('Preparando o golpe anterior.');return;}
  // O renderizador antigo só reconhecia projéteis teleguiados e áreas na posição 3.
  // Agora qualquer um dos quatro slots pode executar esses golpes com a mesma mecânica 2D.
  if(['homing','pierce','area','hazard'].includes(s.kind) && (i!==2 || !V30_MOVE_TRAITS[monNow.id])){
   b.energy-=s.cost;cooldowns[i]=now+(s.kind==='homing'?Math.max(10000,s.cd):s.cd);
   this.attackActs.player=this.time+.45;this.v30Shots ||= [];this.v30Zones ||= [];
   const aim=this.aimVector(),x=this.player.x,y=this.player.y,color=TYPE_COLOR[s.type]||'#c6e4ff';
   this.particlesAt(x,y,color,13,88);
   if(s.kind==='homing'||s.kind==='pierce'){
    this.v30Shots.push({x,y,vx:aim.x*this.h*.60,vy:aim.y*this.h*.60,kind:s.kind,type:s.type,power:s.power,life:2.2,trail:[],hit:false});this.v30Shots=this.v30Shots.slice(-12);
   } else {
    this.v30Zones.push({kind:s.kind,x:this.enemy.x,y:this.enemy.y,type:s.type,power:s.power,life:s.kind==='hazard'?3.1:.42,tick:.4,r:this.h*.21,hit:false});this.v30Zones=this.v30Zones.slice(-8);
   }
   if(typeof v27EmitFx==='function')v27EmitFx(s.type,'enemy',1.1);
   log(D[monNow.id].name+' usou '+s.name+'!');playSound('move');
   if(b.v33Tracker)b.v33Tracker.moves[s.name]=(b.v33Tracker.moves[s.name]||0)+1;
   v33Ensure().stats.moves[s.name]=(save.v33.stats.moves[s.name]||0)+1;
   return;
  }
  if(s.kind==='recover'||s.kind==='illusion'||s.kind==='shield'){
   // Protege todas as posições (o motor anterior só tratava o 4º golpe como status).
   if(s.kind==='shield' && i!==3){b.energy-=s.cost;cooldowns[i]=now+s.cd;this.player.guard=1.9;this.rings.push({x:this.player.x,y:this.player.y,r:12,life:1.3,color:'#9cdbff',follow:'player'});log(monNow.id+' usou '+s.name);return;}
  }
  return oldUseMove.call(this,i);
 };
 const oldUpdate=BattleEngine.prototype.update;
 BattleEngine.prototype.update=function(dt,now){
  const outcome=oldUpdate.call(this,dt,now);
  const queued=this.v331Queued;
  if(queued && battle===queued.b && queued.b.active && !battle.paused && this.running){this.v331Queued=null;this.useMove(queued.slot);}
  if(queued && (!battle?.active||battle!==queued.b))this.v331Queued=null;
  return outcome;
 };
 const styles=document.createElement('style');styles.id='v331Styles';styles.textContent=
  '.v331Shortcut{width:100%;margin:10px 0 12px;min-height:44px}.v331PokemonList{display:grid;gap:8px;max-height:64vh;overflow:auto}.v331Pokemon{display:flex;gap:12px;align-items:center;text-align:left;border:1px solid #4b798a;color:#defbff;background:#152c3e;border-radius:11px;padding:10px;width:100%;min-height:62px;cursor:pointer}.v331Pokemon .spritewrap{flex-shrink:0;width:42px;height:42px;overflow:hidden}.v331Pokemon span:nth-child(2){flex:1}.v331Pokemon small{display:block;color:#a6d0dd;font-size:11px;margin-top:4px}.v331Slots{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:8px}.v331Slot{cursor:pointer;min-height:65px;background:#142f40;border:1px solid #365c72;color:#e5faff;border-radius:10px;padding:10px;text-align:left}.v331Slot.active{border-color:#ffe095;background:#244448;box-shadow:inset 0 0 0 1px #d8bf80}.v331Slot b{display:block;font-size:12px}.v331Slot small{display:block;color:#a9cfde;font-size:10px;margin-top:4px}.v331Tabs,.v331Actions{display:flex;gap:7px;flex-wrap:wrap;margin:12px 0}.v331Tabs>button,.v331Actions>button{flex:1 1 105px}.v331MoveList{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:7px;max-height:39vh;overflow-y:auto;padding-right:2px}.v331Choice{background:#172c3d;border:1px solid #426074;color:#ecfaff;border-radius:9px;padding:9px;display:flex;justify-content:space-between;gap:7px;text-align:left;cursor:pointer;min-height:55px}.v331Choice b{display:block;font-size:11px}.v331Choice small{display:block;font-size:9px;color:#afd5db;line-height:1.4;margin-top:3px}.v331Choice .pillSmall{font-size:9px}.v331Choice:disabled{opacity:.48;cursor:not-allowed}.v331Choice.equipped{border-color:#b7d776}.v331Feedback{min-height:18px;font-size:11px;color:#b9f6c9}.v331DuoBar{position:relative!important;bottom:auto!important;left:auto!important;right:auto!important;z-index:12;pointer-events:auto;display:flex;flex-wrap:wrap;justify-content:center;padding:8px 4px;background:#112b3ad9;border-radius:9px;margin:6px 0}.v331DuoBar button{font-size:10px;min-height:34px;touch-action:manipulation;flex:1 1 85px}.v331DuoNotice{font-size:10px;color:#d3eeff;padding:7px 4px 2px;text-align:center}.v331BattleNotice{color:#f4df9a;font-size:11px;line-height:1.4;display:block;margin:3px 6px}.v331TrainerFallback{font-size:26px;color:#7ee1ff}.v31Trainer{opacity:1!important;z-index:2!important}.v31Trainer img{max-width:46px;object-fit:contain}.v31TrainerLabel{text-align:center;max-width:100px!important;white-space:normal}@media(max-width:550px){.v331MoveList{grid-template-columns:1fr;max-height:40vh}.v331Slots{gap:5px}.v331Slot{padding:8px}.v331Shortcut{font-size:11px}.v31Trainer{top:27%!important;right:1%!important}.v331DuoBar button{flex:1 1 100px}}';document.head.append(styles);
 window.PokemonTorreV331Diagnostics=()=>({version:V331,trainer:v331TrainerInfo()?.title||null,catalog:save.team[0]?v32Catalogue(save.team[0]).map(x=>({name:x.move.name,key:x.key,available:x.available})):[],team:save.team.map(m=>({id:m.id,skills:skillSet(m).map(x=>x.name),catalogue:v32Catalogue(m).length,available:v32Catalogue(m).filter(x=>x.available).length})),duoActive:!!battle?.v31Duo,queued:!!engine?.v331Queued});
})();
/* END V33.1 */
