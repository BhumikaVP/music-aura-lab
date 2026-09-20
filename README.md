# 🎵 VibePrint

> Your music knows you better than you think.

VibePrint is a Spotify-inspired music personality analyzer that transforms listening habits into a personalized, visually rich music personality profile.

It analyzes music preferences to generate:

- 🎭 Listening Archetype
- 🧬 Music DNA
- 🌈 Mood Spectrum
- 🎧 Music Alter Ego
- ✨ Personalized Insights
- 📸 Shareable Personality Card
- 🔗 Public Share Profile

---

## ✨ Features

### 🎭 Music Personality Archetypes

Classifies listeners into **10 archetypes** based on weighted scoring across listening characteristics such as energy, valence, danceability, acousticness, diversity, late-night listening, era, popularity, and genre traits.

The 10 archetypes are:

1. The Dreamer
2. The Midnight Architect
3. The Explorer
4. The Hype Machine
5. The Nostalgic Soul
6. The Rebel
7. The Mood Curator
8. The Trend Rider
9. The Romantic
10. The Sonic Nomad

### 🧬 Music DNA

Visualizes the user's dominant genre buckets and calculates an overall genre diversity score.

### 🌈 Mood Spectrum

Analyzes available music characteristics including:

- Energy
- Happiness / Valence
- Danceability
- Calmness
- Emotional Intensity

### 🎧 Music Alter Ego

Generates a personalized music persona with:

- Alter-ego name
- Tagline
- Description
- Personality traits
- Soundtrack

### ✨ Personalized Insights

Produces short, shareable observations about the user's listening personality based on their calculated music signals.

### 📸 Shareable Personality Card

Generates a vertical **1080×1920** personality card designed for social sharing. The card can be downloaded as a PNG.

### 🔗 Public Profiles

Each generated personality gets a shareable public profile URL (`/profile/:username`).

> Profiles are stored locally in the browser's `localStorage`, so they remain on the device that created them.

### 🧪 Demo Mode

The application includes a realistic demo mode with sample listening data, so the complete experience can be tested without Spotify credentials.

---

## 🧠 How It Works

```
Spotify / Demo Data
        ↓
  Listening Data
        ↓
 Feature Extraction
        ↓
 Personality Scoring
        ↓
Archetype Classification
        ↓
 Music DNA + Mood Analysis
        ↓
 Alter Ego + Insights
        ↓
  Shareable Profile
```

The archetype is selected using a **deterministic weighted scoring approach**, not random assignment.

Signals extracted from the listening data include:

- Energy, valence, danceability, acousticness, instrumentalness, tempo
- Late-night listening ratio
- Genre diversity
- Artist loyalty
- Average popularity
- Release-era "oldness"
- Mood range
- Rock, romance, global, and alternative genre indicators

Each archetype has a dedicated scoring function that weights relevant signals; the highest-scoring archetype is selected, normalized to a confidence percentage, and the closest runner-ups are also surfaced.

---

## 🎭 Personality Archetypes

| Archetype | Description |
| --- | --- |
| **The Dreamer** | You gravitate toward soft, spacious, acoustic-leaning music that leaves room to feel things. Your playlists are less about hype and more about atmosphere. |
| **The Midnight Architect** | You gravitate toward music that feels cinematic, introspective and slightly unpredictable. You probably have a playlist for every version of yourself. |
| **The Explorer** | You refuse to live inside one genre. Your listening history reads like a map of everywhere you've been curious about lately. |
| **The Hype Machine** | High energy, high tempo, high stakes. You use music like a power source and everyone around you can feel it. |
| **The Nostalgic Soul** | You return to the songs that shaped you. Loyalty is your whole personality — to artists, to albums, to feelings. |
| **The Rebel** | Guitars, grit and volume. You like music that pushes back, and you have never once cared about the algorithm's opinion. |
| **The Mood Curator** | Your listening moves with your emotions — wide range, careful sequencing. You don't pick songs, you design moments. |
| **The Trend Rider** | You live in the now. Your rotation matches the cultural moment, and your friends borrow your taste constantly. |
| **The Romantic** | Your music is emotional architecture — soul, longing and melody. You'd rather feel too much than nothing at all. |
| **The Sonic Nomad** | Languages, cultures, decades — nothing is off-limits. Your listening history is genuinely impossible to predict. |

