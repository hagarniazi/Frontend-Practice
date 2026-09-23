import { useState } from 'react'
import { Link } from 'react-router-dom'
import Icon from './Icon.jsx'

function slugify(label) {
  return encodeURIComponent(label)
}

const cities = [
  'San Francisco',
  'Miami',
  'San Diego',
  'East Bay',
  'Long Beach',
  'Los Angeles',
  'Washington DC',
  'Seattle',
]

const columns = [
  { title: 'Company', links: ['About us', 'Team', 'Careers', 'Blog'] },
  { title: 'Contact', links: ['Help & Support', 'Partner with us', 'Ride with us'] },
  { title: 'Legal', links: ['Terms & Conditions', 'Refund & Cancellation', 'Privacy Policy'] },
]

function Footer() {
  const [subscribed, setSubscribed] = useState(false)
  const [email, setEmail] = useState('')

  function handleSubscribe(event) {
    event.preventDefault()
    if (!email.trim()) return
    setSubscribed(true)
    setEmail('')
  }

  return (
    <footer className="bg-footer-dark text-white">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-14 lg:py-16">
        <section>
          <h2 className="font-heading text-lg font-bold">Our top cities</h2>
          <div className="mt-5 grid grid-cols-2 gap-x-4 gap-y-3 text-sm text-white/70 sm:grid-cols-4">
            {cities.map((city) => (
              <Link
                key={city}
                to={`/page-not-built?title=${slugify(city)}`}
                className="transition hover:text-primary-light"
              >
                {city}
              </Link>
            ))}
          </div>
        </section>

        <div className="my-10 h-px bg-white/15" />

        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {columns.map((column) => (
            <section key={column.title}>
              <h2 className="font-heading font-bold">{column.title}</h2>
              <ul className="mt-4 space-y-3 text-sm text-white/65">
                {column.links.map((link) => (
                  <li key={link}>
                    <Link
                      to={`/page-not-built?title=${slugify(link)}`}
                      className="transition hover:text-primary-light"
                    >
                      {link}
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          ))}

          <section>
            <h2 className="font-heading font-bold">Follow us</h2>
            <div className="mt-4 flex gap-3 text-primary-light">
              <a
                href="https://www.facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Follow us on Facebook (opens in a new tab)"
                className="transition hover:text-white"
              >
                <Icon name="facebook" />
              </a>
              <a
                href="https://www.instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Follow us on Instagram (opens in a new tab)"
                className="transition hover:text-white"
              >
                <Icon name="instagram" />
              </a>
            </div>
            <p className="mt-6 text-sm text-white/65">Receive exclusive offers in your mailbox.</p>
            <form
              className="mt-3 flex flex-col gap-2 rounded-lg bg-white/10 p-1.5 sm:flex-row sm:items-stretch"
              onSubmit={handleSubscribe}
            >
              <label className="sr-only" htmlFor="footer-email">
                Email address
              </label>
              <input
                id="footer-email"
                type="email"
                required
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value)
                  setSubscribed(false)
                }}
                className="min-w-0 flex-1 rounded-md bg-transparent px-3 py-2.5 text-sm text-white outline-none placeholder:text-white/40"
                placeholder="Enter Your email"
                autoComplete="email"
              />
              <button
                type="submit"
                className="rounded-md bg-primary px-4 py-2.5 font-heading text-xs font-semibold text-white shadow-cta transition hover:brightness-95 active:scale-[0.98]"
              >
                Subscribe
              </button>
            </form>
            {subscribed && (
              <p className="mt-2 text-sm text-primary-light" role="status">
                Thanks! You&apos;re on the list (mock subscribe).
              </p>
            )}
          </section>
        </div>

        <div className="mt-12 border-t border-white/15 pt-6 text-center text-sm text-white/55">
          All rights Reserved © {new Date().getFullYear()} Foodwagon
        </div>
      </div>
    </footer>
  )
}

export default Footer
