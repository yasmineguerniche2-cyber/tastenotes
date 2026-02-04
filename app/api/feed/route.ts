import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { trendingScore } from '@/lib/trending';

export async function GET() {
  const reviews = await prisma.review.findMany({
    include: { author: true, restaurant: { include: { reviews: true } } },
    orderBy: { createdAt: 'desc' },
    take: 10
  });

  const payload = reviews.map((review) => {
    const recentReviews = review.restaurant.reviews.filter(
      (item) => item.createdAt > new Date(Date.now() - 1000 * 60 * 60 * 24 * 7)
    ).length;

    return {
      id: review.id,
      author: review.author.displayName,
      restaurant: review.restaurant.name,
      rating: review.rating,
      text: review.text,
      trendingScore: trendingScore({
        averageRating:
          review.restaurant.reviews.reduce((sum, item) => sum + item.rating, 0) /
          Math.max(review.restaurant.reviews.length, 1),
        reviewCount: review.restaurant.reviews.length,
        recentReviews,
        daysSinceLastReview: Math.floor(
          (Date.now() - review.createdAt.getTime()) / (1000 * 60 * 60 * 24)
        )
      })
    };
  });

  return NextResponse.json(payload);
}
