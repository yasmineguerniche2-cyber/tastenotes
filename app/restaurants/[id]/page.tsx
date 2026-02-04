import { restaurantSummaries, reviewSummaries } from '@/lib/mock-data';
import { RatingStars } from '@/components/rating-stars';
import { ReviewCard } from '@/components/review-card';
import Link from 'next/link';

export default function RestaurantDetailPage({ params }: { params: { id: string } }) {
  const restaurant = restaurantSummaries.find((item) => item.slug === params.id) ?? restaurantSummaries[0];

  return (
    <main className="container-pad space-y-6 py-8">
      <section className="card p-6 space-y-3">
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-ink">{restaurant.name}</h1>
            <p className="text-sm text-slate-500">{restaurant.city}</p>
          </div>
          <span className="badge">{restaurant.priceRange}</span>
        </div>
        <RatingStars rating={restaurant.averageRating} />
        <div className="flex flex-wrap gap-2">
          {restaurant.tags.map((tag) => (
            <span key={tag} className="badge">
              {tag}
            </span>
          ))}
        </div>
        <div className="flex gap-2">
          <Link href="/reviews/new" className="button">
            Ajouter un avis
          </Link>
          <button className="button-outline">Ajouter à une liste</button>
        </div>
      </section>

      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold">Avis récents</h2>
          <span className="badge">{restaurant.reviewCount} avis</span>
        </div>
        <div className="space-y-4">
          {reviewSummaries.map((review) => (
            <ReviewCard key={review.id} review={review} />
          ))}
        </div>
      </section>
    </main>
  );
}
