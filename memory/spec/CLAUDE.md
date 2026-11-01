# HookHub MVP Spec

**Status:** Initial draft
**Last updated:** 2026-11-01

## 1. Overview

HookHub is a browsable gallery of open source Claude Code hooks, aimed at Claude Code users looking for hooks to adopt.

Hooks are currently scattered across GitHub repositories and general-purpose lists, with no visual place to browse them. The MVP solves this with one page that displays a curated set of hooks in a grid.

## 2. Background: what a Claude hook is

Hooks are user-defined handlers that run at points in the Claude Code lifecycle, such as `PreToolUse`, `PostToolUse`, `Notification`, `SessionStart` and `Stop`. They can be shell commands, HTTP calls, MCP tools, prompts or agents. Some events can block an action; for example, a `PreToolUse` hook can stop a tool call.

Hooks are configured in settings files or shipped in plugins (`hooks/hooks.json`). Repositories usually share them as scripts plus a config snippet.

## 3. MVP scope

The MVP only displays hooks.

### In scope

- A single main page (`/`) showing all hooks in a responsive grid.
- Cards showing each hook's name, category, description and a link to its GitHub repository.
- A curated seed list of hooks.

### Out of scope

- Search, category filtering and sorting
- Hook detail pages
- Submissions, accounts, ratings and comments
- Live GitHub data such as stars or last-updated dates
- Install commands or hook installation
- A database or admin UI

## 4. Data model

Hooks are a typed, hand-curated list in the repository. There is no database, GitHub API or scraping.

- Each entry represents one GitHub repository, even when that repository holds several hooks.
- Each entry has exactly one category.

```ts
type HookCategory =
  | "Security"
  | "Safety"
  | "Code Quality"
  | "Monitoring"
  | "Context & Memory"
  | "Notifications"
  | "Git"
  | "Tooling";

type Hook = {
  id: string;          // unique kebab-case slug, used as the React key
  name: string;
  category: HookCategory;
  description: string; // one sentence, plain text, aim for under 140 characters
  repoUrl: string;     // https://github.com/<owner>/<repo>
};
```

| Category | Covers |
|---|---|
| Security | Prompt injection defense, permission rules, secret and exfiltration protection |
| Safety | Blocking destructive actions, branch protection, checkpoints |
| Code Quality | Formatting, linting, test and quality gates |
| Monitoring | Observability, logging, cost tracking |
| Context & Memory | Session state, memory, context re-injection |
| Notifications | Desktop, chat, voice and sound alerts |
| Git | Git workflow automation |
| Tooling | SDKs, CLIs and multi-purpose collections |

Data lives in `data/hooks.ts`, which exports `hooks: Hook[]`, imported as `@/data/hooks`. TypeScript enforces valid categories.

## 5. Seed data

Launch with about 12 entries covering at least 6 categories. These are the candidates:

| Name | Repository | Category |
|---|---|---|
| Lasso Claude-Hooks | [lasso-security/claude-hooks](https://github.com/lasso-security/claude-hooks) | Security |
| claude-guardrails | [dwarvesf/claude-guardrails](https://github.com/dwarvesf/claude-guardrails) | Security |
| claude-code-permissions-hook | [panuhorsmalahti/claude-code-permissions-hook](https://github.com/panuhorsmalahti/claude-code-permissions-hook) | Security |
| Claude-Code-Guardrails | [wangbooth/Claude-Code-Guardrails](https://github.com/wangbooth/Claude-Code-Guardrails) | Safety |
| Multi-Agent Observability Dashboard | [disler/claude-code-hooks-multi-agent-observability](https://github.com/disler/claude-code-hooks-multi-agent-observability) | Monitoring |
| post_compact_reminder | [Dicklesworthstone/post_compact_reminder](https://github.com/Dicklesworthstone/post_compact_reminder) | Context & Memory |
| claude-code-toast | [eyalzh/claude-code-toast](https://github.com/eyalzh/claude-code-toast) | Notifications |
| SCV Sounds | [htjun/claude-code-hooks-scv-sounds](https://github.com/htjun/claude-code-hooks-scv-sounds) | Notifications |
| decider/claude-hooks | [decider/claude-hooks](https://github.com/decider/claude-hooks) | Code Quality |
| cchooks | [GowayLee/cchooks](https://github.com/GowayLee/cchooks) | Tooling |
| cc-hooks-ts | [sushichan044/cc-hooks-ts](https://github.com/sushichan044/cc-hooks-ts) | Tooling |
| karanb192/claude-code-hooks | [karanb192/claude-code-hooks](https://github.com/karanb192/claude-code-hooks) | Tooling |

The candidates have not all been verified. Before adding an entry, confirm the repository exists and is open source, then write its description from the repository's README. No candidate currently fills the Git category.

## 6. UI requirements

- **Header:** the name "HookHub" and a one-line tagline.
- **Grid:** 1 column on mobile, 2 on tablet (`md`) and 3 on desktop (`lg`), with equal-height cards in each row.
- **Card:** the name as a heading, the category as a badge, the description, and a "View on GitHub" link that opens in a new tab with `rel="noopener noreferrer"`.
- **Order:** the order in `data/hooks.ts`.
- **Long text:** descriptions wrap rather than truncate, and must not overflow the card.
- **Empty list:** show a short "No hooks yet" message.
- **Themes:** light and dark, using the `background` and `foreground` tokens in `app/globals.css`.
- **Accessibility:** semantic list markup, a logical heading order, a visible focus state, and link text that names the hook, for example through `aria-label`.

## 7. Technical approach

- Use the existing stack: Next.js 16 App Router, React 19, TypeScript and Tailwind CSS v4.
- Replace the template content in `app/page.tsx` and render the grid as a Server Component. No client JavaScript is needed.
- Add `components/HookCard.tsx`.
- Update the `metadata` title and description in `app/layout.tsx`.
- Because the data is a static import, the page prerenders fully. It needs no `use cache` and no `<Suspense>` boundary.
- Do not add a `runtime` route segment export, because `cacheComponents` is enabled.
- Remove template assets that end up unused, such as the Next.js and Vercel SVGs.

## 8. Acceptance criteria

- `/` lists every entry in `data/hooks.ts` with all four fields visible.
- The grid shows 1, 2 and 3 columns at the mobile, tablet and desktop breakpoints, with no horizontal scrolling.
- Each repository link opens the correct GitHub repository in a new tab.
- Light and dark modes are both readable.
- `npm run lint`, `npx tsc --noEmit` and `npm run build` all pass.

## 9. Future ideas

These are not committed work:

- Category filters and search
- GitHub stars
- Detail pages with install snippets
- Tags for hook events
- Community submissions by pull request

## 10. References

- [Claude Code hooks reference](https://code.claude.com/docs/en/hooks)
- [awesome-claude-code-hooks](https://github.com/ithiria894/awesome-claude-code-hooks), the source of the seed candidates
- [karanb192/claude-code-hooks](https://github.com/karanb192/claude-code-hooks)
