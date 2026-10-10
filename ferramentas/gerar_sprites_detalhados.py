#!/usr/bin/env python3
"""Noncommercial SpriteCollab bundle: preserve actual pixel sprites and attribution."""
from __future__ import annotations
import io
import json
import pathlib
import time
import urllib.error
import urllib.request
import xml.etree.ElementTree as ET
import zipfile
from PIL import Image, ImageDraw, ImageFont

ROOT = pathlib.Path(__file__).resolve().parent.parent
DIST = ROOT / "dist"
DIST.mkdir(exist_ok=True)
ZIP_FILE = DIST / "Pokemon_10_Sprites_Detalhados_SpriteCollab.zip"
BASE = "https://raw.githubusercontent.com/PMDCollab/SpriteCollab/master/"
SPECIES = {
    "bulbasaur": "0001",
    "charmander": "0004",
    "squirtle": "0007",
    "pikachu": "0025",
    "onix": "0095",
    "scyther": "0123",
    "jolteon": "0135",
    "blastoise": "0009",
    "charizard": "0006",
    "tyranitar": "0248",
}
ACTIONS = ("Idle", "Walk", "Attack", "Hurt")
# Pokemon Mystery Dungeon sprites: Down, Down-Right, Right, Up-Right,
# Up, Up-Left, Left, Down-Left.
RIGHT_ROW = 2
UA = "Pokemon-Torre-NonCommercial-SpriteBundle/1.0 (GitHub Actions)"
def fetch(path: str) -> bytes:
    url = BASE + path
    for attempt in range(5):
        try:
            req = urllib.request.Request(url, headers={"User-Agent": UA})
            with urllib.request.urlopen(req, timeout=55) as response:
                return response.read()
        except (urllib.error.URLError, TimeoutError) as exc:
            if attempt == 4:
                raise RuntimeError(f"Could not download {url}: {exc}") from exc
            time.sleep(2 ** attempt)
    raise AssertionError("unreachable")

def png(data: bytes) -> Image.Image:
    return Image.open(io.BytesIO(data)).convert("RGBA")

