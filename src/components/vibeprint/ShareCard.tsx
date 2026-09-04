import { forwardRef } from "react";
import type { Analysis } from "@/lib/vibeprint/types";

/**
 * Fixed 1080x1920 share card. Rendered offscreen at full size and exported
 * as a PNG; the on-page preview scales it down with a CSS transform.
 */
export const ShareCard = forwardRef<
  HTMLDivElement,
  { analysis: Analysis; displayName: string; username: string }
>(function ShareCard({ analysis, displayName, username }, ref) {
  const { archetype, moodScores, genreDNA, archetypeScore } = analysis;

  return (
    <div
      ref={ref}
      className="grain relative flex flex-col justify-between overflow-hidden bg-background text-foreground"
      style={{ width: 1080, height: 1920, padding: 96 }}
    >
      <div
        className="absolute inset-x-0 top-0 opacity-50 blur-[120px]"
        style={{ height: 900, backgroundImage: archetype.gradient }}
        aria-hidden
      />

      <div className="relative">
        <div className="flex items-center gap-5">
          <span className="bg-vibe inline-block size-14 rounded-2xl" />
          <span className="font-display text-4xl font-bold tracking-tight">VibePrint</span>
        </div>
        <p className="mt-24 text-3xl uppercase tracking-[0.4em] text-muted-foreground">
          {displayName}
        </p>
        <p className="mt-10 text-4xl text-muted-foreground">Your listening archetype is</p>
        <h1 className="font-display mt-6 text-8xl font-bold leading-[1.05]">{archetype.name}</h1>
        <p className="mt-8 text-4xl text-primary">{archetype.tagline}</p>

        <div className="mt-14 flex flex-wrap gap-4">
          {archetype.traits.map((t) => (
            <span
              key={t}
              className="rounded-full border border-border px-8 py-4 text-3xl text-foreground"
            >
              {t}
            </span>
          ))}
        </div>
      </div>

      <div className="relative">
        <div className="glass rounded-[48px] p-14">
          <p className="text-2xl uppercase tracking-[0.3em] text-muted-foreground">Music DNA</p>
          <div className="mt-8 space-y-7">
            {genreDNA.slice(0, 3).map((g) => (
              <div key={g.name}>
                <div className="flex justify-between text-3xl">
                  <span>{g.name}</span>
                  <span className="text-muted-foreground">{g.percent}%</span>
                </div>
                <div className="mt-3 h-4 overflow-hidden rounded-full bg-secondary">
                  <div className="bg-vibe h-full" style={{ width: `${g.percent}%` }} />
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 grid grid-cols-3 gap-8 text-center">
            {[
              ["Energy", moodScores.energy],
              ["Happy", moodScores.happiness],
              ["Match", archetypeScore],
            ].map(([label, value]) => (
              <div key={label as string} className="rounded-3xl border border-border p-7">
                <p className="font-display text-5xl font-bold">{value}%</p>
                <p className="mt-2 text-2xl text-muted-foreground">{label}</p>
              </div>
            ))}
          </div>
        </div>

        <p className="mt-12 text-center text-3xl text-muted-foreground">
          vibeprint.app/profile/{username}
        </p>
      </div>
    </div>
  );
});
