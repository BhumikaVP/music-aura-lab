export function Footer() {
  return (
    <footer className="mt-24 border-t border-border/60 py-10">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-3 px-5 text-center text-sm text-muted-foreground">
        <div className="flex items-center gap-2">
          <span className="bg-vibe inline-block size-4 rounded" />
          <span className="font-display font-semibold text-foreground">VibePrint</span>
        </div>
        <p>Your music personality, decoded. Not affiliated with Spotify.</p>
        <p className="text-xs opacity-70">vibeprint.app</p>
      </div>
    </footer>
  );
}