---

## 🎨 User Experience

1. **Landing page** — Introduces VibePrint and the two entry points.
2. **Connect Spotify or try Demo** — Demo mode runs immediately with sample data.
3. **Musical DNA analysis animation** — A staged loader visualizes the analysis process.
4. **Personality reveal** — The winning archetype is presented with a match score and runner-ups.
5. **Music DNA** — Animated genre bars and diversity score.
6. **Mood Spectrum** — Animated meters for energy, happiness, danceability, calmness, and emotional intensity.
7. **Music Alter Ego** — Name, tagline, description, traits, and soundtrack.
8. **Personalized Insights** — Six shareable observations about the user's listening habits.
9. **Shareable Card** — 1080×1920 PNG export for social stories.
10. **Public Profile** — A `/profile/:username` page anyone can visit.

---

## 🛠️ Tech Stack

- **React 19** — UI library
- **TypeScript** — Type safety
- **TanStack Start** — Full-stack React framework (file-based routing + server functions)
- **TanStack Router / TanStack Query** — Routing and data fetching
- **Tailwind CSS v4** — Styling
- **Framer Motion** — Animations and scroll reveals (`motion` package)
- **html-to-image** — PNG export for the share card
- **Lucide React** — Icons
- **Sonner** — Toast notifications
- **shadcn/ui** — Reusable UI primitives (`src/components/ui/`)

> The Spotify Web API is not currently wired into the live flow. Demo mode fully exercises the analysis and sharing pipeline.

---

## 📁 Project Structure

```
public/
├── favicon.ico
└── robots.txt

src/
├── components/
│   ├── ui/                 # shadcn/ui primitives
│   └── vibeprint/          # VibePrint-specific components
│       ├── AlterEgoCard.tsx
│       ├── AnalysisLoader.tsx
│       ├── ArchetypeReveal.tsx
│       ├── DemoButton.tsx
│       ├── FloatingVisual.tsx
│       ├── Footer.tsx
│       ├── GenreDNA.tsx
│       ├── MoodSpectrum.tsx
│       ├── Navbar.tsx
│       ├── PersonalityInsights.tsx
│       ├── ProfileView.tsx
│       ├── Reveal.tsx
│       ├── ShareActions.tsx
│       ├── ShareCard.tsx
│       └── SpotifyConnectButton.tsx
├── hooks/
│   └── use-mobile.tsx
├── lib/
│   ├── utils.ts
│   ├── error-capture.ts
│   ├── error-page.ts
│   └── vibeprint/          # Core analysis engine
│       ├── analyze.ts
│       ├── archetypes.ts
│       ├── mockData.ts
│       ├── store.ts
│       └── types.ts
├── routes/
│   ├── __root.tsx          # Root layout (fonts, meta, toaster)
│   ├── index.tsx           # Landing page
│   ├── connect.tsx         # Spotify / Demo entry
│   ├── analyze.tsx         # Analysis loader
│   ├── results.tsx         # Personal results
│   └── profile.$username.tsx # Public profile
├── router.tsx
├── server.ts
├── start.ts
└── styles.css              # Tailwind v4 theme tokens & utilities
```

- `src/lib/vibeprint/` — Core data models, analysis algorithm, demo data, and localStorage persistence.
- `src/components/vibeprint/` — All UI components that render the profile, charts, cards, and animations.
- `src/routes/` — TanStack Start file-based routes.

---

## 🚀 Getting Started

This project uses **Bun** as its package manager (`bun.lock` and `bunfig.toml`).

