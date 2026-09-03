import type { Analysis, ShareProfile, SpotifyUser } from "./types";

const KEY = "vibeprint:profiles";
const CURRENT = "vibeprint:current";

function readAll(): Record<string, ShareProfile> {
  if (typeof window === "undefined") return {};
  try {
    return JSON.parse(window.localStorage.getItem(KEY) ?? "{}") as Record<string, ShareProfile>;
  } catch {
    return {};
  }
}

export function saveProfile(user: SpotifyUser, analysis: Analysis, username: string): ShareProfile {
  const profile: ShareProfile = {
    id: `${username}-${Date.now().toString(36)}`,
    username,
    createdAt: new Date().toISOString(),
    user: { displayName: user.displayName, profileImage: user.profileImage },
    analysis,
  };
  if (typeof window !== "undefined") {
    const all = readAll();
    all[username] = profile;
    window.localStorage.setItem(KEY, JSON.stringify(all));
    window.localStorage.setItem(CURRENT, username);
  }
  return profile;
}

export function getProfile(username: string): ShareProfile | null {
  return readAll()[username] ?? null;
}

export function getCurrentUsername(): string | null {
  if (typeof window === "undefined") return null;
  return window.localStorage.getItem(CURRENT);
}
