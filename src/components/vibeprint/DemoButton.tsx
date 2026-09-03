import { Sparkles } from "lucide-react";
import { useNavigate } from "@tanstack/react-router";
import { cn } from "@/lib/utils";

export function DemoButton({
  className,
  label = "Try Demo Analysis",
}: {
  className?: string;
  label?: string;
}) {
  const navigate = useNavigate();
  return (
    <button
      onClick={() => navigate({ to: "/analyze" })}
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-full border border-accent/50 bg-accent/10 px-6 py-4 font-display text-base font-semibold text-accent transition-all duration-200 hover:scale-[1.02] hover:shadow-[var(--glow-accent)]",
        className,
      )}
    >
      <Sparkles className="size-5" />
      {label}
    </button>
  );
}
