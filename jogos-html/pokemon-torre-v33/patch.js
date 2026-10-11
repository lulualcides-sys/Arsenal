/* POKEMON TORRE V33 · Pacote 2D integrado: batalhas, especies, IA, lendarios, duplas, treino e laboratorio */
const V33_VERSION='33.0';
const V33_LEADERS=[
 {name:'Brock',tempo:1.06,evade:0.8,style:'Defesa rochosa',type:'rock'},
 {name:'Misty',tempo:.95,evade:1.17,style:'Movimento aquático',type:'water'},
 {name:'Lt. Surge',tempo:.86,evade:1.04,style:'Pressão elétrica',type:'electric'},
 {name:'Erika',tempo:1.08,evade:.95,style:'Equilíbrio e cura',type:'grass'},
 {name:'Koga',tempo:.97,evade:1.13,style:'Precisão e veneno',type:'poison'},
 {name:'Sabrina',tempo:1.1,evade:1.26,style:'Esquiva psíquica',type:'psychic'},
 {name:'Blaine',tempo:.88,evade:1.01,style:'Ataque flamejante',type:'fire'},
 {name:'Giovanni',tempo:1.03,evade:.8,style:'Impacto terrestre',type:'ground'}
];
const V33_LEGENDARIES=[
 {id:144,name:'Articuno',level:56,gate:8,place:'Ilhas Espuma',weather:'snow'},
 {id:145,name:'Zapdos',level:57,gate:8,place:'Usina Abandonada',weather:'storm'},
 {id:146,name:'Moltres',level:59,gate:8,place:'Monte Brasa',weather:'sun'},
 {id:150,name:'Mewtwo',level:70,gate:13,place:'Caverna Celeste',weather:'psychic'}
];
// Golpes característicos por espécie e linhagem, além dos conjuntos e TMs da V32.
const V33_SPECIES_MOVES={
 1:['Chicote de Vinha','grass','bolt',27,14],2:['Chicote de Vinha','grass','bolt',31,18],3:['Raio Solar','grass','beam',59,36],
 4:['Brasa','fire','bolt',27,12],5:['Garra de Fogo','fire','dash',37,21],6:['Lança-Chamas','fire','beam',59,36],
 7:['Jato d’Água','water','bolt',26,12],8:['Jato d’Água','water','bolt',32,18],9:['Hidro Bomba','water','beam',60,37],
 10:['Picada','bug','dash',22,10],11:['Casulo','bug','guard',0,10],12:['Pó do Sono','grass','status',0,17],
 13:['Picada','bug','dash',23,10],14:['Endurecer','normal','guard',0,10],15:['Ferrão Venenoso','poison','dash',37,19],
 16:['Rajada','flying','bolt',24,11],17:['Rajada','flying','bolt',32,19],18:['Ataque de Asa','flying','dash',46,27],
 19:['Mordida','normal','dash',25,11],20:['Hiper Presa','normal','dash',41,21],21:['Bicada','flying','dash',25,11],22:['Bico Broca','flying','dash',45,26],
 23:['Picada Venenosa','poison','bolt',28,13],24:['Ácido','poison','bolt',43,24],25:['Choque do Trovão','electric','bolt',31,13],26:['Raio','electric','homing',54,31],
 27:['Tapa de Lama','ground','bolt',27,12],28:['Garra de Areia','ground','dash',41,22],29:['Picada Venenosa','poison','bolt',27,12],30:['Slam','normal','dash',37,21],31:['Earthquake','ground','area',56,36],
 32:['Picada Venenosa','poison','bolt',28,12],33:['Slam','normal','dash',40,22],34:['Earthquake','ground','area',57,36],
 35:['Encantar','normal','status',0,13],36:['Poder da Lua','normal','bolt',49,29],37:['Brasa','fire','bolt',29,14],38:['Lança-Chamas','fire','beam',54,31],
 39:['Canto','normal','status',0,10],40:['Voz Encantadora','normal','bolt',39,21],41:['Mordida','poison','dash',28,12],42:['Ataque de Asa','flying','dash',41,22],
 43:['Absorver','grass','bolt',26,12],44:['Ácido','poison','bolt',33,19],45:['Pétalas','grass','area',47,29],
 46:['Arranhão','bug','dash',28,13],47:['Esporos','grass','status',0,24],48:['Confusão','psychic','bolt',25,12],49:['Pó do Sono','grass','status',0,22],
 50:['Tapa de Lama','ground','bolt',27,12],51:['Earthquake','ground','area',44,28],52:['Arranhão','normal','dash',26,12],53:['Golpe Rápido','normal','dash',41,22],
 54:['Pistola d’Água','water','bolt',29,15],55:['Pulso d’Água','water','bolt',43,26],56:['Soco','fighting','dash',28,11],57:['Golpe Furioso','fighting','dash',45,27],
 58:['Brasa','fire','bolt',31,13],59:['Lança-Chamas','fire','beam',55,32],60:['Bolhas','water','bolt',24,10],61:['Jato d’Água','water','bolt',35,19],62:['Hidro Bomba','water','beam',52,31],
 63:['Confusion','psychic','bolt',27,12],64:['Confusion','psychic','bolt',38,19],65:['Psíquico','psychic','homing',55,32],
 66:['Soco','fighting','dash',29,11],67:['Golpe de Karatê','fighting','dash',40,20],68:['Soco Dinâmico','fighting','dash',53,31],
 69:['Chicote de Vinha','grass','bolt',29,14],70:['Ácido','poison','bolt',39,22],71:['Folha Navalha','grass','bolt',52,30],
 72:['Ácido','poison','bolt',28,11],73:['Hidro Bomba','water','beam',49,30],74:['Pedra','rock','bolt',29,13],75:['Pedra','rock','bolt',38,21],76:['Rock Slide','rock','area',53,30],
 77:['Brasa','fire','bolt',29,13],78:['Lança-Chamas','fire','beam',54,31],79:['Confusion','psychic','bolt',27,15],80:['Psíquico','psychic','bolt',48,29],
 81:['Choque','electric','bolt',28,13],82:['Raio','electric','bolt',47,29],83:['Corte','flying','dash',36,20],84:['Bicada','flying','dash',28,13],85:['Bico Broca','flying','dash',49,29],
 86:['Jato d’Água','water','bolt',27,12],87:['Raio de Gelo','ice','beam',51,30],88:['Ácido','poison','bolt',28,12],89:['Bomba de Lodo','poison','area',51,29],
 90:['Jato d’Água','water','bolt',26,12],91:['Raio de Gelo','ice','beam',54,32],92:['Lambida','ghost','bolt',27,12],93:['Bola Sombria','ghost','bolt',39,20],94:['Bola Sombria','ghost','homing',54,33],
 95:['Rock Slide','rock','area',47,26],96:['Confusion','psychic','bolt',31,14],97:['Psíquico','psychic','homing',51,30],98:['Bolhas','water','bolt',28,13],99:['Martelada','water','dash',46,28],
 100:['Faísca','electric','bolt',30,14],101:['Descarga','electric','area',48,30],102:['Confusion','psychic','bolt',27,13],103:['Raio Solar','grass','beam',51,32],
 104:['Osso','ground','bolt',28,12],105:['Osso Bumerangue','ground','bolt',47,27],106:['Chute Alto','fighting','dash',48,27],107:['Soco Rápido','fighting','dash',47,27],
 108:['Lambida','normal','dash',36,18],109:['Névoa Tóxica','poison','area',30,14],110:['Névoa Tóxica','poison','area',48,29],
 111:['Rock Slide','rock','area',38,22],112:['Earthquake','ground','area',54,33],113:['Recuperar','normal','recover',0,25],114:['Chicote de Vinha','grass','bolt',36,21],
 115:['Slam','normal','dash',49,30],116:['Bolhas','water','bolt',27,13],117:['Jato d’Água','water','bolt',40,23],118:['Jato d’Água','water','bolt',27,13],119:['Hidro Bomba','water','beam',49,30],
 120:['Jato d’Água','water','bolt',29,13],121:['Psíquico','psychic','homing',49,30],122:['Confusion','psychic','bolt',45,28],123:['Corte','bug','dash',48,29],124:['Raio de Gelo','ice','beam',50,30],
 125:['Raio','electric','bolt',52,30],126:['Lança-Chamas','fire','beam',52,30],127:['Slam','bug','dash',47,27],128:['Slam','normal','dash',47,27],
 129:['Salpicar','water','status',0,1],130:['Hidro Bomba','water','area',61,40],131:['Raio de Gelo','ice','beam',53,32],132:['Transformar','normal','illusion',0,18],
 133:['Investida','normal','dash',28,11],134:['Hidro Bomba','water','beam',52,31],135:['Raio','electric','bolt',52,31],136:['Lança-Chamas','fire','beam',52,31],
 137:['Tri Ataque','normal','bolt',48,28],138:['Jato d’Água','water','bolt',34,19],139:['Hidro Bomba','water','beam',52,30],140:['Pedra','rock','bolt',36,19],141:['Corte','rock','dash',49,29],
 142:['Rock Slide','rock','area',52,30],143:['Hyper Beam','normal','beam',66,40],144:['Nevasca','ice','area',58,40],145:['Thunder','electric','homing',58,40],146:['Lança-Chamas','fire','beam',58,40],
 147:['Sopro de Dragão','dragon','bolt',31,17],148:['Sopro de Dragão','dragon','bolt',43,24],149:['Hyper Beam','normal','beam',64,39],150:['Psíquico','psychic','homing',64,43],151:['Psíquico','psychic','homing',59,41]
};
const V33_HEAVY=new Set(['Hyper Beam','Hidro Bomba','Nevasca','Thunder','Raio Solar']);
const V33_FX_COLORS={fire:'#ff934c',water:'#64c4ff',electric:'#ffdf62',grass:'#9cdf80',psychic:'#dca0ff',ground:'#d6a472',rock:'#c7b693',poison:'#d7a2ef',ice:'#b3f9ff',ghost:'#a3b5ef',fighting:'#ffc49a',normal:'#dde8ff',bug:'#b3d07c',dragon:'#b29bfc'};
const v33SafeNumber=(x,fallback)=>Number.isFinite(+x)?+x:fallback;
function v33Ensure(){
 if(!save.v33||typeof save.v33!=='object')save.v33={};
 const s=save.v33;
 if(!s.stats||typeof s.stats!=='object')s.stats={fights:0,wins:0,losses:0,captures:0,shiny:0,damage:0,misses:0,moves:{},legendary:[],bestCombo:0};
 if(!Array.isArray(s.stats.legendary))s.stats.legendary=[];
 if(!s.stats.moves||typeof s.stats.moves!=='object')s.stats.moves={};
 if(!Array.isArray(s.discovered))s.discovered=[];
 if(!s.settings||typeof s.settings!=='object')s.settings={effects:true,performance:'auto'};
 for(const m of [...(save.team||[]),...(save.box||[])]){
  if(!m||!D[m.id])continue;
  if(!m.v33Train||typeof m.v33Train!=='object')m.v33Train={atk:0,def:0,spd:0,special:0};
  for(const stat of ['atk','def','spd','special'])m.v33Train[stat]=Math.max(0,Math.min(8,Math.floor(v33SafeNumber(m.v33Train[stat],0))));
 }
 return s;
}
v33Ensure();
const v33Style=document.createElement('style');v33Style.id='v33Style';v33Style.textContent=
 '.v33Menu{display:flex;flex-wrap:wrap;gap:8px;margin:8px 0 13px}.v33Menu>.btn{flex:1 1 130px;font-size:11px;min-height:39px}.v33Pane{background:#132b3a;border:1px solid #456574;padding:13px;border-radius:13px;margin:9px 0}.v33Pane p,.v33Pane small{color:#bcd2e1;line-height:1.5}.v33Flex{display:flex;flex-wrap:wrap;gap:8px}.v33Flex>.btn{flex:1 1 130px;min-height:41px}.v33Pet{font-size:11px;color:#c4ebec;padding:6px 0}.v33Bar{height:7px;border-radius:10px;background:#35546b;overflow:hidden}.v33Bar i{display:block;height:100%;background:#76d7c6}.v33Stats{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:9px}.v33MoveBtn{background:#173449;border:1px solid #52788a;color:#e5f8fe;border-radius:10px;padding:9px;min-height:42px;cursor:pointer}.v33MoveBtn:disabled{opacity:.45}.v33DuoControls{position:absolute;bottom:72px;left:8px;right:8px;display:flex;flex-wrap:wrap;gap:6px;z-index:15;pointer-events:none}.v33DuoControls button{pointer-events:auto;background:#15394fe8;border:1px solid #65a5ae;color:#ecfeff;border-radius:8px;padding:5px 7px;font-size:10px;min-height:30px;cursor:pointer}.v33DuoControls button:disabled{opacity:.48}.v33Terrain{position:absolute;top:34px;left:50%;transform:translateX(-50%);z-index:10;background:#142c3cda;border:1px solid #557484;padding:3px 7px;border-radius:9px;color:#ebf8fc;font-size:9px;pointer-events:none}.v33BattleCall{position:absolute;top:58px;left:50%;transform:translateX(-50%);z-index:19;background:#102c3ce8;border:1px solid #7eabd1;color:#f8e8c4;border-radius:10px;padding:6px 10px;font-size:11px;pointer-events:none;white-space:nowrap}.v33Alert{color:#ffe4a7;font-size:12px;line-height:1.5}.v33Trainer{margin-top:8px;color:#a8e9e4;font-size:10px}.v33LabNote{font-size:12px;line-height:1.5;color:#d8edfa}.v33BattleModes{margin-top:5px;padding:10px;background:#163746;border:1px solid #436d7d;border-radius:11px}.v33Legendary{border:1px solid #6389a0;border-radius:12px;padding:10px;margin:8px 0;display:flex;align-items:center;justify-content:space-between;gap:9px}.v33Legendary strong{color:#fff}.v33Tabs{display:flex;gap:8px;flex-wrap:wrap}.v33Tabs>*{flex:1 1 130px}@media(max-width:480px){.v33DuoControls{bottom:57px}.v33DuoControls button{font-size:9px;padding:4px 5px}.v33Stats{grid-template-columns:1fr}.v33BattleCall{font-size:10px;max-width:90%;white-space:normal;text-align:center}}';
