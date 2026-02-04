import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { listSchema } from '@/lib/validation';

export async function GET() {
  const lists = await prisma.list.findMany({
    include: { items: { include: { restaurant: true } }, owner: true }
  });

  return NextResponse.json(
    lists.map((list) => ({
      id: list.id,
      name: list.name,
      description: list.description,
      owner: list.owner.displayName,
      items: list.items.map((item) => ({
        id: item.id,
        restaurant: item.restaurant.name,
        note: item.note
      }))
    }))
  );
}

export async function POST(request: Request) {
  const body = await request.json();
  const parsed = listSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
  }

  const list = await prisma.list.create({
    data: {
      name: parsed.data.name,
      description: parsed.data.description,
      isPublic: parsed.data.isPublic,
      ownerId: 'demo-user'
    }
  });

  return NextResponse.json({ id: list.id }, { status: 201 });
}
