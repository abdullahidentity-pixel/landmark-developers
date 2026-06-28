# Design Stack Preparation — Luxury Serum Brand Website

> **Status:** Environment audited. All tools verified. Manual steps required to activate MCPs and skill (security policy prevents automated writes to Claude config files).

---

## What Was Installed / Configured

### Automatically Completed
- **Package registry verification** — All four MCP packages confirmed live on npm:
  - `shadcn@4.11.0`
  - `@upstash/context7-mcp@3.2.2`
  - `@playwright/mcp@0.0.76`
  - `@21st-dev/magic@0.1.0`
- **`mcp-config-snippet.json`** written to this project root — ready-to-paste block for all four MCPs
- **Runtime confirmed** — Node.js v24.17.0, pnpm 11.5.0, git 2.50.1 all available

### Requires Your Manual Action (see steps below)
- shadcn MCP — needs config added to Claude settings
- Context7 MCP — needs config added to Claude settings
- Playwright MCP — needs config added + Chromium installed
- 21st.dev Magic MCP — needs config added + **API key from 21st.dev**
- Website Builder Setup skill — needs git clone (blocked as self-modification in this session)

---

## Manual Steps — Do These Now

### Step 1 — Install the Website Builder Setup Skill

Run this once in your terminal (outside Claude Code):

```bash
git clone https://github.com/tenfoldmarc/website-builder-setup.git ~/.claude/commands/website-builder-setup
```

After cloning, type `/website-builder-setup` in any Claude Code session to activate the UI/UX Pro Max + Framer Motion + 21st.dev workflow guide.

---

### Step 2 — Get Your 21st.dev API Key

1. Go to **https://21st.dev/magic/console**
2. Sign up / log in (free tier available)
3. Generate an API key
4. Copy it — you'll use it in Step 3

---

### Step 3 — Add All Four MCPs to Claude Desktop

Open this file in any text editor:

```
~/Library/Application Support/Claude/claude_desktop_config.json
```

Merge the `mcpServers` block below into that file. The file already has a `"preferences"` key — add `"mcpServers"` alongside it at the top level:

```json
{
  "preferences": { ... existing content ... },
  "mcpServers": {
    "shadcn": {
      "command": "/Users/macbookpro/Documents/Codex/2026-05-12/hello/.tools/pnpm/bin/pnpx",
      "args": ["-y", "shadcn@latest", "mcp"]
    },
    "context7": {
      "command": "/Users/macbookpro/Documents/Codex/2026-05-12/hello/.tools/pnpm/bin/pnpx",
      "args": ["-y", "@upstash/context7-mcp@latest"]
    },
    "playwright": {
      "command": "/Users/macbookpro/Documents/Codex/2026-05-12/hello/.tools/pnpm/bin/pnpx",
      "args": ["-y", "@playwright/mcp@latest", "--browser", "chromium", "--headless"]
    },
    "@21st-dev/magic": {
      "command": "/Users/macbookpro/Documents/Codex/2026-05-12/hello/.tools/pnpm/bin/pnpx",
      "args": ["-y", "@21st-dev/magic@latest", "API_KEY=YOUR_KEY_FROM_STEP_2"]
    }
  }
}
```

A ready-to-paste copy is in **`mcp-config-snippet.json`** in this project root.

---

### Step 4 — Install Playwright Chromium

Run once in your terminal:

```bash
/Users/macbookpro/Documents/Codex/2026-05-12/hello/.tools/pnpm/bin/pnpx playwright install chromium
```

---

### Step 5 — Restart Claude Desktop

Fully quit and reopen Claude Desktop after editing the config. MCPs are loaded at startup only.

---

### Step 6 — Verify MCPs Are Live

In a new Claude Code session, ask:
```
Are the shadcn, context7, playwright, and @21st-dev/magic MCPs connected?
```

---

## GitHub Access Status

- **git** v2.50.1 confirmed at `/usr/bin/git`
- **gh CLI** — NOT found in PATH. GitHub operations requiring auth (PR creation, issue linking) need either:
  - `brew install gh` then `gh auth login`, or
  - Use the GitHub MCP/plugin if one is wired into this CCD environment

