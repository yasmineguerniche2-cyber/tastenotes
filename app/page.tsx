import { restaurantSummaries, activityFeed } from '@/lib/mock-data';
import { RestaurantCard } from '@/components/restaurant-card';
import { RatingStars } from '@/components/rating-stars';
import { format } from 'date-fns';

export default function HomePage() {
  return (
    <main className="container-pad space-y-8 py-8">
      <section className="space-y-4">
        <div>
          <p className="label">Tasteboxd</p>
          <h1 className="text-3xl font-semibold text-ink">
            Sauvegardez, notez et découvrez les meilleures adresses.
          </h1>
        </div>
        <div className="card p-4">
          <input className="input" placeholder="Rechercher un resto, une ville, une cuisine..." />
          <div className="mt-3 flex gap-2">
            <button className="button">Rechercher</button>
            <button className="button-outline">Autour de moi</button>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold">Trending local</h2>
          <span className="badge">Paris</span>
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          {restaurantSummaries.map((restaurant) => (
            <RestaurantCard key={restaurant.id} restaurant={restaurant} />
          ))}
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Activité de vos abonnements</h2>
        <div className="space-y-4">
          {activityFeed.map((item) => (
            <article key={item.id} className="card p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-semibold text-ink">{item.user}</p>
                  <p className="text-xs text-slate-500">{item.restaurant}</p>
                </div>
                <RatingStars rating={item.rating} />
              </div>
              <p className="mt-3 text-sm text-slate-600">{item.excerpt}</p>
              <p className="mt-3 text-xs text-slate-400">{format(item.createdAt, 'dd MMM yyyy')}</p>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
