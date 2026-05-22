# OpenCode Website Builder Setup

Build professional, animated websites with OpenCode — no coding experience needed. This plugin installs three tools that turn OpenCode into a full web design studio.

Originally created by [@tenfoldmarc](https://github.com/tenfoldmarc), adapted for OpenCode.

## Install

### npm (recommended)

Add to your `opencode.json`:

```json
{
  "plugin": ["opencode-website-builder-setup"]
}
```

OpenCode will install it automatically on next start.

Or install manually:

```bash
npm install -g opencode-website-builder-setup
```

### Local install

```bash
git clone https://github.com/AltusRossouw/website-builder-setup.git ~/.config/opencode/plugins/website-builder-setup
```

### Agent Skill

For the best experience, also install the companion skill. Copy the skill directory:

**Mac/Linux:**
```bash
cp -r website-builder-setup ~/.config/opencode/skills/website-builder-setup
```

**Windows:**
```bash
xcopy /E website-builder-setup %USERPROFILE%\.config\opencode\skills\website-builder-setup\
```

Or project-local:
```bash
mkdir -p .opencode/skills
cp -r website-builder-setup .opencode/skills/website-builder-setup
```

Then start OpenCode and say:

> Install the website builder stack for me

OpenCode will load the skill and walk you through setup using the `website_builder_setup` tool.

## What Gets Installed

| Tool | What it does |
|------|-------------|
| **UI/UX Pro Max** | 50+ design styles, 161 color palettes, 57 font pairings. Your sites look designed, not AI-generated. |
| **Framer Motion** | Smooth animations — page transitions, hover effects, scroll reveals. The difference between a $500 site and a $10,000 site. |
| **21st.dev Magic** | 100+ production-ready React components. Buttons, navbars, hero sections, cards, footers — all pre-designed. |

## Requirements

- [OpenCode](https://opencode.ai) installed
- [Node.js](https://nodejs.org) (LTS version)
- [Bun](https://bun.sh) (for building the plugin from source)

## After Setup

Just tell OpenCode what you want:

```
Build me a landing page for my consulting business targeting small business owners.
Dark theme, modern, with animations.
```

OpenCode handles the rest — design, layout, animations, responsive, everything.

## Plugin Details

### Custom Tool: `website_builder_setup`

The plugin provides a custom tool that walks through the setup steps:

| Step | Description |
|------|-------------|
| `check` | Check Node.js, npm, and existing installations |
| `install-uiux` | Install UI/UX Pro Max via uipro-cli |
| `install-framer` | Install framer-motion in your project |
| `setup-21st` | Configure 21st.dev Magic MCP server |
| `done` | Show installation summary |

### Building from source

```bash
bun install
bun run build
```

## License

MIT
