"""Fixture-based integration test (NOT a full ROM compilation)."""
import tempfile
from pathlib import Path
import sys
sys.path.insert(0, str(Path(__file__).parents[1] / 'overlay' / 'src'))
from arena_tower_installer import plan, install

old_block='''// Native encounter shortcut for the opt-in practice SAVE, not a ROM mailbox.
static const int x=1;
void RealtimeArena_PracticeTick(void) { oldstuff(); }

'''
team='''static const struct {u16 species;u8 level;} team[] = {
        {SPECIES_CHARIZARD,36}, {SPECIES_BLASTOISE,36}, {SPECIES_EEVEE,25},
        {SPECIES_DRAGONITE,30}, {SPECIES_SCIZOR,15}, {SPECIES_BLAZIKEN,20}
    };
    static const struct {u16 species;u8 level;} box[] = {
        {SPECIES_TREECKO,11}, {SPECIES_POOCHYENA,12}, {SPECIES_BULBASAUR,12},
        {SPECIES_SQUIRTLE,15}, {SPECIES_GROVYLE,16}, {SPECIES_SCEPTILE,43}
    };'''
box='''    for (i = 0; i < ARRAY_COUNT(box); i++)
        CreateBoxMonAt(0, i, box[i].species, box[i].level,
                       20, TRUE, i * 2, OT_ID_PLAYER_ID, 0);'''
with tempfile.TemporaryDirectory() as d:
 root=Path(d)
 for p,s in {
  'src/realtime_arena.c': '#include "constants/songs.h"\n'+old_block+'static void CB2_ArenaInit(void);\n'+team+'\n'+box+'\n',
  'src/battle_main.c': 'CreateNPCTrainerParty(&gEnemyParty[0], gTrainerBattleOpponent_A, TRUE);',
  'data/event_scripts.s': '\t.include "data/scripts/arena_practice.inc"',
  'include/realtime_arena.h': 'void RealtimeArena_PracticeTick(void);',
 }.items():
  f=root/p;f.parent.mkdir(parents=True,exist_ok=True);f.write_text(s)
 # Actual battle_main patch anchor includes leading spaces.
 b=root/'src/battle_main.c';b.write_text('        '+b.read_text())
 mapped=plan(root)
 assert '#include "arena_tower.inc"' in mapped['arena']
 assert 'RealtimeArena_TowerAdjustEnemyParty();' in mapped['battle']
 assert 'arena_tower_event.inc' in mapped['scripts']
 install(root)
 assert (root/'src/arena_tower.inc').exists()
 assert (root/'src/realtime_arena.c.pre-tower').exists()
 assert (root/'data/scripts/arena_tower_event.inc').exists()
 try: plan(root)
 except RuntimeError: pass
 else: raise AssertionError('Installer failed to refuse double application')
 print('PASS: source integration anchors, backups, files, double-install rejection')
