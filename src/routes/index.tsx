import { createFileRoute } from "@tanstack/react-router";
import { Navbar } from "@/components/vibeprint/Navbar";
import { Footer } from "@/components/vibeprint/Footer";
import { FloatingVisual } from "@/components/vibeprint/FloatingVisual";
import { SpotifyConnect } from "@/components/vibeprint/SpotifyConnectButton";
import { DemoButton } from "@/components/vibeprint/DemoButton";
import { Reveal } from "@/components/vibeprint/Reveal";
import { ARCHETYPES } from "@/lib/vibeprint/archetypes";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "VibePrint — your Spotify music personality, decoded" },
      {
        name: "description",
        content:
          "Turn your listening history into a shareable music personality: archetype, music DNA, mood spectrum and alter ego.",
      },
      { property: "og:title", content: "VibePrint — your Spotify music personality, decoded" },
      {
        property: "og:description",
        content: "Discover your listening archetype, music DNA, mood spectrum and music alter ego.",
      },
    ],
  }),
  component: Landing,
});

const STEPS = [
  { n: "01", t: "Connect", d: "Link Spotify or run the demo with sample listening data." },
  { n: "02", t: "Analyze", d: "We score genres, moods, era, discovery and listening rhythm." },
  { n: "03", t: "Reveal", d: "Get your archetype, DNA, mood spectrum and alter ego." },
  { n: "04", t: "Share", d: "Download a story-sized card or share your public profile link." },
];

function Landing() {
  return (
    <div className="min-h-screen">
      <Navbar />

      <main>
        <section className="mx-auto grid max-w-6xl items-center gap-12 px-5 pt-16 pb-10 md:grid-cols-2 md:pt-24">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-muted-foreground">
              Music personality analyzer
            </p>
            <h1 className="font-display mt-5 text-5xl font-bold leading-[1.05] sm:text-6xl">
              Your music says <span className="text-gradient">more than you think</span>.
            </h1>
            <p className="mt-6 max-w-lg text-base text-muted-foreground sm:text-lg">
              VibePrint reads your listening history and turns it into a personality profile you'll
              actually want to post — archetype, music DNA, mood spectrum and your alter ego.
            </p>
            <div className="mt-9 flex flex-wrap gap-3">
              <SpotifyConnect />
              <DemoButton />
            </div>
            <p className="mt-4 text-xs text-muted-foreground">
              No password needed. Demo mode uses sample data — nothing leaves your device.
            </p>
          </div>
          <FloatingVisual />
        </section>

        <section id="archetypes" className="mx-auto mt-20 max-w-6xl px-5">
          <Reveal>
            <h2 className="font-display text-3xl font-bold sm:text-4xl">10 listening archetypes</h2>
            <p className="mt-3 max-w-xl text-sm text-muted-foreground">
              Every profile lands on one of these — with a confidence score and your closest
              runner-ups.
            </p>
          </Reveal>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {ARCHETYPES.map((a, i) => (
              <Reveal key={a.id} delay={i * 0.04}>
                <article className="glass h-full rounded-2xl p-5 transition-transform hover:-translate-y-1">
                  <span
                    className="inline-block size-9 rounded-xl"
                    style={{ backgroundImage: a.gradient }}
                    aria-hidden
                  />
                  <h3 className="font-display mt-4 text-lg font-bold">{a.name}</h3>
                  <p className="mt-1 text-sm text-primary">{a.tagline}</p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {a.traits.slice(0, 3).map((t) => (
                      <span
                        key={t}
                        className="rounded-full border border-border px-3 py-1 text-xs text-muted-foreground"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </section>

        <section id="how" className="mx-auto mt-24 max-w-6xl px-5">
          <Reveal>
            <h2 className="font-display text-3xl font-bold sm:text-4xl">How it works</h2>
          </Reveal>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {STEPS.map((s, i) => (
              <Reveal key={s.n} delay={i * 0.05}>
                <div className="glass h-full rounded-2xl p-5">
                  <p className="font-display text-gradient text-3xl font-bold">{s.n}</p>
                  <h3 className="mt-3 font-semibold">{s.t}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{s.d}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        <section className="mx-auto mt-24 max-w-3xl px-5 text-center">
          <Reveal className="glass rounded-3xl p-8">
            <h2 className="font-display text-3xl font-bold">Made to be shared</h2>
            <p className="mt-3 text-sm text-muted-foreground">
              Every result exports as a story-sized card, plus a public link friends can open.
            </p>
            <div className="mt-8 flex justify-center gap-3">
              <SpotifyConnect />
              <DemoButton />
            </div>
          </Reveal>
        </section>
      </main>

      <Footer />
    </div>
  );
}
