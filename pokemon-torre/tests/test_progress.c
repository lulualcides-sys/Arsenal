#include <stdio.h>
#include "../overlay/src/arena_tower_progress.h"
#define CHECK(x) do{if(!(x)){fprintf(stderr,"FAILED line %d: %s\n",__LINE__,#x);return 1;}}while(0)
int main(void){
 unsigned s;
 CHECK(TOWER_TOTAL_STEPS==14);
 CHECK(TowerGym(0)==0 && TowerGym(6)==0 && TowerGym(7)==1);
 CHECK(!TowerIsBoss(5) && TowerIsBoss(6) && TowerIsBoss(13));
 for(s=0;s<TOWER_TOTAL_STEPS;s++){
  CHECK(TowerAdvance(s,TOWER_RESULT_LOSS)==s);
  CHECK(TowerAdvance(s,0)==s);
  CHECK(TowerAdvance(s,TOWER_RESULT_WIN)==s+1);
 }
 CHECK(TowerIsComplete(14));
 CHECK(TowerAdvance(14,TOWER_RESULT_WIN)==14);
 puts("PASS: 2 gyms x (6 trainers + leader), wins/losses/boundaries");
 return 0;
}
