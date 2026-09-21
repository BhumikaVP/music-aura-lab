import { Music4, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { useQuery } from "@tanstack/react-query";
import { getSpotifyStatus } from "@/lib/vibeprint/spotify.functions";
import { cn } from "@/lib/utils";

export function useSpotifyStatus() {
  return useQuery({
    queryKey: ["spotify-status"],
    queryFn: () => getSpotifyStatus(),
    staleTime: 60_000,
  });
}

export function SpotifyConnectButton({
  configured,
  loading = false,
  className,
}: {
  configured: boolean;
  loading?: boolean;
  className?: string;
}) {
  function handleConnect() {
    if (!configured) {
      toast.error("Spotify isn't connected yet", {
        description:
          "This deployment has no Spotify credentials configured. Try the demo analysis instead — every screen works the same.",
      });
      return;
    }
    window.location.href = "/api/public/spotify/login";
  }

  return (
    <button
      onClick={handleConnect}
      disabled={loading}
      className={cn(
        "bg-vibe glow-primary group flex items-center justify-center gap-2 rounded-full px-6 py-4 font-display text-base font-semibold text-white transition-transform duration-200 hover:scale-[1.02] disabled:opacity-60",
        className,
      )}
    >
      {loading ? <Loader2 className="size-5 animate-spin" /> : <Music4 className="size-5" />}
      {loading ? "Checking Spotify…" : "Connect Spotify"}
    </button>
  );
}

/** Self-contained variant that resolves Spotify configuration on its own. */
export function SpotifyConnect({ className }: { className?: string }) {
  const { data, isLoading } = useSpotifyStatus();
  return (
    <SpotifyConnectButton
      configured={Boolean(data?.configured)}
      loading={isLoading}
      {...(className ? { className } : {})}
    />
  );
}
