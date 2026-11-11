export interface Destination {
  id: string;
  slug: string;
  name: string;
  tagline: string;
  category: 'Geological' | 'Heritage' | 'Waterfall' | 'Reservoir';
  overview: string;
  description: string;
  coordinates?: { lat: number; lng: number };
  bestSeason: string;
  distanceFromVaranasi: string;
  safetyTips?: string[];
  imageUrl: string;
  elevation?: string;
  highlight: string;
}

export interface Experience {
  id: string;
  title: string;
  category: string;
  duration: string;
  difficulty: 'Easy' | 'Moderate' | 'Challenging';
  groupSize: string;
  pricePerPerson: string;
  meetingPoint: string;
  description: string;
  inclusions: string[];
  imageUrl: string;
}
