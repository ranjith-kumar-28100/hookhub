import HookCard from "@/components/HookCard";
import { hooks } from "@/data/hooks";

const Home = () => {
  return (
    <main className="mx-auto flex w-full max-w-6xl flex-1 flex-col gap-10 px-4 py-12 sm:px-6">
      <header className="flex flex-col gap-2">
        <h1 className="text-4xl font-semibold tracking-tight">HookHub</h1>
        <p className="text-lg text-foreground/70">
          Browse open source hooks for Claude Code.
        </p>
      </header>
      {hooks.length === 0 ? (
        <p className="text-foreground/70">No hooks yet.</p>
      ) : (
        <ul className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {hooks.map((hook) => (
            <HookCard key={hook.id} hook={hook} />
          ))}
        </ul>
      )}
    </main>
  );
};

export default Home;