The Claude Code session can run git commands against any repo you already have credentials for via SSH or HTTPS (keychain).

---

## Recommended Frontend Stack for the Build

> Do not start building yet — this is reference only.

| Layer | Choice | Rationale |
|---|---|---|
| Framework | **Next.js 15** (App Router) | SSR/SSG for SEO on product pages; image optimization built-in; Vercel-native |
| Styling | **Tailwind CSS v4** + **shadcn/ui** | Utility-first, zero dead CSS, shadcn gives production-grade headless components |
| Animation | **Framer Motion v12** (already installed) | React-native motion; layout animations; scroll-linked effects |
| Scroll | **Lenis** (already installed) | Buttery smooth scroll essential for luxury feel |
| Heavy animation | **GSAP** (already installed) | ScrollTrigger for pinned sections, timeline orchestration, SVG morphing |
| 3D/visual | **Three.js + React Three Fiber** (already installed) | Product 3D renders, particle effects, ambient scene backgrounds |
| State | **Zustand** | Minimal, no boilerplate; cart state, UI state |
| Package manager | **pnpm** (already active) | Fastest, strictest hoisting |
| Component source | **shadcn MCP + 21st.dev Magic MCP** | Generate and refine UI components via AI |
| QA | **Playwright MCP** | Automated layout/interaction/responsive verification |
| Docs | **Context7 MCP** | Fetch live docs for Next.js, Tailwind, Framer, GSAP inline |

**Current project is Vite + React** — migration to Next.js recommended before building pages. The animation/3D/scroll packages already installed carry over cleanly.

---

## What Each MCP Adds to Your Workflow

| MCP | What it does for you |
|---|---|
| **shadcn** | Ask Claude to "add a shadcn Button" — it reads the registry, generates the correct component with your theme tokens, no copy-paste from docs |
| **context7** | Ask "how do I do scroll-linked animations in Framer Motion 12?" — Claude fetches the actual v12 docs rather than hallucinating v10 syntax |
| **playwright** | After building a section, ask Claude to "check the mobile layout at 375px" — it actually opens a browser and verifies |
| **21st.dev Magic** | Ask for "a luxury hero section with parallax" — generates multiple polished visual variations from a curated component library |

---

## Warning Section

| Item | Risk Level | Notes |
|---|---|---|
| `tenfoldmarc/website-builder-setup` | **LOW-MEDIUM** | Small independent repo, 3 files. Not published to npm. No versioning/releases visible. The SKILL.md logic is shallow (walks you through npm installs). Useful as a quick-start prompt template, not a hardened tool. Do not treat as authoritative design system. |
| `@21st-dev/magic@0.1.0` | **MEDIUM** | Version 0.1.0 indicates early-stage software. API key required; subject to service terms. Generated components are React-specific and may need Tailwind config alignment. Treat output as a starting point, not production-ready. |
| `@playwright/mcp@0.0.76` | **LOW** | Actively maintained by Microsoft. The `0.0.x` version number is intentional — this is the stable release series for this tool. Node.js v24 had an issue in early versions (resolved past v0.0.50). |
| Shadcn MCP via `pnpx` | **LOW** | `pnpx -y shadcn@latest mcp` downloads the latest shadcn each time it's invoked. Pin to a version (`shadcn@4.11.0`) if you need reproducibility. |
| Node.js v24.17.0 via custom path | **LOW** | pnpm/node live at a project-scoped path (`/Documents/Codex/2026-05-12/hello/.tools/`). If that path changes or the Codex project is moved, MCP configs break. Consider installing node/pnpm globally via `brew` before the build begins. |
| No `gh` CLI | **LOW** | GitHub web browsing works fine. Only PR automation and issue management via CLI is unavailable. |
| Context7 without API key | **INFO** | Works at basic rate limits with no key. Add `CONTEXT7_API_KEY` env var to the MCP config for higher limits once you create an account at context7.com. |

---

## File Reference

- **`mcp-config-snippet.json`** — exact JSON to paste into `claude_desktop_config.json`
- **This file** — full setup guide

---

*Prepared: 2026-06-25 | Next step: complete manual steps above, restart Claude Desktop, then begin the serum brand build.*
