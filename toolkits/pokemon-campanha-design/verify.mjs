import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '../..');
const expect = [
  'fontes/ferramentas/gamedev-agent-skills/router/SKILL.md',
  'fontes/ferramentas/gamedev-agent-skills/skills/disciplines/create-game-assets/SKILL.md',
  'fontes/ferramentas/gamedev-agent-skills/skills/disciplines/game-ui-ux/SKILL.md',
  'fontes/ferramentas/gamedev-agent-skills/skills/disciplines/level-design/SKILL.md',
  'fontes/ferramentas/gamedev-agent-skills/skills/disciplines/performance-optimization/SKILL.md',
  'fontes/ferramentas/svg-js/package.json',
  'prompts/GOAL-CAMPANHA-PIXELART-PREMIUM-2026-11-07.md',
];
for (const path of expect) {
  assert(existsSync(resolve(root, path)), 'Missing submodule or prompt: ' + path);
}
const svgRepo = JSON.parse(readFileSync(resolve(root, 'fontes/ferramentas/svg-js/package.json'), 'utf8'));
assert.equal(svgRepo.name, '@svgdotjs/svg.js');
assert.equal(svgRepo.version, '3.2.8');
const localPkg = JSON.parse(readFileSync(resolve(root, 'toolkits/pokemon-campanha-design/node_modules/@svgdotjs/svg.js/package.json'), 'utf8'));
assert.equal(localPkg.version, '3.2.8');
const m = await import('@svgdotjs/svg.js');
assert.equal(typeof m.SVG, 'function', 'Expected SVG.js API');
const goal = readFileSync(resolve(root, 'prompts/GOAL-CAMPANHA-PIXELART-PREMIUM-2026-11-07.md'), 'utf8');
assert(goal.startsWith('/goal '), 'Missing /goal instruction');
for (const term of ['NÃO modificar', 'batalhas', 'Playwright', 'aprovação visual', 'SHA']) {
  assert(goal.includes(term), 'Missing safety scope: ' + term);
}
console.log('OK: selected submodules, pinned SVG.js, selective skills and /goal safeguards');