```bash
# Clone the repository
git clone <repository-url>
cd tanstack_start_ts

# Install dependencies
bun install

# Start the dev server
bun run dev
```

The app will be available at `http://localhost:8080`.

Other useful scripts:

```bash
bun run build      # Production build
bun run build:dev  # Development build
bun run lint       # Run ESLint
bun run format     # Run Prettier
```

---

## 🔐 Environment Variables

No environment variables are required to run the app in **Demo Mode**.

If you choose to wire up live Spotify OAuth in the future, you would need:

```bash
VITE_SPOTIFY_CLIENT_ID=your_client_id
VITE_SPOTIFY_CLIENT_SECRET=your_client_secret
VITE_SPOTIFY_REDIRECT_URI=http://localhost:8080/auth/callback
```

| Variable | Purpose |
| --- | --- |
| `VITE_SPOTIFY_CLIENT_ID` | Spotify application client ID |
| `VITE_SPOTIFY_CLIENT_SECRET` | Spotify application client secret |
| `VITE_SPOTIFY_REDIRECT_URI` | OAuth redirect URI registered in the Spotify app |

---

## 🎵 Spotify Setup (Optional)

Live Spotify OAuth is currently scaffolded but not fully wired. To complete the integration:

1. Create an app at the [Spotify Developer Dashboard](https://developer.spotify.com/dashboard).
2. Add the redirect URI (e.g. `http://localhost:8080/auth/callback`).
3. Add the required environment variables from the section above.
4. Implement the OAuth handshake and fetch the user's top artists, top tracks, and audio features.
5. Pipe the fetched data into the existing `analyze()` function.

Until then, **Demo Mode** can be used to experience the full analysis, share card, and public profile flow.

---

## 📸 Screenshots

Add screenshots to `docs/screenshots/` and they will render here.

| Screen | Placeholder |
| --- | --- |
| Landing Page | `docs/screenshots/landing.png` |
| Personality Reveal | `docs/screenshots/reveal.png` |
| Music DNA & Mood Spectrum | `docs/screenshots/dna-mood.png` |
| Music Alter Ego | `docs/screenshots/alter-ego.png` |
| Share Card | `docs/screenshots/share-card.png` |
| Public Profile | `docs/screenshots/public-profile.png` |

---

## 🌐 Live Demo

Live Demo: `ADD_DEPLOYED_URL_HERE`

## 🎥 Demo Video

Loom Walkthrough: `ADD_LOOM_URL_HERE`

---

## 🔒 Privacy

- **Demo Mode** uses only sample data bundled with the app. Nothing is sent to any server.
- **Profiles** are saved to the browser's `localStorage` on the device that created them.
- **Public profile URLs** only work if the recipient is viewing the profile on the same device/browser where it was generated, because profiles are not synced to a central database.
- No real Spotify data is currently accessed, stored, or transmitted.

---

## 🚧 Future Improvements

- Full Spotify OAuth integration with real top artists, tracks, and audio features.
- More sophisticated listening-history analysis (time-of-day patterns, seasonal taste shifts).
- Friend-to-friend music compatibility scores.
- Historical taste evolution timeline.
- AI-generated playlist recommendations matched to the user's archetype.
- Additional personality dimensions and sub-archetypes.

---

## 🏆 Hackathon Focus

VibePrint is built around **personality-driven music analysis** and a **share-first experience**:

- **Visual storytelling** — Neon gradients, glass cards, animated reveals, and a story-sized share card.
- **Deterministic archetype scoring** — Every result is computed from real listening signals, not random.
- **Personalized alter ego** — A unique persona, description, and soundtrack for every profile.
- **Social profile sharing** — A public URL plus a downloadable card for Instagram stories.
- **Demo-ready** — Judges can experience the complete flow end-to-end without any credentials.

---

## 👩‍💻 Author

**Bhumika VP**

- GitHub: [https://github.com/BhumikaVP](https://github.com/BhumikaVP)
