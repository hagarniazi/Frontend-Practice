import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import CardSkeletonGrid from '../components/CardSkeleton.jsx'
import ErrorMessage from '../components/ErrorMessage.jsx'
import RestaurantCard from '../components/RestaurantCard.jsx'
import { getRandomMeals } from '../services/mealApi.js'
import { homeDataCache } from '../utils/homeDataCache.js'
import { RESTAURANT_MOCK_TEMPLATES, toRestaurantCard } from '../utils/mockHelpers.js'

function Restaurants() {
  const [restaurants, setRestaurants] = useState(homeDataCache.restaurants ?? [])
  const [loading, setLoading] = useState(!homeDataCache.restaurants)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (homeDataCache.restaurants) {
      setRestaurants(homeDataCache.restaurants)
      setLoading(false)
      return undefined
    }

    let cancelled = false

    async function load() {
      setLoading(true)
      setError(null)
      try {
        const meals = await getRandomMeals(RESTAURANT_MOCK_TEMPLATES.length)
        if (!meals.length) throw new Error('No restaurants available right now.')
        const cards = RESTAURANT_MOCK_TEMPLATES.map((template, index) =>
          toRestaurantCard(meals[index % meals.length], template),
        )
        homeDataCache.restaurants = cards
        if (!cancelled) setRestaurants(cards)
      } catch (err) {
        if (!cancelled) setError(err.message || 'Failed to load restaurants.')
      } finally {
        if (!cancelled) setLoading(false)
      }
    }

    load()
    return () => {
      cancelled = true
    }
  }, [])

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-10">
      <div className="mb-6 flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="font-heading text-2xl font-bold text-text-dark sm:text-3xl">
            Featured restaurants
          </h1>
          <p className="mt-1 text-sm text-text-gray">
            Browse all restaurants. Tap a card to view a sample meal.
          </p>
        </div>
        <Link to="/" className="font-heading text-sm font-semibold text-primary hover:underline">
          Back to Home
        </Link>
      </div>

      {loading && <CardSkeletonGrid variant="restaurant" count={8} />}
      {error && <ErrorMessage message={error} />}
      {!loading && !error && (
        <div className="grid gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3 xl:grid-cols-4">
          {restaurants.map((restaurant) => (
            <RestaurantCard
              key={restaurant.restaurantName}
              id={restaurant.id}
              image={restaurant.image}
              discountBadge={restaurant.discountBadge}
              speedBadge={restaurant.speedBadge}
              restaurantLogo={restaurant.restaurantLogo}
              restaurantName={restaurant.restaurantName}
              rating={restaurant.rating}
              statusBadge={restaurant.statusBadge}
            />
          ))}
        </div>
      )}
    </div>
  )
}

export default Restaurants
