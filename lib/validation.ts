import { z } from 'zod';

export const restaurantSchema = z.object({
  name: z.string().min(2),
  address: z.string().min(4),
  city: z.string().min(2),
  lat: z.number(),
  lng: z.number(),
  cuisine: z.string().min(2),
  priceRange: z.enum(['€', '€€', '€€€']),
  phone: z.string().optional(),
  website: z.string().url().optional(),
  tags: z.array(z.string()).default([])
});

export const reviewSchema = z.object({
  restaurantId: z.string().cuid(),
  authorId: z.string().cuid().optional(),
  rating: z.number().min(0.5).max(5),
  text: z.string().min(20),
  tags: z.array(z.string()).default([]),
  visitedAt: z.string().datetime(),
  priceRangeAtVisit: z.enum(['€', '€€', '€€€']).optional()
});

export const listSchema = z.object({
  name: z.string().min(2),
  description: z.string().optional(),
  isPublic: z.boolean().default(true)
});

export const mapQuerySchema = z.object({
  minLat: z.coerce.number(),
  maxLat: z.coerce.number(),
  minLng: z.coerce.number(),
  maxLng: z.coerce.number(),
  ratingMin: z.coerce.number().optional()
});
