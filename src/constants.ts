import { ArtMovement } from "./types";

export const MOVEMENTS: ArtMovement[] = [
  {
    id: "impressionism",
    name: "Impressionism",
    period: "1860s – 1880s",
    description: "Characterized by small, thin, yet visible brush strokes, open composition, and emphasis on accurate depiction of light in its changing qualities.",
    keyCharacteristics: ["Visible brushstrokes", "Emphasis on light", "Ordinary subject matter"],
    famousArtists: ["Claude Monet", "Pierre-Auguste Renoir", "Edgar Degas"],
    imageUrl: "https://picsum.photos/seed/monet/800/600"
  },
  {
    id: "cubism",
    name: "Cubism",
    period: "1907 – 1914",
    description: "An avant-garde art movement that revolutionized European painting and sculpture, and inspired related movements in music, literature and architecture.",
    keyCharacteristics: ["Geometric shapes", "Multiple viewpoints", "Fragmentation"],
    famousArtists: ["Pablo Picasso", "Georges Braque", "Juan Gris"],
    imageUrl: "https://picsum.photos/seed/picasso/800/600"
  },
  {
    id: "surrealism",
    name: "Surrealism",
    period: "1920s – 1950s",
    description: "A cultural movement that sought to release the creative potential of the unconscious mind, for example by the irrational juxtaposition of images.",
    keyCharacteristics: ["Dream-like imagery", "Unconscious mind", "Irrationality"],
    famousArtists: ["Salvador Dalí", "René Magritte", "Joan Miró"],
    imageUrl: "https://picsum.photos/seed/dali/800/600"
  },
  {
    id: "abstract-expressionism",
    name: "Abstract Expressionism",
    period: "1940s – 1950s",
    description: "A post–World War II art movement in American painting, developed in New York City in the 1940s.",
    keyCharacteristics: ["Spontaneity", "Emotional intensity", "Large scale"],
    famousArtists: ["Jackson Pollock", "Mark Rothko", "Willem de Kooning"],
    imageUrl: "https://picsum.photos/seed/pollock/800/600"
  },
  {
    id: "pop-art",
    name: "Pop Art",
    period: "1950s – 1970s",
    description: "An art movement that emerged in the United Kingdom and the United States during the mid- to late-1950s.",
    keyCharacteristics: ["Popular culture", "Mass media", "Irony"],
    famousArtists: ["Andy Warhol", "Roy Lichtenstein", "Keith Haring"],
    imageUrl: "https://picsum.photos/seed/warhol/800/600"
  }
];
