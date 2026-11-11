import { Destination, Experience } from '../types';

export const VERIFIED_DESTINATIONS: Destination[] = [
  {
    id: "salkhan-fossils",
    slug: "salkhan-fossil-park",
    name: "Salkhan Fossils Park",
    tagline: "1.4 Billion-Year-Old Mesoproterozoic Stromatolites",
    category: "Geological",
    overview: "Located 12 km from Robertsganj, this UNESCO-tier geo-heritage site preserves ancient circular stromatolite fossils formed before the emergence of multicellular animal life.",
    description: "Salkhan Fossil Park (Sonbhadra Fossils Park) provides an authentic, pristine window into prebiotic and early biological Earth history. Preserved across Vindhyan sandstone beds, these concentric rings represent cyanobacterial structures approximately three times older than the earliest dinosaur records.",
    coordinates: { lat: 24.5833, lng: 83.0833 },
    bestSeason: "October to March",
    distanceFromVaranasi: "Approx. 105 km via SH 5A",
    elevation: "310 meters",
    highlight: "Pre-Cambrian stromatolite rings intact in natural stone beds.",
    imageUrl: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=1200&q=80",
    safetyTips: [
      "Strict preservation laws: chipping or taking fossil stones is a punishable offense.",
      "Wear sturdy walking shoes with strong grip on stone paths.",
      "Carry ample drinking water; concession stands are minimal."
    ]
  },
  {
    id: "vijaygarh-fort",
    slug: "vijaygarh-fort",
    name: "Vijaygarh Fort",
    tagline: "5th-Century Medieval Cliffside Fortress",
    category: "Heritage",
    overview: "Towering 400 meters above the Son Valley in Mau Kalan, Vijaygarh features ancient rock-cut inscriptions, steep stone battlements, and perennial reservoirs.",
    description: "Built originally in the 5th century and reinforced by Chandapradyota and medieval rulers, Vijaygarh Fort overlooks dramatic Kaimur gorges. It houses prehistoric cave art in adjacent shelters and perennial freshwater reservoirs known locally as Mira Sagar and Ram Sagar.",
    coordinates: { lat: 24.5772, lng: 83.2104 },
    bestSeason: "November to February",
    distanceFromVaranasi: "Approx. 120 km via Robertsganj",
    elevation: "430 meters",
    highlight: "Panoramic view of the Son River basin & perennial Mira Sagar reservoir.",
    imageUrl: "https://images.unsplash.com/photo-1599561046251-bfb9465b4c44?auto=format&fit=crop&w=1200&q=80",
    safetyTips: [
      "Requires climbing 500+ stone steps; moderate cardiovascular fitness recommended.",
      "Descend before twilight to avoid wild fauna crossing nearby forest paths.",
      "Stay away from unprotected cliff drops."
    ]
  },
  {
    id: "rihand-reservoir",
    slug: "rihand-reservoir",
    name: "Rihand Reservoir (Govind Ballabh Pant Sagar)",
    tagline: "One of India's Largest Inland Water Reservoirs",
    category: "Reservoir",
    overview: "Constructed on the Rihand River along the UP-MP boundary, creating an immense water body with scenic overlooks and vital regional hydroelectric power.",
    description: "Formed by the concrete gravity Rihand Dam near Pipri and Renukoot, the reservoir mirrors the sky across miles of tranquil waters. Overlooks at sunrise and sunset offer sweeping views of eastern Uttar Pradesh's hill frontiers.",
    coordinates: { lat: 24.2044, lng: 83.0336 },
    bestSeason: "October to February",
    distanceFromVaranasi: "Approx. 170 km via NH 39",
    elevation: "275 meters",
    highlight: "Mesmerizing sunset viewpoints across hundreds of square kilometers of water.",
    imageUrl: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80",
    safetyTips: [
      "Swimming is strictly prohibited due to deep undercurrents.",
      "Respect perimeter security guidelines near industrial and dam installations.",
      "Drone flying requires prior written clearance from local administration."
    ]
  },
  {
    id: "mukha-falls",
    slug: "mukha-waterfall",
    name: "Mukha Waterfall (Mukh Dari)",
    tagline: "Pristine Cascade in the Belan River Basin",
    category: "Waterfall",
    overview: "Cascading gracefully over layered sandstone shelves in Ghorawal, Mukha Falls forms an idyllic oasis fringed by prehistoric cave painting sites.",
    description: "Flowing into the ancient Belan River system, Mukha Falls is an essential stop on Sonbhadra's eco-circuit. During the post-monsoon season, clear waters drop through tiered rock amphitheaters into natural pools.",
    coordinates: { lat: 24.7142, lng: 82.7811 },
    bestSeason: "September to December (Post-monsoon optimal)",
    distanceFromVaranasi: "Approx. 90 km",
    elevation: "210 meters",
    highlight: "Tiered natural waterfall surrounded by prehistoric sandstone rock shelters.",
    imageUrl: "https://images.unsplash.com/photo-1432405972618-c60b0225b8f9?auto=format&fit=crop&w=1200&q=80",
    safetyTips: [
      "Slippery wet boulders near rapid falls; maintain safe distance.",
      "Avoid gorge bottoms during heavy monsoon rain spells due to sudden water surges.",
      "Zero littering: pack out all plastic waste."
    ]
  }
];

export const VERIFIED_EXPERIENCES: Experience[] = [
  {
    id: "exp-001",
    title: "Mesoproterozoic Deep-Time Geo Walk",
    category: "Geological Walk",
    duration: "Half-Day (4 Hours)",
    difficulty: "Easy",
    groupSize: "Max 12 Guests",
    pricePerPerson: "₹1,200",
    meetingPoint: "Salkhan Fossil Park Interpretation Center, Robertsganj",
    description: "Guided by certified regional naturalists, this walk unlocks the 1.4-billion-year-old stromatolite rings, explaining the genesis of the Vindhyan Basin.",
    inclusions: ["Authorized Geo-Guide", "Interpretation Booklet", "Mineral Water", "Safety Briefing"],
    imageUrl: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "exp-002",
    title: "Vijaygarh Fortress Sunrise Ascent & Inscriptions",
    category: "Heritage Trek",
    duration: "Full-Day (6 Hours)",
    difficulty: "Moderate",
    groupSize: "Max 10 Guests",
    pricePerPerson: "₹1,850",
    meetingPoint: "Mau Kalan Base Trailhead, Sonbhadra",
    description: "Ascend the historic stone ramparts before dawn. Explore 5th-century rock carvings, the tranquil Mira Sagar, and the valley overlook.",
    inclusions: ["Trek Lead & First-Aid Responder", "Packed Trail Breakfast", "Historical Narrative Guide", "Forest Entry Permits"],
    imageUrl: "https://images.unsplash.com/photo-1599561046251-bfb9465b4c44?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "exp-003",
    title: "Belan Gorge & Mukha Falls Nature Photography Trail",
    category: "Eco-Trail",
    duration: "5 Hours",
    difficulty: "Easy",
    groupSize: "Max 8 Guests",
    pricePerPerson: "₹1,500",
    meetingPoint: "Ghorawal Forest Rest Point",
    description: "A peaceful walking trail through the Belan river ecosystem capturing post-monsoon waterfalls, wild birdlife, and prehistoric cave painting shelters.",
    inclusions: ["Naturalist Guide", "Photography Spots Access", "Fresh Herbal Refreshments", "Local Village Interaction"],
    imageUrl: "https://images.unsplash.com/photo-1432405972618-c60b0225b8f9?auto=format&fit=crop&w=800&q=80"
  }
];
