/**
 * Shimmering card-shaped placeholders for Home / search grids.
 * Prefer these over Spinner for section-level card loading.
 */
function Shimmer({ className = '' }) {
  return <div className={`animate-shimmer rounded-xl bg-bg-cream ${className}`} aria-hidden="true" />
}

function PopularItemSkeleton() {
  return (
    <div className="overflow-hidden rounded-xl bg-white shadow-soft">
      <Shimmer className="aspect-square w-full rounded-none" />
      <div className="space-y-3 p-4">
        <Shimmer className="h-5 w-3/4" />
        <Shimmer className="h-4 w-1/2" />
        <Shimmer className="h-5 w-1/4" />
        <Shimmer className="h-11 w-full rounded-lg" />
      </div>
    </div>
  )
}

function PromoSkeleton() {
  return (
    <div className="overflow-hidden rounded-xl bg-white shadow-soft">
      <Shimmer className="aspect-[4/3] w-full rounded-none" />
      <div className="space-y-3 p-4">
        <Shimmer className="h-5 w-2/3" />
        <Shimmer className="h-7 w-40 rounded-md" />
      </div>
    </div>
  )
}

function RestaurantSkeleton() {
  return (
    <div className="overflow-hidden rounded-xl bg-white shadow-soft">
      <Shimmer className="aspect-[16/10] w-full rounded-none" />
      <div className="space-y-3 p-4">
        <div className="flex items-center gap-3">
          <Shimmer className="h-11 w-11 shrink-0 rounded-full" />
          <Shimmer className="h-5 w-2/3" />
        </div>
        <Shimmer className="h-7 w-28 rounded-md" />
      </div>
    </div>
  )
}

function CategorySkeleton() {
  return (
    <div className="w-28 shrink-0 text-center sm:w-32">
      <Shimmer className="aspect-square w-full rounded-full" />
      <Shimmer className="mx-auto mt-3 h-4 w-16" />
    </div>
  )
}

function CardSkeletonGrid({ variant = 'popular', count = 4, scroll = false }) {
  const Skeleton =
    variant === 'promo'
      ? PromoSkeleton
      : variant === 'restaurant'
        ? RestaurantSkeleton
        : variant === 'category'
          ? CategorySkeleton
          : PopularItemSkeleton

  if (scroll || variant === 'category') {
    return (
      <div
        className="flex gap-5 overflow-hidden pb-3"
        role="status"
        aria-label="Loading content"
      >
        {Array.from({ length: count }, (_, i) => (
          <div
            key={i}
            className={variant === 'category' ? 'shrink-0' : 'w-64 shrink-0'}
          >
            <Skeleton />
          </div>
        ))}
      </div>
    )
  }

  return (
    <div
      className="grid gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-4"
      role="status"
      aria-label="Loading content"
    >
      {Array.from({ length: count }, (_, i) => (
        <Skeleton key={i} />
      ))}
    </div>
  )
}

export default CardSkeletonGrid
export { PopularItemSkeleton, PromoSkeleton, RestaurantSkeleton, CategorySkeleton }
