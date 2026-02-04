import { NextResponse } from 'next/server';

const cache = new Map<string, unknown>();

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get('q');

  if (!query) {
    return NextResponse.json({ error: 'Missing query' }, { status: 400 });
  }

  if (cache.has(query)) {
    return NextResponse.json(cache.get(query));
  }

  const response = await fetch(
    `https://nominatim.openstreetmap.org/search?format=json&limit=5&q=${encodeURIComponent(query)}`,
    {
      headers: {
        'User-Agent': 'Tasteboxd/0.1 (demo)'
      }
    }
  );

  const data = await response.json();
  cache.set(query, data);
  return NextResponse.json(data);
}
