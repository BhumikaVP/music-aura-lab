import { createServerFn } from "@tanstack/react-start";
import { getRequest, setResponseHeader } from "@tanstack/react-start/server";
import type { SpotifyUser } from "./types";

export const getSpotifyStatus = createServerFn({ method: "GET" }).handler(async () => {
  const { spotifyConfig, readSession } = await import("./spotify.server");
  const request = getRequest();
  return {
    configured: spotifyConfig().configured,
    connected: Boolean(readSession(request)),
  };
});

export type SpotifyFetchResult =
  | { ok: true; user: SpotifyUser }
  | { ok: false; code: string };

export const getSpotifyUserData = createServerFn({ method: "POST" }).handler(
  async (): Promise<SpotifyFetchResult> => {
    const {
      SESSION_COOKIE,
      SpotifyError,
      fetchSpotifyUser,
      isSecureRequest,
      readSession,
      refreshSession,
      serializeCookie,
      spotifyConfig,
    } = await import("./spotify.server");

    const request = getRequest();
    if (!spotifyConfig().configured) return { ok: false, code: "not_configured" };

    let session = readSession(request);
    if (!session) return { ok: false, code: "unauthenticated" };

    try {
      if (session.expiresAt <= Date.now() + 30_000) {
        if (!session.refreshToken) return { ok: false, code: "expired" };
        const refreshed = await refreshSession(session.refreshToken);
        session = { ...refreshed, refreshToken: refreshed.refreshToken ?? session.refreshToken };
        setResponseHeader(
          "Set-Cookie",
          serializeCookie(SESSION_COOKIE, JSON.stringify(session), {
            maxAge: 60 * 60 * 24 * 30,
            secure: isSecureRequest(request),
          }),
        );
      }
      const user = await fetchSpotifyUser(session.accessToken);
      return { ok: true, user };
    } catch (error) {
      if (error instanceof SpotifyError) return { ok: false, code: error.code };
      console.error("Unexpected Spotify failure");
      return { ok: false, code: "api_error" };
    }
  },
);

export const disconnectSpotify = createServerFn({ method: "POST" }).handler(async () => {
  const { SESSION_COOKIE, isSecureRequest, serializeCookie } = await import("./spotify.server");
  setResponseHeader(
    "Set-Cookie",
    serializeCookie(SESSION_COOKIE, "", { maxAge: 0, secure: isSecureRequest(getRequest()) }),
  );
  return { ok: true };
});
