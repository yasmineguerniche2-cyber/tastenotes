import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { mapQuerySchema } from '@/lib/validation';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const parsed = mapQuerySchema.safeParse(Object.fromEntries(searchParams));

  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
  }

  const { minLat, maxLat, minLng, maxLng, ratingMin } = parsed.data;

  const restaurants = await prisma.restaurant.findMany({
    where: {
      lat: { gte: minLat, lte: maxLat },
      lng: { gte: minLng, lte: maxLng }
    },
    include: { reviews: true }
  });

  const payload = restaurants
    .map((restaurant) => {
      const averageRating =
        restaurant.reviews.reduce((sum, review) => sum + review.rating, 0) /
        Math.max(restaurant.reviews.length, 1);
      return {
        id: restaurant.id,
        name: restaurant.name,
        lat: restaurant.lat,
        lng: restaurant.lng,
        averageRating,
        reviewCount: restaurant.reviews.length
      };
    })
    .filter((item) => (ratingMin ? item.averageRating >= ratingMin : true));

  return NextResponse.json(payload);
}
