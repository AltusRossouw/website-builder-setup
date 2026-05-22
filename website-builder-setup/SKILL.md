---
name: website-builder-setup
description: "Install the full AI website builder stack — UI/UX Pro Max, Framer Motion animations, and 21st.dev components. One skill, three tools, zero coding experience needed."
compatibility: opencode
license: MIT
metadata:
  audience: web-developers
  category: web-design
---

# Website Builder Setup

This skill walks you through installing everything you need to build professional, animated websites with OpenCode. No coding experience required.

## What Gets Installed

| Tool | What it does |
|------|-------------|
| **UI/UX Pro Max** | Gives OpenCode access to 50+ design styles, 161 color palettes, 57 font pairings. Your sites look designed, not generated. |
| **Framer Motion** | Adds smooth animations — page transitions, hover effects, scroll reveals. Makes sites feel alive. |
| **21st.dev Magic** | A library of 100+ polished React components OpenCode can pull from. Production-quality building blocks. |

## Workflow

When this skill is triggered, call the `website_builder_setup` tool step by step. Start with `step: 'check'`, then proceed through each step in order. Be encouraging and clear — assume the user has zero coding experience. If any step fails, acknowledge it, give the manual command, and keep moving.

---

### Step 1: Check Prerequisites

Call `website_builder_setup` with `step: "check"`. Review the results:

- If `node.installed` is true → "You're good — Node.js is installed. Let's go."
- If `node.installed` is false → tell the user:

> You need Node.js first. Go to https://nodejs.org and download the LTS version. Install it, restart your terminal, then come back. Takes 2 minutes.

Stop here if Node is missing.

---

### Step 2: Install UI/UX Pro Max

> **Step 1 of 3: UI/UX Pro Max**
>
> This gives me a massive design library — 50+ styles, 161 color palettes, 57 font pairings. When you ask me to build a website, I'm pulling from a real design system instead of guessing. This is why the output won't look like generic AI slop.

Call `website_builder_setup` with `step: "install-uiux"`.

- On success → "UI/UX Pro Max is installed. Your design stack is ready."
- On failure → "Hit a snag. You can try manually later: `npm install -g uipro-cli && uipro init --ai opencode`. Let's keep going."

---

### Step 3: Install Framer Motion

> **Step 2 of 3: Framer Motion**
>
> This teaches me how to add real animations to your websites — smooth page transitions, hover effects, scroll-triggered reveals. The stuff that makes a $500 site look like a $10,000 site.

Call `website_builder_setup` with `step: "install-framer"`.

- On success → "Framer Motion is installed in your project. Your sites will have real animations now."
- On failure → "Hit a snag. You can try manually later: `npm install framer-motion`. Moving on."

---

### Step 4: Set Up 21st.dev Magic

> **Step 3 of 3: 21st.dev Components**
>
> This connects me to a library of 100+ beautifully designed React components. Instead of building everything from scratch, I pull from production-quality building blocks — buttons, navbars, hero sections, cards, footers — all pre-designed and ready to use.
>
> This one needs a free API key. Here's how to get it:
>
> 1. Go to **https://21st.dev/magic/console**
> 2. Sign up or log in (it's free)
> 3. Copy your API key
> 4. Share it with me

Wait for the user to provide their API key, then call `website_builder_setup` with `step: "setup-21st"` and `apiKey: "THEIR_KEY"`.

The tool will return the MCP server config. Add it to the user's opencode.json under `mcpServers`:

```json
"21st-dev-magic": {
  "command": "npx",
  "args": ["-y", "@21st-dev/magic@latest"],
  "env": {
    "API_KEY": "THEIR_KEY_HERE"
  }
}
```

After writing the config:

> 21st.dev Magic is connected. You'll need to restart OpenCode for this one to kick in.

---

### Step 5: Done

Call `website_builder_setup` with `step: "done"` to get the summary. Then tell the user:

> **You're all set.** Here's what you just installed:
>
> - **UI/UX Pro Max** — 50+ styles, 161 palettes, 57 font pairings
> - **Framer Motion** — smooth, professional animations
> - **21st.dev Magic** — 100+ production-ready components
>
> **To build your first website, just tell me:**
> - What your business does
> - Who it's for
> - What vibe you want (dark, minimal, bold, playful, etc.)
>
> I'll handle the rest. Try something like:
>
> "Build me a landing page for my consulting business targeting small business owners. Dark theme, modern, with animations."
>
> **Important:** Restart OpenCode first so 21st.dev loads in. Then let's build something.

## Rules
- Call the `website_builder_setup` tool for each step
- Walk through each step ONE AT A TIME
- Never dump all instructions at once
- If any install fails, don't stop — acknowledge, give manual command, keep moving
- Be encouraging and casual throughout
- Assume zero coding experience
- After everything is installed, prompt them to build their first site
