import { createFileRoute } from "@tanstack/react-router";
import {
  SPOTIFY_SCOPES,
  STATE_COOKIE,
  isSecureRequest,
  redirectUri,
  serializeCookie,
  spotifyConfig,
} from "@/lib/vibeprint/spotify.server";

export const Route = createFileRoute("/api/public/spotify/login")({
  server: {
    handlers: {
      GET: async ({ request }) => {
        const { clientId, configured } = spotifyConfig();
        if (!configured || !clientId) {
          return Response.redirect(
            new URL("/connect?spotify_error=not_configured", request.url).toString(),
            302,
          );
        }
        const state = crypto.randomUUID();
        const params = new URLSearchParams({
          response_type: "code",
          client_id: clientId,
          scope: SPOTIFY_SCOPES.join(" "),
          redirect_uri: redirectUri(request),
          state,
          show_dialog: "false",
        });
        return new Response(null, {
          status: 302,
          headers: {
            Location: `https://accounts.spotify.com/authorize?${params.toString()}`,
            "Set-Cookie": serializeCookie(STATE_COOKIE, state, {
              maxAge: 600,
              secure: isSecureRequest(request),
            }),
          },
        });
      },
    },
  },
});
