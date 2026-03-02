export interface ArtMovement {
  id: string;
  name: string;
  period: string;
  description: string;
  keyCharacteristics: string[];
  famousArtists: string[];
  imageUrl: string;
}

export interface Artist {
  name: string;
  years: string;
  movement: string;
  bio: string;
  famousWorks: string[];
  imageUrl: string;
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
}
