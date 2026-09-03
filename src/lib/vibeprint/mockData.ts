import type { SpotifyArtist, SpotifyTrack, SpotifyUser, AudioFeatures } from "./types";

const art = (
  id: string,
  name: string,
  genres: string[],
  popularity: number,
  hue: number,
): SpotifyArtist => ({
  id,
  name,
  genres,
  popularity,
  image: swatch(hue),
});

/** Inline SVG gradient swatch — no external image requests, always renders. */
function swatch(hue: number) {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="160" height="160"><defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="hsl(${hue},85%,62%)"/><stop offset="100%" stop-color="hsl(${(hue + 60) % 360},85%,45%)"/></linearGradient></defs><rect width="160" height="160" fill="url(#g)"/><circle cx="80" cy="80" r="26" fill="rgba(0,0,0,.35)"/><circle cx="80" cy="80" r="7" fill="rgba(255,255,255,.85)"/></svg>`;
  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
}

export const artworkFor = swatch;

const f = (
  energy: number,
  danceability: number,
  valence: number,
  acousticness: number,
  instrumentalness: number,
  tempo: number,
): AudioFeatures => ({ energy, danceability, valence, acousticness, instrumentalness, tempo });

const trk = (
  id: string,
  name: string,
  artist: string,
  album: string,
  popularity: number,
  releaseYear: number,
  playedAtHour: number,
  features: AudioFeatures,
  hue: number,
): SpotifyTrack => ({
  id,
  name,
  artist,
  album,
  albumImage: swatch(hue),
  popularity,
  releaseYear,
  playedAtHour,
  features,
});

export const demoArtists: SpotifyArtist[] = [
  art("a1", "Phoebe Bridgers", ["indie", "indie folk", "alternative"], 78, 268),
  art("a2", "Arctic Monkeys", ["indie rock", "rock", "alternative"], 89, 14),
  art("a3", "The Weeknd", ["pop", "r&b", "alternative r&b"], 96, 320),
  art("a4", "Bonobo", ["electronic", "downtempo", "chillhop"], 66, 190),
  art("a5", "Mitski", ["indie", "art pop", "alternative"], 74, 340),
  art("a6", "Tame Impala", ["psychedelic rock", "indie", "electronic"], 85, 40),
  art("a7", "SZA", ["r&b", "pop", "neo soul"], 91, 300),
  art("a8", "Khruangbin", ["psychedelic", "funk", "world"], 70, 160),
  art("a9", "Radiohead", ["alternative", "rock", "art rock"], 82, 210),
  art("a10", "Jorja Smith", ["r&b", "soul", "uk soul"], 76, 285),
  art("a11", "Rosalía", ["pop", "flamenco", "latin"], 84, 10),
  art("a12", "Four Tet", ["electronic", "idm", "ambient"], 63, 130),
];

export const demoTracks: SpotifyTrack[] = [
  trk("t1", "Motion Sickness", "Phoebe Bridgers", "Stranger in the Alps", 74, 2017, 1, f(0.44, 0.5, 0.33, 0.62, 0.02, 116), 268),
  trk("t2", "505", "Arctic Monkeys", "Favourite Worst Nightmare", 92, 2007, 2, f(0.72, 0.52, 0.28, 0.11, 0.05, 140), 14),
  trk("t3", "After Hours", "The Weeknd", "After Hours", 88, 2020, 23, f(0.57, 0.66, 0.14, 0.09, 0.01, 108), 320),
  trk("t4", "Kerala", "Bonobo", "Migration", 61, 2017, 0, f(0.55, 0.6, 0.32, 0.34, 0.72, 120), 190),
  trk("t5", "Nobody", "Mitski", "Be the Cowboy", 79, 2018, 22, f(0.63, 0.72, 0.45, 0.24, 0.0, 122), 340),
  trk("t6", "Let It Happen", "Tame Impala", "Currents", 83, 2015, 21, f(0.79, 0.63, 0.42, 0.05, 0.31, 121), 40),
  trk("t7", "Good Days", "SZA", "Good Days", 86, 2020, 20, f(0.42, 0.44, 0.4, 0.55, 0.0, 122), 300),
  trk("t8", "August 10", "Khruangbin", "Mordechai", 62, 2020, 3, f(0.48, 0.71, 0.5, 0.31, 0.44, 104), 160),
  trk("t9", "Weird Fishes", "Radiohead", "In Rainbows", 78, 2007, 1, f(0.66, 0.51, 0.22, 0.16, 0.4, 148), 210),
  trk("t10", "Blue Lights", "Jorja Smith", "Lost & Found", 71, 2018, 23, f(0.4, 0.68, 0.36, 0.42, 0.0, 96), 285),
  trk("t11", "MALAMENTE", "Rosalía", "El Mal Querer", 74, 2018, 19, f(0.61, 0.79, 0.55, 0.28, 0.0, 98), 10),
  trk("t12", "Two Thousand and Seventeen", "Four Tet", "New Energy", 55, 2017, 2, f(0.38, 0.42, 0.3, 0.66, 0.85, 92), 130),
  trk("t13", "Cornerstone", "Arctic Monkeys", "Humbug", 80, 2009, 0, f(0.4, 0.6, 0.44, 0.58, 0.0, 118), 20),
  trk("t14", "Kyoto", "Phoebe Bridgers", "Punisher", 77, 2020, 18, f(0.7, 0.55, 0.5, 0.22, 0.0, 136), 258),
  trk("t15", "The Less I Know The Better", "Tame Impala", "Currents", 94, 2015, 22, f(0.74, 0.64, 0.79, 0.01, 0.01, 117), 44),
  trk("t16", "Snooze", "SZA", "SOS", 90, 2022, 21, f(0.5, 0.55, 0.42, 0.4, 0.0, 143), 305),
  trk("t17", "Time Moves Slow", "BADBADNOTGOOD", "IV", 68, 2016, 1, f(0.35, 0.58, 0.24, 0.53, 0.12, 82), 175),
  trk("t18", "Everything In Its Right Place", "Radiohead", "Kid A", 76, 2000, 2, f(0.52, 0.4, 0.1, 0.28, 0.6, 100), 215),
  trk("t19", "Sunset Lover", "Petit Biscuit", "Petit Biscuit", 81, 2015, 23, f(0.45, 0.62, 0.35, 0.36, 0.55, 92), 200),
  trk("t20", "Genesis", "Grimes", "Visions", 72, 2012, 20, f(0.6, 0.66, 0.45, 0.1, 0.2, 122), 290),
];

export function averageFeatures(tracks: SpotifyTrack[]): AudioFeatures {
  const n = tracks.length || 1;
  const sum = tracks.reduce(
    (acc, t) => ({
      energy: acc.energy + t.features.energy,
      danceability: acc.danceability + t.features.danceability,
      valence: acc.valence + t.features.valence,
      acousticness: acc.acousticness + t.features.acousticness,
      instrumentalness: acc.instrumentalness + t.features.instrumentalness,
      tempo: acc.tempo + t.features.tempo,
    }),
    f(0, 0, 0, 0, 0, 0),
  );
  return {
    energy: sum.energy / n,
    danceability: sum.danceability / n,
    valence: sum.valence / n,
    acousticness: sum.acousticness / n,
    instrumentalness: sum.instrumentalness / n,
    tempo: sum.tempo / n,
  };
}

export const demoUser: SpotifyUser = {
  id: "demo-user",
  spotifyId: "demo-user",
  displayName: "Demo Listener",
  profileImage: swatch(285),
  topArtists: demoArtists,
  topTracks: demoTracks,
  genres: Array.from(new Set(demoArtists.flatMap((a) => a.genres))),
  audioFeatures: averageFeatures(demoTracks),
};
