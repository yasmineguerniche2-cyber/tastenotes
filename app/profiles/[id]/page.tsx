import { restaurantSummaries } from '@/lib/mock-data';
import { RestaurantCard } from '@/components/restaurant-card';

export default function ProfilePage() {
  return (
    <main className="container-pad space-y-6 py-8">
      <section className="card p-6 space-y-3">
        <div className="flex items-center gap-4">
          <div className="h-16 w-16 rounded-full bg-brand-100 text-2xl font-semibold text-brand-600 flex items-center justify-center">
            MA
          </div>
          <div>
            <h1 className="text-2xl font-semibold">Marie Arnaud</h1>
            <p className="text-sm text-slate-500">Paris · 42 avis · 4.2 moyenne</p>
          </div>
        </div>
        <p className="text-sm text-slate-600">
          Fan de cuisine italienne et de spots cachés dans le 11e. Je garde tout ici.
        </p>
        <div className="flex gap-2">
          <button className="button">Suivre</button>
          <button className="button-outline">Message</button>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Restaurants notés</h2>
        <div className="grid gap-4 md:grid-cols-2">
          {restaurantSummaries.map((restaurant) => (
            <RestaurantCard key={restaurant.id} restaurant={restaurant} />
          ))}
        </div>
      </section>
    </main>
  );
}
