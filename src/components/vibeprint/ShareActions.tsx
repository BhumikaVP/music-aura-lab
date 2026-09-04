import { useRef, useState } from "react";
import { Download, Link2, Share2, Loader2 } from "lucide-react";
import { toPng } from "html-to-image";
import { toast } from "sonner";
import type { Analysis } from "@/lib/vibeprint/types";
import { ShareCard } from "./ShareCard";
import { Reveal } from "./Reveal";

export function ShareActions({
  analysis,
  displayName,
  username,
}: {
  analysis: Analysis;
  displayName: string;
  username: string;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [busy, setBusy] = useState(false);

  const shareUrl =
    typeof window === "undefined" ? "" : `${window.location.origin}/profile/${username}`;

  async function render(): Promise<Blob | null> {
    if (!cardRef.current) return null;
    const dataUrl = await toPng(cardRef.current, { pixelRatio: 1, cacheBust: true });
    const res = await fetch(dataUrl);
    return await res.blob();
  }

  async function handleDownload() {
    setBusy(true);
    try {
      const blob = await render();
      if (!blob) throw new Error("no card");
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `vibeprint-${username}.png`;
      a.click();
      URL.revokeObjectURL(url);
      toast.success("Share card downloaded");
    } catch {
      toast.error("Couldn't export the card", { description: "Try again in a moment." });
    } finally {
      setBusy(false);
    }
  }

  async function handleShare() {
    if (typeof navigator !== "undefined" && navigator.share) {
      try {
        await navigator.share({
          title: `I'm ${analysis.archetype.name} — VibePrint`,
          text: analysis.archetype.tagline,
          url: shareUrl,
        });
        return;
      } catch {
        // user cancelled or share failed — fall through to copy
      }
    }
    await handleCopy();
  }

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(shareUrl);
      toast.success("Link copied", { description: shareUrl });
    } catch {
      toast.error("Couldn't copy the link", { description: shareUrl });
    }
  }

  return (
    <section id="share" className="mx-auto mt-24 max-w-3xl px-5">
      <Reveal>
        <h2 className="text-center text-3xl font-bold sm:text-4xl">
          Share your <span className="text-gradient">VibePrint</span>
        </h2>
        <p className="mt-2 text-center text-muted-foreground">
          A 1080×1920 card, built for stories.
        </p>
      </Reveal>

      <Reveal delay={0.1} className="mt-10 flex justify-center">
        <div
          className="overflow-hidden rounded-3xl border border-border shadow-[var(--glow-primary)]"
          style={{ width: 324, height: 576 }}
        >
          <div style={{ transform: "scale(0.3)", transformOrigin: "top left" }}>
            <ShareCard analysis={analysis} displayName={displayName} username={username} />
          </div>
        </div>
      </Reveal>

      <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
        <button
          onClick={handleDownload}
          disabled={busy}
          className="bg-vibe glow-primary inline-flex items-center justify-center gap-2 rounded-full px-6 py-3.5 font-display font-semibold text-white transition-transform hover:scale-[1.02] disabled:opacity-70"
        >
          {busy ? <Loader2 className="size-5 animate-spin" /> : <Download className="size-5" />}
          Download PNG
        </button>
        <button
          onClick={handleShare}
          className="inline-flex items-center justify-center gap-2 rounded-full border border-accent/50 bg-accent/10 px-6 py-3.5 font-display font-semibold text-accent transition-transform hover:scale-[1.02]"
        >
          <Share2 className="size-5" />
          Share
        </button>
        <button
          onClick={handleCopy}
          className="inline-flex items-center justify-center gap-2 rounded-full border border-border px-6 py-3.5 font-display font-semibold text-foreground transition-colors hover:border-primary"
        >
          <Link2 className="size-5" />
          Copy link
        </button>
      </div>

      {/* Offscreen full-size card used for the PNG export */}
      <div className="pointer-events-none fixed -left-[9999px] top-0" aria-hidden>
        <ShareCard
          ref={cardRef}
          analysis={analysis}
          displayName={displayName}
          username={username}
        />
      </div>
    </section>
  );
}
