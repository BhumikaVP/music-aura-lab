import { createFileRoute } from "@tanstack/react-router";
import {
  SESSION_COOKIE,
  STATE_COOKIE,
  exchangeCode,
  isSecureRequest,
  readCookie,
  redirectUri,
  serializeCookie,
  spotifyConfig,
} from "@/lib/vibeprint/spotify.server";

function fail(request: Request, reason: string) {
  return new Response(null, {
    status: 302,
    headers: {
      Location: new URL(`/connect?spotify_error=${reason}`, request.url).toString(),
      "Set-Cookie": serializeCookie(STATE_COOKIE, "", { maxAge: 0, secure: isSecureRequest(request) }),
    },
  });
}

export const Route = createFileRoute("/api/public/spotify/callback")({
  server: {
    handlers: {
      GET: async ({ request }) => {
        const url = new URL(request.url);
        if (url.searchParams.get("error")) return fail(request, "cancelled");

        const code = url.searchParams.get("code");
        const state = url.searchParams.get("state");
        const expected = readCookie(request, STATE_COOKIE);
        if (!code) return fail(request, "invalid");
        if (!state || !expected || state !== expected) return fail(request, "invalid_state");
        if (!spotifyConfig().configured) return fail(request, "not_configured");

        try {
          const session = await exchangeCode(code, redirectUri(request));
          const headers = new Headers();
          headers.append("Location", new URL("/analyze?source=spotify", request.url).toString());
          headers.append(
            "Set-Cookie",
            serializeCookie(SESSION_COOKIE, JSON.stringify(session), {
              maxAge: 60 * 60 * 24 * 30,
              secure: isSecureRequest(request),
            }),
          );
          headers.append(
            "Set-Cookie",
            serializeCookie(STATE_COOKIE, "", { maxAge: 0, secure: isSecureRequest(request) }),
          );
          return new Response(null, { status: 302, headers });
        } catch {
          return fail(request, "token_exchange");
        }
      },
    },
  },
});