def flatten_right_facing(sheet: Image.Image, fw: int, fh: int):
    if fw <= 0 or fh <= 0:
        raise ValueError("Bad frame dimensions")
    if sheet.width % fw or sheet.height % fh:
        raise ValueError(f"Source sheet {sheet.size} incompatible with {(fw,fh)}")
    rows = sheet.height // fh
    cols = sheet.width // fw
    if rows < 1 or cols < 1:
        raise ValueError(f"Empty source spritesheet: {sheet.size}")
    row = min(RIGHT_ROW, rows - 1)
    sq = max(fw, fh)
    strip = Image.new("RGBA", (sq * cols, sq), (0,0,0,0))
    first = None
    for i in range(cols):
        tile = sheet.crop((i*fw,row*fh,(i+1)*fw,(row+1)*fh))
        x = i * sq + (sq - fw)//2
        y = sq - fh
        strip.paste(tile,(x,y),tile)
        if first is None:
            first = Image.new("RGBA",(sq,sq),(0,0,0,0))
            first.paste(tile,((sq-fw)//2,sq-fh),tile)
    assert first is not None
    return strip, first, cols, row, sq

def encode(p: Image.Image) -> bytes:
    mem=io.BytesIO()
    p.save(mem, format="PNG", optimize=True)
    return mem.getvalue()

def main():
    previews=[]
    metadata={}
    total_custom=0
    total_original=0
    with zipfile.ZipFile(ZIP_FILE,"w",compression=zipfile.ZIP_DEFLATED,compresslevel=8) as out:
        for name,pokedex in SPECIES.items():
            location=f"sprite/{pokedex}"
            xml_bytes=fetch(f"{location}/AnimData.xml")
            xml=ET.fromstring(xml_bytes)
            anims={x.findtext("Name"):x for x in xml.findall(".//Anim") if x.findtext("Name")}
            metadata[name]={"pokedex_id":pokedex, "states":{}}
            out.writestr(f"originais/{name}/AnimData.xml",xml_bytes)
            credits=fetch(f"{location}/credits.txt")
            out.writestr(f"originais/{name}/credits.txt",credits)
            for action in ACTIONS:
                if action not in anims:
                    raise RuntimeError(f"{name}: no original {action} metadata")
                anim=anims[action]
                fw=int(anim.findtext("FrameWidth") or 0)
                fh=int(anim.findtext("FrameHeight") or 0)
                raw=fetch(f"{location}/{action}-Anim.png")
                source=png(raw)
                strip, first, count, source_row, side=flatten_right_facing(source,fw,fh)
                out.writestr(f"originais/{name}/{action}-Anim.png",raw)
                total_original+=1
                out.writestr(f"sprites/{name}_{action.lower()}.png",encode(strip))
                total_custom+=1
                if action=="Idle":
                    out.writestr(f"sprites/{name}.png",encode(first))
                    total_custom+=1
                    previews.append((name,first))
                durations=[int(el.text) for el in anim.findall("./Durations/Duration") if el.text]
                metadata[name]["states"][action.lower()]={
                    "frames":count,"frame_px":side,
                    "original_frame_px":[fw,fh],"direction":source_row,
                    "original_durations_30fps_ticks":durations,
                    "playback_v11_fps":8,
                }
            print(f"OK {name}: Idle/Walk/Attack/Hurt",flush=True)
        out.writestr("metadata.json",json.dumps(metadata,indent=2,ensure_ascii=False)+"\n")
        instructions="""POKEMON — SPRITES DETALHADOS REAIS (PMDCollab SpriteCollab)

Este ZIP contém PNGs extraídos de animações reais e detalhadas do projeto
PMDCollab/SpriteCollab; NÃO contém desenhos simplificados ou gerados por IA.

Para usar com Pokémon Torre V11: extraia a pasta 'sprites/' AO LADO do HTML.
Cada Pokémon tem:
  <nome>_idle.png, <nome>_walk.png, <nome>_attack.png, <nome>_hurt.png
  <nome>.png  (primeiro quadro, estático)
Todos os estados têm quadros quadrados em sequência horizontal e usam o
mesmo padrão esperado pelo jogo; o motor V11 anima em 8 quadros por segundo.

Originais completos (todas as oito direções), AnimData.xml e créditos:
  originais/<nome>/

Fonte e autoria: https://github.com/PMDCollab/SpriteCollab
Licença de contribuições comunitárias: CC BY-NC 4.0
https://creativecommons.org/licenses/by-nc/4.0/
Créditos individuais: arquivos originais/<nome>/credits.txt
Os sprites da franquia Pokémon e ativos oficiais podem ter direitos de terceiros.
USO NÃO COMERCIAL; o uso comercial exige autorizações adicionais dos titulares.
Não remova os créditos ao redistribuir ou usar os recursos.

ATENÇÃO: Os tempos das animações originais não são sempre 8 FPS, mas o
formato preparado para V11 será reproduzido a 8 FPS conforme solicitado.
Para reproduzir os tempos e 8 direções originais, use imagens e metadados
da pasta 'originais' e metadata.json.

Lista: bulbasaur, charmander, squirtle, pikachu, onix, scyther,
jolteon, blastoise, charizard e tyranitar.
"""
        out.writestr("LEIA-ME.txt",instructions)
        # Transparent presentation showing actual first idle frames, never redraw assets.
        W=860; cellw=172; cellh=146; H=cellh*2
        canvas=Image.new("RGB",(W,H),(17,26,40))
        draw=ImageDraw.Draw(canvas)
        for i,(name,frame) in enumerate(previews):
            x=(i%5)*cellw;y=(i//5)*cellh
            factor=min(4,round(108/max(frame.size)))
            big=frame.resize((frame.width*factor,frame.height*factor),Image.Resampling.NEAREST)
            canvas.paste(big,(x+(cellw-big.width)//2,y+6),big)
            draw.text((x+12,y+117),name.title(),fill=(244,247,250))
        out.writestr("PREVIA_10_POKEMON.png",encode(canvas))
        actual=out.namelist()
        assert total_custom==50 and total_original==40
        assert len(actual)==50+40+10*2+3, f"{len(actual)}"
        assert len(actual)==len(set(actual))
    with zipfile.ZipFile(ZIP_FILE) as z:
        bad=z.testzip()
        if bad: raise ValueError(f"CRC failed: {bad}")
    print(f"COMPLETE ZIP {ZIP_FILE} ({ZIP_FILE.stat().st_size:,} bytes)",flush=True)

if __name__=="__main__":
    main()