document.head.appendChild(v33Style);
const v33MoveForSpecies=(m)=>{
 const row=V33_SPECIES_MOVES[m?.id];if(!row)return null;
 const [name,type,kind,power,level]=row;
 return {name,type,kind,power,cat:power?'special':'status',icon:V32_ADD_MOVES[type]?.icon||'✨',cost:power===0?24:Math.min(49,Math.round(power*.67)),cd:kind==='homing'?10000:kind==='area'?4500:kind==='beam'?3900:kind==='recover'?9200:kind==='guard'?6500:kind==='illusion'?8500:kind==='status'?6800:2300,level};
};
// Enriquecimento direto do catálogo da V32 (e da tela original de troca de golpes).
const v33CataloguePrev=v32Catalogue;
v32Catalogue=function(m){
 const all=v33CataloguePrev(m),special=v33MoveForSpecies(m);
 if(!special)return all;
 const key=v32MoveKey(special);
 if(!all.some(x=>x.key===key))all.push({key,move:special,level:special.level,tm:false,available:m.level>=special.level});
 return all;
};
const v33SkillPrev=skillSet;
skillSet=function(m){const s=v33SkillPrev(m);if(!m||!D[m.id])return s;
 const special=v33MoveForSpecies(m);
 if(special&&m.level>=special.level&&!Array.isArray(m.v32Slots)){
  const slot=(m.id===143||m.id===150||m.id===149)?2:1;
  if(s[slot]&&s[slot].name!==special.name)s[slot]={...special};
 }
 for(const move of s)if(move?.kind==='homing')move.cd=Math.max(10000,move.cd||0);
 return s;
};
function v33Toast(message){const prev=document.querySelector('.v33Message');prev?.remove();const d=document.createElement('div');d.className='v31Message v33Message';d.textContent=message;document.body.append(d);setTimeout(()=>d.remove(),2300);}
function v33Track(name,damageValue=0){const info=v33Ensure().stats;info.moves[name]=(info.moves[name]||0)+1;info.damage+=Math.max(0,Math.round(damageValue));}
const v33PersistPrev=persist;
persist=function(){v33Ensure();return v33PersistPrev();};
const v33DamagePrev=damage;
damage=function(att,def,type,power){const r=v33DamagePrev(att,def,type,power);if(!r||r.hit<=0)return r;
 const a=att?.v33Train||{},d=def?.v33Train||{};
 let factor=(1+Math.min(8,a.atk||0)*.018+Math.min(8,a.special||0)*.009)/(1+Math.min(8,d.def||0)*.018);
 const t=battle?.v33Terrain;
 if(t==='water'&&type==='water')factor*=1.09;
 if(t==='grass'&&type==='grass')factor*=1.08;
 if(t==='rock'&&(type==='ground'||type==='rock'))factor*=1.09;
 if(t==='electric'&&type==='electric')factor*=1.08;
 if(t==='psychic'&&type==='psychic')factor*=1.08;
 r.hit=Math.max(1,Math.round(r.hit*factor));return r;
};
const v33StartPrev=startBattle;
startBattle=function(enemies,label,wild){v33Ensure();v33StartPrev(enemies,label,wild);if(!battle?.active)return;
 const b=battle;
 b.v33Tracker={moves:{},damage:0,misses:0};
 b.v33Terrain=(wild?'grass':save.gym===0?'rock':save.gym===1?'water':save.gym===2?'electric':save.gym===3?'grass':save.gym===5?'psychic':save.gym===7?'rock':'normal');
 b.v33StartTime=performance.now();b.v33Type='normal';
 b.v33Boss=(!wild&&save.gym>=0&&save.gym<=7&&(/LÍDER/i.test(label||''))&&!!V33_LEADERS[save.gym])?save.gym:-1;
 b.v33BossStage=0;b.v33LastEnemyHp=b.foe?.hp||0;
 if(engine){engine.v33Fx=[];engine.v33FrameWarn=false;}
 v33BattleTools();
};
function v33BattleTools(){if(!battle?.active)return;const arena=$('arenaPro');if(!arena)return;
 const t=battle.v33Terrain;const terrains={rock:'🪨 Rochas',water:'💧 Poças',electric:'⚡ Energia',grass:'🌿 Vegetação',psychic:'🔮 Campo psíquico',normal:'🏟️ Arena'};
 let tag=$('v33TerrainTag');if(!tag){tag=document.createElement('span');tag.id='v33TerrainTag';tag.className='v33Terrain';arena.append(tag);}tag.textContent=terrains[t]||terrains.normal;
 if(battle.v33Boss>=0){let boss=$('v33BossStyle');if(!boss){boss=document.createElement('div');boss.id='v33BossStyle';boss.className='v33Trainer';arena.append(boss);}boss.textContent=V33_LEADERS[battle.v33Boss].style;}
 const d=battle.v31Duo;if(!d)return;
 let box=$('v33DoubleControls');if(box)return;
 box=document.createElement('div');box.id='v33DoubleControls';box.className='v33DuoControls';
 box.innerHTML='<button type="button" id="v33TargetPrimary">🎯 Alvo A</button><button type="button" id="v33TargetPartner">🎯 Alvo B</button><button type="button" id="v33SupportAttack">⚔️ Golpe parceiro</button><button type="button" id="v33SupportHeal">💚 Apoio</button><button type="button" id="v33SupportSwap">🔁 Trocar parceiro</button>';
 arena.append(box);
 d.v33Manual=true;d.v33Target='main';d.v33SupportCD=0;d.v33HealCD=0;
 const update=()=>{if(!battle?.active||battle.v31Duo!==d)return;
  const main=$('v33TargetPrimary'),p=$('v33TargetPartner');if(main)main.style.borderColor=d.v33Target==='main'?'#d4cc72':'#65a5ae';if(p)p.style.borderColor=d.v33Target==='partner'?'#d4cc72':'#65a5ae';
  if(p)p.disabled=!(d.enemy&&d.enemy.hp>0);
  const attack=$('v33SupportAttack'),heal=$('v33SupportHeal');if(attack)attack.disabled=!(d.ally&&d.ally.hp>0);if(heal)heal.disabled=!(d.ally&&d.ally.hp>0);
 };
 $('v33TargetPrimary').onclick=()=>{d.v33Target='main';update()};
 $('v33TargetPartner').onclick=()=>{d.v33Target='partner';update()};
 $('v33SupportAttack').onclick=()=>{
  if(!battle?.active||battle.paused||d.ally.hp<=0||performance.now()<d.v33SupportCD)return;
  const enemy=d.v33Target==='partner'&&d.enemy?.hp>0?d.enemy:foe();if(!enemy||enemy.hp<=0)return;
  d.v33SupportCD=performance.now()+2250;
  const move=skillSet(d.ally)[1]||skillSet(d.ally)[0];const power=Math.min(52,move.power||23),hit=damage(d.ally,enemy,move.type,power).hit;
  enemy.hp=Math.max(0,enemy.hp-hit);engine?.particlesAt(engine.enemy.x,engine.enemy.y,V33_FX_COLORS[move.type]||'#d8fdff',9,70);
  engine?.damageLabels.push({x:engine.enemy.x+(enemy===d.enemy?30:0),y:engine.enemy.y-30,text:'PARCEIRO -'+hit,life:.8,color:'#b4ffe8'});
  if(enemy===d.enemy&&enemy.hp<=0){d.enemy=null;d.v33Target='main';}
  else if(enemy===foe()&&enemy.hp<=0){nextFoe();}
  update();
 };
 $('v33SupportHeal').onclick=()=>{
  if(!battle?.active||battle.paused||d.ally.hp<=0||performance.now()<d.v33HealCD||battle.energy<22)return;
  d.v33HealCD=performance.now()+8200;battle.energy-=22;const target=d.ally.hp<current().hp?d.ally:current();
  target.hp=Math.min(target.maxHp,target.hp+Math.max(2,Math.round(target.maxHp*.17)));
  engine?.particlesAt(engine.player.x,engine.player.y,'#b0ffd4',12,80);v33Toast('Apoio: recuperação de '+D[target.id].name+'!');update();
 };
 $('v33SupportSwap').onclick=()=>{
  if(!battle?.active||battle.paused)return;
  const opts=save.team.filter(m=>m.hp>0&&m!==current()&&m!==d.ally);
  if(!opts.length)return v33Toast('Sem outro Pokémon disponível para ser parceiro.');
  const index=save.team.findIndex(m=>m===d.ally),next=opts[0];if(index>=0){d.ally=next;d.v33SupportCD=performance.now()+850;engine?.loadArt(next.id);v33Toast(D[next.id].name+' entrou na dupla!');}update();
 };
 update();
}
// Na V31 o ataque do parceiro era automático. Na V33, o jogador controla os comandos de apoio.
const v33UpdatePrev=BattleEngine.prototype.update;
BattleEngine.prototype.update=function(dt,now){
 const b=battle,duo=b?.v31Duo;
 if(duo?.v33Manual){duo.clockAlly=99999;}
 const originalX=this.player?.x||0,originalY=this.player?.y||0;
 const result=v33UpdatePrev.call(this,dt,now);
 if(!battle?.active||battle.paused)return result;
 if(duo?.v33Manual){duo.clockAlly=99999;if(duo.enemy?.hp<=0){duo.enemy=null;duo.v33Target='main';}}
 if(battle.v33Boss>=0){
  const g=battle.v33Boss,profile=V33_LEADERS[g];
  if(profile){this.enemyAttackCD=Math.max(.25,Math.min(12,this.enemyAttackCD+dt*(profile.tempo-1)*.7));
   if(Number.isFinite(this.foeDodgeCD))this.foeDodgeCD=Math.max(.13,this.foeDodgeCD+dt*(profile.evade-1)*.5);
   const f=foe();if(f?.hp>0&&f.hp<=f.maxHp*.42&&battle.v33BossStage<1){
    battle.v33BossStage=1;this.enemyAttackCD=Math.max(.25,this.enemyAttackCD-.35);
    engine?.particlesAt(this.enemy.x,this.enemy.y,V33_FX_COLORS[profile.type]||'#fff',17,78);
    v33Toast('👑 '+profile.name+': "Agora é minha vez de lutar a sério!"');
   }
  }
 }
 // Treinamento leve de velocidade mantém o personagem dentro da arena.
 const sp=Math.min(8,current()?.v33Train?.spd||0);
 if(sp>0&&this.player){this.player.x+=(this.player.x-originalX)*sp*.004;this.player.y+=(this.player.y-originalY)*sp*.004;this.bounds(this.player);}
 return result;
};
const v33HitPrev=BattleEngine.prototype.hitTarget;
BattleEngine.prototype.hitTarget=function(who,type,power){
 if(!battle?.active)return;
 const p=who==='enemy'?current():foe(),a=who==='enemy'?foe():current();
 const aSpeed=(D[a.id]?.spd||50)+Math.min(8,a.v33Train?.spd||0)*3;
 const dSpeed=(D[p.id]?.spd||50)+Math.min(8,p.v33Train?.spd||0)*3;
 const evade=Math.max(.035,Math.min(.14,.045+(dSpeed-aSpeed)*.00035));
 if(Math.random()<evade){
  const target=who==='enemy'?this.enemy:this.player;
  if(target){this.damageLabels.push({x:target.x,y:target.y-34,text:'ESQUIVOU',life:.7,color:'#c9f1ff'});this.particlesAt(target.x,target.y,'#cee6ff',5,45);}
  v33Ensure().stats.misses++;
  if(battle.v33Tracker)battle.v33Tracker.misses++;
  return;
 }
 if(who==='enemy'&&battle.v31Duo?.v33Manual&&battle.v31Duo.v33Target==='partner'&&battle.v31Duo.enemy?.hp>0){
  const enemy=battle.v31Duo.enemy,hit=damage(current(),enemy,type,power).hit;
  enemy.hp=Math.max(0,enemy.hp-hit);
  this.damageLabels.push({x:this.enemy.x+35,y:this.enemy.y-31,text:'- '+hit,life:.7,color:'#ffe4a0'});
  this.particlesAt(this.enemy.x+30,this.enemy.y,V33_FX_COLORS[type]||'#fff',10,75);
  if(battle.v33Tracker)battle.v33Tracker.damage+=hit;
  if(enemy.hp===0){battle.v31Duo.enemy=null;battle.v31Duo.v33Target='main';v33Toast('Alvo secundário derrotado!');}
  return;
 }
 const hp=p.hp;
 const r=v33HitPrev.call(this,who,type,power);
 if(who==='enemy'&&battle?.v33Tracker)battle.v33Tracker.damage+=Math.max(0,hp-p.hp);
 if(battle?.active&&battle.v33Fx){ /* reserve for visual effects */ }
 return r;
};
const v33CastPrev=BattleEngine.prototype.useMove;
BattleEngine.prototype.useMove=function(i){
 if(!battle?.active||battle.paused)return v33CastPrev.call(this,i);
 const m=current(),s=skillSet(m)[i],now=performance.now();
 if(!s||cooldowns[i]>now||battle.energy<s.cost||m.hp<=0)return;
 if(this.v33Windup&&now<this.v33Windup.until)return;
 const name=s.name;
 if(battle.v33Tracker)battle.v33Tracker.moves[name]=(battle.v33Tracker.moves[name]||0)+1;
 v33Ensure().stats.moves[name]=(save.v33.stats.moves[name]||0)+1;
 const fx={type:s.type,start:now,until:now+260,from:'player'};
 if(!this.v33Fx)this.v33Fx=[];this.v33Fx.push(fx);if(this.v33Fx.length>12)this.v33Fx.shift();
 const castHeavy=(s.power>=60||V33_HEAVY.has(name))&&s.kind!=='homing';
 if(castHeavy){
  const b=battle,me=m;this.v33Windup={until:now+410};
  let chip=$('v33CastCall');if(!chip){chip=document.createElement('div');chip.id='v33CastCall';chip.className='v33BattleCall';$('arenaPro')?.append(chip);}chip.textContent='✨ '+name+' · Preparando...';
  setTimeout(()=>{if(this.v33Windup)this.v33Windup=null;chip?.remove();if(battle===b&&b.active&&!b.paused&&current()===me){v33CastPrev.call(this,i);}},420);
  return;
 }
 return v33CastPrev.call(this,i);
};
const v33DrawPrev=BattleEngine.prototype.draw;
BattleEngine.prototype.draw=function(now){
 v33DrawPrev.call(this,now);
 if(!battle?.active)return;
 const ctx=this.ctx,w=this.w,h=this.h,t=now*.001;
 ctx.save();
 // Props pequenos nas bordas; nunca atrás do Pokémon ou cobrindo barras de vida.
 const terrain=battle.v33Terrain;
 if(terrain!=='normal'){
  const color={rock:'#c9bd96',water:'#6bd7f5',grass:'#83c77b',electric:'#ecd879',psychic:'#c79df3'}[terrain]||'#d5e1e7';
  ctx.globalAlpha=.32;ctx.fillStyle=color;ctx.strokeStyle=color;
  for(let i=0;i<7;i++){
   const x=w*(.06+(i*137%77)/100),y=h*(i%2===0?.18:.85),r=3+(i%3)*2;
   if(terrain==='water'){ctx.beginPath();ctx.ellipse(x,y,r*2.4,r*.55,0,0,Math.PI*2);ctx.stroke();}
   else if(terrain==='grass'){ctx.beginPath();ctx.moveTo(x-r,y);ctx.lineTo(x,y-r*1.5);ctx.lineTo(x+r,y);ctx.fill();}
   else if(terrain==='electric'){ctx.beginPath();ctx.moveTo(x-r,y-r);ctx.lineTo(x+1,y);ctx.lineTo(x-2,y+r);ctx.stroke();}
   else{ctx.beginPath();ctx.moveTo(x-r,y+r);ctx.lineTo(x,y-r);ctx.lineTo(x+r,y+r);ctx.closePath();ctx.stroke();}
  }
 }
 // Efeitos 2D leves vinculados ao desenho existente, sem novo RAF.
 if(save.v33?.settings?.effects!==false){
  this.v33Fx=(this.v33Fx||[]).filter(x=>x.until>now);
  for(const f of this.v33Fx){
   const life=Math.max(0,Math.min(1,(f.until-now)/260)),cx=f.from==='player'?this.player.x:this.enemy.x,cy=f.from==='player'?this.player.y:this.enemy.y;
   ctx.globalAlpha=.25*life;ctx.strokeStyle=V33_FX_COLORS[f.type]||'#fff';ctx.lineWidth=1.4;
   const lines=6;
   for(let i=0;i<lines;i++){const a=i*Math.PI*2/lines+t*.5,outer=8+20*(1-life);ctx.beginPath();ctx.moveTo(cx+Math.cos(a)*8,cy+Math.sin(a)*8);ctx.lineTo(cx+Math.cos(a+.13)*outer,cy+Math.sin(a+.13)*outer);ctx.stroke();}
  }
 }
 ctx.restore();
};
const v33RenderBattlePrev=renderBattle;
renderBattle=function(){v33RenderBattlePrev();if(battle?.active)v33BattleTools();};
function v33Result(title,message,win=true){
 if(!battle?.active)return;
 battle.active=false;stopTimers();battle=null;
 resultScreen(title,message,win,false);
}
const v33FinishPrev=finishBattle;
finishBattle=function(win){
 if(!battle?.active)return;
 const b=battle,mode=b.v33Type;
 const stats=v33Ensure().stats;
 if(mode!=='lab'){stats.fights++;if(win)stats.wins++;else stats.losses++;}else{stats.lab=(stats.lab||0)+1;}
 if(b.v33Tracker){stats.damage+=b.v33Tracker.damage;}
 if(mode==='lab'){
  const snapshot=b.v33Snapshot||[];
  for(const state of snapshot){const m=save.team.find(p=>p===state.ref);if(m)Object.assign(m,state.data);}
  if(b.v33SaveSnapshot){save.coins=b.v33SaveSnapshot.coins;save.gym=b.v33SaveSnapshot.gym;save.stage=b.v33SaveSnapshot.stage;save.wins=b.v33SaveSnapshot.wins;save.losses=b.v33SaveSnapshot.losses;if(Array.isArray(b.v33SaveSnapshot.seen))save.seen=b.v33SaveSnapshot.seen;if(Array.isArray(b.v33SaveSnapshot.caught))save.caught=b.v33SaveSnapshot.caught;}
  persist();v33Result('🧪 LABORATÓRIO · '+(win?'VITÓRIA':'DERROTA'),'Seu time foi restaurado. Insígnias, moedas e campanha não foram alteradas.',win);return;
 }
 if(mode==='legendary'){
  if(win){const legend=b.v33Legendary;save.coins+=65;
   v33Result('✨ DESAFIO LENDÁRIO VENCIDO!',legend+' recuou! Tente uma Pokébola durante o combate para capturá-lo. Bônus: 65 moedas.',true);persist();}
  else{persist();v33Result('⚡ DESAFIO LENDÁRIO','A batalha foi difícil. Treine seu time e tente novamente.',false);}return;
 }
 persist();return v33FinishPrev(win);
};
const v33CapturePrev=finishCapture;
finishCapture=function(m){
 const legendary=battle?.v33Type==='legendary';
 if(battle?.active){const stats=v33Ensure().stats;stats.captures++;if(m?.shiny)stats.shiny++;if(legendary&&!stats.legendary.includes(m.id))stats.legendary.push(m.id);persist();}
 return v33CapturePrev(m);
};
function v33RenderMenu(){
 if(!save.starter||battle?.active)return;
 const root=$('main');if(!root||$('v33MainMenu'))return;
 const row=document.createElement('div');row.id='v33MainMenu';row.className='v33Menu';
 row.innerHTML='<button class="btn ghost" type="button" id="v33TrainOpen">💪 Treinamento</button><button class="btn ghost" type="button" id="v33LegendOpen">✨ Lendários</button><button class="btn ghost" type="button" id="v33LabOpen">🧪 Laboratório</button><button class="btn ghost" type="button" id="v33HistoryOpen">📊 Histórico</button>';
 const area=$('v32Menu')||root.querySelector('.gymHero')||root.querySelector('.panel');
 if(area)area.insertAdjacentElement('afterend',row);else root.prepend(row);
 $('v33TrainOpen').onclick=v33TrainingMenu;
 $('v33LegendOpen').onclick=v33LegendMenu;
 $('v33LabOpen').onclick=v33LabMenu;
 $('v33HistoryOpen').onclick=v33HistoryMenu;
 const tag=$('v30VersionTag');if(tag)tag.textContent='V33 · 2D';
}
const v33RenderPrev=render;
render=function(){v33Ensure();v33RenderPrev();v33RenderMenu();};
function v33TrainingMenu(){if(battle?.active)return;v33Ensure();const team=save.team;
 overlay('<div class="sectionhead"><div><div class="overline">V33 · TREINAMENTO INDIVIDUAL</div><h2>💪 Centro de Treino</h2></div><button class="btn tiny ghost" id="v33BackTrain">✕</button></div><p class="desc">Treine cada Pokémon até 8 pontos em quatro atributos. O custo cresce conforme o treino. Nenhuma evolução ou progresso será apagado.</p><div class="v33Pane">Moedas disponíveis: <b>🪙 '+save.coins+'</b></div><div id="v33TrainList">'+team.map((m,i)=>'<button type="button" data-v33-mon="'+i+'" class="v32MoveRow"><b>'+D[m.id].name+' · Nv. '+m.level+'</b><small>Treinar →</small></button>').join('')+'</div>');
 $('v33BackTrain').onclick=close;document.querySelectorAll('[data-v33-mon]').forEach(el=>el.onclick=()=>v33TrainMon(save.team[+el.dataset.v33Mon]));
}
function v33TrainMon(m){if(!m||!save.team.includes(m)||battle?.active)return;
 v33Ensure();const tr=m.v33Train,labels={atk:'Ataque',def:'Defesa',spd:'Velocidade',special:'Ataque Especial'};
 overlay('<div class="sectionhead"><div><div class="overline">V33 · TREINAMENTO</div><h2>💪 '+D[m.id].name+'</h2></div><button class="btn tiny ghost" id="v33TrainBack">✕</button></div><p class="desc">Cada ponto aumenta levemente o desempenho no combate. Limite: 8 por atributo.</p><div class="v33Pane">🪙 Moedas: <b>'+save.coins+'</b> · Nível '+m.level+'</div><div id="v33TrainCards">'+Object.entries(labels).map(([key,label])=>{
 const lv=tr[key]||0,cost=25+lv*16;
 return '<div class="v33Pane"><strong>'+label+'</strong><small> · '+lv+'/8</small><div class="v33Bar"><i style="width:'+(lv*12.5)+'%"></i></div><button class="btn tiny gold" style="margin-top:8px" data-v33-train="'+key+'" '+(lv>=8||save.coins<cost?'disabled':'')+'>'+(lv>=8?'MÁXIMO':'🪙 '+cost+' · Treinar')+'</button></div>';
 }).join('')+'</div>');
 $('v33TrainBack').onclick=v33TrainingMenu;
 document.querySelectorAll('[data-v33-train]').forEach(btn=>btn.onclick=()=>{
  const stat=btn.dataset.v33Train,lv=tr[stat];if(!Number.isInteger(lv)||lv>=8)return;const cost=25+lv*16;if(save.coins<cost)return;
  save.coins-=cost;tr[stat]=lv+1;persist();v33TrainMon(m);
 });
}
function v33LegendMenu(){if(battle?.active)return;
 const medals=save.medals?.length||0;
 overlay('<div class="sectionhead"><div><div class="overline">V33 · DESAFIOS EXTRAS</div><h2>✨ Lendários de Kanto</h2></div><button class="btn tiny ghost" id="v33LegendClose">✕</button></div><p class="desc">Encontros especiais após obter 8 insígnias. Use Pokébolas durante o combate para tentar capturar um lendário. Mewtwo exige concluir a Liga.</p>'+V33_LEGENDARIES.map((p,i)=>'<div class="v33Legendary"><div><strong>'+p.name+'</strong><small style="display:block">'+p.place+' · Nv. '+p.level+' · '+(p.gate===13?'Liga completa':'8 insígnias')+'</small></div><button class="btn tiny '+((p.gate===8?medals>=8:save.gym>=13)?'gold':'ghost')+'" type="button" data-v33-legend="'+i+'" '+((p.gate===8?medals>=8:save.gym>=13)?'':'disabled')+'>Enfrentar</button></div>').join(''));
 $('v33LegendClose').onclick=close;
 document.querySelectorAll('[data-v33-legend]').forEach(el=>el.onclick=()=>{
  const p=V33_LEGENDARIES[+el.dataset.v33Legend];if(!p||save.balls<=0)return v33Toast('Compre Pokébolas antes de tentar o desafio.');
  if((p.gate===8&&medals<8)||(p.gate===13&&save.gym<13))return;
  if(!requireTeam())return showItems();
  startBattle([mon(p.id,p.level)],'✨ LENDÁRIO '+p.name,true);
  if(battle?.active){battle.v33Type='legendary';battle.v33Legendary=p.name;battle.v32Weather=p.weather;}
 });
}
function v33LabMenu(){if(battle?.active)return;
 if(!requireTeam())return v33Toast('Cure um Pokémon da equipe antes de entrar no Laboratório.');
 const choices=[25,6,9,65,94,130,149,150];
 overlay('<div class="sectionhead"><div><div class="overline">V33 · TESTES SEM RISCO</div><h2>🧪 Laboratório de Batalhas</h2></div><button class="btn tiny ghost" id="v33LabClose">✕</button></div><p class="v33LabNote">Escolha um adversário e o nível. Treine movimentos e estratégias sem perder moedas, insígnias ou progresso. O HP da equipe volta ao valor original depois da batalha.</p><div class="v33Pane"><label for="v33LabTarget">Adversário</label><select id="v33LabTarget" style="width:100%;padding:10px;margin:8px 0;background:#182f40;color:#fff;border:1px solid #678299;border-radius:9px">'+choices.map(id=>'<option value="'+id+'">'+D[id].name+'</option>').join('')+'</select><label for="v33LabLevel">Nível (5 a 100)</label><input id="v33LabLevel" inputmode="numeric" type="number" value="35" min="5" max="100" style="width:100%;padding:10px;margin:8px 0;background:#182f40;color:#fff;border:1px solid #678299;border-radius:9px" /><label><input type="checkbox" id="v33LabDuo"> Batalha dupla (precisa de dois Pokémon vivos)</label></div><div class="v33Flex"><button class="btn gold" id="v33LabStart">⚔️ Começar teste</button><button class="btn ghost" id="v33LabBack">Voltar</button></div>');
 $('v33LabClose').onclick=close;$('v33LabBack').onclick=close;
 $('v33LabStart').onclick=()=>{
  const id=Number($('v33LabTarget').value),level=Math.max(5,Math.min(100,Math.floor(Number($('v33LabLevel').value)||35))),duo=$('v33LabDuo').checked;
  if(!D[id]||!requireTeam())return;if(duo&&save.team.filter(x=>x.hp>0).length<2)return v33Toast('Você precisa de dois Pokémon vivos para testar a dupla.');
  const snapshot=save.team.map(m=>({ref:m,data:JSON.parse(JSON.stringify(m))}));
  const saveSnapshot={coins:save.coins,gym:save.gym,stage:save.stage,wins:save.wins,losses:save.losses,seen:[...(save.seen||[])],caught:[...(save.caught||[])]};
  const adversaries=[mon(id,level)];if(duo)adversaries.push(mon(id,level));
  startBattle(adversaries,duo?'🧪 RIVAL · TESTE DUPLO':'🧪 LABORATÓRIO · TESTE',false);
  if(battle?.active){battle.v33Type='lab';battle.v33Snapshot=snapshot;battle.v33SaveSnapshot=saveSnapshot;
   if(duo&&!battle.v31Duo){const ally=save.team.find(m=>m.hp>0&&m!==current());const enemy=battle.enemies.shift();battle.v31Duo={ally,enemy,clockAlly:99999,clockEnemy:2.5};v33BattleTools();}
  }
 };
}
function v33HistoryMenu(){if(battle?.active)return;
 const info=v33Ensure().stats,most=Object.entries(info.moves).sort((a,b)=>b[1]-a[1]).slice(0,8);
 overlay('<div class="sectionhead"><div><div class="overline">V33 · HISTÓRICO LOCAL</div><h2>📊 Estatísticas</h2></div><button class="btn tiny ghost" id="v33StatsBack">✕</button></div><p class="desc">Os registros desta tela começam na V33 e ficam salvos apenas neste navegador.</p><div class="v33Stats">'+[
 ['Batalhas concluídas',info.fights],['Vitórias registradas',info.wins],['Derrotas registradas',info.losses],['Capturas',info.captures],['Shiny capturados',info.shiny],['Dano causado',info.damage],['Desvios/erros',info.misses],['Recorde na Torre',save.v32?.tower?.best||0]
 ].map(([name,val])=>'<div class="v33Pane"><small>'+name+'</small><h3>'+val+'</h3></div>').join('')+'</div><div class="v33Pane"><h3>Golpes mais usados</h3>'+((most.length?most.map(([name,n])=>'<div class="v33Pet">'+name+' · '+n+' uso(s)</div>').join(''):'Ainda não existem dados de golpes.'))+'</div><div class="v33Pane">Lendários capturados: '+(info.legendary.map(id=>D[id]?.name||id).join(', ')||'Nenhum')+'</div>');
 $('v33StatsBack').onclick=close;
}
// Recuperação no próprio loop — um erro não pode gerar milhares de mensagens/quadros congelados.
const v33FramePrev=BattleEngine.prototype.frame;
BattleEngine.prototype.frame=function(now){try{return v33FramePrev.call(this,now);}catch(error){
 console.error('Pokemon Torre V33 erro de batalha:',error);this.running=false;if(this.raf)cancelAnimationFrame(this.raf);
 const msg='Erro de renderização; o progresso anterior está preservado.';
 if(battle?.active){const b=battle;b.active=false;stopTimers();battle=null;}
 persist();
 try{resultScreen('⚠️ BATALHA INTERROMPIDA',msg,false,false);}catch(e){console.error('Erro ao recuperar batalha',e);$('backdrop')?.classList.add('hide');render();}
 }};
window.PokemonTorreV33Diagnostics=()=>({version:V33_VERSION,speciesProfiles:Object.keys(V33_SPECIES_MOVES).length,trainer:save.team.map(m=>({id:m.id,train:m.v33Train||{},skills:skillSet(m).map(x=>x.name)})),legendaries:V33_LEGENDARIES.map(l=>l.id),stats:{...v33Ensure().stats},lab:battle?.v33Type==='lab',double:!!battle?.v31Duo,terrain:battle?.v33Terrain||null});
/* FIM POKEMON TORRE V33 */