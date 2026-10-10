@ Called after the Emerald engine's native trainer battle returns to the field.
@ Do not add rewards or force a battle outcome here; the C tower tick checks
@ B_OUTCOME_WON and advances the saved stage.
EventScript_ArenaTowerReturn::
    releaseall
    end
