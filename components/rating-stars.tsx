export function RatingStars({ rating }: { rating: number }) {
  const normalized = Math.round(rating * 2) / 2;
  const full = Math.floor(normalized);
  const half = normalized % 1 !== 0;

  return (
    <div className="flex items-center gap-1">
      {Array.from({ length: 5 }).map((_, index) => {
        const starIndex = index + 1;
        let label = '☆';
        if (starIndex <= full) label = '★';
        if (starIndex === full + 1 && half) label = '⯨';
        return (
          <span key={starIndex} className="text-lg text-brand-600">
            {label}
          </span>
        );
      })}
      <span className="text-xs text-slate-500">{normalized.toFixed(1)}</span>
    </div>
  );
}
