import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { restaurantSchema } from '@/lib/validation';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get('q') ?? '';
  const city = searchParams.get('city');

  const restaurants = await prisma.restaurant.findMany({
    where: {
      name: query ? { contains: query, mode: 'insensitive' } : undefined,
      city: city ?? undefined
    },
    include: {
      reviews: true,
      tags: { include: { tag: true } }
    },
    take: 20
  });

  const payload = restaurants.map((restaurant) => {
    const averageRating =
      restaurant.reviews.reduce((sum, review) => sum + review.rating, 0) /
      Math.max(restaurant.reviews.length, 1);

    return {
      id: restaurant.id,
      name: restaurant.name,
      slug: restaurant.slug,
      city: restaurant.city,
      priceRange: restaurant.priceRange,
      averageRating,
      reviewCount: restaurant.reviews.length,
      tags: restaurant.tags.map((tag) => tag.tag.name)
    };
  });

  return NextResponse.json(payload);
}

export async function POST(request: Request) {
  const body = await request.json();
  const parsed = restaurantSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
  }

  const restaurant = await prisma.restaurant.create({
    data: {
      name: parsed.data.name,
      slug: parsed.data.name.toLowerCase().replace(/\s+/g, '-'),
      addressLine1: parsed.data.address,
      city: parsed.data.city,
      lat: parsed.data.lat,
      lng: parsed.data.lng,
      cuisine: parsed.data.cuisine,
      priceRange:
        parsed.data.priceRange === '€'
          ? 'EURO'
          : parsed.data.priceRange === '€€'
          ? 'EURO_EURO'
          : 'EURO_EURO_EURO',
      phone: parsed.data.phone,
      website: parsed.data.website
    }
  });

  return NextResponse.json({ id: restaurant.id }, { status: 201 });
}
