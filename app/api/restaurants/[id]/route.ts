import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(_: Request, { params }: { params: { id: string } }) {
  const restaurant = await prisma.restaurant.findUnique({
    where: { id: params.id },
    include: {
      reviews: { include: { author: true } },
      tags: { include: { tag: true } }
    }
  });

  if (!restaurant) {
    return NextResponse.json({ error: 'Restaurant not found' }, { status: 404 });
  }

  const averageRating =
    restaurant.reviews.reduce((sum, review) => sum + review.rating, 0) /
    Math.max(restaurant.reviews.length, 1);

  return NextResponse.json({
    id: restaurant.id,
    name: restaurant.name,
    address: restaurant.addressLine1,
    city: restaurant.city,
    cuisine: restaurant.cuisine,
    priceRange: restaurant.priceRange,
    averageRating,
    reviews: restaurant.reviews.map((review) => ({
      id: review.id,
      rating: review.rating,
      text: review.text,
      author: review.author.displayName,
      visitedAt: review.visitedAt
    })),
    tags: restaurant.tags.map((tag) => tag.tag.name)
  });
}
