/**
 * Server-only Spotify helpers. This module must never be imported from client
 * code — it reads SPOTIFY_CLIENT_SECRET from the server environment.
 */
import type { AudioFeatures, SpotifyArtist, SpotifyTrack, SpotifyUser } from "./types";

export const SPOTIFY_SCOPES = ["user-top-read", "user-read-recently-played"] as const;

export const SESSION_COOKIE = "vp_sp";
export const STATE_COOKIE = "vp_sp_state";

export interface SpotifySession {
  accessToken: string;
  refreshToken?: string;
  expiresAt: number;
}

export class SpotifyError extends Error {
  code:
    | "not_configured"
    | "unauthenticated"
    | "expired"
    | "rate_limited"
    | "no_data"
    | "api_error";
  constructor(code: SpotifyError["code"], message: string) {
    super(message);
    this.code = code;
  }
}

export function spotifyConfig() {
  const clientId = process.env["SPOTIFY_CLIENT_ID"];
  const clientSecret = process.env["SPOTIFY_CLIENT_SECRET"];
  return { clientId, clientSecret, configured: Boolean(clientId && clientSecret) };
}

export function redirectUri(request: Request): string {
  const fromEnv = process.env["SPOTIFY_REDIRECT_URI"];
  if (fromEnv) return fromEnv;
  const url = new URL(request.url);
  return `${url.origin}/api/public/spotify/callback`;
}

/* ---------------- cookies ---------------- */

export function readCookie(request: Request, name: string): string | null {
  const header = request.headers.get("cookie");
  if (!header) return null;
  for (const part of header.split(";")) {
    const [k, ...rest] = part.trim().split("=");
    if (k === name) return decodeURIComponent(rest.join("="));
  }
  return null;
}

export function serializeCookie(
  name: string,
  value: string,
  opts: { maxAge: number; secure: boolean },
): string {
  return [
    `${name}=${encodeURIComponent(value)}`,
    "Path=/",
    "HttpOnly",
    "SameSite=Lax",
    opts.secure ? "Secure" : "",
    `Max-Age=${opts.maxAge}`,
  ]
    .filter(Boolean)
    .join("; ");
}

export function isSecureRequest(request: Request): boolean {
  return new URL(request.url).protocol === "https:";
}

export function readSession(request: Request): SpotifySession | null {
  const raw = readCookie(request, SESSION_COOKIE);
  if (!raw) return null;
  try {
    const parsed = JSON.parse(raw) as SpotifySession;
    if (!parsed.accessToken) return null;
    return parsed;
  } catch {
    return null;
  }
}

/* ---------------- token exchange ---------------- */

async function tokenRequest(body: URLSearchParams): Promise<SpotifySession> {
  const { clientId, clientSecret } = spotifyConfig();
  if (!clientId || !clientSecret) throw new SpotifyError("not_configured", "Spotify not configured");
  const res = await fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization: `Basic ${btoa(`${clientId}:${clientSecret}`)}`,
    },
    body,
  });
  if (!res.ok) {
    // Never surface the raw body (may echo credentials) — log status only.
    console.error("Spotify token request failed with status", res.status);
    throw new SpotifyError("api_error", "Token exchange failed");
  }
  const json = (await res.json()) as {
    access_token: string;
    refresh_token?: string;
    expires_in: number;
  };
  return {
    accessToken: json.access_token,
    ...(json.refresh_token ? { refreshToken: json.refresh_token } : {}),
    expiresAt: Date.now() + (json.expires_in ?? 3600) * 1000,
  };
}

export function exchangeCode(code: string, redirect: string) {
  return tokenRequest(
    new URLSearchParams({ grant_type: "authorization_code", code, redirect_uri: redirect }),
  );
}

export function refreshSession(refreshToken: string) {
  return tokenRequest(new URLSearchParams({ grant_type: "refresh_token", refresh_token: refreshToken }));
}

/* ---------------- api ---------------- */

