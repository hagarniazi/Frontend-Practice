import { useNavigate } from 'react-router-dom'
import Button from './Button.jsx'

function PromoBanner({ title, highlightedWord, description, image, imagePosition = 'right' }) {
  const navigate = useNavigate()
  const imageFirst = imagePosition === 'left'

  return (
    <section
      className={`flex flex-col overflow-hidden rounded-2xl bg-white shadow-card ${imageFirst ? 'md:flex-row-reverse' : 'md:flex-row'}`}
    >
      <div className="flex flex-1 flex-col justify-center p-6 sm:p-8 md:p-10 lg:p-12">
        <h2 className="font-heading text-2xl font-bold leading-tight text-text-dark sm:text-3xl lg:text-4xl">
          {title} <span className="text-primary">{highlightedWord}</span>
        </h2>
        <p className="mt-3 max-w-md text-sm leading-6 text-text-gray sm:mt-4 sm:text-base">
          {description}
        </p>
        <div className="mt-6 sm:mt-8">
          <Button
            icon="arrow"
            className="w-full uppercase tracking-wide sm:w-auto"
            onClick={() => navigate('/order')}
          >
            Proceed to order
          </Button>
        </div>
      </div>
      <div className="min-h-52 flex-1 sm:min-h-64 md:min-h-[18rem]">
        <img
          className="h-full min-h-52 w-full object-cover sm:min-h-64 md:min-h-[18rem]"
          src={image}
          alt={highlightedWord}
          loading="lazy"
          decoding="async"
        />
      </div>
    </section>
  )
}

export default PromoBanner
