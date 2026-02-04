import type { ActivityItem, RestaurantSummary, ReviewSummary } from '@/lib/types';

export const restaurantSummaries: RestaurantSummary[] = [
  {
    id: '1',
    name: 'Bistrot Lumière',
    slug: 'bistrot-lumiere',
    city: 'Paris',
    averageRating: 4.6,
    reviewCount: 128,
    priceRange: '€€',
    tags: ['romantique', 'bistronomie', 'vin nature'],
    lat: 48.8566,
    lng: 2.3522
  },
  {
    id: '2',
    name: 'Ramen Kōen',
    slug: 'ramen-koen',
    city: 'Paris',
    averageRating: 4.4,
    reviewCount: 96,
    priceRange: '€',
    tags: ['ramen', 'noodles', 'rapide'],
    lat: 48.8619,
    lng: 2.3346
  },
  {
    id: '3',
    name: 'Maison Olive',
    slug: 'maison-olive',
    city: 'Paris',
    averageRating: 4.8,
    reviewCount: 54,
    priceRange: '€€€',
    tags: ['méditerranéen', 'terrasse', 'business'],
    lat: 48.8529,
    lng: 2.3488
  },
  {
    id: '4',
    name: 'Café Arôme',
    slug: 'cafe-arome',
    city: 'Paris',
    averageRating: 4.1,
    reviewCount: 42,
    priceRange: '€',
    tags: ['brunch', 'café', 'pâtisserie'],
    lat: 48.8666,
    lng: 2.3333
  },
  {
    id: '5',
    name: 'Le Marais Vert',
    slug: 'le-marais-vert',
    city: 'Paris',
    averageRating: 4.3,
    reviewCount: 69,
    priceRange: '€€',
    tags: ['végétarien', 'healthy', 'locavore'],
    lat: 48.8606,
    lng: 2.3614
  }
];

export const reviewSummaries: ReviewSummary[] = [
  {
    id: 'r1',
    author: 'Claire',
    rating: 4.5,
    text: 'Bœuf fondant, service attentionné, parfait pour un dîner calme.',
    tags: ['romantique', 'vin rouge'],
    visitedAt: new Date('2024-06-12')
  },
  {
    id: 'r2',
    author: 'Nolan',
    rating: 4.0,
    text: 'Bouillon très parfumé mais attente un peu longue.',
    tags: ['ramen', 'tonkotsu'],
    visitedAt: new Date('2024-05-20')
  },
  {
    id: 'r3',
    author: 'Sofia',
    rating: 5.0,
    text: 'Une vraie surprise, excellent menu dégustation.',
    tags: ['gastronomie', 'chef'],
    visitedAt: new Date('2024-07-02')
  }
];

export const activityFeed: ActivityItem[] = [
  {
    id: 'a1',
    user: 'Mehdi',
    restaurant: 'Bistrot Lumière',
    rating: 4.5,
    excerpt: 'Coup de cœur pour les légumes rôtis et le service.',
    createdAt: new Date('2024-07-08')
  },
  {
    id: 'a2',
    user: 'Inès',
    restaurant: 'Ramen Kōen',
    rating: 4.0,
    excerpt: 'Toujours la meilleure option après un cinéma.',
    createdAt: new Date('2024-07-07')
  },
  {
    id: 'a3',
    user: 'Lucas',
    restaurant: 'Maison Olive',
    rating: 5.0,
    excerpt: 'Idéal pour un rendez-vous business.',
    createdAt: new Date('2024-07-06')
  }
];
