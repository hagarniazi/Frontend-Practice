import { useEffect, useMemo, useState } from 'react'
import { flushSync } from 'react-dom'
import { Link, useNavigate, useParams } from 'react-router-dom'
import Badge from '../components/Badge.jsx'
import Button from '../components/Button.jsx'
import ErrorMessage from '../components/ErrorMessage.jsx'
import Icon from '../components/Icon.jsx'
import Spinner from '../components/Spinner.jsx'
import { useCart } from '../context/CartContext.jsx'
import { getMealById } from '../services/mealApi.js'
import {
  formatPrice,
  generatePriceNumber,
  getMealIngredients,
} from '../utils/mockHelpers.js'

const INSTRUCTIONS_PREVIEW_LENGTH = 220

function MealDetails() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { addToCart } = useCart()

  const [meal, setMeal] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [quantity, setQuantity] = useState(1)
  const [showFullInstructions, setShowFullInstructions] = useState(false)

  const priceNumber = useMemo(() => (id ? generatePriceNumber(id) : 0), [id])
  const priceLabel = formatPrice(priceNumber)

  useEffect(() => {
    let cancelled = false

    async function loadMeal() {
      setLoading(true)
      setError(null)
      setMeal(null)
      setQuantity(1)
      setShowFullInstructions(false)

      try {
        const data = await getMealById(id)
        if (!cancelled) {
          if (!data) setError('Meal not found.')
          else setMeal(data)
        }
      } catch (err) {
        if (!cancelled) setError(err.message || 'Failed to load meal details.')
      } finally {
        if (!cancelled) setLoading(false)
      }
    }

    if (id) loadMeal()
    else {
      setLoading(false)
      setError('Missing meal id.')
    }

    return () => {
      cancelled = true
    }
  }, [id])

  const ingredients = useMemo(() => getMealIngredients(meal), [meal])

  const instructions = meal?.strInstructions?.trim() || ''
  const needsTruncate = instructions.length > INSTRUCTIONS_PREVIEW_LENGTH
  const instructionsPreview =
    needsTruncate && !showFullInstructions
      ? `${instructions.slice(0, INSTRUCTIONS_PREVIEW_LENGTH).trim()}…`
      : instructions

  function handleProceedToOrder() {
    if (!meal?.idMeal) return
    const cartMeal = {
      id: meal.idMeal,
      name: meal.strMeal,
      image: meal.strMealThumb,
      price: priceNumber,
    }
    // Commit cart state before route change so /order never mounts on a stale empty cart.
    flushSync(() => {
      addToCart(cartMeal, quantity)
    })
    navigate('/order')
  }

  return (
    <div className="mx-auto max-w-7xl overflow-x-hidden px-4 py-6 sm:px-6 sm:py-8">
      <button
        type="button"
        onClick={() => navigate(-1)}
        className="mb-5 inline-flex items-center gap-2 font-heading text-sm font-semibold text-text-gray transition hover:text-primary sm:mb-6"
      >
        <Icon name="chevronLeft" className="h-4 w-4" />
        Back
      </button>

      {loading && <Spinner label="Loading meal…" />}
      {error && !loading && <ErrorMessage title="Couldn’t load meal" message={error} />}

      {!loading && !error && meal && (
        <div className="grid gap-6 md:gap-8 lg:grid-cols-2 lg:items-start">
          <div className="overflow-hidden rounded-2xl shadow-[0_6px_20px_rgba(26,26,26,0.09)] sm:rounded-3xl">
            <img
              className="aspect-square w-full object-cover"
              src={meal.strMealThumb}
              alt={meal.strMeal}
              fetchPriority="high"
              decoding="async"
            />
          </div>

          <div className="min-w-0">
            <h1 className="font-heading text-2xl font-bold text-text-dark sm:text-3xl lg:text-4xl">
              {meal.strMeal}
            </h1>

            <div className="mt-4 flex flex-wrap gap-2">
              {meal.strCategory && <Badge text={meal.strCategory} type="info" />}
              {meal.strArea && <Badge text={meal.strArea} type="fast" />}
            </div>

            <p className="mt-5 font-heading text-2xl font-bold text-primary sm:mt-6">{priceLabel}</p>

            <section className="mt-6 sm:mt-8">
              <h2 className="font-heading text-lg font-bold text-text-dark">Ingredients</h2>
              <ul className="mt-3 max-h-64 space-y-2 overflow-y-auto pr-1 sm:max-h-none">
                {ingredients.map(({ ingredient, measure }) => (
                  <li
                    key={`${ingredient}-${measure}`}
                    className="flex justify-between gap-3 rounded-xl bg-bg-cream px-3 py-2 text-sm sm:gap-4 sm:px-4"
                  >
                    <span className="min-w-0 font-medium text-text-dark">{ingredient}</span>
                    <span className="shrink-0 text-text-gray">{measure}</span>
                  </li>
                ))}
              </ul>
            </section>

            {instructions && (
              <section className="mt-6 sm:mt-8">
                <h2 className="font-heading text-lg font-bold text-text-dark">About this dish</h2>
                <p className="mt-3 text-sm leading-6 text-text-gray">{instructionsPreview}</p>
                {needsTruncate && (
                  <button
                    type="button"
                    onClick={() => setShowFullInstructions((open) => !open)}
                    className="mt-2 font-heading text-sm font-semibold text-primary hover:underline"
                  >
                    {showFullInstructions ? 'Show less' : 'Read more'}
                  </button>
                )}
              </section>
            )}

            <div className="mt-6 flex flex-col gap-4 sm:mt-8 sm:flex-row sm:flex-wrap sm:items-center">
              <div className="inline-flex w-fit items-center gap-3 rounded-full bg-bg-cream px-2 py-1">
                <button
                  type="button"
                  aria-label="Decrease quantity"
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="flex h-9 w-9 items-center justify-center rounded-full bg-white text-text-dark shadow-[0_2px_8px_rgba(26,26,26,0.08)] transition hover:text-primary active:scale-95"
                >
                  <Icon name="minus" className="h-4 w-4" />
                </button>
                <span className="min-w-6 text-center font-heading text-lg font-bold text-text-dark">
                  {quantity}
                </span>
                <button
                  type="button"
                  aria-label="Increase quantity"
                  onClick={() => setQuantity((q) => q + 1)}
                  className="flex h-9 w-9 items-center justify-center rounded-full bg-primary text-white transition hover:bg-warning active:scale-95"
                >
                  <Icon name="plus" className="h-4 w-4" />
                </button>
              </div>

              <Button
                onClick={handleProceedToOrder}
                icon="arrow"
                className="w-full rounded-lg sm:w-auto"
              >
                Proceed to Order
              </Button>
            </div>

            <p className="mt-4 text-sm text-text-gray">
              Or{' '}
              <Link to="/" className="font-semibold text-primary hover:underline">
                browse more meals
              </Link>
            </p>
          </div>
        </div>
      )}
    </div>
  )
}

export default MealDetails
