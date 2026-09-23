import { createContext, useCallback, useContext, useMemo, useState } from 'react'

const AuthContext = createContext(null)
const STORAGE_KEY = 'foodwagon-user'

function readStoredUser() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return null
    const parsed = JSON.parse(raw)
    if (parsed && typeof parsed.email === 'string') return parsed
    return null
  } catch {
    return null
  }
}

function nameFromEmail(email) {
  const local = String(email).split('@')[0] || 'Guest'
  return local
    .replace(/[._-]+/g, ' ')
    .replace(/\b\w/g, (c) => c.toUpperCase())
}

function delay(ms = 700) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

/**
 * Mock auth — no backend. Persists { name, email } to localStorage.
 */
export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => readStoredUser())

  const login = useCallback(async ({ email, password }) => {
    await delay()
    const next = {
      name: nameFromEmail(email),
      email: String(email).trim().toLowerCase(),
    }
    // password is only validated client-side; intentionally unused for mock auth
    void password
    localStorage.setItem(STORAGE_KEY, JSON.stringify(next))
    setUser(next)
    return next
  }, [])

  const signup = useCallback(async ({ name, email, password }) => {
    await delay()
    const next = {
      name: String(name).trim() || nameFromEmail(email),
      email: String(email).trim().toLowerCase(),
    }
    void password
    localStorage.setItem(STORAGE_KEY, JSON.stringify(next))
    setUser(next)
    return next
  }, [])

  const logout = useCallback(() => {
    localStorage.removeItem(STORAGE_KEY)
    setUser(null)
  }, [])

  const value = useMemo(
    () => ({
      user,
      isAuthenticated: Boolean(user),
      login,
      signup,
      logout,
    }),
    [user, login, signup, logout],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return ctx
}
