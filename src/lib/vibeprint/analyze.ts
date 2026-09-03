import { ARCHETYPES } from "./archetypes";
import { averageFeatures } from "./mockData";
import type { Analysis, GenreSlice, Insight, MoodScores, SpotifyUser } from "./types";

const clamp = (n: number, min = 0, max = 1) => Math.min(max, Math.max(min, n));
const pct = (n: number) => Math.round(clamp(n) * 100);

const GENRE_BUCKETS: Record<string, string[]> = {
  Pop: ["pop", "art pop", "dance pop", "synthpop"],
  Indie: ["indie", "indie folk", "indie rock", "bedroom pop"],
  Rock: ["rock", "psychedelic rock", "art rock", "punk", "metal", "grunge"],
  Alternative: ["alternative", "alternative r&b", "experimental"],
  Electronic: ["electronic", "idm", "ambient", "downtempo", "house", "techno", "chillhop"],
  "R&B": ["r&b", "soul", "neo soul", "uk soul", "funk"],
  "Hip-Hop": ["hip hop", "rap", "trap", "drill"],
  Latin: ["latin", "flamenco", "reggaeton"],
  World: ["world", "afrobeat", "k-pop", "j-pop", "bossa nova", "psychedelic"],
  Jazz: ["jazz", "lo-fi", "lofi"],
};

function bucketOf(genre: string): string {
  const g = genre.toLowerCase();
  for (const [bucket, keys] of Object.entries(GENRE_BUCKETS)) {
    if (keys.some((k) => g.includes(k))) return bucket;
  }
  return "Other";
}

export function buildGenreDNA(user: SpotifyUser): GenreSlice[] {
  const counts = new Map<string, number>();
  user.topArtists.forEach((a, i) => {
    const weight = 1 + (user.topArtists.length - i) / user.topArtists.length;
    a.genres.forEach((g) => {
      const b = bucketOf(g);
      counts.set(b, (counts.get(b) ?? 0) + weight);
    });
  });
  const total = Array.from(counts.values()).reduce((a, b) => a + b, 0) || 1;
  const slices = Array.from(counts.entries())
    .map(([name, v]) => ({ name, percent: Math.round((v / total) * 100) }))
    .sort((a, b) => b.percent - a.percent)
    .slice(0, 5);
  // normalize to 100
  const sum = slices.reduce((a, s) => a + s.percent, 0);
  const first = slices[0];
  if (first && sum !== 100) first.percent += 100 - sum;
  return slices;
}

export function buildMood(user: SpotifyUser): MoodScores {
  const feat = user.topTracks.length ? averageFeatures(user.topTracks) : user.audioFeatures;
  const variance =
    user.topTracks.reduce((acc, t) => acc + Math.abs(t.features.valence - feat.valence), 0) /
    (user.topTracks.length || 1);
  return {
    energy: pct(feat.energy),
    happiness: pct(feat.valence),
    danceability: pct(feat.danceability),
    calmness: pct(1 - feat.energy * 0.7 + feat.acousticness * 0.4),
    emotionalIntensity: pct(0.35 + variance * 1.2 + (1 - feat.valence) * 0.4),
  };
}

interface Signals {
  energy: number;
  valence: number;
  dance: number;
  acoustic: number;
  instrumental: number;
  tempo: number;
  lateNight: number;
  diversity: number;
  popularity: number;
  oldness: number;
  artistLoyalty: number;
  moodRange: number;
  rockness: number;
  romance: number;
  globalness: number;
  altness: number;
}

function signals(user: SpotifyUser): Signals {
  const feat = user.topTracks.length ? averageFeatures(user.topTracks) : user.audioFeatures;
  const tracks = user.topTracks;
  const n = tracks.length || 1;
  const lateNight = tracks.filter((t) => t.playedAtHour >= 21 || t.playedAtHour <= 4).length / n;
  const uniqueGenres = new Set(user.topArtists.flatMap((a) => a.genres.map((g) => g.toLowerCase())));
  const diversity = clamp(uniqueGenres.size / 24);
  const popularity = tracks.reduce((a, t) => a + t.popularity, 0) / n / 100;
  const year = new Date().getFullYear();
  const oldness = clamp(
    tracks.reduce((a, t) => a + clamp((year - t.releaseYear) / 25), 0) / n,
  );
  const uniqueArtists = new Set(tracks.map((t) => t.artist)).size;
  const artistLoyalty = clamp(1 - uniqueArtists / n);
  const moodRange = clamp(
    (tracks.reduce((a, t) => a + Math.abs(t.features.valence - feat.valence), 0) / n) * 3,
  );
  const genreText = Array.from(uniqueGenres).join(" ");
  const has = (...keys: string[]) =>
    clamp(keys.filter((k) => genreText.includes(k)).length / keys.length + 0.0);
  return {
    energy: feat.energy,
    valence: feat.valence,
    dance: feat.danceability,
    acoustic: feat.acousticness,
    instrumental: feat.instrumentalness,
    tempo: clamp((feat.tempo - 70) / 90),
    lateNight,
    diversity,
    popularity,
    oldness,
    artistLoyalty,
    moodRange,
    rockness: has("rock", "punk", "metal", "grunge"),
    romance: has("r&b", "soul", "neo soul"),
    globalness: has("latin", "world", "flamenco", "k-pop", "afrobeat"),
    altness: has("alternative", "indie", "experimental", "art"),
  };
}

