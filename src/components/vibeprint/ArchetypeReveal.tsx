import { motion } from "motion/react";
import type { Analysis } from "@/lib/vibeprint/types";
import { Counter } from "./Counter";

export function ArchetypeReveal({ analysis }: { analysis: Analysis }) {
  const { archetype, archetypeScore, runnerUps } = analysis;
  const circumference = 2 * Math.PI * 54;

  return (
    <section className="mx-auto max-w-3xl px-5 pt-14 text-center">
      <motion.p
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-xs font-semibold uppercase tracking-[0.3em] text-muted-foreground"
      >
        Your listening archetype
      </motion.p>

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
        className="relative mx-auto mt-8 flex size-40 items-center justify-center"
      >
        <div
          className="absolute inset-3 rounded-full blur-2xl opacity-70"
          style={{ backgroundImage: archetype.gradient }}
          aria-hidden
        />
        <svg viewBox="0 0 120 120" className="absolute inset-0 size-full -rotate-90">
          <circle cx="60" cy="60" r="54" fill="none" strokeWidth="6" className="stroke-border" />
          <motion.circle
            cx="60"
            cy="60"
            r="54"
            fill="none"
            strokeWidth="6"
            strokeLinecap="round"
            stroke="currentColor"
            className="text-primary"
            initial={{ strokeDasharray: circumference, strokeDashoffset: circumference }}
            animate={{ strokeDashoffset: circumference * (1 - archetypeScore / 100) }}
            transition={{ duration: 1.4, delay: 0.4, ease: "easeOut" }}
          />
        </svg>
        <div className="relative">
          <Counter
            value={archetypeScore}
            suffix="%"
            className="font-display text-3xl font-bold text-foreground"
          />
          <p className="text-[0.65rem] uppercase tracking-widest text-muted-foreground">match</p>
        </div>
      </motion.div>

      <motion.h1
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.35 }}
        className="text-gradient mt-8 text-4xl font-bold sm:text-6xl"
      >
        {archetype.name}
      </motion.h1>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.5 }}
        className="mt-3 text-lg text-muted-foreground"
      >
        {archetype.tagline}
      </motion.p>

      <div className="mt-8 flex flex-wrap justify-center gap-2">
        {archetype.traits.map((t) => (
          <span
            key={t}
            className="glass rounded-full px-4 py-1.5 text-sm font-medium text-foreground"
          >
            {t}
          </span>
        ))}
      </div>

      <div className="glass mx-auto mt-10 max-w-md rounded-2xl p-5 text-left">
        <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
          You also scored as
        </p>
        <ul className="mt-4 space-y-3">
          {runnerUps.map((r, i) => (
            <li key={r.name}>
              <div className="flex justify-between text-sm">
                <span className="text-foreground">{r.name}</span>
                <span className="text-muted-foreground">{r.score}%</span>
              </div>
              <div className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-secondary">
                <motion.div
                  className="bg-vibe h-full rounded-full"
                  initial={{ width: 0 }}
                  whileInView={{ width: `${r.score}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.9, delay: 0.1 * i, ease: "easeOut" }}
                />
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
