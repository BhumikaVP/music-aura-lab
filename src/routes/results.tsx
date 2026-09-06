import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Navbar } from "@/components/vibeprint/Navbar";
import { Footer } from "@/components/vibeprint/Footer";
import { ProfileView } from "@/components/vibeprint/ProfileView";
import { getCurrentUsername, getProfile } from "@/lib/vibeprint/store";
import type { ShareProfile } from "@/lib/vibeprint/types";

export const Route = createFileRoute("/results")({
  head: () => ({
    meta: [
      { title: "Your VibePrint results — music personality profile" },
      {
        name: "description",
        content:
          "See your listening archetype, music DNA, mood spectrum, alter ego and personalized insights.",
      },
      { property: "og:title", content: "Your VibePrint results" },
      {
        property: "og:description",
        content: "Your listening archetype, music DNA, mood spectrum and alter ego, decoded.",
      },
    ],
  }),
  component: ResultsPage,
});

function ResultsPage() {
  const navigate = useNavigate();
  const [profile, setProfile] = useState<ShareProfile | null>(null);
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    const username = getCurrentUsername();
    const found = username ? getProfile(username) : null;
    if (!found) {
      navigate({ to: "/connect" });
      return;
    }
    setProfile(found);
    setChecked(true);
  }, [navigate]);

  return (
    <div className="min-h-screen">
      <Navbar />
      {checked && profile ? (
        <main className="pb-10">
          <ProfileView profile={profile} />
        </main>
      ) : (
        <main className="flex min-h-[60vh] items-center justify-center px-5">
          <p className="text-sm text-muted-foreground">Loading your VibePrint…</p>
        </main>
      )}
      <Footer />
    </div>
  );
}
