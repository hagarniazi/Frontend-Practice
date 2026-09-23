import { Link } from 'react-router-dom'
import Badge from './Badge.jsx'
import Icon from './Icon.jsx'

function RestaurantCard({
  id,
  image,
  discountBadge,
  speedBadge,
  restaurantLogo,
  restaurantName,
  rating,
  statusBadge = 'open',
}) {
  const statusText = statusBadge === 'open' ? 'Open Now' : 'Opens tomorrow'

  const card = (
    <article className="group flex h-full flex-col overflow-hidden rounded-xl bg-white shadow-card transition-all duration-200 hover:-translate-y-1 hover:shadow-card-hover">
      <div className="relative">
        <img
          className="aspect-[16/10] w-full object-cover"
          src={image}
          alt={`${restaurantName} featured meal`}
          loading="lazy"
          decoding="async"
        />
        <div className="absolute left-2 top-2 flex max-w-[calc(100%-1rem)] flex-wrap gap-1.5 sm:left-3 sm:top-3 sm:gap-2">
          <Badge text={discountBadge} type="discount" />
          <Badge text={speedBadge} type="fast" />
        </div>
      </div>
      <div className="flex flex-1 flex-col p-4">
        <div className="flex items-start justify-between gap-3">
          <div className="flex min-w-0 items-center gap-3">
            <img
              className="h-11 w-11 shrink-0 rounded-full object-cover ring-2 ring-bg-muted"
              src={restaurantLogo}
              alt=""
              loading="lazy"
              decoding="async"
            />
            <h3 className="line-clamp-2 font-heading text-base font-bold text-text-dark sm:text-lg">
              {restaurantName}
            </h3>
          </div>
          <span className="flex shrink-0 items-center gap-1 font-heading text-sm font-semibold text-star-gold">
            <Icon name="star" className="h-4 w-4" filled />
            <span aria-label={`Rating ${rating}`}>{rating}</span>
          </span>
        </div>
        <div className="mt-4">
          <Badge text={statusText} type={statusBadge} />
        </div>
      </div>
    </article>
  )

  if (!id) return card

  return (
    <Link
      to={`/meal/${id}`}
      className="block h-full rounded-xl focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
    >
      {card}
    </Link>
  )
}

export default RestaurantCard
