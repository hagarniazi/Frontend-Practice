import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Button from '../components/Button.jsx'
import { useAuth } from '../context/AuthContext.jsx'

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

function Login() {
  const { login, isAuthenticated, user } = useAuth()
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errors, setErrors] = useState({})
  const [formError, setFormError] = useState('')
  const [submitting, setSubmitting] = useState(false)

  if (isAuthenticated) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-bg-cream px-4 py-10">
        <div className="w-full max-w-md rounded-2xl border border-gray-100 bg-white p-8 text-center shadow-xl md:p-10">
          <h1 className="font-heading text-2xl font-bold text-text-dark">You are signed in</h1>
          <p className="mt-2 text-text-gray">Welcome back, {user?.name}.</p>
          <div className="mt-8">
            <Button onClick={() => navigate('/')}>Go to Home</Button>
          </div>
        </div>
      </div>
    )
  }

  function validate() {
    const next = {}
    if (!email.trim()) next.email = 'Email is required.'
    else if (!EMAIL_RE.test(email.trim())) next.email = 'Enter a valid email address.'
    if (!password) next.password = 'Password is required.'
    else if (password.length < 6) next.password = 'Password must be at least 6 characters.'
    setErrors(next)
    return Object.keys(next).length === 0
  }

  async function handleSubmit(event) {
    event.preventDefault()
    setFormError('')
    if (!validate()) return

    setSubmitting(true)
    try {
      await login({ email, password })
      navigate('/')
    } catch {
      setFormError('Something went wrong. Please try again.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-bg-cream px-4 py-10">
      <div className="w-full max-w-md rounded-2xl border border-gray-100 bg-white p-8 shadow-xl md:p-10">
        <h1 className="font-heading text-3xl font-bold text-text-dark">Login</h1>
        <p className="mt-2 text-sm text-text-gray">
          Mock sign-in — no backend. Any valid email and 6+ character password works.
        </p>

        <form className="mt-8 space-y-5" onSubmit={handleSubmit} noValidate>
          {formError && (
            <p className="rounded-xl bg-warning-bg px-4 py-3 text-sm text-warning" role="alert">
              {formError}
            </p>
          )}

          <div>
            <label htmlFor="login-email" className="font-heading text-sm font-semibold text-text-dark">
              Email
            </label>
            <input
              id="login-email"
              type="email"
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-2 w-full rounded-xl border border-bg-cream bg-bg-cream px-4 py-3 text-sm text-text-dark outline-none focus:ring-2 focus:ring-primary"
              placeholder="you@example.com"
            />
            {errors.email && (
              <p className="mt-1 text-sm text-warning" role="alert">
                {errors.email}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="login-password"
              className="font-heading text-sm font-semibold text-text-dark"
            >
              Password
            </label>
            <input
              id="login-password"
              type="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-2 w-full rounded-xl border border-bg-cream bg-bg-cream px-4 py-3 text-sm text-text-dark outline-none focus:ring-2 focus:ring-primary"
              placeholder="At least 6 characters"
            />
            {errors.password && (
              <p className="mt-1 text-sm text-warning" role="alert">
                {errors.password}
              </p>
            )}
          </div>

          <Button type="submit" className="w-full rounded-lg" disabled={submitting}>
            {submitting ? 'Signing in…' : 'Login'}
          </Button>
        </form>

        <p className="mt-6 text-center text-sm text-text-gray">
          Don&apos;t have an account?{' '}
          <Link to="/signup" className="font-semibold text-primary hover:underline">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  )
}

export default Login
