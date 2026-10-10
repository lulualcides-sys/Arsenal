#!/usr/bin/env python3
"""Noncommercial SpriteCollab Kanto sprite pack for Pokémon Torre V15."""
from __future__ import annotations
import concurrent.futures
import io
import json
import pathlib
import random
import time
import urllib.error
import urllib.request
import xml.etree.ElementTree as ET
import zipfile
from PIL import Image

ROOT=pathlib.Path(__file__).resolve().parent.parent
DIST=ROOT/"dist"; DIST.mkdir(exist_ok=True)
ZPATH=DIST/"Pokemon_Kanto_151_Sprites_Completo.zip"
GAME=ROOT/"jogos-html"/"Pokemon_Torre_V15_Kanto_JOGAR.html"
BASE="https://raw.githubusercontent.com/PMDCollab/SpriteCollab/master/sprite"
AGENT="Pokemon-Torre-V15-Sprite-Pack/1.0 (personal/noncommercial)"
ACTIONS=("Idle","Walk","Attack","Hurt")
CANONICAL={1:"bulbasaur",4:"charmander",6:"charizard",7:"squirtle",9:"blastoise",25:"pikachu",95:"onix",123:"scyther",135:"jolteon"}
def fetch(url):
    last=None
    for i in range(5):
        try:
            r=urllib.request.Request(url,headers={"User-Agent":AGENT})
            with urllib.request.urlopen(r, timeout=35) as resp:
                return resp.read()
        except (urllib.error.URLError,TimeoutError) as e:
            last=e; time.sleep(.4*(i+1)+random.random()/4)
    raise OSError(f"{url}: {last}")

def png_bytes(im):
    dest=io.BytesIO()
    im.save(dest,format="PNG",optimize=True)
    return dest.getvalue()

def horizontal_strip(raw,fw,fh):
    sheet=Image.open(io.BytesIO(raw)).convert("RGBA")
    fw=max(1,fw);fh=max(1,fh)
    cols=sheet.width//fw;rows=sheet.height//fh
    if cols<1 or rows<1:
        raise ValueError(f"Invalid sprite dimensions {sheet.size} vs {fw,fh}")
    row=min(2,rows-1) # right-facing, when 8 directions exist
    side=max(fw,fh)
    out=Image.new("RGBA",(cols*side,side),(0,0,0,0))
    first=None
    for c in range(cols):
        tile=sheet.crop((c*fw,row*fh,(c+1)*fw,(row+1)*fh))
        frame=Image.new("RGBA",(side,side),(0,0,0,0))
        frame.paste(tile,((side-fw)//2,side-fh),tile)
        if first is None:first=frame
        out.paste(frame,(c*side,0))
    return png_bytes(out),png_bytes(first),cols

def render_species(id):
    pre=f"{BASE}/{id:04d}"
    xml_bytes=fetch(f"{pre}/AnimData.xml")
    xml=ET.fromstring(xml_bytes)
    maps={e.findtext("Name"):e for e in xml.findall(".//Anim") if e.findtext("Name")}
    default=maps.get("Idle")
    if default is None:
        raise RuntimeError("Idle metadata absent")
    result={}
    meta={}
    idle_raw=None
    for action in ACTIONS:
        anim=maps.get(action) or default
        srcaction=action if action in maps else "Idle"
        if action=="Idle":
            idle_raw=fetch(f"{pre}/Idle-Anim.png")
            raw=idle_raw
        else:
            try:
                raw=fetch(f"{pre}/{srcaction}-Anim.png") if srcaction!="Idle" else idle_raw
            except Exception:
                anim=default
                raw=idle_raw
                srcaction="Idle"
        fw=int(anim.findtext("FrameWidth") or 0)
        fh=int(anim.findtext("FrameHeight") or 0)
        if fw<1 or fh<1:
            raise ValueError(f"Missing {action} frame size")
        strip,one,frames=horizontal_strip(raw,fw,fh)
        k=f"kanto_{id:03d}"
        result[f"sprites/{k}_{action.lower()}.png"]=strip
        if action=="Idle":
            result[f"sprites/{k}.png"]=one
        if id in CANONICAL:
            result[f"sprites/{CANONICAL[id]}_{action.lower()}.png"]=strip
            if action=="Idle":
                result[f"sprites/{CANONICAL[id]}.png"]=one
        meta[action.lower()]={"source":srcaction,"frames":frames,"frame_px":max(fw,fh)}
    try:
        credit=fetch(f"{pre}/credits.txt")
        result[f"credits/{id:03d}.txt"]=credit
    except Exception:
        result[f"credits/{id:03d}.txt"]=f"Credits: https://github.com/PMDCollab/SpriteCollab/tree/master/sprite/{id:04d}\n".encode()
    return id,result,meta

def main():
    files={}
    errors={}
    metadata={}
    ids=list(range(1,152))
    with concurrent.futures.ThreadPoolExecutor(max_workers=12) as pool:
        futures={pool.submit(render_species,i):i for i in ids}
        for future in concurrent.futures.as_completed(futures):
            i=futures[future]
            try:
                idx,result,meta=future.result()
                files.update(result)
                metadata[f"{idx:03d}"]=meta
                print(f"[{len(metadata)}/151] {idx:03d} OK",flush=True)
            except Exception as e:
                errors[f"{i:03d}"]=str(e)
                print(f"ERROR {i:03d}: {e}",flush=True)
    files["metadata.json"]=json.dumps(metadata,indent=2,ensure_ascii=False).encode()
    files["errors.json"]=json.dumps(errors,indent=2,ensure_ascii=False).encode()
    files["LEIA-ME.txt"]=("""POKÉMON TORRE V15 — sprites detalhados de Kanto (USO NÃO COMERCIAL)
Fonte: https://github.com/PMDCollab/SpriteCollab
Licença do conteúdo comunitário: Creative Commons BY-NC 4.0.
https://creativecommons.org/licenses/by-nc/4.0/
Créditos individuais preservados na pasta credits/.

Coloque a pasta sprites/ ao lado de Pokemon_Torre_V15_Kanto_JOGAR.html
O HTML inclui 10 espécies offline; este ZIP acrescenta até 151
espécies com imagens originais, quatro estados Idle/Walk/Attack/Hurt.
Algumas ações ausentes podem usar o sprite Idle como reserva.
8 fps no jogo, formato de tira horizontal com quadros quadrados.
Se alguma espécie faltar, consulte errors.json. Os outros Pokémon
ainda podem aparecer com arte disponível online no jogo.
Os direitos da franquia e arte original pertencem aos titulares.
Não utilizar em projeto comercial sem autorização dos titulares.
""").encode()
    if GAME.exists():
        files["index.html"]=GAME.read_bytes()
        files["Pokemon_Torre_V15_Kanto_JOGAR.html"]=GAME.read_bytes()
    with zipfile.ZipFile(ZPATH,"w",compression=zipfile.ZIP_DEFLATED,compresslevel=7) as out:
        for path,contents in sorted(files.items()):
            out.writestr(path,contents)
    with zipfile.ZipFile(ZPATH) as check:
        assert check.testzip() is None
    print(f"COMPLETE: {len(metadata)} species, {len(files)} files, {ZPATH.stat().st_size:,} bytes",flush=True)
    # Fail build only if a substantial fraction is unavailable, so the user can still download partial packages.
    if len(metadata)<130:raise RuntimeError(f"Only {len(metadata)}/151 sprite families successfully retrieved")
if __name__=="__main__":
    main()
