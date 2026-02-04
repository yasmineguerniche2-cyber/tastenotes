'use client';

import { useState } from 'react';

type GeoResult = {
  display_name: string;
  lat: string;
  lon: string;
};

export default function NewRestaurantPage() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<GeoResult[]>([]);
  const [selected, setSelected] = useState<GeoResult | null>(null);

  const handleSearch = async () => {
    const response = await fetch(`/api/geocode?q=${encodeURIComponent(query)}`);
    const data = (await response.json()) as GeoResult[];
    setResults(data);
  };

  return (
    <main className="container-pad space-y-6 py-8">
      <div>
        <p className="label">Nouveau restaurant</p>
        <h1 className="text-2xl font-semibold">Proposer une adresse</h1>
      </div>

      <section className="card space-y-4 p-6">
        <div>
          <label className="label">Nom</label>
          <input className="input" placeholder="Nom du restaurant" />
        </div>
        <div>
          <label className="label">Adresse</label>
          <div className="flex gap-2">
            <input
              className="input"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Adresse ou quartier"
            />
            <button className="button-outline" type="button" onClick={handleSearch}>
              Géocoder
            </button>
          </div>
          {results.length > 0 && (
            <div className="mt-3 space-y-2">
              {results.map((result) => (
                <button
                  key={result.display_name}
                  type="button"
                  onClick={() => setSelected(result)}
                  className="button-outline w-full text-left"
                >
                  {result.display_name}
                </button>
              ))}
            </div>
          )}
          {selected && (
            <p className="mt-2 text-xs text-slate-500">
              Coordonnées: {selected.lat}, {selected.lon}
            </p>
          )}
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <label className="label">Cuisine</label>
            <input className="input" placeholder="Italien, ramen..." />
          </div>
          <div>
            <label className="label">Gamme de prix</label>
            <select className="input">
              <option>€</option>
              <option>€€</option>
              <option>€€€</option>
            </select>
          </div>
        </div>
        <button className="button" type="button">
          Envoyer pour validation
        </button>
      </section>
    </main>
  );
}
