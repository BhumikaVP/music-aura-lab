import { Music2 } from "lucide-react";
import type { Analysis } from "@/lib/vibeprint/types";
import { Reveal } from "./Reveal";

export function AlterEgoCard({ analysis }: { analysis: Analysis }) {
  return (
    <section className="mx-auto mt-24 max-w-3xl px-5">
      <Reveal>
        <h2 className="text-center text-3xl font-bold sm:text-4xl">
          Your <span className="text-gradient">Music Alter Ego</span>
        </h2>
      </Reveal>

      <Reveal delay={0.1} className="grain glass glow-primary mt-10 overflow-hidden rounded-3xl">
        <div className="bg-vibe h-1.5 w-full" />
        <div className="p-7 sm:p-10">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-muted-foreground">
            You are
          </p>
          <h3 className="font-display mt-3 text-3xl font-bold sm:text-4xl">
            {analysis.alterEgoName}
          </h3>
          <p className="mt-2 text-lg text-primary">{analysis.alterEgoTagline}</p>
          <p className="mt-5 leading-relaxed text-muted-foreground">
            {analysis.alterEgoDescription}
          </p>

          <div className="mt-6 flex flex-wrap gap-2">
            {analysis.traits.map((t) => (
              <span
                key={t}
                className="rounded-full border border-border px-3 py-1 text-sm text-foreground"
              >
                {t}
              </span>
            ))}
          </div>

          <div className="mt-7 flex items-start gap-3 rounded-2xl border border-border bg-card/60 p-4">
            <Music2 className="mt-0.5 size-5 shrink-0 text-accent" />
            <div>
              <p className="text-xs uppercase tracking-widest text-muted-foreground">
                Your soundtrack
              </p>
              <p className="mt-1 text-foreground">{analysis.soundtrack}</p>
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
