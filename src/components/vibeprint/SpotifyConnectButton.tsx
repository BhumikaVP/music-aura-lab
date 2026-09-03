import { useState } from "react";
import { Music4, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { useNavigate } from "@tanstack/react-router";

export function SpotifyConnectButton() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  function handleConnect() {
    setLoading(true);
    // Live OAuth requires Spotify credentials. Until they exist we fail gracefully
    // into the demo path instead of firing a broken API request.
    window.setTimeout(() => {
      setLoading(false);
      toast.error("Spotify isn't connected yet", {
        description: "Credentials aren't configured. Running the demo analysis instead.",
        action: {
          label: "Demo",
          onClick: () => navigate({ to: "/analyze" }),
        },
      });
    }, 900);
  }

  return (
    <button
      onClick={handleConnect}
      disabled={loading}
      className="bg-vibe glow-primary group flex w-full items-center justify-center gap-2 rounded-full px-6 py-4 font-display text-base font-semibold text-white transition-transform duration-200 hover:scale-[1.02] disabled:opacity-70"
    >
      {loading ? <Loader2 className="size-5 animate-spin" /> : <Music4 className="size-5" />}
      {loading ? "Connecting…" : "Connect Spotify"}
    </button>
  );
}
