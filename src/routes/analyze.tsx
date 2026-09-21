import { createFileRoute, useNavigate, useSearch } from "@tanstack/react-router";
import { useCallback, useRef } from "react";
import { AnalysisLoader } from "@/components/vibeprint/AnalysisLoader";
import { analyze } from "@/lib/vibeprint/analyze";
import { demoUser } from "@/lib/vibeprint/mockData";
import { saveProfile } from "@/lib/vibeprint/store";
import { getSpotifyUserData } from "@/lib/vibeprint/spotify.functions";
import { toast } from "sonner";

export const Route = createFileRoute("/analyze")({
  validateSearch: (search: Record<string, unknown>) => ({
    source: search["source"] === "spotify" ? ("spotify" as const) : undefined,
  }),
  head: () => ({
    meta: [
      { title: "Reading your musical DNA — VibePrint" },
      {
        name: "description",
        content: "VibePrint is analyzing your artists, genres, moods and listening patterns.",
      },
      { property: "og:title", content: "Reading your musical DNA — VibePrint" },
      {
        property: "og:description",
        content: "Hang tight while we decode the personality inside your listening history.",
      },
    ],
  }),
  component: AnalyzePage,
});

function slugify(name: string, fallback: string) {
  const s = name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
  return s || fallback;
}

function AnalyzePage() {
  const navigate = useNavigate();
  const { source } = useSearch({ from: "/analyze" });
  const done = useRef(false);

  const handleComplete = useCallback(async () => {
    if (done.current) return;
    done.current = true;

    if (source === "spotify") {
      try {
        const result = await getSpotifyUserData();
        if (!result.ok) {
          navigate({ to: "/connect", search: { spotify_error: result.code } });
          return;
        }
        const analysis = analyze(result.user);
        saveProfile(result.user, analysis, slugify(result.user.displayName, "listener"));
        navigate({ to: "/results" });
        return;
      } catch {
        navigate({ to: "/connect", search: { spotify_error: "api_error" } });
        return;
      }
    }

    try {
      const analysis = analyze(demoUser);
      saveProfile(demoUser, analysis, "demo-user");
      navigate({ to: "/results" });
    } catch {
      toast.error("Analysis failed", { description: "Something broke while scoring your taste." });
      navigate({ to: "/connect", search: {} });
    }
  }, [navigate, source]);

  return <AnalysisLoader onComplete={handleComplete} />;
}
