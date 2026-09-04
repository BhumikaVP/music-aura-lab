import type { ShareProfile } from "@/lib/vibeprint/types";
import { ArchetypeReveal } from "./ArchetypeReveal";
import { GenreDNA } from "./GenreDNA";
import { MoodSpectrum } from "./MoodSpectrum";
import { AlterEgoCard } from "./AlterEgoCard";
import { PersonalityInsights } from "./PersonalityInsights";
import { ShareActions } from "./ShareActions";
import { Reveal } from "./Reveal";

export function ProfileView({ profile }: { profile: ShareProfile }) {
  const { analysis } = profile;
  return (
    <>
      <ArchetypeReveal analysis={analysis} />
      <GenreDNA analysis={analysis} />
      <MoodSpectrum mood={analysis.moodScores} />
      <AlterEgoCard analysis={analysis} />

      <section className="mx-auto mt-24 max-w-3xl px-5">
        <Reveal className="glass grid gap-8 rounded-3xl p-6 sm:grid-cols-2 sm:p-8">
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
              Top artists
            </p>
            <ol className="mt-4 space-y-2 text-sm">
              {analysis.topArtistNames.map((n, i) => (
                <li key={n} className="flex gap-3">
                  <span className="text-primary">{i + 1}</span>
                  <span className="text-foreground">{n}</span>
                </li>
              ))}
            </ol>
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
              Top tracks
            </p>
            <ol className="mt-4 space-y-2 text-sm">
              {analysis.topTrackNames.map((n, i) => (
                <li key={n} className="flex gap-3">
                  <span className="text-accent">{i + 1}</span>
                  <span className="text-foreground">{n}</span>
                </li>
              ))}
            </ol>
          </div>
        </Reveal>
      </section>

      <PersonalityInsights insights={analysis.insights} />
      <ShareActions
        analysis={analysis}
        displayName={profile.user.displayName}
        username={profile.username}
      />
    </>
  );
}
