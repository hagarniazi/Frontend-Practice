import { useEffect, useId, useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Button from './Button.jsx'
import Icon from './Icon.jsx'
import { useAuth } from '../context/AuthContext.jsx'
import { useCart } from '../context/CartContext.jsx'

function Navbar() {
  const { cartCount } = useCart()
  const { user, isAuthenticated, logout } = useAuth()
  const navigate = useNavigate()
  const [menuOpen, setMenuOpen] = useState(false)
  const [userMenuOpen, setUserMenuOpen] = useState(false)
  const [navQuery, setNavQuery] = useState('')
  const menuId = useId()
  const userMenuId = useId()
  const menuRef = useRef(null)
  const userMenuRef = useRef(null)

  useEffect(() => {
    if (!menuOpen && !userMenuOpen) return undefined

    function onKeyDown(event) {
      if (event.key === 'Escape') {
        setMenuOpen(false)
        setUserMenuOpen(false)
      }
    }

    function onPointerDown(event) {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
        setUserMenuOpen(false)
      }
    }

    document.addEventListener('keydown', onKeyDown)
    document.addEventListener('mousedown', onPointerDown)
    return () => {
      document.removeEventListener('keydown', onKeyDown)
      document.removeEventListener('mousedown', onPointerDown)
    }
  }, [menuOpen, userMenuOpen])

  useEffect(() => {
    if (menuOpen) {
      menuRef.current?.querySelector('a, button, input')?.focus()
    }
  }, [menuOpen])

  function handleNavSearch(event) {
    event.preventDefault()
    const q = navQuery.trim()
    setMenuOpen(false)
    if (q) {
      navigate(`/?q=${encodeURIComponent(q)}`)
    } else {
      navigate('/')
    }
  }

  function handleLogout() {
    logout()
    setUserMenuOpen(false)
    setMenuOpen(false)
    navigate('/')
  }

  const initials = user?.name
    ? user.name
        .split(' ')
        .map((part) => part[0])
        .join('')
        .slice(0, 2)
        .toUpperCase()
    : '?'

  const authControls = isAuthenticated ? (
    <div className="relative" ref={userMenuRef}>
      <button
        type="button"
        aria-label={`Account menu for ${user.name}`}
        aria-expanded={userMenuOpen}
        aria-controls={userMenuId}
        onClick={() => setUserMenuOpen((open) => !open)}
        className="inline-flex items-center gap-2 rounded-full border border-primary bg-white px-2 py-1.5 text-primary transition hover:bg-bg-cream sm:px-3"
      >
        <span className="flex h-8 w-8 items-center justify-center rounded-full bg-primary font-heading text-xs font-bold text-white">
          {initials}
        </span>
        <span className="hidden max-w-[8rem] truncate font-heading text-sm font-semibold sm:inline">
          {user.name}
        </span>
      </button>
      {userMenuOpen && (
        <div
          id={userMenuId}
          className="absolute right-0 z-40 mt-2 w-48 rounded-2xl bg-white p-2 shadow-[0_8px_24px_rgba(26,26,26,0.12)]"
          role="menu"
        >
          <p className="truncate px-3 py-2 text-xs text-text-gray">{user.email}</p>
          <button
            type="button"
            role="menuitem"
            onClick={handleLogout}
            className="w-full rounded-xl px-3 py-2 text-left font-heading text-sm font-semibold text-text-dark transition hover:bg-bg-cream hover:text-primary"
          >
            Logout
          </button>
        </div>
      )}
    </div>
  ) : (
    <Link to="/login" onClick={() => setMenuOpen(false)}>
      <Button variant="outline" className="px-4 py-2" icon="user">
        Login
      </Button>
    </Link>
  )

  return (
    <header className="sticky top-0 z-30 bg-white shadow-soft">
      <nav
        aria-label="Main navigation"
        className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-3.5 sm:gap-4 sm:px-6 sm:py-4"
      >
        <Link
          to="/"
          className="flex shrink-0 items-center gap-2 font-heading text-xl font-bold tracking-tight sm:gap-2.5 sm:text-2xl"
          aria-label="Foodwagon home"
          onClick={() => setMenuOpen(false)}
        >
          <img
            src="/logo.png"
            alt=""
            className="h-8 w-8 rounded-md object-contain sm:h-9 sm:w-9"
            width={36}
            height={36}
          />
          <span>
            <span className="text-text-dark">food</span>
            <span className="text-primary">wagon</span>
          </span>
        </Link>

        <p className="hidden min-w-0 max-w-md flex-1 items-center justify-center gap-1.5 truncate text-center text-sm text-text-gray lg:flex">
          <span className="shrink-0 font-heading font-semibold text-text-dark">Deliver to:</span>
          <Icon name="location" className="h-4 w-4 shrink-0 text-primary" />
          <span className="truncate">
            <span className="font-semibold text-text-dark">Current Location</span>
            <span>, Mohammadpur Bus Stand, Dhaka</span>
          </span>
        </p>

        <div className="flex items-center gap-1 sm:gap-2">
          <form
            onSubmit={handleNavSearch}
            className="hidden items-center gap-2 rounded-lg bg-bg-muted px-3 py-2 md:flex"
            role="search"
          >
            <label className="sr-only" htmlFor="nav-search-desktop">
              Search food
            </label>
            <Icon name="search" className="h-4 w-4 text-primary" />
            <input
              id="nav-search-desktop"
              value={navQuery}
              onChange={(e) => setNavQuery(e.target.value)}
              className="w-28 bg-transparent text-sm text-text-dark outline-none placeholder:text-text-gray lg:w-36"
              placeholder="Search Food"
            />
          </form>

          <Link
            to="/order"
            aria-label={`Cart, ${cartCount} items`}
            className="relative rounded-full p-2 text-primary transition hover:bg-bg-cream active:scale-95"
          >
            <Icon name="cart" className="h-6 w-6" />
            {cartCount > 0 && (
              <span className="absolute -right-0.5 -top-0.5 flex h-5 min-w-5 items-center justify-center rounded-full bg-primary px-1 font-heading text-[10px] font-bold text-white">
                {cartCount > 99 ? '99+' : cartCount}
              </span>
            )}
          </Link>

          <div className="hidden sm:block">{authControls}</div>

          <button
            type="button"
            className="rounded-full p-2 text-text-dark transition hover:bg-bg-cream hover:text-primary lg:hidden"
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
            aria-controls={menuId}
            onClick={() => setMenuOpen((open) => !open)}
          >
            <Icon name={menuOpen ? 'close' : 'menu'} className="h-6 w-6" />
          </button>
        </div>
      </nav>

      {menuOpen && (
        <div
          id={menuId}
          ref={menuRef}
          className="border-t border-bg-cream bg-white px-4 py-4 shadow-[0_8px_20px_rgba(26,26,26,0.08)] lg:hidden"
        >
          <p className="flex items-start gap-2 text-sm text-text-gray">
            <Icon name="location" className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
            <span>
              <span className="font-heading font-semibold text-text-dark">Deliver to: </span>
              Current Location, Mohammadpur Bus Stand, Dhaka
            </span>
          </p>

          <form
            onSubmit={handleNavSearch}
            className="mt-4 flex items-center gap-2 rounded-lg bg-bg-muted px-3 py-2 md:hidden"
            role="search"
          >
            <span className="sr-only">Search food</span>
            <Icon name="search" className="h-4 w-4 text-primary" />
            <input
              value={navQuery}
              onChange={(e) => setNavQuery(e.target.value)}
              className="w-full bg-transparent text-sm text-text-dark outline-none placeholder:text-text-gray"
              placeholder="Search Food"
            />
          </form>

          <div className="mt-4 flex flex-col gap-2">
            <div className="sm:hidden">{authControls}</div>
            <Link to="/order" onClick={() => setMenuOpen(false)}>
              <Button className="w-full" icon="cart">
                View cart{cartCount > 0 ? ` (${cartCount})` : ''}
              </Button>
            </Link>
            <Link to="/restaurants" onClick={() => setMenuOpen(false)}>
              <Button variant="outline" className="w-full">
                Restaurants
              </Button>
            </Link>
          </div>
        </div>
      )}
    </header>
  )
}

export default Navbar
