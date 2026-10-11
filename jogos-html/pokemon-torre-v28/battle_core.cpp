// Pokemon Torre V28: código C++ compilado para WebAssembly (wasm32)
extern "C" __attribute__((export_name("battle_damage")))
int battle_damage(float attack,float defense,float attacker_level,float defender_level,float power,float stab,float type_effect,float variation){
 float numerator=attack+attacker_level*1.1f+25.0f;
 float denominator=defense+defender_level*0.9f+25.0f;
 if(denominator<1.0f)denominator=1.0f;
 float raw=(power/12.0f+attacker_level*0.44f+2.0f)*(numerator/denominator)*stab*type_effect*variation;
 if(raw<0.0f)return 0;
 if(raw>9999.0f)return 9999;
 return (int)(raw+0.5f);
}
extern "C" __attribute__((export_name("distance_squared")))
float distance_squared(float ax,float ay,float bx,float by){
 float dx=ax-bx,dy=ay-by;return dx*dx+dy*dy;
}
// Build: clang++ --target=wasm32 -O3 -nostdlib -fno-exceptions -fno-rtti -Wl,--no-entry -Wl,--export=battle_damage -Wl,--export=distance_squared -Wl,--strip-all -o battle_core.wasm battle_core.cpp
// O navegador não executa DLLs do Windows. O módulo WASM é portável (Android/PC).
