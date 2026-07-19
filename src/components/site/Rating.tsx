import { StarIcon } from "../Icons";

export default function Rating({
  value,
  reviews,
  className = "",
}: {
  value: number;
  reviews?: number;
  className?: string;
}) {
  return (
    <span className={`flex items-center gap-1 text-xs ${className}`}>
      <StarIcon className="h-4 w-4 text-gold-500" />
      <span className="font-bold text-navy-800">{value.toFixed(1)}</span>
      {reviews !== undefined && (
        <span className="text-muted">({reviews.toLocaleString()})</span>
      )}
    </span>
  );
}
