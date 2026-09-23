import { Link } from 'react-router-dom'
import Button from './Button.jsx'

/**
 * Yellow wave app-install strip — visual match to Figma (links are decorative / external).
 */
function AppPromo() {
  return (
    <section className="relative overflow-hidden bg-primary-light/15">
      <div
        className="wave-top-mask pointer-events-none absolute inset-x-0 top-0 h-16 bg-white"
        aria-hidden="true"
      />
      <div className="relative mx-auto grid max-w-7xl items-center gap-10 px-4 py-14 sm:px-6 sm:py-16 lg:grid-cols-2 lg:gap-12 lg:py-20">
        <div className="relative mx-auto flex h-64 w-full max-w-md items-end justify-center gap-4 sm:h-80">
          <div className="mb-4 w-[42%] overflow-hidden rounded-[1.5rem] border-[6px] border-text-dark bg-text-dark shadow-card">
            <img
              src="https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=400&q=80"
              alt=""
              className="aspect-[9/16] w-full object-cover"
              loading="lazy"
              decoding="async"
            />
          </div>
          <div className="w-[48%] overflow-hidden rounded-[1.75rem] border-[6px] border-text-dark bg-text-dark shadow-card-hover">
            <img
              src="https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=400&q=80"
              alt=""
              className="aspect-[9/16] w-full object-cover"
              loading="lazy"
              decoding="async"
            />
          </div>
        </div>

        <div className="text-center lg:text-left">
          <h2 className="font-heading text-3xl font-bold text-primary sm:text-4xl lg:text-5xl">
            Install the app
          </h2>
          <p className="mx-auto mt-4 max-w-md text-sm leading-6 text-text-gray sm:text-base lg:mx-0">
            It&apos;s never been easier to order food. Look for the finest discounts and
            you&apos;ll be surprised by the end results.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3 lg:justify-start">
            <a
              href="https://play.google.com/store"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 rounded-lg bg-text-dark px-4 py-2.5 text-left text-white transition hover:bg-text-dark/90"
            >
              <span className="font-heading text-[10px] uppercase tracking-wide text-white/70">
                Get it on
              </span>
              <span className="font-heading text-sm font-bold">Google Play</span>
            </a>
            <a
              href="https://www.apple.com/app-store/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 rounded-lg bg-text-dark px-4 py-2.5 text-left text-white transition hover:bg-text-dark/90"
            >
              <span className="font-heading text-[10px] uppercase tracking-wide text-white/70">
                Download on the
              </span>
              <span className="font-heading text-sm font-bold">App Store</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}

/**
 * Full-bleed yellow order CTA matching the Figma closing banner.
 */
function OrderCtaBanner() {
  return (
    <section className="relative overflow-hidden bg-primary-light">
      <div className="pointer-events-none absolute -left-8 bottom-0 hidden h-40 w-40 opacity-90 sm:block lg:-left-4 lg:h-52 lg:w-52">
        <img
          src="https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=300&q=80"
          alt=""
          className="h-full w-full object-contain"
          loading="lazy"
        />
      </div>
      <div className="pointer-events-none absolute -right-8 bottom-0 hidden h-40 w-40 opacity-90 sm:block lg:-right-4 lg:h-52 lg:w-52">
        <img
          src="https://images.unsplash.com/photo-1573080496219-bb080dd4f877?auto=format&fit=crop&w=300&q=80"
          alt=""
          className="h-full w-full object-contain"
          loading="lazy"
        />
      </div>
      <div className="relative mx-auto flex max-w-3xl flex-col items-center px-4 py-14 text-center sm:px-6 sm:py-16 lg:py-20">
        <h2 className="font-heading text-2xl font-bold leading-snug text-text-dark sm:text-3xl lg:text-4xl">
          Are you ready to order with the best deals?
        </h2>
        <div className="mt-8">
          <Link to="/order">
            <Button icon="arrow" className="uppercase tracking-wide">
              Proceed to order
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}

export { AppPromo, OrderCtaBanner }
