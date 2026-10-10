# REA — Reverse Engineer Anything

Repository: https://github.com/morluto/rea
Official project: morluto/rea
Latest release checked: rea-agents 3.2.1 (2026-10-03)

## Purpose
REA is an open-source toolkit for reverse engineering applications and software behavior with AI/agent workflows. It can inspect application behavior, native binaries, JavaScript/Electron applications, function-level evidence, and work with tools such as Ghidra or Hopper.

## Quick start
Recommended setup:

```bash
npx --yes rea-agents@latest setup
```

Alternative global install:

```bash
npm install --global rea-agents@latest
rea setup
```

## Requirements
- Node.js 22.19+ or 24.11+ (or newer supported versions)
- npm
- Supported desktop OS depending on analysis mode
- Ghidra or Hopper for deeper native binary analysis

## WildVox note
REA is saved only as a future tool/reference. It is not installed or integrated into WildVox yet. Before using it in production, review its current release, license, dependencies and security implications.
