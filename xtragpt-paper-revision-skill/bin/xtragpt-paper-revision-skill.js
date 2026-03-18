#!/usr/bin/env node
const fs = require('fs');
const path = require('path');

function usage() {
  console.log(`xtragpt-paper-revision-skill

Usage:
  xtragpt-paper-revision-skill init [--dir <path>] [--force]
  xtragpt-paper-revision-skill help

Options:
  --dir <path>   Target directory for OpenClaw config scaffold (default: current directory)
  --force        Overwrite existing files
`);
}

function ensureDir(dir) {
  fs.mkdirSync(dir, { recursive: true });
}

function copyFileSafe(src, dest, force = false) {
  if (fs.existsSync(dest) && !force) {
    console.log(`skip: ${path.relative(process.cwd(), dest)} already exists`);
    return;
  }
  ensureDir(path.dirname(dest));
  fs.copyFileSync(src, dest);
  console.log(`write: ${path.relative(process.cwd(), dest)}`);
}

const args = process.argv.slice(2);
const command = args[0] || 'help';
if (command === 'help' || command === '--help' || command === '-h') {
  usage();
  process.exit(0);
}
if (command !== 'init') {
  console.error(`Unknown command: ${command}`);
  usage();
  process.exit(1);
}

let targetDir = process.cwd();
let force = false;
for (let i = 1; i < args.length; i++) {
  const a = args[i];
  if (a === '--dir') {
    targetDir = path.resolve(args[++i] || '.');
  } else if (a === '--force') {
    force = true;
  } else {
    console.error(`Unknown option: ${a}`);
    usage();
    process.exit(1);
  }
}

const pkgRoot = path.resolve(__dirname, '..');
const mappings = [
  ['providers/provider.xtragpt.yaml', 'openclaw/providers/provider.xtragpt.yaml'],
  ['skills/skill.xtragpt-paper-revision-skill.yaml', 'openclaw/skills/skill.xtragpt-paper-revision-skill.yaml'],
  ['routers/router.auto_route_rules.yaml', 'openclaw/routers/router.auto_route_rules.yaml'],
  ['templates/openclaw.config.example.yaml', 'openclaw/openclaw.config.example.yaml']
];

for (const [srcRel, dstRel] of mappings) {
  copyFileSafe(path.join(pkgRoot, srcRel), path.join(targetDir, dstRel), force);
}
console.log('\n✓ XtraGPT OpenClaw skill files created successfully.');
console.log('\nNext steps:');
console.log('1) Start a self-hosted OpenAI-compatible XtraGPT endpoint.');
console.log('2) Export environment variables:');
console.log('   export XTRAGPT_BASE_URL=http://127.0.0.1:8088/v1');
console.log('   export XTRAGPT_API_KEY=dummy');
console.log('3) Register or include the generated provider / skill / router files in your OpenClaw project.');
console.log('4) Use skill id: xtragpt-paper-revision-skill');
console.log(`
Docs & repository:
https://github.com/nuojohnchen/XtraGPT

Full setup guide:
https://github.com/nuojohnchen/XtraGPT#production-usage-openclaw-integration
`);