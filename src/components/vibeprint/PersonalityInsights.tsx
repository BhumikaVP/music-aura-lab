import type { Insight } from "@/lib/vibeprint/types";
import { Reveal } from "./Reveal";

export function PersonalityInsights({ insights }: { insights: Insight[] }) {
  return (
    <section className="mx-auto mt-24 max-w-4xl px-5">
      <Reveal>
        <h2 className="text-center text-3xl font-bold sm:text-4xl">
          Personalized <span className="text-gradient">Insights</span>
        </h2>
        <p className="mt-2 text-center text-muted-foreground">
          Six things your listening history quietly admits about you.
        </p>
      </Reveal>

      <div className="mt-10 grid gap-4 sm:grid-cols-2">
        {insights.map((insight, i) => (
          <Reveal
            key={insight.title}
            delay={i * 0.06}
            className="glass rounded-2xl p-6 transition-transform duration-200 hover:-translate-y-1"
          >
            <p className="font-display text-lg font-semibold text-foreground">{insight.title}</p>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{insight.body}</p>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
