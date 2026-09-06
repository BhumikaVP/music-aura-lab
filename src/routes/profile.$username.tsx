import { createFileRoute, Link, useParams } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Navbar } from "@/components/vibeprint/Navbar";
import { Footer } from "@/components/vibeprint/Footer";
import { ProfileView } from "@/components/vibeprint/ProfileView";
import { getProfile } from "@/lib/vibeprint/store";
import type { ShareProfile } from "@/lib/vibeprint/types";

export const Route = createFileRoute("/profile/$username")({
  head: () => ({
    meta: [
      { title: "A VibePrint music personality profile" },
      {
        name: "description",
        content: "A shared VibePrint profile: listening archetype, music DNA, moods and alter ego.",
      },
      { property: "og:title", content: "A VibePrint music personality profile" },
      {
        property: "og:description",
        content: "See someone's listening archetype and make your own VibePrint in seconds.",
      },
    ],
  }),
  component: PublicProfilePage,
});

function PublicProfilePage() {
  const { username } = useParams({ from: "/profile/$username" });
  const [profile, setProfile] = useState<ShareProfile | null>(null);
  const [status, setStatus] = useState<"loading" | "found" | "missing">("loading");

  useEffect(() => {
    const found = getProfile(username);
    if (found) {
      setProfile(found);
      setStatus("found");
    } else {
      setStatus("missing");
    }
  }, [username]);

  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="pb-10">
        {status === "loading" && (
          <div className="flex min-h-[60vh] items-center justify-center px-5">
            <p className="text-sm text-muted-foreground">Loading profile…</p>
          </div>
        )}

        {status === "missing" && (
          <div className="mx-auto flex min-h-[60vh] max-w-md flex-col items-center justify-center px-5 text-center">
            <h1 className="font-display text-3xl font-bold">Profile not found</h1>
            <p className="mt-3 text-sm text-muted-foreground">
              We couldn't find a VibePrint for “{username}”. Profiles are stored on the device that
              created them.
            </p>
            <Link
              to="/connect"
              className="bg-vibe mt-8 rounded-full px-6 py-3 text-sm font-semibold text-background"
            >
              Make your own VibePrint
            </Link>
          </div>
        )}

        {status === "found" && profile && (
          <>
            <ProfileView profile={profile} />
            <section className="mx-auto mt-20 max-w-2xl px-5 text-center">
              <h2 className="font-display text-2xl font-bold">Curious about your own vibe?</h2>
              <p className="mt-3 text-sm text-muted-foreground">
                Get your listening archetype, music DNA and alter ego in under a minute.
              </p>
              <Link
                to="/connect"
                className="bg-vibe mt-6 inline-block rounded-full px-6 py-3 text-sm font-semibold text-background"
              >
                Create my VibePrint
              </Link>
            </section>
          </>
        )}
      </main>
      <Footer />
    </div>
  );
}
