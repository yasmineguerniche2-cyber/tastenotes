export type RestaurantSummary = {
  id: string;
  name: string;
  slug: string;
  city: string;
  averageRating: number;
  reviewCount: number;
  priceRange: string;
  tags: string[];
  lat: number;
  lng: number;
};

export type ReviewSummary = {
  id: string;
  author: string;
  rating: number;
  text: string;
  tags: string[];
  visitedAt: Date;
};

export type ActivityItem = {
  id: string;
  user: string;
  restaurant: string;
  rating: number;
  excerpt: string;
  createdAt: Date;
};
