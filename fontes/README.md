# Fontes externas incluídas

**Emerald Arena completo:** [fontes/emerald-arena](emerald-arena) é um submódulo Git apontando ao repositório original `GBurgardt/pokemon-emerald-arena`, commit `e1502f9f7ed46d969880d73adbf5ab23ef7b2a56`.

Para obter os arquivos C, configurações, testes, instalador, patch original, assets publicados e histórico Git:

```bash
git clone --recurse-submodules https://github.com/lulualcides-sys/Arsenal.git
```

Se já tinha baixado a biblioteca sem submódulo:

```bash
git submodule update --init --recursive
```

O submódulo preserva a origem e a autoria. **Nenhuma ROM comercial foi incluída.** O código de outros autores e os recursos gráficos seguem os créditos/licenças do repositório original. O código `pret/pokeemerald` precisa ser obtido e preparado separadamente nas instruções de build do Emerald Arena.

## Principal ferramenta REA

[REA — Reverse Engineer Anything](rea) (`morluto/rea`) está vinculado como submódulo, assim como outras 17 ferramentas de engenharia, IA e mídia em [fontes/ferramentas/](ferramentas/). Leia o [inventário completo](../ferramentas/INVENTARIO-COMPLETO.md). Só consultar/baixar código não significa instalá-lo.
