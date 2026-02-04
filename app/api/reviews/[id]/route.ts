import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { reviewSchema } from '@/lib/validation';

export async function PATCH(request: Request, { params }: { params: { id: string } }) {
  const body = await request.json();
  const parsed = reviewSchema.partial().safeParse(body);

  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
  }

  const review = await prisma.review.update({
    where: { id: params.id },
    data: {
      rating: parsed.data.rating,
      text: parsed.data.text,
      visitedAt: parsed.data.visitedAt ? new Date(parsed.data.visitedAt) : undefined
    }
  });

  return NextResponse.json({ id: review.id });
}

export async function DELETE(_: Request, { params }: { params: { id: string } }) {
  await prisma.review.delete({ where: { id: params.id } });
  return NextResponse.json({ status: 'deleted' });
}
