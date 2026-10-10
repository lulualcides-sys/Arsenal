from pathlib import Path
import re
base=Path(__file__).resolve().parent
src=(base.parent/'overlay/src/arena_tower.inc').read_text()
keys=sorted(set(re.findall(r'\b(?:SPECIES|MOVE)_[A-Z0-9_]+\b',src)))
# enumerations for compile-only host, not real species IDs
names='\n'.join(f'#define {key} {i+50}' for i,key in enumerate(keys))
head=r'''
#include <stdio.h>
#include <string.h>
#include <stdint.h>
#include "../overlay/src/arena_tower_progress.h"
#define ARENA_TOWER_HOST 1
#define EWRAM_DATA
#define _(x) x
#define TRUE 1
#define FALSE 0
#define TRAINERS_COUNT 32
#define TRAINER_CLASS_BIRD_KEEPER 5
#define TRAINER_CLASS_SWIMMER_M 6
#define TRAINER_WINONA_1 30
#define TRAINER_JUAN_1 31
#define TRAINER_ALBERTO 1
#define TRAINER_DECLAN 10
#define TRAINER_BATTLE_SINGLE_NO_INTRO_TEXT 7
#define BATTLE_TYPE_TRAINER 8
#define B_OUTCOME_WON 1
#define ITEM_NONE 0
#define ITEM_GREAT_BALL 2
#define ITEM_POKE_BALL 3
#define GAME_STAT_WILD_BATTLES 11
#define FLAG_ARENA_PRACTICE 1
#define VAR_UNUSED_0x40F7 0x40F7
#define VAR_UNUSED_0x40F8 0x40F8
#define VAR_UNUSED_0x40F9 0x40F9
#define VAR_UNUSED_0x40FA 0x40FA
#define MON_DATA_HP 1
#define MON_DATA_IS_EGG 2
#define L_BUTTON 1
#define R_BUTTON 2
#define A_BUTTON 4
#define B_BUTTON 8
#define OT_ID_PLAYER_ID 0
#define JOY_HELD(x) (buttons & (x))
#define JOY_NEW(x) (newButtons & (x))
#define ARRAY_COUNT(a) (sizeof(a)/sizeof((a)[0]))
typedef unsigned char u8;
typedef unsigned short u16;
typedef unsigned int u32;
typedef signed char s8;
typedef unsigned char bool8;
struct Trainer {u8 trainerClass,doubleBattle,partySize;};
struct Pokemon {u16 species;u8 level,hp;u16 move;};
struct Main {int inBattle;};
struct Trainer gTrainers[TRAINERS_COUNT];
struct Pokemon gPlayerParty[6],gEnemyParty[6];
struct Main gMain;
u16 gTrainerBattleOpponent_A,gBattleTypeFlags,gBattleOutcome;
u8 gPlayerPartyCount;
int gPaletteFade_active, fieldLocked,scriptEnabled;
struct {int active;} gPaletteFade;
int buttons,newButtons,healRewards,ballsRewarded,scriptedWilds,trainerBattles;
u16 vars[65536];
const u8 EventScript_ArenaTowerReturn[2]={1,2};
const u8 EventScript_ArenaPracticeBattle[2]={3,4};
void ArenaExpFieldTick(void){}
int FlagGet(int x){(void)x;return 1;}
int ArePlayerFieldControlsLocked(void){return fieldLocked;}
int ScriptContext_IsEnabled(void){return scriptEnabled;}
unsigned VarGet(unsigned i){return vars[i];}
void VarSet(unsigned i,unsigned value){vars[i]=value;}
int GetMonData(const struct Pokemon *p,int field){return field==MON_DATA_HP?p->hp:0;}
int GetGameStat(int stat){(void)stat;return scriptedWilds;}
void ZeroPlayerPartyMons(void){memset(gPlayerParty,0,sizeof(gPlayerParty));}
void ZeroEnemyPartyMons(void){memset(gEnemyParty,0,sizeof(gEnemyParty));}
void CreateMon(struct Pokemon *p,u16 species,u8 level,int iv,int fixed,int pv,int ot,int id){
 (void)iv;(void)fixed;(void)pv;(void)ot;(void)id; p->species=species;p->level=level;p->hp=30;
}
void SetMonMoveSlot(struct Pokemon *p,u16 move,int slot){if(slot==0)p->move=move;}
void AddBagItem(int item,int amount){(void)item;ballsRewarded+=amount;}
void HealPlayerParty(void){healRewards++;gPlayerParty[0].hp=30;}
void CreateScriptedWildMon(int species,int level,int item){(void)species;(void)level;(void)item;scriptedWilds++;}
void ScriptContext_SetupScript(const u8 *ptr){(void)ptr;scriptEnabled=0;}
void LockPlayerFieldControls(void){fieldLocked=1;}
void BattleSetup_ConfigureTrainerBattle(const u8 *data){gTrainerBattleOpponent_A=data[1]|(data[2]<<8);}
void BattleSetup_StartTrainerBattle(void){trainerBattles++;gMain.inBattle=1;}
'''
tail=r'''
#define CHECK(x) do{if(!(x)){printf("FAIL line %d: %s\n",__LINE__,#x);return 1;}}while(0)
static void Frame(int keys){newButtons=buttons=keys;fieldLocked=0;gPaletteFade.active=0;scriptEnabled=0;RealtimeArena_PracticeTick();newButtons=buttons=0;}
static void BattleEnd(int outcome){gMain.inBattle=0;gBattleOutcome=outcome;Frame(0);}
int main(void){
 unsigned i;
 for(i=1;i<=8;i++){gTrainers[i].trainerClass=TRAINER_CLASS_BIRD_KEEPER;gTrainers[i].partySize=1;}
 for(i=9;i<=17;i++){gTrainers[i].trainerClass=TRAINER_CLASS_SWIMMER_M;gTrainers[i].partySize=1;}
 gPlayerPartyCount=1;CreateMon(&gPlayerParty[0],SPECIES_BULBASAUR,5,20,1,0,0,0);
 Frame(R_BUTTON); CHECK(gPlayerParty[0].species==SPECIES_CHARMANDER);
 Frame(L_BUTTON); CHECK(gPlayerParty[0].species==SPECIES_BULBASAUR);
 Frame(A_BUTTON|B_BUTTON);CHECK(scriptedWilds==1);CHECK(VarGet(VAR_TOWER_STAGE)==0);
 Frame(L_BUTTON|R_BUTTON);CHECK(trainerBattles==1);CHECK(VarGet(VAR_TOWER_PENDING)==1);
 gBattleTypeFlags=BATTLE_TYPE_TRAINER;RealtimeArena_TowerAdjustEnemyParty();
 CHECK(gEnemyParty[0].species==SPECIES_WINGULL && gEnemyParty[0].level==5);
 BattleEnd(2);CHECK(VarGet(VAR_TOWER_STAGE)==0);CHECK(VarGet(VAR_TOWER_PENDING)==0);
 Frame(L_BUTTON|R_BUTTON); CHECK(trainerBattles==2);RealtimeArena_TowerAdjustEnemyParty();BattleEnd(B_OUTCOME_WON);
 CHECK(VarGet(VAR_TOWER_STAGE)==1);
 /* A starter must not be reset after battles: this would erase earned XP. */
 Frame(R_BUTTON);CHECK(gPlayerParty[0].species==SPECIES_BULBASAUR);
 for(i=1;i<TOWER_TOTAL_STEPS;i++){
  Frame(L_BUTTON|R_BUTTON);CHECK(VarGet(VAR_TOWER_PENDING)==i+1);
  gBattleTypeFlags=BATTLE_TYPE_TRAINER;RealtimeArena_TowerAdjustEnemyParty();
  if(i==6)CHECK(gEnemyParty[1].species==SPECIES_SWELLOW);
  if(i==7)CHECK(gEnemyParty[0].species==SPECIES_LOTAD);
  if(i==13)CHECK(gEnemyParty[2].species==SPECIES_SEALEO);
  BattleEnd(B_OUTCOME_WON);CHECK(VarGet(VAR_TOWER_STAGE)==i+1);
 }
 CHECK(healRewards==2 && ballsRewarded==6);
 Frame(L_BUTTON|R_BUTTON);CHECK(trainerBattles==15);
 CHECK(VarGet(VAR_TOWER_STAGE)==TOWER_TOTAL_STEPS);
 puts("PASS: real tower integration hooks (mocked Emerald engine), win/loss, encounters, starters, bosses and stage persistence");
 return 0;
}
'''
out=base/'test_tower_engine.c'
out.write_text(head+'\n'+names+'\n#include "../overlay/src/arena_tower.inc"\n'+tail)
print(out)
