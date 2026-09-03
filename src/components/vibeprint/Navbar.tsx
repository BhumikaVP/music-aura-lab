import { Link } from "@tanstack/react-router";

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/60 bg-background/70 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5">
        <Link to="/" className="flex items-center gap-2">
          <span className="bg-vibe inline-block size-6 rounded-md" />
          <span className="font-display text-lg font-bold tracking-tight">VibePrint</span>
        </Link>
        <nav className="flex items-center gap-5 text-sm text-muted-foreground">
          <a href="/#how" className="hidden transition-colors hover:text-foreground sm:inline">
            How it works
          </a>
          <a href="/#archetypes" className="hidden transition-colors hover:text-foreground sm:inline">
            Archetypes
          </a>
          <Link
            to="/connect"
            className="rounded-full border border-border px-4 py-1.5 font-medium text-foreground transition-all hover:border-primary hover:shadow-[var(--glow-primary)]"
          >
            Connect
          </Link>
        </nav>
      </div>
    </header>
  );
}
