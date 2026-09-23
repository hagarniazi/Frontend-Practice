import { Link } from 'react-router-dom'
import Icon from './Icon.jsx'

function PopularItemCard({ id, image, name, restaurantName, price, priority = false }) {
  const card = (
    <article className="group flex h-full flex-col overflow-hidden rounded-xl bg-white shadow-card transition-all duration-200 hover:-translate-y-1 hover:shadow-card-hover">
      <img
        className="aspect-square w-full object-cover"
        src={image}
        alt={name}
        loading={priority ? 'eager' : 'lazy'}
        decoding="async"
      />
      <div className="flex flex-1 flex-col p-4">
        <h3 className="line-clamp-2 font-heading text-base font-bold text-text-dark sm:text-lg">
          {name}
        </h3>
        <p className="mt-1.5 flex items-center gap-1 truncate text-sm text-primary">
          <Icon name="location" className="h-4 w-4 shrink-0" />
          <span className="truncate">{restaurantName}</span>
        </p>
        <p className="mt-3 font-heading text-lg font-bold text-text-dark">{price}</p>
        <span className="mt-auto inline-flex w-full items-center justify-center gap-2 rounded-lg bg-primary px-6 py-3 font-heading text-sm font-semibold text-white shadow-cta transition-all duration-200 group-hover:brightness-95">
          Order Now
        </span>
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

export default PopularItemCard
