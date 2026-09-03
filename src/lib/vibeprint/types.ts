export interface SpotifyArtist {
  id: string;
  name: string;
  genres: string[];
  popularity: number;
  image: string;
}

export interface SpotifyTrack {
  id: string;
  name: string;
  artist: string;
  album: string;
  albumImage: string;
  popularity: number;
  releaseYear: number;
  /** hour of day 0-23 when it was last played */
  playedAtHour: number;
  features: AudioFeatures;
}

export interface AudioFeatures {
  energy: number;
  danceability: number;
  valence: number;
  acousticness: number;
  instrumentalness: number;
  tempo: number;
}

export interface SpotifyUser {
  id: string;
  spotifyId: string;
  displayName: string;
  profileImage: string;
  topArtists: SpotifyArtist[];
  topTracks: SpotifyTrack[];
  genres: string[];
  audioFeatures: AudioFeatures;
}

export interface GenreSlice {
  name: string;
  percent: number;
}

export interface MoodScores {
  energy: number;
  happiness: number;
  danceability: number;
  calmness: number;
  emotionalIntensity: number;
}

export interface Insight {
  title: string;
  body: string;
}

export interface ArchetypeDefinition {
  id: string;
  name: string;
  tagline: string;
  traits: string[];
  soundtrack: string;
  description: string;
  gradient: string;
}

export interface Analysis {
  archetype: ArchetypeDefinition;
  archetypeScore: number;
  runnerUps: { name: string; score: number }[];
  genreDNA: GenreSlice[];
  genreCount: number;
  genreDiversity: number;
  moodScores: MoodScores;
  traits: string[];
  alterEgoName: string;
  alterEgoTagline: string;
  alterEgoDescription: string;
  soundtrack: string;
  insights: Insight[];
  topArtistNames: string[];
  topTrackNames: string[];
}

export interface ShareProfile {
  id: string;
  username: string;
  createdAt: string;
  user: Pick<SpotifyUser, "displayName" | "profileImage">;
  analysis: Analysis;
}
