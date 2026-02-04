import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { reviewSchema } from '@/lib/validation';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const restaurantId = searchParams.get('restaurantId');
  const authorId = searchParams.get('authorId');

  const reviews = await prisma.review.findMany({
    where: {
      restaurantId: restaurantId ?? undefined,
      authorId: authorId ?? undefined
    },
    include: {
      author: true,
      restaurant: true,
      tags: { include: { tag: true } }
    },
    orderBy: { createdAt: 'desc' }
  });

  return NextResponse.json(
    reviews.map((review) => ({
      id: review.id,
      rating: review.rating,
      text: review.text,
      visitedAt: review.visitedAt,
      author: review.author.displayName,
      restaurant: review.restaurant.name,
      tags: review.tags.map((tag) => tag.tag.name)
    }))
  );
}

export async function POST(request: Request) {
  const body = await request.json();
  const parsed = reviewSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
  }

  const review = await prisma.review.create({
    data: {
      restaurantId: parsed.data.restaurantId,
      authorId: parsed.data.authorId ?? 'demo-user',
      rating: parsed.data.rating,
      text: parsed.data.text,
      visitedAt: new Date(parsed.data.visitedAt)
    }
  });

  return NextResponse.json({ id: review.id }, { status: 201 });
}
