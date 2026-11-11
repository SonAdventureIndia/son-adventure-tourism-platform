export interface Destination {
  id: string;
  slug: string;
  name: string;
  tagline: string;
  category: string;
  overview: string;
  description: string;
  coordinates?: {
    lat: number;
    lng: number;
  };
  bestSeason: string;
  distanceFromVaranasi: string;
  safetyTips?: string[];
}
