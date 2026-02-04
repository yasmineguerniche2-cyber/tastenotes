import dynamic from 'next/dynamic';
import { restaurantSummaries } from '@/lib/mock-data';
import { RestaurantCard } from '@/components/restaurant-card';

const MapExplorer = dynamic(() => import('@/components/map-explorer').then((mod) => mod.MapExplorer), {
  ssr: false
});

export default function MapPage() {
  return (
    <main className="container-pad space-y-6 py-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="label">Explorer</p>
          <h1 className="text-2xl font-semibold">Carte + liste synchronisées</h1>
        </div>
        <button className="button-outline">Filtres</button>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="space-y-4">
          {restaurantSummaries.map((restaurant) => (
            <RestaurantCard key={restaurant.id} restaurant={restaurant} />
          ))}
        </div>
        <div className="card h-[480px] overflow-hidden">
          <MapExplorer restaurants={restaurantSummaries} />
        </div>
      </div>
    </main>
  );
}
