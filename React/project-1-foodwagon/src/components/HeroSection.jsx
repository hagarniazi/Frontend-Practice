import { useState } from 'react'
import Button from './Button.jsx'
import Icon from './Icon.jsx'

/**
 * Hero with food search. Controlled from Home so results live next to other page state.
 */
function HeroSection({
  image = 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?auto=format&fit=crop&w=900&q=80',
  searchValue = '',
  onSearchChange,
  onSearchSubmit,
}) {
  const [mode, setMode] = useState('delivery')

  function handleSubmit(event) {
    event.preventDefault()
    onSearchSubmit?.(searchValue)
  }

  return (
    <section className="relative overflow-hidden bg-primary-light">
      <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 pb-16 pt-12 sm:px-6 sm:pb-20 sm:pt-14 md:grid-cols-2 md:gap-12 lg:pb-24 lg:pt-16">
        <div className="relative z-10 min-w-0">
          <h1 className="font-heading text-4xl font-bold leading-[1.1] tracking-tight text-white sm:text-5xl lg:text-6xl">
            Are you starving?
          </h1>
          <p className="mt-4 max-w-lg text-base font-medium text-white/90 sm:text-lg">
            Within a few clicks, find meals that are accessible near you
          </p>
          <form
            className="mt-8 rounded-2xl bg-white p-4 shadow-card sm:mt-10 sm:p-5"
            onSubmit={handleSubmit}
            role="search"
          >
            <div
              className="mb-4 flex gap-2 border-b border-bg-muted pb-3"
              role="tablist"
              aria-label="Order mode"
            >
              <button
                type="button"
                role="tab"
                aria-selected={mode === 'delivery'}
                onClick={() => setMode('delivery')}
                className={`inline-flex items-center gap-2 rounded-lg px-3 py-2 font-heading text-xs font-semibold transition sm:px-4 sm:text-sm ${
                  mode === 'delivery'
                    ? 'bg-warning-bg text-primary'
                    : 'text-text-gray hover:bg-bg-muted'
                }`}
              >
                <Icon name="delivery" className="h-4 w-4" />
                Delivery
              </button>
              <button
                type="button"
                role="tab"
                aria-selected={mode === 'pickup'}
                onClick={() => setMode('pickup')}
                className={`inline-flex items-center gap-2 rounded-lg px-3 py-2 font-heading text-xs font-semibold transition sm:px-4 sm:text-sm ${
                  mode === 'pickup'
                    ? 'bg-warning-bg text-primary'
                    : 'text-text-gray hover:bg-bg-muted'
                }`}
              >
                <Icon name="cart" className="h-4 w-4" />
                Pickup
              </button>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row sm:items-stretch">
              <label className="flex flex-1 items-center gap-2 rounded-lg bg-bg-muted px-3">
                <span className="sr-only">Search for a dish</span>
                <Icon name="search" className="h-5 w-5 shrink-0 text-primary" />
                <input
                  className="w-full min-w-0 bg-transparent py-3.5 text-sm text-text-dark outline-none placeholder:text-text-gray"
                  placeholder="Search for a dish..."
                  value={searchValue}
                  onChange={(event) => onSearchChange?.(event.target.value)}
                  autoComplete="off"
                />
              </label>
              <Button type="submit" className="w-full shrink-0 px-6 sm:w-auto" icon="search">
                Find Food
              </Button>
            </div>
          </form>
        </div>
        <div className="relative mx-auto hidden w-full max-w-md md:block lg:max-w-lg">
          <div className="aspect-square overflow-hidden rounded-full shadow-[0_20px_40px_rgba(33,33,33,0.22)] ring-[10px] ring-white/35">
            <img
              className="h-full w-full object-cover"
              src={image}
              alt="Fresh noodles ready for delivery"
              fetchPriority="high"
              decoding="async"
            />
          </div>
        </div>
      </div>
    </section>
  )
}

export default HeroSection
