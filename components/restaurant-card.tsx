import type { RestaurantSummary } from '@/lib/types';
import { RatingStars } from '@/components/rating-stars';
import Link from 'next/link';

export function RestaurantCard({ restaurant }: { restaurant: RestaurantSummary }) {
  return (
    <Link href={`/restaurants/${restaurant.slug}`} className="card block overflow-hidden">
      <div className="p-4">
        <div className="flex items-start justify-between">
          <div>
            <h3 className="text-lg font-semibold text-ink">{restaurant.name}</h3>
            <p className="text-sm text-slate-500">{restaurant.city}</p>
          </div>
          <span className="badge">{restaurant.priceRange}</span>
        </div>
        <div className="mt-3 flex items-center justify-between">
          <RatingStars rating={restaurant.averageRating} />
          <span className="text-xs text-slate-500">{restaurant.reviewCount} avis</span>
        </div>
        <div className="mt-4 flex flex-wrap gap-2">
          {restaurant.tags.map((tag) => (
            <span key={tag} className="badge">
              {tag}
            </span>
          ))}
        </div>
      </div>
    </Link>
  );
}
