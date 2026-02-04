import type { ReviewSummary } from '@/lib/types';
import { RatingStars } from '@/components/rating-stars';
import { format } from 'date-fns';

export function ReviewCard({ review }: { review: ReviewSummary }) {
  return (
    <article className="card p-4">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-semibold text-ink">{review.author}</p>
          <p className="text-xs text-slate-500">{format(review.visitedAt, 'dd MMM yyyy')}</p>
        </div>
        <RatingStars rating={review.rating} />
      </div>
      <p className="mt-3 text-sm text-slate-600">{review.text}</p>
      <div className="mt-4 flex flex-wrap gap-2">
        {review.tags.map((tag) => (
          <span key={tag} className="badge">
            {tag}
          </span>
        ))}
      </div>
    </article>
  );
}
