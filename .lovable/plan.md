# VibePrint — finish the build

The data layer, design system, connect screen and analysis screen are in place. Remaining work is the visual payoff: the landing page, results page, share card and public profile.

## Components to add

- `ArchetypeReveal` — animated reveal of the winning archetype: gradient badge, name, tagline, confidence ring, runner-up bars.
- `GenreDNA` — animated horizontal DNA bars / donut of the top 5 genre slices, plus genre count and diversity score.
- `MoodSpectrum` — five animated meters (energy, happiness, danceability, calmness, emotional intensity) with counters.
- `AlterEgoCard` — glass card with alter-ego name, tagline, description, traits chips and soundtrack line.
- `PersonalityInsights` — six insight cards revealed on scroll.
- `ShareCard` — 1080x1920 vertical card (rendered offscreen, scaled preview) with archetype, top genres, mood highlights and VibePrint branding.
- `ShareActions` — download PNG via html-to-image, Web Share API with clipboard fallback for the profile link.
- `FloatingVisual` — animated hero orb/vinyl artwork for the landing page.

## Routes

- Rewrite `src/routes/index.tsx` as the landing page: hero with headline, floating visual, primary "Connect Spotify" + "Try Demo" CTAs, the 10 archetypes preview grid, how-it-works steps, sample share card, footer.
- `src/routes/results.tsx` — loads the saved profile from local storage, renders reveal → DNA → mood → alter ego → insights → share; redirects to `/connect` when nothing is stored.
- `src/routes/profile.$username.tsx` — public read-only profile with the same sections, plus a "make your own" CTA and a not-found state for unknown usernames.

## Polish

- Mount `<Toaster />` once in `__root.tsx`, add the Google Fonts `<link>` tags there, and replace the template title/description with VibePrint metadata.
- Per-route `head()` metadata on index, results and profile.
- Mobile-first responsive passes on every new section; respect reduced motion.
- Empty/error states: no stored profile, unknown username, share unsupported, export failure.

## Verification

Run the full flow in a headless browser: landing → demo → analysis animation → results → download PNG → copy share link → open public profile. Confirm no console errors and typecheck passes.
