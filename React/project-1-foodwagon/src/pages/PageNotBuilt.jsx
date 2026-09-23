import { Link, useSearchParams } from 'react-router-dom'
import Button from '../components/Button.jsx'

/**
 * Friendly placeholder for footer / marketing links with no real content yet.
 * Route: /page-not-built?title=About%20us
 */
function PageNotBuilt() {
  const [params] = useSearchParams()
  const title = params.get('title') || 'This page'

  return (
    <div className="mx-auto max-w-7xl px-4 py-16 text-center sm:px-6 sm:py-24">
      <p className="font-heading text-sm font-semibold uppercase tracking-wide text-primary">
        Coming soon
      </p>
      <h1 className="mt-3 font-heading text-2xl font-bold text-text-dark sm:text-3xl">
        {title}
      </h1>
      <p className="mx-auto mt-3 max-w-md text-text-gray">
        We&apos;re still cooking this page. Check back later — or head home and find something tasty.
      </p>
      <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
        <Link to="/">
          <Button icon="arrow">Back to Home</Button>
        </Link>
        <Link to="/restaurants">
          <Button variant="outline">Browse restaurants</Button>
        </Link>
      </div>
    </div>
  )
}

export default PageNotBuilt
