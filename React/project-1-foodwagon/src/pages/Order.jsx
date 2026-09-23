import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import Button from '../components/Button.jsx'
import Icon from '../components/Icon.jsx'
import { useCart } from '../context/CartContext.jsx'
import { formatPrice } from '../utils/mockHelpers.js'

/** MOCKED flat delivery fee — not from any API. */
const DELIVERY_FEE = 2

function Order() {
  const { cartItems, cartCount, cartTotal, updateQuantity, removeFromCart, clearCart } = useCart()
  const [orderPlaced, setOrderPlaced] = useState(false)
  const dialogRef = useRef(null)

  const grandTotal = cartTotal + (cartCount > 0 ? DELIVERY_FEE : 0)

  useEffect(() => {
    if (!orderPlaced) return undefined
    dialogRef.current?.querySelector('a, button')?.focus()

    function onKeyDown(event) {
      if (event.key === 'Escape') setOrderPlaced(false)
    }
    document.addEventListener('keydown', onKeyDown)
    return () => document.removeEventListener('keydown', onKeyDown)
  }, [orderPlaced])

  function handlePlaceOrder() {
    if (cartCount === 0) return
    clearCart()
    setOrderPlaced(true)
  }

  if (cartCount === 0 && !orderPlaced) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-12 text-center sm:px-6 sm:py-16">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-bg-cream text-primary">
          <Icon name="cart" className="h-8 w-8" />
        </div>
        <h1 className="mt-6 font-heading text-2xl font-bold text-text-dark">Your cart is empty</h1>
        <p className="mt-2 text-text-gray">Browse meals and add something delicious.</p>
        <div className="mt-8">
          <Link to="/">
            <Button icon="arrow">Browse meals</Button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-7xl overflow-x-hidden px-4 py-6 sm:px-6 sm:py-8">
      <h1 className="font-heading text-2xl font-bold text-text-dark sm:text-3xl">Your Order</h1>

      {cartCount > 0 && (
        <div className="mt-6 grid gap-6 sm:mt-8 lg:grid-cols-[minmax(0,1fr)_300px] xl:grid-cols-[minmax(0,1fr)_320px] lg:gap-8">
          <ul className="space-y-4">
            {cartItems.map((item) => (
              <li
                key={item.id}
                className="flex flex-col gap-4 rounded-2xl bg-white p-3 shadow-[0_6px_20px_rgba(26,26,26,0.09)] sm:flex-row sm:items-center sm:p-4"
              >
                <img
                  className="h-36 w-full rounded-xl object-cover sm:h-24 sm:w-28 sm:shrink-0"
                  src={item.image}
                  alt={item.name}
                  loading="lazy"
                  decoding="async"
                />
                <div className="min-w-0 flex-1">
                  <h2 className="line-clamp-2 font-heading text-base font-bold text-text-dark sm:text-lg">
                    {item.name}
                  </h2>
                  <p className="mt-1 font-heading font-semibold text-primary">
                    {formatPrice(item.price)}
                  </p>
                  <div className="mt-3 flex flex-wrap items-center gap-3">
                    <div className="inline-flex items-center gap-2 rounded-full bg-bg-cream px-2 py-1">
                      <button
                        type="button"
                        aria-label={`Decrease ${item.name} quantity`}
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="flex h-8 w-8 items-center justify-center rounded-full bg-white text-text-dark transition hover:text-primary active:scale-95"
                      >
                        <Icon name="minus" className="h-4 w-4" />
                      </button>
                      <span className="min-w-5 text-center font-heading font-bold">{item.quantity}</span>
                      <button
                        type="button"
                        aria-label={`Increase ${item.name} quantity`}
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-white transition hover:bg-warning active:scale-95"
                      >
                        <Icon name="plus" className="h-4 w-4" />
                      </button>
                    </div>
                    <button
                      type="button"
                      onClick={() => removeFromCart(item.id)}
                      aria-label={`Remove ${item.name} from cart`}
                      className="inline-flex items-center gap-1 font-heading text-sm font-semibold text-text-gray transition hover:text-primary"
                    >
                      <Icon name="close" className="h-4 w-4" />
                      Remove
                    </button>
                  </div>
                </div>
                <p className="font-heading text-lg font-bold text-text-dark sm:shrink-0 sm:text-right">
                  {formatPrice(item.price * item.quantity)}
                </p>
              </li>
            ))}
          </ul>

          <aside className="h-fit rounded-2xl bg-bg-cream p-5 shadow-[0_6px_20px_rgba(26,26,26,0.06)] sm:p-6 lg:sticky lg:top-24">
            <h2 className="font-heading text-xl font-bold text-text-dark">Order summary</h2>
            <dl className="mt-5 space-y-3 text-sm">
              <div className="flex justify-between gap-4">
                <dt className="text-text-gray">Subtotal</dt>
                <dd className="font-heading font-semibold text-text-dark">{formatPrice(cartTotal)}</dd>
              </div>
              <div className="flex justify-between gap-4">
                <dt className="text-text-gray">Delivery fee</dt>
                <dd className="font-heading font-semibold text-text-dark">{formatPrice(DELIVERY_FEE)}</dd>
              </div>
              <div className="border-t border-white pt-3">
                <div className="flex justify-between gap-4">
                  <dt className="font-heading font-bold text-text-dark">Total</dt>
                  <dd className="font-heading text-lg font-bold text-primary">
                    {formatPrice(grandTotal)}
                  </dd>
                </div>
              </div>
            </dl>
            <Button onClick={handlePlaceOrder} className="mt-6 w-full rounded-lg" icon="arrow">
              Place Order
            </Button>
          </aside>
        </div>
      )}

      {orderPlaced && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-text-dark/50 px-4"
          role="dialog"
          aria-modal="true"
          aria-labelledby="order-success-title"
          ref={dialogRef}
        >
          <div className="w-full max-w-md rounded-3xl bg-white p-6 text-center shadow-[0_16px_40px_rgba(26,26,26,0.2)] sm:p-8">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-success-bg text-success">
              <Icon name="smile" className="h-7 w-7" />
            </div>
            <h2 id="order-success-title" className="mt-5 font-heading text-2xl font-bold text-text-dark">
              Order placed!
            </h2>
            <p className="mt-2 text-text-gray">Your food is on the way.</p>
            <div className="mt-8">
              <Link to="/" onClick={() => setOrderPlaced(false)}>
                <Button className="w-full sm:w-auto">Back to Home</Button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Order
