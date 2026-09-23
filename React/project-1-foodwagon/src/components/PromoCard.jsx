import { Link } from 'react-router-dom'
import Badge from './Badge.jsx'

function PromoCard({ id, image, discountPercent, title, daysRemaining }) {
  const card = (
    <article className="group min-w-0 overflow-hidden rounded-xl bg-white shadow-card transition-all duration-200 hover:-translate-y-1 hover:shadow-card-hover">
      <div className="relative aspect-[4/3]">
        <img
          className="h-full w-full object-cover"
          src={image}
          alt={`${title} promotion`}
          loading="lazy"
          decoding="async"
        />
        <div className="absolute bottom-0 left-0 rounded-tr-xl bg-primary px-3 py-2 font-heading text-sm font-bold text-white sm:px-4 sm:text-base">
          {discountPercent}% <span className="font-semibold">Off</span>
        </div>
      </div>
      <div className="p-4 sm:p-5">
        <h3 className="line-clamp-2 font-heading text-base font-bold text-text-dark transition-colors group-hover:text-primary sm:text-lg">
          {title}
        </h3>
        <div className="mt-3">
          <Badge text={`${daysRemaining} Days Remaining`} type="tomorrow" />
        </div>
      </div>
    </article>
  )

  if (!id) return card

  return (
    <Link
      to={`/meal/${id}`}
      className="block rounded-xl focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
    >
      {card}
    </Link>
  )
}

export default PromoCard
