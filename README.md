# Music Moods

Build a polished, production-quality web app called “VibePrint” — a Spotify Music Personality Analyzer, inspired by Spotify Wrapped and modern personality apps.

The app should analyze a user's Spotify listening data and generate a beautiful, highly shareable music personality profile containing their listening archetype, music DNA, mood spectrum, music alter ego, and personalized insights.

1. CORE EXPERIENCE

The main user flow should be:

Landing Page → Connect Spotify → Analyze Listening Data → Animated Analysis → Personality Results → Shareable Profile Card → Download/Share

The experience should feel fun, premium, modern, highly visual, and addictive, similar to Spotify Wrapped.

Do NOT make it look like a generic dashboard. It should feel like a consumer social product.

2. LANDING PAGE

Create a visually striking landing page.

Hero heading:

“Your music knows you better than you think.”

Subtitle:

“Connect Spotify and discover the personality hiding inside your playlists.”

Primary CTA:

“Discover My Music Personality”

Secondary text:

“100% personalized • Powered by your listening habits”

Add an attractive animated visual showing floating album covers, music waves, genre bubbles, and personality keywords.

Include a preview section showing an example personality card.

Example:

THE MIDNIGHT ARCHITECT

“Your taste lives somewhere between late-night thoughts and main-character energy.”

Add sections:

How It Works

Music Archetypes

What We Analyze

Example Results

3. SPOTIFY CONNECTION

Create a Spotify OAuth connection screen.

Button:

“Connect Spotify”

After authentication, retrieve the user's Spotify profile and listening information.

Use Spotify data such as:

Top artists

Top tracks

Recently played tracks

Artist genres

Track popularity

Audio characteristics when available

Listening patterns

Genre diversity

Request only the permissions necessary for the analysis.

If Spotify OAuth credentials are not configured yet, create a clean demo/mock-data mode so the entire application can still be demonstrated.

Add a clearly visible:

“Try Demo Analysis”

button.

The demo should use realistic sample Spotify data.

4. ANALYSIS SCREEN

After connecting Spotify, show a cinematic analysis experience.

Display:

“Reading your musical DNA…”

Then animate through stages:

Analyzing your favorite artists

Mapping your genres

Measuring your mood

Detecting your listening patterns

Finding your alter ego

Building your music personality

Use smooth animations and progress indicators.

Do not make this screen take too long. Use a short simulated analysis if necessary.

5. PERSONALITY ALGORITHM

Create a custom scoring system rather than simply randomly assigning personalities.

Classify the user into one primary archetype based on their listening data.

Support at least these 10 archetypes:

1. THE DREAMER

High acousticness + emotional/positive listening + lower energy.

Traits:

Imaginative

Emotional

Reflective

2. THE MIDNIGHT ARCHITECT

Strong late-night listening + alternative/indie tendencies + thoughtful music patterns.

Traits:

Deep thinker

Creative

Independent

3. THE EXPLORER

Very high genre diversity and artist diversity.

Traits:

Curious

Adventurous

Open-minded

4. THE HYPE MACHINE

High energy + high danceability + upbeat music.

Traits:

Ambitious

Energetic

Motivated

5. THE NOSTALGIC SOUL

Strong preference toward older music and familiar artists.

Traits:

Sentimental

Loyal

Romantic

6. THE REBEL

Rock, punk, metal, alternative or high-intensity music.

Traits:

Independent

Fearless

Nonconformist

7. THE MOOD CURATOR

Wide emotional range with carefully varied listening patterns.

Traits:

Emotionally aware

Adaptive

Thoughtful

8. THE TREND RIDER

High popularity/viral music and current artists.

Traits:

Social

Current

Trend-aware

9. THE ROMANTIC

Strong emotional/romantic music patterns.

Traits:

Passionate

Sensitive

Expressive

10. THE SONIC NOMAD

Extremely diverse music taste across cultures, languages and genres.

Traits:

Adventurous

Experimental

Unpredictable

The algorithm should calculate weighted scores for each archetype and select the highest scoring archetype.

Also show a percentage confidence score.

Example:

You are 87% The Midnight Architect

6. MUSIC DNA

Create a beautiful visualization showing the user's top genres.

Example:

Music DNA

Pop — 35%
Indie — 25%
Rock — 18%
Electronic — 12%
R&B — 10%

Use a visually attractive donut/pie chart.

Also show:

Genre Diversity Score: 82/100

and:

Your taste spans 17 different genres.

7. MOOD SPECTRUM

Create a visual mood analysis using available audio features.

Analyze:

Energy

Danceability

Valence

Acousticness

Tempo

Convert these into human-friendly personality dimensions:

Energy
78%

Happiness
71%

Danceability
64%

Calmness
42%

Emotional Intensity
81%

Use animated progress bars or radial indicators.

Avoid making the interface look like a boring analytics dashboard.

8. MUSIC ALTER EGO

This should be one of the most visually impressive sections.

Generate an AI-style personalized alter ego based on the user's listening data.

Example:

THE MIDNIGHT ARCHITECT

“You turn feelings into fuel.”

“You gravitate toward music that feels cinematic, introspective and slightly unpredictable. You probably have a playlist for every version of yourself.”

Traits:

CREATIVE
DEEP THINKER
INDEPENDENT
EMOTIONAL

Add:

Your soundtrack:
“Late-night city lights and unfinished ideas.”

Make the description dynamic based on the user's actual data.

If an AI API is available, use it to generate the description. Otherwise provide a deterministic fallback generated from the personality scores.

9. FUN PERSONALITY INSIGHTS

Generate 4–6 short personalized insights.

Examples:

YOUR MUSIC SUPERPOWER

“Finding beauty in songs nobody else has discovered yet.”

YOUR MAIN CHARACTER ENERGY

