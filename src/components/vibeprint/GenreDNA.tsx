import { motion } from "motion/react";
import type { Analysis } from "@/lib/vibeprint/types";
import { Counter } from "./Counter";
import { Reveal } from "./Reveal";

const STOPS = [
  "oklch(0.62 0.24 300)",
  "oklch(0.7 0.24 350)",
  "oklch(0.78 0.18 60)",
  "oklch(0.86 0.24 150)",
  "oklch(0.72 0.16 240)",
];

export function GenreDNA({ analysis }: { analysis: Analysis }) {
  const { genreDNA, genreCount, genreDiversity } = analysis;

  return (
    <section className="mx-auto mt-24 max-w-3xl px-5">
      <Reveal>
        <h2 className="text-center text-3xl font-bold sm:text-4xl">
          Your <span className="text-gradient">Music DNA</span>
        </h2>
        <p className="mt-2 text-center text-muted-foreground">
          The genetic makeup of everything you press play on.
        </p>
      </Reveal>

      <Reveal delay={0.1} className="glass mt-10 rounded-3xl p-6 sm:p-8">
        <div className="flex h-4 w-full overflow-hidden rounded-full">
          {genreDNA.map((g, i) => (
            <motion.div
              key={g.name}
              initial={{ width: 0 }}
              whileInView={{ width: `${g.percent}%` }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, delay: i * 0.08, ease: "easeOut" }}
              style={{ backgroundColor: STOPS[i % STOPS.length] }}
            />
          ))}
        </div>

        <ul className="mt-8 space-y-5">
          {genreDNA.map((g, i) => (
            <li key={g.name}>
              <div className="flex items-center justify-between text-sm">
                <span className="flex items-center gap-2 font-medium text-foreground">
                  <span
                    className="size-2.5 rounded-full"
                    style={{ backgroundColor: STOPS[i % STOPS.length] }}
                  />
                  {g.name}
                </span>
                <Counter value={g.percent} suffix="%" className="text-muted-foreground" />
              </div>
              <div className="mt-2 h-2 overflow-hidden rounded-full bg-secondary">
                <motion.div
                  className="h-full rounded-full"
                  style={{ backgroundColor: STOPS[i % STOPS.length] }}
                  initial={{ width: 0 }}
                  whileInView={{ width: `${g.percent}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 1, delay: i * 0.08, ease: "easeOut" }}
                />
              </div>
            </li>
          ))}
        </ul>

        <div className="mt-8 grid grid-cols-2 gap-4">
          <div className="rounded-2xl border border-border bg-card/60 p-4 text-center">
            <Counter
              value={genreCount}
              className="font-display text-3xl font-bold text-foreground"
            />
            <p className="mt-1 text-xs uppercase tracking-widest text-muted-foreground">
              genres detected
            </p>
          </div>
          <div className="rounded-2xl border border-border bg-card/60 p-4 text-center">
            <Counter
              value={genreDiversity}
              suffix="%"
              className="font-display text-3xl font-bold text-foreground"
            />
            <p className="mt-1 text-xs uppercase tracking-widest text-muted-foreground">
              diversity score
            </p>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