async function api<T>(path: string, token: string): Promise<T | null> {
  const res = await fetch(`https://api.spotify.com/v1${path}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (res.status === 401) throw new SpotifyError("expired", "Spotify session expired");
  if (res.status === 429) throw new SpotifyError("rate_limited", "Spotify is rate limiting us");
  if (res.status === 403 || res.status === 404) return null; // deprecated / unavailable endpoints
  if (!res.ok) {
    console.error("Spotify API error", path, res.status);
    throw new SpotifyError("api_error", "Spotify request failed");
  }
  return (await res.json()) as T;
}

/* --------- deterministic fallback audio features --------- */

function hash(s: string): number {
  let h = 2166136261;
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return Math.abs(h);
}
const unit = (s: string, salt: string) => ((hash(s + salt) % 1000) / 1000) as number;

const GENRE_HINTS: { match: string[]; energy: number; valence: number; dance: number; acoustic: number }[] = [
  { match: ["metal", "punk", "hardcore", "drill"], energy: 0.9, valence: 0.4, dance: 0.5, acoustic: 0.05 },
  { match: ["house", "techno", "edm", "dance", "electro"], energy: 0.85, valence: 0.65, dance: 0.85, acoustic: 0.05 },
  { match: ["hip hop", "rap", "trap"], energy: 0.7, valence: 0.55, dance: 0.8, acoustic: 0.1 },
  { match: ["pop", "k-pop", "j-pop"], energy: 0.7, valence: 0.7, dance: 0.72, acoustic: 0.15 },
  { match: ["r&b", "soul", "funk"], energy: 0.55, valence: 0.6, dance: 0.7, acoustic: 0.2 },
  { match: ["ambient", "lo-fi", "lofi", "classical", "folk", "acoustic"], energy: 0.25, valence: 0.45, dance: 0.3, acoustic: 0.8 },
  { match: ["jazz", "bossa"], energy: 0.4, valence: 0.55, dance: 0.5, acoustic: 0.6 },
  { match: ["indie", "alternative", "rock"], energy: 0.6, valence: 0.5, dance: 0.5, acoustic: 0.3 },
];

function featuresFor(seed: string, genres: string[], popularity: number): AudioFeatures {
  const g = genres.join(" ").toLowerCase();
  const hint = GENRE_HINTS.find((h) => h.match.some((m) => g.includes(m)));
  const base = hint ?? { energy: 0.55, valence: 0.5, dance: 0.55, acoustic: 0.3 };
  const jitter = (salt: string) => (unit(seed, salt) - 0.5) * 0.24;
  const c = (n: number) => Math.min(1, Math.max(0, Number.isFinite(n) ? n : 0.5));
  return {
    energy: c(base.energy + jitter("e")),
    danceability: c(base.dance + jitter("d")),
    valence: c(base.valence + jitter("v") + (popularity / 100 - 0.5) * 0.1),
    acousticness: c(base.acoustic + jitter("a")),
    instrumentalness: c(unit(seed, "i") * 0.3),
    tempo: 80 + unit(seed, "t") * 80,
  };
}

/* ---------------- mapping ---------------- */

interface RawArtist {
  id: string;
  name: string;
  genres?: string[];
  popularity?: number;
  images?: { url: string }[];
}
interface RawTrack {
  id: string;
  name: string;
  popularity?: number;
  artists: { id: string; name: string }[];
  album: { name: string; release_date?: string; images?: { url: string }[] };
}

export async function fetchSpotifyUser(token: string): Promise<SpotifyUser> {
  const [me, artistsRes, tracksRes, recentRes] = await Promise.all([
    api<{ id: string; display_name?: string; images?: { url: string }[] }>("/me", token),
    api<{ items: RawArtist[] }>("/me/top/artists?limit=20&time_range=medium_term", token),
    api<{ items: RawTrack[] }>("/me/top/tracks?limit=30&time_range=medium_term", token),
    api<{ items: { played_at: string; track: { id: string } }[] }>(
      "/me/player/recently-played?limit=50",
      token,
    ).catch(() => null),
  ]);

  const rawArtists = artistsRes?.items ?? [];
  const rawTracks = tracksRes?.items ?? [];
  if (rawArtists.length === 0 && rawTracks.length === 0) {
    throw new SpotifyError("no_data", "Not enough listening history yet");
  }

  const topArtists: SpotifyArtist[] = rawArtists.map((a) => ({
    id: a.id,
    name: a.name,
    genres: a.genres?.length ? a.genres : ["pop"],
    popularity: a.popularity ?? 50,
    image: a.images?.[0]?.url ?? "",
  }));

  const genreByArtistId = new Map(topArtists.map((a) => [a.id, a.genres]));
  const allGenres = Array.from(new Set(topArtists.flatMap((a) => a.genres)));

  const playedHours = new Map<string, number>();
  for (const item of recentRes?.items ?? []) {
    if (item.track?.id && !playedHours.has(item.track.id)) {
      const d = new Date(item.played_at);
      if (!Number.isNaN(d.getTime())) playedHours.set(item.track.id, d.getUTCHours());
    }
  }

  const topTracks: SpotifyTrack[] = rawTracks.map((t) => {
    const genres = t.artists.flatMap((a) => genreByArtistId.get(a.id) ?? []);
    const pop = t.popularity ?? 50;
    const year = Number.parseInt(t.album?.release_date?.slice(0, 4) ?? "", 10);
    return {
      id: t.id,
      name: t.name,
      artist: t.artists[0]?.name ?? "Unknown",
      album: t.album?.name ?? "",
      albumImage: t.album?.images?.[0]?.url ?? "",
      popularity: pop,
      releaseYear: Number.isFinite(year) ? year : 2020,
      playedAtHour: playedHours.get(t.id) ?? Math.floor(unit(t.id, "h") * 24),
      features: featuresFor(t.id, genres.length ? genres : allGenres, pop),
    };
  });

  const avg = topTracks.length
    ? topTracks.reduce(
        (acc, t) => ({
          energy: acc.energy + t.features.energy / topTracks.length,
          danceability: acc.danceability + t.features.danceability / topTracks.length,
          valence: acc.valence + t.features.valence / topTracks.length,
          acousticness: acc.acousticness + t.features.acousticness / topTracks.length,
          instrumentalness: acc.instrumentalness + t.features.instrumentalness / topTracks.length,
          tempo: acc.tempo + t.features.tempo / topTracks.length,
        }),
        { energy: 0, danceability: 0, valence: 0, acousticness: 0, instrumentalness: 0, tempo: 0 },
      )
    : featuresFor(me?.id ?? "user", allGenres, 50);

  return {
    id: me?.id ?? "spotify-user",
    spotifyId: me?.id ?? "spotify-user",
    displayName: me?.display_name || "Spotify Listener",
    profileImage: me?.images?.[0]?.url ?? "",
    topArtists,
    topTracks,
    genres: allGenres,
    audioFeatures: avg,
  };
}
