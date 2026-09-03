import { createFileRoute } from "@tanstack/react-router";
import { Navbar } from "@/components/vibeprint/Navbar";
import { Footer } from "@/components/vibeprint/Footer";
import { SpotifyConnectButton } from "@/components/vibeprint/SpotifyConnectButton";
import { DemoButton } from "@/components/vibeprint/DemoButton";

export const Route = createFileRoute("/connect")({
  head: () => ({
    meta: [
      { title: "Connect Spotify — VibePrint" },
      {
        name: "description",
        content:
          "Connect your Spotify account, or run the demo analysis, to reveal your music personality archetype.",
      },
      { property: "og:title", content: "Connect Spotify — VibePrint" },
      {
        property: "og:description",
        content: "Link Spotify and let VibePrint decode the personality inside your playlists.",
      },
    ],
  }),
  component: ConnectPage,
});

function ConnectPage() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="mx-auto flex max-w-xl flex-col items-center px-5 py-20 text-center">
        <div className="bg-vibe glow-primary grain mb-8 flex size-20 items-center justify-center rounded-3xl">
          <span className="font-display text-3xl font-bold text-white">VP</span>
        </div>
        <h1 className="text-4xl font-bold">Connect your Spotify</h1>
        <p className="mt-3 text-muted-foreground">
          We read your top artists, tracks and listening patterns to build your VibePrint. Nothing is
          posted, nothing is stored on a server.
        </p>

        <div className="mt-10 w-full space-y-3">
          <SpotifyConnectButton />
          <DemoButton className="w-full" label="Try Demo Analysis" />
        </div>

        <div className="glass mt-10 w-full rounded-2xl p-5 text-left text-sm text-muted-foreground">
          <p className="font-medium text-foreground">Spotify credentials aren&apos;t configured yet</p>
          <p className="mt-1">
            Live OAuth needs a Spotify client ID and secret. Until those are added, the full
            experience runs on realistic demo listening data — every screen, chart and share card
            works exactly the same.
          </p>
        </div>

        <ul className="mt-8 flex flex-wrap justify-center gap-2 text-xs text-muted-foreground">
          {["user-top-read", "user-read-recently-played", "user-read-private"].map((s) => (
            <li key={s} className="rounded-full border border-border px-3 py-1">
              {s}
            </li>
          ))}
        </ul>
      </main>
      <Footer />
    </div>
  );
}
