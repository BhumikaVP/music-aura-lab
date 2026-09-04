export function FloatingVisual() {
  return (
    <div className="relative mx-auto flex size-64 items-center justify-center sm:size-80" aria-hidden>
      <div className="bg-vibe absolute inset-6 rounded-full opacity-40 blur-3xl" />
      <div className="animate-float grain glass relative flex size-52 items-center justify-center rounded-full sm:size-64">
        <div className="bg-vibe flex size-36 items-center justify-center rounded-full sm:size-44">
          <div className="flex size-14 items-center justify-center rounded-full bg-background sm:size-16">
            <span className="font-display text-sm font-bold text-foreground">VP</span>
          </div>
        </div>
        {[0, 1, 2].map((i) => (
          <span
            key={i}
            className="absolute rounded-full border border-border"
            style={{ inset: `${-10 - i * 14}px` }}
          />
        ))}
      </div>
    </div>
  );
}
