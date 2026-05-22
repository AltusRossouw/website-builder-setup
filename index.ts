import type { Plugin, PluginInput } from "@opencode-ai/plugin"
import { tool } from "@opencode-ai/plugin"

const STEPS = ["check", "install-uiux", "install-framer", "setup-21st", "done"] as const

type Shell = PluginInput["$"]

async function runCheck($: Shell) {
  let nodeOk = false
  let npmOk = false

  try {
    nodeOk = (await $`node --version`.quiet()).exitCode === 0
  } catch { /* ignore */ }

  try {
    npmOk = (await $`npm --version`.quiet()).exitCode === 0
  } catch { /* ignore */ }

  let uiproInstalled = false
  try {
    uiproInstalled = (await $`which uipro`.quiet()).exitCode === 0
  } catch { /* ignore */ }

  let framerInstalled = false
  try {
    framerInstalled = (await $`npm ls framer-motion 2>/dev/null`.quiet()).exitCode === 0
  } catch { /* ignore */ }

  return JSON.stringify({
    node: { installed: nodeOk, message: nodeOk ? "Node.js is installed." : "Node.js is NOT installed." },
    npm: { installed: npmOk, message: npmOk ? "npm is available." : "npm is NOT available." },
    uipro: { installed: uiproInstalled, message: uiproInstalled ? "UI/UX Pro Max (uipro-cli) is installed." : "UI/UX Pro Max is NOT installed." },
    framerMotion: { installed: framerInstalled, message: framerInstalled ? "framer-motion is installed locally." : "framer-motion is NOT installed locally." },
    ready: nodeOk && npmOk,
    nextStep: nodeOk && npmOk
      ? (uiproInstalled
        ? (framerInstalled ? "setup-21st" : "install-framer")
        : "install-uiux")
      : null,
    helpText: !nodeOk
      ? "You need Node.js. Go to https://nodejs.org and download the LTS version. Install it, restart your terminal, then run the check step again."
      : null,
  })
}

async function runInstallUiUx($: Shell) {
  const results: string[] = []
  let success = false

  try {
    const install = await $`npm install -g uipro-cli`.quiet()
    if (install.exitCode === 0) {
      results.push("uipro-cli installed successfully.")
      const init = await $`uipro init --ai opencode`.quiet()
      if (init.exitCode === 0) {
        results.push("UI/UX Pro Max initialized for OpenCode.")
        success = true
      } else {
        results.push(`uipro init exited with code ${init.exitCode}. Try manually: 'uipro init --ai opencode'`)
      }
    } else {
      results.push(`uipro-cli install exited with code ${install.exitCode}`)
    }
  } catch {
    results.push("Installation failed. Try manually: 'npm install -g uipro-cli && uipro init --ai opencode'")
  }

  return JSON.stringify({
    success,
    results,
    nextStep: "install-framer",
    helpText: "UI/UX Pro Max gives you 50+ design styles, 161 color palettes, 57 font pairings.",
  })
}

async function runInstallFramer($: Shell, directory: string) {
  const results: string[] = []
  let success = false

  try {
    const install = await $`npm install framer-motion`.cwd(directory).quiet()
    success = install.exitCode === 0
    results.push(
      success
        ? "framer-motion installed successfully."
        : `framer-motion install failed with code ${install.exitCode}`
    )
  } catch {
    results.push("Installation failed. Try manually: 'npm install framer-motion' in your project directory.")
  }

  return JSON.stringify({
    success,
    results,
    nextStep: "setup-21st",
    helpText: "Framer Motion adds smooth animations to your sites — page transitions, hover effects, scroll reveals.",
  })
}

function runSetup21st(apiKey: string | undefined) {
  if (!apiKey) {
    return JSON.stringify({
      success: false,
      action: "need-api-key",
      message: "21st.dev Magic needs a free API key. Go to https://21st.dev/magic/console, sign up (it's free), copy your API key, then call this tool again with step: 'setup-21st' and the apiKey parameter.",
      nextStep: null,
      helpText: "21st.dev Magic gives you 100+ production-ready React components — buttons, navbars, hero sections, cards, footers.",
    })
  }

  return JSON.stringify({
    success: true,
    action: "configure-mcp",
    apiKey,
    config: {
      "21st-dev-magic": {
        command: "npx",
        args: ["-y", "@21st-dev/magic@latest"],
        env: { API_KEY: apiKey },
      },
    },
    message: "Add this MCP server to your opencode.json. Restart OpenCode afterward.",
    nextStep: "done",
    helpText: "21st.dev Magic gives you 100+ production-ready React components.",
  })
}

function runDone() {
  return JSON.stringify({
    message: "You're all set! Here's what you installed:",
    installed: [
      "UI/UX Pro Max — 50+ styles, 161 palettes, 57 font pairings",
      "Framer Motion — smooth, professional animations",
      "21st.dev Magic — 100+ production-ready components",
    ],
    tryThis: 'Tell your agent: "Build me a landing page for my consulting business targeting small business owners. Dark theme, modern, with animations."',
    reminder: "If you configured 21st.dev Magic, restart OpenCode for the MCP server to load.",
  })
}

export const OpenCodeWebsiteBuilderSetup: Plugin = async (input: PluginInput) => {
  const { $, directory } = input

  return {
    tool: {
      website_builder_setup: tool({
        description: "Install the full AI website builder stack — UI/UX Pro Max, Framer Motion animations, and 21st.dev components. Call with step: 'check' first, then proceed through each step in order.",
        args: {
          step: tool.schema.enum(STEPS).describe("Which setup step to run"),
          apiKey: tool.schema.string().optional().describe("Your 21st.dev Magic API key from https://21st.dev/magic/console (required for step: 'setup-21st')"),
        },
        async execute(args, _context) {
          const step = args.step as typeof STEPS[number]
          const apiKey = args.apiKey as string | undefined

          switch (step) {
            case "check":
              return await runCheck($)
            case "install-uiux":
              return await runInstallUiUx($)
            case "install-framer":
              return await runInstallFramer($, directory)
            case "setup-21st":
              return runSetup21st(apiKey)
            case "done":
              return runDone()
            default:
              return JSON.stringify({ error: `Unknown step: ${step}` })
          }
        },
      }),
    },
  }
}

export default OpenCodeWebsiteBuilderSetup
