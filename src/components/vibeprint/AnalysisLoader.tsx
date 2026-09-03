import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Check } from "lucide-react";

const STAGES = [
  "Analyzing your favorite artists",
  "Mapping your genres",
  "Measuring your mood",
  "Detecting your listening patterns",
  "Finding your alter ego",
  "Building your music personality",
];

const STAGE_MS = 700;

export function AnalysisLoader({ onComplete }: { onComplete: () => void }) {
  const [stage, setStage] = useState(0);

  useEffect(() => {
    const timers = STAGES.map((_, i) =>
      window.setTimeout(() => setStage(i + 1), (i + 1) * STAGE_MS),
    );
    const done = window.setTimeout(onComplete, STAGES.length * STAGE_MS + 600);
    return () => {
      timers.forEach(window.clearTimeout);
      window.clearTimeout(done);
    };
  }, [onComplete]);

  const progress = Math.min(100, Math.round((stage / STAGES.length) * 100));

  return (
    <div className="mx-auto flex min-h-[80vh] w-full max-w-md flex-col items-center justify-center px-5">
      <div className="relative mb-10 flex size-40 items-center justify-center">
        <motion.div
          className="bg-vibe absolute inset-0 rounded-full blur-2xl opacity-60"
          animate={{ scale: [1, 1.15, 1] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        />
        <div className="glass relative flex size-32 items-center justify-center rounded-full">
          <div className="flex items-end gap-1">
            {[0, 1, 2, 3, 4].map((i) => (
              <motion.span
                key={i}
                className="bg-vibe w-1.5 rounded-full"
                animate={{ height: [10, 38, 16, 30, 12] }}
                transition={{ duration: 1.1, repeat: Infinity, delay: i * 0.12 }}
              />
            ))}
          </div>
        </div>
      </div>

      <h1 className="text-center text-3xl font-bold">Reading your musical DNA…</h1>

      <div className="mt-8 h-1.5 w-full overflow-hidden rounded-full bg-secondary">
        <motion.div
          className="bg-vibe h-full"
          animate={{ width: `${progress}%` }}
          transition={{ ease: "easeOut", duration: 0.4 }}
        />
      </div>
      <p className="mt-2 self-end text-xs text-muted-foreground">{progress}%</p>

      <ul className="mt-8 w-full space-y-3">
        <AnimatePresence initial={false}>
          {STAGES.slice(0, Math.min(stage + 1, STAGES.length)).map((s, i) => (
            <motion.li
              key={s}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center gap-3 text-sm"
            >
              <span
                className={
                  i < stage
                    ? "flex size-5 items-center justify-center rounded-full bg-accent text-accent-foreground"
                    : "size-5 rounded-full border border-border"
                }
              >
                {i < stage ? <Check className="size-3.5" /> : null}
              </span>
              <span className={i < stage ? "text-muted-foreground" : "text-foreground"}>{s}</span>
            </motion.li>
          ))}
        </AnimatePresence>
      </ul>
    </div>
  );
}
