import type { ArchetypeDefinition } from "./types";

export const ARCHETYPES: ArchetypeDefinition[] = [
  {
    id: "dreamer",
    name: "The Dreamer",
    tagline: "You hear colors nobody else does.",
    traits: ["Imaginative", "Emotional", "Reflective"],
    soundtrack: "Golden hour, an open window, and a song that sounds like memory.",
    description:
      "You gravitate toward soft, spacious, acoustic-leaning music that leaves room to feel things. Your playlists are less about hype and more about atmosphere.",
    gradient: "linear-gradient(135deg,#a855f7,#f472b6,#fbbf24)",
  },
  {
    id: "midnight-architect",
    name: "The Midnight Architect",
    tagline: "You turn feelings into fuel.",
    traits: ["Deep thinker", "Creative", "Independent", "Emotional"],
    soundtrack: "Late-night city lights and unfinished ideas.",
    description:
      "You gravitate toward music that feels cinematic, introspective and slightly unpredictable. You probably have a playlist for every version of yourself.",
    gradient: "linear-gradient(135deg,#6366f1,#a855f7,#ec4899)",
  },
  {
    id: "explorer",
    name: "The Explorer",
    tagline: "Your queue is a passport.",
    traits: ["Curious", "Adventurous", "Open-minded"],
    soundtrack: "A new artist every week and zero regrets.",
    description:
      "You refuse to live inside one genre. Your listening history reads like a map of everywhere you've been curious about lately.",
    gradient: "linear-gradient(135deg,#22d3ee,#a855f7,#f97316)",
  },
  {
    id: "hype-machine",
    name: "The Hype Machine",
    tagline: "You score your own highlight reel.",
    traits: ["Ambitious", "Energetic", "Motivated"],
    soundtrack: "Sprint intervals and impossible plans at 7am.",
    description:
      "High energy, high tempo, high stakes. You use music like a power source and everyone around you can feel it.",
    gradient: "linear-gradient(135deg,#f97316,#f43f5e,#facc15)",
  },
  {
    id: "nostalgic-soul",
    name: "The Nostalgic Soul",
    tagline: "You keep the good things on repeat.",
    traits: ["Sentimental", "Loyal", "Romantic"],
    soundtrack: "An old album, a long drive, and someone you still think about.",
    description:
      "You return to the songs that shaped you. Loyalty is your whole personality — to artists, to albums, to feelings.",
    gradient: "linear-gradient(135deg,#f59e0b,#ef4444,#a855f7)",
  },
  {
    id: "rebel",
    name: "The Rebel",
    tagline: "You don't do quiet.",
    traits: ["Independent", "Fearless", "Nonconformist"],
    soundtrack: "Distortion, bad decisions, and total conviction.",
    description:
      "Guitars, grit and volume. You like music that pushes back, and you have never once cared about the algorithm's opinion.",
    gradient: "linear-gradient(135deg,#ef4444,#111827,#f97316)",
  },
  {
    id: "mood-curator",
    name: "The Mood Curator",
    tagline: "You have a playlist for that.",
    traits: ["Emotionally aware", "Adaptive", "Thoughtful"],
    soundtrack: "The right song at exactly the right minute.",
    description:
      "Your listening moves with your emotions — wide range, careful sequencing. You don't pick songs, you design moments.",
    gradient: "linear-gradient(135deg,#8b5cf6,#06b6d4,#f472b6)",
  },
  {
    id: "trend-rider",
    name: "The Trend Rider",
    tagline: "You hear it before the caption does.",
    traits: ["Social", "Current", "Trend-aware"],
    soundtrack: "Whatever is about to be everywhere.",
    description:
      "You live in the now. Your rotation matches the cultural moment, and your friends borrow your taste constantly.",
    gradient: "linear-gradient(135deg,#ec4899,#8b5cf6,#22d3ee)",
  },
  {
    id: "romantic",
    name: "The Romantic",
    tagline: "You feel everything at full volume.",
    traits: ["Passionate", "Sensitive", "Expressive"],
    soundtrack: "Slow R&B, warm light, and one devastating bridge.",
    description:
      "Your music is emotional architecture — soul, longing and melody. You'd rather feel too much than nothing at all.",
    gradient: "linear-gradient(135deg,#f43f5e,#a855f7,#fb7185)",
  },
  {
    id: "sonic-nomad",
    name: "The Sonic Nomad",
    tagline: "Your taste has no home country.",
    traits: ["Adventurous", "Experimental", "Unpredictable"],
    soundtrack: "Four languages, three continents, one playlist.",
    description:
      "Languages, cultures, decades — nothing is off-limits. Your listening history is genuinely impossible to predict.",
    gradient: "linear-gradient(135deg,#14b8a6,#6366f1,#f59e0b)",
  },
];

export const byId = (id: string) => ARCHETYPES.find((a) => a.id === id) ?? ARCHETYPES[1];
