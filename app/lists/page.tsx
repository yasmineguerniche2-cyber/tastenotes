import { restaurantSummaries } from '@/lib/mock-data';

export default function ListsPage() {
  return (
    <main className="container-pad space-y-6 py-8">
      <div className="flex items-center justify-between">
        <div>
          <p className="label">Listes</p>
          <h1 className="text-2xl font-semibold">Collections thématiques</h1>
        </div>
        <button className="button">Créer une liste</button>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <article className="card p-5 space-y-3">
          <h3 className="text-lg font-semibold">Top ramen Paris</h3>
          <p className="text-sm text-slate-500">5 spots · public</p>
          <div className="flex flex-wrap gap-2">
            {restaurantSummaries.slice(0, 3).map((restaurant) => (
              <span key={restaurant.id} className="badge">
                {restaurant.name}
              </span>
            ))}
          </div>
        </article>
        <article className="card p-5 space-y-3">
          <h3 className="text-lg font-semibold">Brunch cosy</h3>
          <p className="text-sm text-slate-500">4 spots · privé</p>
          <div className="flex flex-wrap gap-2">
            {restaurantSummaries.slice(2, 5).map((restaurant) => (
              <span key={restaurant.id} className="badge">
                {restaurant.name}
              </span>
            ))}
          </div>
        </article>
      </div>
    </main>
  );
}
