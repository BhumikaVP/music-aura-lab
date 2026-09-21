import { createFileRoute, useSearch } from "@tanstack/react-router";
import { Navbar } from "@/components/vibeprint/Navbar";
import { Footer } from "@/components/vibeprint/Footer";
import {
  SpotifyConnectButton,
  useSpotifyStatus,
} from "@/components/vibeprint/SpotifyConnectButton";
import { DemoButton } from "@/components/vibeprint/DemoButton";

const ERROR_COPY: Record<string, string> = {
  cancelled: "You cancelled the Spotify sign-in. You can try again or run the demo.",
  invalid: "Spotify didn't send a valid authorization. Please try connecting again.",
  invalid_state: "That sign-in link expired or didn't match. Please start the connection again.",
  token_exchange: "We couldn't finish the Spotify handshake. Please try again in a moment.",
  not_configured: "Spotify isn't configured on this deployment yet — demo mode is fully available.",
  expired: "Your Spotify session expired. Connect again to refresh it.",
  unauthenticated: "You're not connected to Spotify yet.",
  no_data: "Spotify didn't return enough listening history to analyze. Try the demo instead.",
  rate_limited: "Spotify is busy right now. Give it a minute and try again.",
  api_error: "Spotify couldn't be reached. Please try again shortly.",
};

export const Route = createFileRoute("/connect")({
  validateSearch: (search: Record<string, unknown>): { spotify_error?: string } =>
    typeof search["spotify_error"] === "string"
      ? { spotify_error: search["spotify_error"] }
      : {},
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
  const { spotify_error: errorCode } = useSearch({ from: "/connect" });
  const { data, isLoading } = useSpotifyStatus();
  const configured = Boolean(data?.configured);
  const message = errorCode ? (ERROR_COPY[errorCode] ?? ERROR_COPY["api_error"]) : null;

  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="mx-auto flex max-w-xl flex-col items-center px-5 py-20 text-center">
        <div className="bg-vibe glow-primary grain mb-8 flex size-20 items-center justify-center rounded-3xl">
          <span className="font-display text-3xl font-bold text-white">VP</span>
        </div>
        <h1 className="text-4xl font-bold">Connect your Spotify</h1>
        <p className="mt-3 text-muted-foreground">
          We read your top artists, tracks and recent listening to build your VibePrint. Nothing is
          posted to your account, and your results stay on this device.
        </p>

        {message && (
          <div className="mt-8 w-full rounded-2xl border border-destructive/40 bg-destructive/10 p-4 text-sm text-foreground">
            {message}
          </div>
        )}

        <div className="mt-10 w-full space-y-3">
          <SpotifyConnectButton configured={configured} loading={isLoading} className="w-full" />
          <DemoButton className="w-full" label="Try Demo Analysis" />
        </div>

        {!isLoading && !configured && (
          <div className="glass mt-10 w-full rounded-2xl p-5 text-left text-sm text-muted-foreground">
            <p className="font-medium text-foreground">Spotify credentials aren&apos;t configured here</p>
            <p className="mt-1">
              Live OAuth needs a Spotify client ID and secret set on the server. Until those exist,
              the full experience runs on realistic demo listening data — every screen, chart and
              share card works exactly the same.
            </p>
          </div>
        )}

        <ul className="mt-8 flex flex-wrap justify-center gap-2 text-xs text-muted-foreground">
          {["user-top-read", "user-read-recently-played"].map((s) => (
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
