import { Link } from 'react-router-dom'
import Button from '../components/Button.jsx'

function NotFound() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-16 text-center sm:px-6 sm:py-24">
      <p className="font-heading text-6xl font-bold text-primary">404</p>
      <h1 className="mt-4 font-heading text-2xl font-bold text-text-dark sm:text-3xl">
        Page not found
      </h1>
      <p className="mx-auto mt-3 max-w-md text-text-gray">
        The page you are looking for doesn&apos;t exist or may have been moved.
      </p>
      <div className="mt-8">
        <Link to="/">
          <Button icon="arrow">Back to Home</Button>
        </Link>
      </div>
    </div>
  )
}

export default NotFound
