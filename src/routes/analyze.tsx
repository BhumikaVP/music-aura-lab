import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useCallback } from "react";
import { AnalysisLoader } from "@/components/vibeprint/AnalysisLoader";
import { analyze } from "@/lib/vibeprint/analyze";
import { demoUser } from "@/lib/vibeprint/mockData";
import { saveProfile } from "@/lib/vibeprint/store";
import { toast } from "sonner";

export const Route = createFileRoute("/analyze")({
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

function AnalyzePage() {
  const navigate = useNavigate();

  const handleComplete = useCallback(() => {
    try {
      const analysis = analyze(demoUser);
      saveProfile(demoUser, analysis, "demo-user");
      navigate({ to: "/results" });
    } catch {
      toast.error("Analysis failed", { description: "Something broke while scoring your taste." });
      navigate({ to: "/connect" });
    }
  }, [navigate]);

  return <AnalysisLoader onComplete={handleComplete} />;
}
