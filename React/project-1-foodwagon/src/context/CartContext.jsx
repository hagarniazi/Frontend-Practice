import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'

const CartContext = createContext(null)
/** Phase 6 key. Also migrate legacy `foodwagon-cart` if present. */
const STORAGE_KEY = 'cart'
const LEGACY_STORAGE_KEY = 'foodwagon-cart'

function persistCart(items) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items))
    localStorage.removeItem(LEGACY_STORAGE_KEY)
  } catch {
    // ignore quota / private-mode failures
  }
}

function readStoredCart() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY) ?? localStorage.getItem(LEGACY_STORAGE_KEY)
    if (!raw) return []
    const parsed = JSON.parse(raw)
    if (!Array.isArray(parsed)) return []
    return parsed
      .filter((item) => item && item.id != null && item.name)
      .map((item) => ({
        id: String(item.id),
        name: String(item.name),
        image: item.image ?? '',
        price: typeof item.price === 'number' ? item.price : Number(item.price) || 0,
        quantity: Math.max(1, Number(item.quantity) || 1),
      }))
  } catch {
    return []
  }
}

/**
 * Cart state for the order flow. Persists to localStorage on every change
 * (sync write inside setters so a remount/refresh cannot race the useEffect).
 * Item shape: { id, name, image, price (number), quantity }
 */
export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState(() => readStoredCart())

  useEffect(() => {
    persistCart(cartItems)
  }, [cartItems])

  const addToCart = useCallback((meal, quantity = 1) => {
    if (!meal?.id) {
      console.warn('addToCart: meal.id is required', meal)
      return
    }
    const id = String(meal.id)
    const qty = Math.max(1, Number(quantity) || 1)

    setCartItems((prev) => {
      const existing = prev.find((item) => item.id === id)
      const next = existing
        ? prev.map((item) =>
            item.id === id ? { ...item, quantity: item.quantity + qty } : item,
          )
        : [
            ...prev,
            {
              id,
              name: meal.name,
              image: meal.image,
              price: typeof meal.price === 'number' ? meal.price : Number(meal.price) || 0,
              quantity: qty,
            },
          ]
      persistCart(next)
      return next
    })
  }, [])

  const removeFromCart = useCallback((id) => {
    const targetId = String(id)
    setCartItems((prev) => {
      const next = prev.filter((item) => item.id !== targetId)
      persistCart(next)
      return next
    })
  }, [])

  const updateQuantity = useCallback((id, quantity) => {
    const targetId = String(id)
    const qty = Math.max(0, Number(quantity) || 0)
    setCartItems((prev) => {
      const next =
        qty <= 0
          ? prev.filter((item) => item.id !== targetId)
          : prev.map((item) => (item.id === targetId ? { ...item, quantity: qty } : item))
      persistCart(next)
      return next
    })
  }, [])

  const clearCart = useCallback(() => {
    setCartItems(() => {
      persistCart([])
      return []
    })
  }, [])

  const cartCount = useMemo(
    () => cartItems.reduce((sum, item) => sum + item.quantity, 0),
    [cartItems],
  )

  const cartTotal = useMemo(
    () => cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0),
    [cartItems],
  )

  const value = useMemo(
    () => ({
      cartItems,
      /** @deprecated alias — same array as cartItems */
      items: cartItems,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      cartCount,
      cartTotal,
    }),
    [cartItems, addToCart, removeFromCart, updateQuantity, clearCart, cartCount, cartTotal],
  )

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export function useCart() {
  const ctx = useContext(CartContext)
  if (!ctx) {
    throw new Error('useCart must be used within a CartProvider')
  }
  return ctx
}