const SCORERS: Record<string, (s: Signals) => number> = {
  dreamer: (s) => s.acoustic * 1.6 + (1 - s.energy) * 1.2 + s.valence * 0.5 + s.instrumental * 0.4,
  "midnight-architect": (s) =>
    s.lateNight * 1.9 + s.altness * 1.2 + (1 - s.valence) * 0.8 + s.moodRange * 0.4,
  explorer: (s) => s.diversity * 2.2 + (1 - s.artistLoyalty) * 0.9,
  "hype-machine": (s) => s.energy * 1.7 + s.dance * 1.2 + s.tempo * 0.7 + s.valence * 0.5,
  "nostalgic-soul": (s) => s.oldness * 1.9 + s.artistLoyalty * 1.3 + s.acoustic * 0.4,
  rebel: (s) => s.rockness * 1.9 + s.energy * 0.9 + (1 - s.popularity) * 0.5,
  "mood-curator": (s) => s.moodRange * 2.0 + s.diversity * 0.7 + s.dance * 0.3,
  "trend-rider": (s) => s.popularity * 2.1 + (1 - s.oldness) * 0.9 + s.dance * 0.4,
  romantic: (s) => s.romance * 1.8 + (1 - s.energy) * 0.6 + s.valence * 0.4 + s.moodRange * 0.5,
  "sonic-nomad": (s) => s.globalness * 1.8 + s.diversity * 1.3 + s.instrumental * 0.4,
};

function insightsFor(user: SpotifyUser, s: Signals, mood: MoodScores, dna: GenreSlice[]): Insight[] {
  const top = dna[0]?.name ?? "your favorite genre";
  const topArtist = user.topArtists[0]?.name ?? "your top artist";
  const list: Insight[] = [
    {
      title: "Your music superpower",
      body:
        s.diversity > 0.6
          ? "Finding beauty in songs nobody else has discovered yet."
          : s.energy > 0.65
            ? "Turning an ordinary Tuesday into a montage."
            : "Making other people feel understood through a single share.",
    },
    {
      title: "Your main character energy",
      body:
        s.lateNight > 0.5
          ? "Walking through a city at midnight with headphones on."
          : s.valence > 0.6
            ? "Windows down, sun out, absolutely no notes."
            : "Staring out of a train window like the credits are rolling.",
    },
    {
      title: "Your musical red flag",
      body:
        s.artistLoyalty > 0.35
          ? `You say you listen to everything. ${topArtist} is on 40% of your queue.`
          : "You say you listen to everything. Your Spotify history disagrees.",
    },
    {
      title: "Your perfect soundtrack",
      body:
        mood.calmness > 55
          ? "Rain on a window + one cup of something warm + a song you've never skipped."
          : "Rainy evenings + neon lights + one emotionally devastating song.",
    },
    {
      title: "Your music age",
      body:
        s.oldness > 0.45
          ? `Your taste feels ${Math.round(4 + s.oldness * 8)} years older than your actual age.`
          : `Your taste feels ${Math.round(2 + (1 - s.oldness) * 5)} years younger than your actual age.`,
    },
    {
      title: "Your genre home base",
      body: `${top} is where you always come back to — even after a detour through ${dna[2]?.name ?? dna[1]?.name ?? "everything else"}.`,
    },
  ];
  return list;
}

export function analyze(user: SpotifyUser): Analysis {
  const s = signals(user);
  const raw = ARCHETYPES.map((a) => ({ a, score: SCORERS[a.id]?.(s) ?? 0 }));
  const max = Math.max(...raw.map((r) => r.score), 0.0001);
  const scored = raw
    .map((r) => ({ ...r, norm: r.score / max }))
    .sort((x, y) => y.norm - x.norm);

  const winner = scored[0]!;
  const gap = winner.norm - (scored[1]?.norm ?? 0);
  const confidence = Math.round(clamp(0.68 + gap * 0.8 + s.diversity * 0.05) * 100);

  const dna = buildGenreDNA(user);
  const mood = buildMood(user);
  const arche = winner.a;

  const alterEgoDescription = `${arche.description} Your rotation leans ${dna[0]?.name ?? "eclectic"}${
    dna[1] ? ` with a strong ${dna[1].name} undercurrent` : ""
  }, and ${
    s.lateNight > 0.5 ? "most of it happens after dark" : "you play it loudest in daylight"
  }. Energy sits at ${mood.energy}% while emotional intensity runs ${mood.emotionalIntensity}% — that combination is rarer than you think.`;

  return {
    archetype: arche,
    archetypeScore: Math.min(confidence, 98),
    runnerUps: scored.slice(1, 4).map((r) => ({
      name: r.a.name,
      score: Math.round(r.norm * (confidence - 6)),
    })),
    genreDNA: dna,
    genreCount: new Set(user.topArtists.flatMap((a) => a.genres)).size,
    genreDiversity: Math.round(clamp(s.diversity * 1.15) * 100),
    moodScores: mood,
    traits: arche.traits,
    alterEgoName: arche.name,
    alterEgoTagline: arche.tagline,
    alterEgoDescription,
    soundtrack: arche.soundtrack,
    insights: insightsFor(user, s, mood, dna).slice(0, 6),
    topArtistNames: user.topArtists.slice(0, 5).map((a) => a.name),
    topTrackNames: user.topTracks.slice(0, 5).map((t) => `${t.name} — ${t.artist}`),
  };
}
