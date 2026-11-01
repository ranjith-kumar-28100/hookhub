export type HookCategory =
  | "Security"
  | "Safety"
  | "Code Quality"
  | "Monitoring"
  | "Context & Memory"
  | "Notifications"
  | "Git"
  | "Tooling";

export type Hook = {
  id: string;
  name: string;
  category: HookCategory;
  description: string;
  repoUrl: string;
};

export const hooks: Hook[] = [
  {
    id: "lasso-claude-hooks",
    name: "Lasso Claude-Hooks",
    category: "Security",
    description:
      "Prompt-injection defenses that scan tool output and warn Claude about suspicious content.",
    repoUrl: "https://github.com/lasso-security/claude-hooks",
  },
  {
    id: "claude-guardrails",
    name: "claude-guardrails",
    category: "Security",
    description:
      "Hardened security config with permission deny rules, shell hooks and prompt injection defense.",
    repoUrl: "https://github.com/dwarvesf/claude-guardrails",
  },
  {
    id: "claude-code-guardrails",
    name: "Claude-Code-Guardrails",
    category: "Safety",
    description:
      "Prevents accidental code loss with branch protection, automatic checkpoints and safe commit squashing.",
    repoUrl: "https://github.com/wangbooth/Claude-Code-Guardrails",
  },
  {
    id: "claude-code-toast",
    name: "claude-code-toast",
    category: "Notifications",
    description:
      "A Notification hook for macOS that shows a toast when Claude Code is waiting for your reply.",
    repoUrl: "https://github.com/eyalzh/claude-code-toast",
  },
  {
    id: "decider-claude-hooks",
    name: "decider/claude-hooks",
    category: "Code Quality",
    description:
      "Hooks that enforce clean code practices and automate common workflows.",
    repoUrl: "https://github.com/decider/claude-hooks",
  },
  {
    id: "cchooks",
    name: "cchooks",
    category: "Tooling",
    description: "A Python SDK for writing Claude Code hooks.",
    repoUrl: "https://github.com/GowayLee/cchooks",
  },
  {
    id: "cc-hooks-ts",
    name: "cc-hooks-ts",
    category: "Tooling",
    description: "Define Claude Code hooks in TypeScript with full type safety.",
    repoUrl: "https://github.com/sushichan044/cc-hooks-ts",
  },
  {
    id: "karanb192-claude-code-hooks",
    name: "karanb192/claude-code-hooks",
    category: "Tooling",
    description:
      "Ready-to-use hooks and an installable plugin marketplace for safety, cost, observability and productivity.",
    repoUrl: "https://github.com/karanb192/claude-code-hooks",
  },
];
