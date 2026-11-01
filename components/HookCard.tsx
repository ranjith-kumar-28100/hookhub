import type { Hook } from "@/data/hooks";

type HookCardProps = {
  hook: Hook;
};

const HookCard = ({ hook }: HookCardProps) => {
  const { name, category, description, repoUrl } = hook;

  return (
    <li className="flex">
      <article className="flex w-full flex-col gap-3 rounded-xl border border-foreground/15 p-5">
        <span className="w-fit rounded-full bg-foreground/10 px-2.5 py-0.5 text-xs font-medium">
          {category}
        </span>
        <h2 className="break-words text-lg font-semibold">{name}</h2>
        <p className="break-words text-sm leading-6 text-foreground/70">
          {description}
        </p>
        <a
          href={repoUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`View ${name} on GitHub`}
          className="mt-auto w-fit pt-2 text-sm font-medium underline underline-offset-4 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-foreground"
        >
          View on GitHub
        </a>
      </article>
    </li>
  );
};

export default HookCard;
