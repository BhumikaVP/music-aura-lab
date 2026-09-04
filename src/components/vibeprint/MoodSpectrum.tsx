import { motion } from "motion/react";
import { Flame, Smile, Disc3, Waves, HeartPulse } from "lucide-react";
import type { MoodScores } from "@/lib/vibeprint/types";
import { Counter } from "./Counter";
import { Reveal } from "./Reveal";

const ROWS: { key: keyof MoodScores; label: string; icon: typeof Flame }[] = [
  { key: "energy", label: "Energy", icon: Flame },
  { key: "happiness", label: "Happiness", icon: Smile },
  { key: "danceability", label: "Danceability", icon: Disc3 },
  { key: "calmness", label: "Calmness", icon: Waves },
  { key: "emotionalIntensity", label: "Emotional intensity", icon: HeartPulse },
];

export function MoodSpectrum({ mood }: { mood: MoodScores }) {
  return (
    <section className="mx-auto mt-24 max-w-3xl px-5">
      <Reveal>
        <h2 className="text-center text-3xl font-bold sm:text-4xl">
          Your <span className="text-gradient">Mood Spectrum</span>
        </h2>
        <p className="mt-2 text-center text-muted-foreground">
          How your listening actually feels, measured across five axes.
        </p>
      </Reveal>

      <Reveal delay={0.1} className="glass mt-10 space-y-6 rounded-3xl p-6 sm:p-8">
        {ROWS.map((row, i) => {
          const value = mood[row.key];
          const Icon = row.icon;
          return (
            <div key={row.key}>
              <div className="flex items-center justify-between text-sm">
                <span className="flex items-center gap-2 font-medium text-foreground">
                  <Icon className="size-4 text-primary" />
                  {row.label}
                </span>
                <Counter value={value} suffix="%" className="text-muted-foreground" />
              </div>
              <div className="mt-2 h-2.5 overflow-hidden rounded-full bg-secondary">
                <motion.div
                  className="bg-vibe h-full rounded-full"
                  initial={{ width: 0 }}
                  whileInView={{ width: `${value}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 1, delay: i * 0.07, ease: "easeOut" }}
                />
              </div>
            </div>
          );
        })}
      </Reveal>
    </section>
  );
}
