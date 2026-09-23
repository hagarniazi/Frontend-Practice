/**
 * Category thumbnail circle. Optional onClick makes it a filter control.
 */
function CategoryCircle({ image, label, onClick, selected = false }) {
  const ringClass = selected
    ? 'ring-4 ring-primary ring-offset-2'
    : 'ring-0 group-hover:ring-2 group-hover:ring-primary/40 group-hover:ring-offset-2'

  const content = (
    <>
      <img
        className={`aspect-square w-full rounded-full object-cover shadow-soft transition-transform duration-200 group-hover:scale-105 ${ringClass}`}
        src={image}
        alt={`${label} category`}
        loading="lazy"
        decoding="async"
      />
      <h3
        className={`mt-3 font-heading text-sm font-bold transition-colors sm:text-base ${selected ? 'text-primary' : 'text-text-dark group-hover:text-primary'}`}
      >
        {label}
      </h3>
    </>
  )

  if (onClick) {
    return (
      <button
        type="button"
        onClick={onClick}
        aria-pressed={selected}
        aria-label={`Filter by ${label}`}
        className="group w-28 shrink-0 text-center transition-transform duration-200 hover:-translate-y-0.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 sm:w-32"
      >
        {content}
      </button>
    )
  }

  return <article className="group w-28 shrink-0 text-center sm:w-32">{content}</article>
}

export default CategoryCircle
