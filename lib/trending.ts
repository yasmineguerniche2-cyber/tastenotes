export function trendingScore({
  averageRating,
  reviewCount,
  recentReviews,
  daysSinceLastReview
}: {
  averageRating: number;
  reviewCount: number;
  recentReviews: number;
  daysSinceLastReview: number;
}) {
  const ratingWeight = averageRating * 2;
  const volumeWeight = Math.log10(reviewCount + 1) * 3;
  const recencyBoost = Math.max(0, 10 - daysSinceLastReview) * 0.4;
  const recentActivity = Math.sqrt(recentReviews) * 1.5;
  return Number((ratingWeight + volumeWeight + recencyBoost + recentActivity).toFixed(2));
}