“Walking through a city at midnight with headphones on.”

YOUR MUSICAL RED FLAG

“You say you listen to everything. Your Spotify history disagrees.”

YOUR PERFECT SOUNDTRACK

“Rainy evenings + neon lights + one emotionally devastating song.”

YOUR MUSIC AGE

“Your taste feels 4 years older than your actual age.”

These should change based on the user's data.

10. SHAREABLE PERSONALITY CARD

Create a dedicated share-card component optimized for:

1080 × 1920 Instagram Story format

The card should include:

VibePrint logo

User's profile image

Archetype

Archetype percentage

Short personality description

Genre DNA

Mood score

3 personality traits

Small Spotify-style visual elements

VibePrint branding

Example:

VIBEPRINT

YOUR MUSIC PERSONALITY

THE MIDNIGHT ARCHITECT

87%

Creative • Independent • Reflective

“Your playlists sound like thoughts
you haven't said out loud yet.”

MUSIC DNA

INDIE 35%
POP 25%
ALT 20%
OTHER 20%

MOOD

ENERGY 78%
HAPPINESS 71%
EMOTION 81%

DISCOVER YOURS

vibeprint.app

Make this card extremely polished because it is the main viral/shareable output.

11. SHARE FUNCTIONALITY

Add buttons:

Download Card

Share

Copy Link

The Download Card button should export the personality card as a PNG image.

Use an appropriate client-side image export library such as html-to-image or html2canvas.

The generated image should preserve the exact visual design.

For Share:

Use the Web Share API when available.

Fallback:

“Image saved — share it on Instagram, WhatsApp or X.”

12. SHAREABLE PUBLIC PROFILE

Create a public profile route such as:

/profile/[username]

Example:

/profile/demo-user

Show the personality card and a CTA:

“Discover your music personality →”

Add a unique share URL for each generated profile.

13. RESULTS PAGE

The results page should feel like a Spotify Wrapped reveal.

Structure it as a sequence of visually distinct sections:

“We listened closely…”

“Your music personality is…”

Archetype reveal

Music DNA

Mood Spectrum

Music Alter Ego

Fun Insights

Shareable Card

“Want to discover your friends' music personalities?”

Use smooth scroll animations and reveal animations.

Use Framer Motion for animations.

14. DESIGN SYSTEM

Visual style:

Dark background

Vibrant gradients

Neon-inspired accents

Large typography

Rounded cards

Glassmorphism used carefully

Subtle grain/noise texture

Soft glow effects

Smooth micro-interactions

Animated gradients

Strong visual hierarchy

Use colors inspired by music apps but DO NOT simply copy Spotify's interface.

Suggested palette:

Background:
#09090B

Primary gradient:
Purple → Pink → Orange

Accent:
Electric green

Text:
White / soft gray

Use generous spacing.

Typography should feel modern and editorial.

Suggested fonts:

Inter

Space Grotesk

DM Sans

Use a bold display font for archetype names.

15. RESPONSIVE DESIGN

The app must be mobile-first.

Optimize for:

Mobile

Tablet

Desktop

The share card should look perfect on mobile.

Desktop should use a centered max-width layout.

Do not allow charts or cards to overflow on mobile.

16. COMPONENT STRUCTURE

Create reusable components such as:

Navbar

HeroSection

SpotifyConnectButton

DemoButton

AnalysisLoader

ArchetypeReveal

GenreDNA

MoodSpectrum

AlterEgoCard

PersonalityInsights

ShareCard

ShareActions

Footer

Keep components modular and clean.

17. DATA MODEL

Create a clean structure for:

User:

id

spotifyId

displayName

profileImage

topArtists

topTracks

genres

audioFeatures

Analysis:

archetype

archetypeScore

genreDNA

moodScores

traits

alterEgoName

alterEgoDescription

insights

ShareProfile:

id

username

analysisId

createdAt

18. DEMO MODE

This is extremely important.

The application MUST work even without Spotify credentials.

Create realistic mock Spotify data for the demo.

When the user clicks:

Try Demo Analysis

immediately run the full analysis flow and produce a polished example profile.

Do not show empty charts or broken Spotify API calls.

The demo should look like a real user's Spotify analysis.

19. ERROR STATES

Create polished error states for:

Spotify authentication failure

No listening history

Spotify API unavailable

Analysis failure

Image export failure

Always provide a recovery action.

Example:

“We couldn't read your Spotify data.”

“Try reconnecting or explore a demo profile.”

20. PERFORMANCE

Keep the application fast.

Lazy load heavy components

Optimize images

Avoid unnecessary API requests

Cache Spotify analysis where appropriate

Use loading skeletons

Keep animations smooth

21. IMPORTANT UX DETAILS

Add small delightful interactions:

Hover effects

Button animations

Number counting animations

Chart animations

Archetype reveal animation

Confetti or subtle particles after analysis

Copy-link success toast

Download success toast

Make the user feel like they are receiving a personalized discovery rather than looking at analytics.

22. FINAL PRODUCT FEEL

The final application should feel like:

Spotify Wrapped × personality test × social media share card

It should be visually impressive enough that screenshots immediately communicate the product.

Prioritize:

Beautiful UI

Personality algorithm

Spotify connection

Shareable card

AI-generated alter ego

Smooth animations

Mobile experience

Do not build unnecessary admin dashboards or complicated features.

Focus on making the core experience polished and demo-ready.

Before finishing, test the complete flow:

Landing → Demo/Spotify Connect → Analysis → Personality Reveal → Music DNA → Mood Spectrum → Alter Ego → Share Card → Download/Share → Public Profile.

Make sure every button works and there are no placeholder sections in the final UI.

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/1e48ace6-398b-4958-8296-e043e9ab33ff).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
