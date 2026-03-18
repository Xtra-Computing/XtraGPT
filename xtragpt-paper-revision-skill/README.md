This package provides OpenClaw integration for XtraGPT.

Full documentation, examples, and paper:
https://github.com/nuojohnchen/XtraGPT

# xtragpt-paper-revision-skill

OpenClaw skill pack for using a self-hosted XtraGPT endpoint as a paper revision specialist.

## What this package does

This package installs:
- a provider config for a local or remote OpenAI-compatible XtraGPT endpoint
- a paper-revision skill definition
- routing rules that auto-invoke the skill for academic editing requests
- a minimal example OpenClaw config

This package does **not** serve the model for you. You must already have a self-hosted OpenAI-compatible XtraGPT endpoint.

## Prerequisites

Example self-hosted endpoint:

```yaml
model:
  provider: openai_compatible
  base_url: http://127.0.0.1:8088/v1
  model: Xtra-Computing/XtraGPT-7B
```

Set environment variables before running OpenClaw:

```bash
export XTRAGPT_BASE_URL=http://127.0.0.1:8088/v1
export XTRAGPT_API_KEY=dummy
```

## Install

```bash
npm install xtragpt-paper-revision-skill
npx xtragpt-paper-revision-skill init
```

This writes the following files into your current project:

```text
openclaw/
├── openclaw.config.example.yaml
├── providers/
│   └── provider.xtragpt.yaml
├── routers/
│   └── router.auto_route_rules.yaml
└── skills/
    └── skill.xtragpt-paper-revision-skill.yaml
```

To scaffold into a different directory:

```bash
npx xtragpt-paper-revision-skill init --dir /path/to/project
```

To overwrite existing files:

```bash
npx xtragpt-paper-revision-skill init --force
```

## Skill ID

Use this skill id in router rules or manual invocations:

```text
xtragpt-paper-revision-skill
```

## Included provider mapping

OpenClaw model id:

```text
xtragpt-7b
```

Served provider model name:

```text
Xtra-Computing/XtraGPT-7B
```

## Suggested usage flow

1. Start your self-hosted XtraGPT server.
2. Install and initialize this package.
3. Include the generated provider, skill, and router YAML files in your OpenClaw project.
4. Keep your GitHub repo as the main documentation hub for deployment details, examples, and paper framing.
