import { Music4, Loader2 } from "lucide-react";
import { toast } from "sonner";

export function SpotifyConnectButton({
  configured,
  loading = false,
}: {
  configured: boolean;
  loading?: boolean;
}) {
  function handleConnect() {
    if (!configured) {
      toast.error("Spotify isn't configured yet", {
        description: "Use the demo analysis — every screen works the same.",
      });
      return;
    }
    window.location.href = "/api/public/spotify/login";
  }

  return (
    <button
      onClick={handleConnect}
      disabled={loading || !configured}
      className="bg-vibe glow-primary group flex w-full items-center justify-center gap-2 rounded-full px-6 py-4 font-display text-base font-semibold text-white transition-transform duration-200 hover:scale-[1.02] disabled:cursor-not-allowed disabled:opacity-50"
    >
      {loading ? <Loader2 className="size-5 animate-spin" /> : <Music4 className="size-5" />}
      {loading ? "Checking Spotify…" : "Connect Spotify"}
    </button>
  );
}
