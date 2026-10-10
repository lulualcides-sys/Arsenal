#ifndef ARENA_TOWER_PROGRESS_H
#define ARENA_TOWER_PROGRESS_H
/* Independent of the Pokemon engine: stage progression and attempt rules.
 * Kept separate so the exact same logic can be host-tested. */
#define TOWER_GYMS 2
#define TOWER_TRAINERS_PER_GYM 6
#define TOWER_STEPS_PER_GYM 7
#define TOWER_TOTAL_STEPS (TOWER_GYMS * TOWER_STEPS_PER_GYM)
#define TOWER_RESULT_WIN 1
#define TOWER_RESULT_LOSS 2

static unsigned TowerGym(unsigned stage) { return stage / TOWER_STEPS_PER_GYM; }
static unsigned TowerFight(unsigned stage) { return stage % TOWER_STEPS_PER_GYM; }
static int TowerIsBoss(unsigned stage) { return TowerFight(stage) == TOWER_TRAINERS_PER_GYM; }
static int TowerIsComplete(unsigned stage) { return stage >= TOWER_TOTAL_STEPS; }
static unsigned TowerAdvance(unsigned stage, unsigned battleOutcome)
{
    if (stage >= TOWER_TOTAL_STEPS) return TOWER_TOTAL_STEPS;
    return battleOutcome == TOWER_RESULT_WIN ? stage + 1 : stage;
}
#endif
