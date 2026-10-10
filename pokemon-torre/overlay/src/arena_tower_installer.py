#!/usr/bin/env python3
"""Install the tower vertical slice on top of an Emerald Arena checkout.

Use only with the upstream GBurgardt/pokemon-emerald-arena main sources.
It modifies source files (never a ROM), makes backups, and fails closed when
upstream code does not match the expected integration points.
"""
from pathlib import Path
import sys, shutil

HERE = Path(__file__).resolve().parent

def replace_once(source: str, before: str, after: str, label: str) -> str:
    n = source.count(before)
    if n != 1:
        raise RuntimeError(f'{label}: expected exactly 1 anchor, found {n}; no files written')
    return source.replace(before, after, 1)

def plan(root: Path):
    battle = root / 'src' / 'battle_main.c'
    arena = root / 'src' / 'realtime_arena.c'
    scripts = root / 'data' / 'event_scripts.s'
    for f in (battle,arena,scripts):
        if not f.exists(): raise RuntimeError(f'Missing patched pokeemerald file: {f}')
    a=arena.read_text()
    b=battle.read_text()
    s=scripts.read_text()
    if 'arena_tower.inc' in a: raise RuntimeError('Tower already installed; refusing duplicate edit')
    start=a.index('// Native encounter shortcut for the opt-in practice SAVE, not a ROM mailbox.')
    end=a.index('static void CB2_ArenaInit(void);', start)
    a=a[:start]+'#include "arena_tower.inc"\n\n'+a[end:]
    a=replace_once(a,'#include "constants/songs.h"', '#include "constants/songs.h"\n#include "constants/game_stat.h"','realtime includes')
    a=replace_once(a,
      'static const struct {u16 species;u8 level;} team[] = {\n'
      '        {SPECIES_CHARIZARD,36}, {SPECIES_BLASTOISE,36}, {SPECIES_EEVEE,25},\n'
      '        {SPECIES_DRAGONITE,30}, {SPECIES_SCIZOR,15}, {SPECIES_BLAZIKEN,20}\n'
      '    };\n'
      '    static const struct {u16 species;u8 level;} box[] = {\n'
      '        {SPECIES_TREECKO,11}, {SPECIES_POOCHYENA,12}, {SPECIES_BULBASAUR,12},\n'
      '        {SPECIES_SQUIRTLE,15}, {SPECIES_GROVYLE,16}, {SPECIES_SCEPTILE,43}\n'
      '    };',
      'static const struct {u16 species;u8 level;} team[] = {{SPECIES_BULBASAUR,5}};',
      'single level-5 starter')
    a=replace_once(a,
      '    for (i = 0; i < ARRAY_COUNT(box); i++)\n'
      '        CreateBoxMonAt(0, i, box[i].species, box[i].level,\n'
      '                       20, TRUE, i * 2, OT_ID_PLAYER_ID, 0);',
      '    VarSet(VAR_TOWER_STAGE, 0);\n'
      '    VarSet(VAR_TOWER_STARTER, 0);\n'
      '    VarSet(VAR_TOWER_PENDING, 0);\n'
      '    VarSet(VAR_TOWER_LOCKED, 0);',
      'new game saved progression')
    b=replace_once(b,
      '        CreateNPCTrainerParty(&gEnemyParty[0], gTrainerBattleOpponent_A, TRUE);',
      '        CreateNPCTrainerParty(&gEnemyParty[0], gTrainerBattleOpponent_A, TRUE);\n'
      '        RealtimeArena_TowerAdjustEnemyParty();',
      'native enemy party hook')
    s=replace_once(s,
      '.include "data/scripts/arena_practice.inc"',
      '.include "data/scripts/arena_practice.inc"\n'
      '.include "data/scripts/arena_tower_event.inc"',
      'tower return script')
    h=root/'include'/'realtime_arena.h'
    htext=h.read_text()
    htext=replace_once(htext,
      'void RealtimeArena_PracticeTick(void);',
      'void RealtimeArena_PracticeTick(void);\nvoid RealtimeArena_TowerAdjustEnemyParty(void);',
      'tower function header')
    return {'arena':a, 'battle':b, 'scripts':s, 'h':htext}

def install(root: Path):
    changed=plan(root)
    destinations={
       root/'src'/'realtime_arena.c':changed['arena'],
       root/'src'/'battle_main.c':changed['battle'],
       root/'data'/'event_scripts.s':changed['scripts'],
       root/'include'/'realtime_arena.h':changed['h'],
    }
    targets={
       root/'src'/'arena_tower.inc':HERE/'arena_tower.inc',
       root/'src'/'arena_tower_progress.h':HERE/'arena_tower_progress.h',
       root/'data'/'scripts'/'arena_tower_event.inc':HERE/'arena_tower_event.inc',
    }
    for p in targets:
       if p.exists(): raise RuntimeError(f'Refusing overwrite: {p}')
    for p in destinations:
       shutil.copy2(p,p.with_suffix(p.suffix+'.pre-tower'))
    for p,data in destinations.items(): p.write_text(data)
    for p,src in targets.items():
       p.parent.mkdir(parents=True,exist_ok=True)
       shutil.copy2(src,p)
    print('Tower source integration written to',root)
    print('Backups: *.pre-tower; base Emerald Arena engine untouched beyond integration hooks.')

if __name__=='__main__':
    if len(sys.argv)!=2:
       sys.exit('Usage: python3 arena_tower_installer.py /path/to/patched/pokeemerald/workspace')
    install(Path(sys.argv[1]).resolve())
