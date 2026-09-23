import { useEffect, useRef, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { AppPromo, OrderCtaBanner } from '../components/AppPromo.jsx'
import Button from '../components/Button.jsx'
import CardSkeletonGrid from '../components/CardSkeleton.jsx'
import CategoryCircle from '../components/CategoryCircle.jsx'
import ErrorMessage from '../components/ErrorMessage.jsx'
import FeatureHighlight from '../components/FeatureHighlight.jsx'
import Footer from '../components/Footer.jsx'
import HeroSection from '../components/HeroSection.jsx'
import HowItWorksStep from '../components/HowItWorksStep.jsx'
import Icon from '../components/Icon.jsx'
import PopularItemCard from '../components/PopularItemCard.jsx'
import PromoBanner from '../components/PromoBanner.jsx'
import PromoCard from '../components/PromoCard.jsx'
import RestaurantCard from '../components/RestaurantCard.jsx'
import howItWorksSteps from '../data/howItWorksSteps.js'
import {
  getCategories,
  getMealsByCategory,
  getRandomMeals,
  searchMealsByFirstLetter,
  searchMealsByName,
} from '../services/mealApi.js'
import { homeDataCache } from '../utils/homeDataCache.js'
import {
  RESTAURANT_MOCK_TEMPLATES,
  toCategoryItem,
  toPopularItem,
  toPromoItem,
  toRestaurantCard,
} from '../utils/mockHelpers.js'

const SCROLL_AMOUNT = 300

const featureHighlights = [
  { icon: 'tag', title: 'Daily Discounts' },
  { icon: 'location', title: 'Live Tracing' },
  { icon: 'delivery', title: 'Quick Delivery' },
]

const promoBanners = [
  {
    title: 'Best deals',
    highlightedWord: 'Crispy Sandwiches',
    description:
      'Enjoy the large size of sandwiches. Complete your meal with the perfect slice of sandwiches.',
    image:
      'https://images.unsplash.com/photo-1553909489-cd47e0907980?auto=format&fit=crop&w=1000&q=80',
    imagePosition: 'right',
  },
  {
    title: 'Celebrate parties with',
    highlightedWord: 'Fried Chicken',
    description:
      'Get the best fried chicken smeared with a lip smacking lemon chili flavor. Check out best deals for fried chicken.',
    image:
      'https://images.unsplash.com/photo-1626645738196-c2a7c87a8f58?auto=format&fit=crop&w=1000&q=80',
    imagePosition: 'left',
  },
  {
    title: 'Wanna eat hot & spicy',
    highlightedWord: 'Pizza?',
    description:
      'Pair up with a friend and enjoy the hot and crispy pizza pops. Try it with the best deals.',
    image:
      'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=1000&q=80',
    imagePosition: 'right',
  },
]

function Section({
  title,
  children,
  className = '',
  headerRight = null,
  align = 'left',
  titleClassName = '',
}) {
  const centered = align === 'center'
  return (
    <section className={`mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-14 lg:py-16 ${className}`}>
      {(title || headerRight) && (
        <div
          className={`mb-8 flex flex-wrap items-center gap-3 sm:mb-10 sm:gap-4 ${
            centered ? 'justify-center' : 'justify-between'
          }`}
        >
          {title ? (
            <h2
              className={`font-heading text-2xl font-bold sm:text-3xl ${
                centered ? 'text-center' : ''
              } ${titleClassName || 'text-text-dark'}`}
            >
              {title}
            </h2>
          ) : (
            <span />
          )}
          {headerRight && !centered ? headerRight : null}
        </div>
      )}
      {centered && headerRight ? <div className="mb-8 flex justify-center sm:mb-10">{headerRight}</div> : null}
      {children}
    </section>
  )
}

function ScrollArrows({ onPrev, onNext }) {
  return (
    <div className="flex shrink-0 gap-2">
      <button
        type="button"
        aria-label="Scroll left"
        onClick={onPrev}
        className="flex h-10 w-10 items-center justify-center rounded-full bg-primary-light text-white shadow-soft transition-all hover:brightness-95 active:scale-95"
      >
        <Icon name="chevronLeft" className="h-5 w-5" />
      </button>
      <button
        type="button"
        aria-label="Scroll right"
        onClick={onNext}
        className="flex h-10 w-10 items-center justify-center rounded-full bg-primary-light text-white shadow-soft transition-all hover:brightness-95 active:scale-95"
      >
        <Icon name="chevronRight" className="h-5 w-5" />
      </button>
    </div>
  )
}

/**
 * Home page — Phase 7 polish: skeletons, cache, responsive carousels.
 */
function Home() {
  const [searchParams, setSearchParams] = useSearchParams()
  const [categories, setCategories] = useState(homeDataCache.categories ?? [])
  const [categoriesLoading, setCategoriesLoading] = useState(!homeDataCache.categories)
  const [categoriesError, setCategoriesError] = useState(null)

  const [popularItems, setPopularItems] = useState(homeDataCache.popularItems ?? [])
  const [popularLoading, setPopularLoading] = useState(!homeDataCache.popularItems)
  const [popularError, setPopularError] = useState(null)

  const [restaurants, setRestaurants] = useState(homeDataCache.restaurants ?? [])
  const [restaurantsLoading, setRestaurantsLoading] = useState(!homeDataCache.restaurants)
  const [restaurantsError, setRestaurantsError] = useState(null)

  const [promos, setPromos] = useState(homeDataCache.promos ?? [])
  const [promosLoading, setPromosLoading] = useState(!homeDataCache.promos)
  const [promosError, setPromosError] = useState(null)

  const [searchQuery, setSearchQuery] = useState('')
  const [searchResults, setSearchResults] = useState([])
  const [activeCategory, setActiveCategory] = useState(null)
  const [isSearching, setIsSearching] = useState(false)
  const [searchError, setSearchError] = useState(null)
  const [hasSearched, setHasSearched] = useState(false)
  const [resultsLabel, setResultsLabel] = useState('')

  const popularScrollRef = useRef(null)
  const categoriesScrollRef = useRef(null)
  const lastUrlQueryRef = useRef('')

  function scrollRow(ref, direction) {
    ref.current?.scrollBy({ left: direction * SCROLL_AMOUNT, behavior: 'smooth' })
  }

  function clearSearchAndFilter() {
    setSearchQuery('')
    setSearchResults([])
    setActiveCategory(null)
    setIsSearching(false)
    setSearchError(null)
    setHasSearched(false)
    setResultsLabel('')
    lastUrlQueryRef.current = ''
    if (searchParams.has('q')) {
      setSearchParams({}, { replace: true })
    }
  }

  async function handleSearchSubmit(query) {
    const trimmed = String(query ?? '').trim()
    if (!trimmed) return

    setActiveCategory(null)
    setSearchQuery(trimmed)
    setHasSearched(true)
    setResultsLabel(`Results for "${trimmed}"`)
    setIsSearching(true)
    setSearchError(null)
    setSearchResults([])
    lastUrlQueryRef.current = trimmed
    setSearchParams({ q: trimmed }, { replace: true })

    try {
      const meals = await searchMealsByName(trimmed)
      setSearchResults(meals.map(toPopularItem))
    } catch (err) {
      setSearchError(err.message || 'Search failed. Please try again.')
      setSearchResults([])
    } finally {
      setIsSearching(false)
    }
  }

  // Navbar search lands on /?q=… — run the same search flow once per distinct query
  useEffect(() => {
    const q = searchParams.get('q')?.trim() || ''
    if (!q || q === lastUrlQueryRef.current) return
    handleSearchSubmit(q)
    // eslint-disable-next-line react-hooks/exhaustive-deps -- only sync when URL q changes
  }, [searchParams])

  async function handleCategoryClick(categoryName) {
    setSearchQuery('')
    setActiveCategory(categoryName)
    setHasSearched(true)
    setResultsLabel(`${categoryName} meals`)
    setIsSearching(true)
    setSearchError(null)
    setSearchResults([])
    lastUrlQueryRef.current = ''
    if (searchParams.has('q')) {
      setSearchParams({}, { replace: true })
    }

    try {
      const meals = await getMealsByCategory(categoryName)
      setSearchResults(
        meals.map((meal) => toPopularItem({ ...meal, strArea: categoryName })),
      )
    } catch (err) {
      setSearchError(err.message || 'Failed to load meals for this category.')
      setSearchResults([])
    } finally {
      setIsSearching(false)
    }
  }

  useEffect(() => {
    if (homeDataCache.categories) return undefined
    let cancelled = false

    async function loadCategories() {
      setCategoriesLoading(true)
      setCategoriesError(null)
      try {
        const data = await getCategories()
        const mapped = data.map(toCategoryItem)
        homeDataCache.categories = mapped
        if (!cancelled) setCategories(mapped)
      } catch (err) {
        if (!cancelled) setCategoriesError(err.message || 'Failed to load categories.')
      } finally {
        if (!cancelled) setCategoriesLoading(false)
      }
    }

    loadCategories()
    return () => {
      cancelled = true
    }
  }, [])

  useEffect(() => {
    if (homeDataCache.popularItems) return undefined
    let cancelled = false

    async function loadPopularItems() {
      setPopularLoading(true)
      setPopularError(null)
      try {
        let meals = await searchMealsByFirstLetter('b')
        if (!meals.length) meals = await getRandomMeals(5)
        const items = meals.slice(0, 8).map(toPopularItem)
        homeDataCache.popularItems = items
        if (!cancelled) setPopularItems(items)
      } catch (err) {
        if (!cancelled) setPopularError(err.message || 'Failed to load popular items.')
      } finally {
        if (!cancelled) setPopularLoading(false)
      }
    }

    loadPopularItems()
    return () => {
      cancelled = true
    }
  }, [])

  useEffect(() => {
    if (homeDataCache.restaurants) return undefined
    let cancelled = false

    async function loadRestaurants() {
      setRestaurantsLoading(true)
      setRestaurantsError(null)
      try {
        const meals = await getRandomMeals(RESTAURANT_MOCK_TEMPLATES.length)
        if (!meals.length) throw new Error('No meals returned for restaurant cards.')
        const cards = RESTAURANT_MOCK_TEMPLATES.map((template, index) =>
          toRestaurantCard(meals[index % meals.length], template),
        )
        homeDataCache.restaurants = cards
        if (!cancelled) setRestaurants(cards)
      } catch (err) {
        if (!cancelled) setRestaurantsError(err.message || 'Failed to load restaurants.')
      } finally {
        if (!cancelled) setRestaurantsLoading(false)
      }
    }

    loadRestaurants()
    return () => {
      cancelled = true
    }
  }, [])

  useEffect(() => {
    if (homeDataCache.promos) return undefined
    let cancelled = false

    async function loadPromos() {
      setPromosLoading(true)
      setPromosError(null)
      try {
        const meals = await getRandomMeals(4)
        const mapped = meals.map((meal, index) => toPromoItem(meal, index))
        homeDataCache.promos = mapped
        if (!cancelled) setPromos(mapped)
      } catch (err) {
        if (!cancelled) setPromosError(err.message || 'Failed to load promotions.')
      } finally {
        if (!cancelled) setPromosLoading(false)
      }
    }

    loadPromos()
    return () => {
      cancelled = true
    }
  }, [])

  const showSearchResults = hasSearched
  const showNormalSections = !hasSearched

  return (
    <div className="overflow-x-hidden bg-white">
      <HeroSection
        searchValue={searchQuery}
        onSearchChange={setSearchQuery}
        onSearchSubmit={handleSearchSubmit}
      />

      {showSearchResults && (
        <Section
          title={resultsLabel || 'Search Results'}
          headerRight={
            <button
              type="button"
              onClick={clearSearchAndFilter}
              aria-label="Clear search"
              className="inline-flex items-center gap-2 rounded-lg bg-bg-cream px-3 py-2 font-heading text-xs font-semibold text-text-dark transition hover:bg-warning-bg hover:text-primary sm:px-4 sm:text-sm"
            >
              <Icon name="close" className="h-4 w-4" />
              Clear search
            </button>
          }
        >
          {isSearching && <CardSkeletonGrid variant="popular" count={4} />}
          {searchError && <ErrorMessage message={searchError} />}
          {!isSearching && !searchError && searchResults.length === 0 && (
            <ErrorMessage
              title="No meals found"
              message={`No meals found for "${activeCategory || searchQuery}". Try another dish or category.`}
            />
          )}
          {!isSearching && !searchError && searchResults.length > 0 && (
            <div className="grid gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3 xl:grid-cols-4">
              {searchResults.map((item) => (
                <PopularItemCard
                  key={item.id}
                  id={item.id}
                  image={item.image}
                  name={item.name}
                  restaurantName={item.restaurantName}
                  price={item.price}
                />
              ))}
            </div>
          )}
        </Section>
      )}

      {showNormalSections && (
        <>
          <Section>
            {promosLoading && <CardSkeletonGrid variant="promo" count={4} />}
            {promosError && <ErrorMessage message={promosError} />}
            {!promosLoading && !promosError && (
              <div className="grid gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-4">
                {promos.map((promo) => (
                  <PromoCard
                    key={promo.id}
                    id={promo.id}
                    image={promo.image}
                    discountPercent={promo.discountPercent}
                    title={promo.title}
                    daysRemaining={promo.daysRemaining}
                  />
                ))}
              </div>
            )}
          </Section>

          <Section title="How does it work" align="center" titleClassName="text-primary">
            <div className="grid gap-10 sm:grid-cols-2 sm:gap-12 lg:grid-cols-4">
              {howItWorksSteps.map((step) => (
                <HowItWorksStep
                  key={step.title}
                  icon={step.icon}
                  title={step.title}
                  description={step.description}
                />
              ))}
            </div>
          </Section>

          <Section title="Popular items" align="center">
            {popularLoading && <CardSkeletonGrid variant="popular" count={4} scroll />}
            {popularError && <ErrorMessage message={popularError} />}
            {!popularLoading && !popularError && (
              <div className="relative">
                <button
                  type="button"
                  aria-label="Scroll left"
                  onClick={() => scrollRow(popularScrollRef, -1)}
                  className="absolute -left-1 top-1/2 z-10 hidden h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-primary-light text-white shadow-soft transition hover:brightness-95 active:scale-95 sm:-left-3 lg:flex xl:-left-5"
                >
                  <Icon name="chevronLeft" className="h-5 w-5" />
                </button>
                <button
                  type="button"
                  aria-label="Scroll right"
                  onClick={() => scrollRow(popularScrollRef, 1)}
                  className="absolute -right-1 top-1/2 z-10 hidden h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-primary-light text-white shadow-soft transition hover:brightness-95 active:scale-95 sm:-right-3 lg:flex xl:-right-5"
                >
                  <Icon name="chevronRight" className="h-5 w-5" />
                </button>
                <div className="mb-4 flex justify-center lg:hidden">
                  <ScrollArrows
                    onPrev={() => scrollRow(popularScrollRef, -1)}
                    onNext={() => scrollRow(popularScrollRef, 1)}
                  />
                </div>
                <div
                  ref={popularScrollRef}
                  className="scroll-touch flex gap-5 overflow-x-auto pb-3 scrollbar-hide sm:gap-6"
                >
                  {popularItems.map((item, index) => (
                    <div key={item.id} className="w-[68vw] max-w-[17rem] shrink-0 sm:w-64">
                      <PopularItemCard
                        id={item.id}
                        image={item.image}
                        name={item.name}
                        restaurantName={item.restaurantName}
                        price={item.price}
                        priority={index < 2}
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </Section>

          <Section title="Featured Restaurants" align="center">
            {restaurantsLoading && <CardSkeletonGrid variant="restaurant" count={4} />}
            {restaurantsError && <ErrorMessage message={restaurantsError} />}
            {!restaurantsLoading && !restaurantsError && (
              <>
                <div className="grid gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3 xl:grid-cols-4">
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
                <div className="mt-10 flex justify-center">
                  <Link to="/restaurants">
                    <Button icon="arrow">View All</Button>
                  </Link>
                </div>
              </>
            )}
          </Section>
        </>
      )}

      <Section
        title="Search by Food"
        className={showSearchResults ? 'bg-bg-muted' : ''}
        headerRight={
          <div className="flex flex-wrap items-center gap-2 sm:gap-3">
            {activeCategory && (
              <button
                type="button"
                onClick={clearSearchAndFilter}
                className="font-heading text-xs font-semibold text-primary hover:underline sm:text-sm"
              >
                Show all categories
              </button>
            )}
            <ScrollArrows
              onPrev={() => scrollRow(categoriesScrollRef, -1)}
              onNext={() => scrollRow(categoriesScrollRef, 1)}
            />
          </div>
        }
      >
        {categoriesLoading && <CardSkeletonGrid variant="category" count={8} />}
        {categoriesError && <ErrorMessage message={categoriesError} />}
        {!categoriesLoading && !categoriesError && (
          <div
            ref={categoriesScrollRef}
            className="scroll-touch flex gap-5 overflow-x-auto pb-3 scrollbar-hide sm:gap-6"
          >
            {categories.map((category) => (
              <CategoryCircle
                key={category.id}
                image={category.image}
                label={category.label}
                selected={activeCategory === category.label}
                onClick={() => handleCategoryClick(category.label)}
              />
            ))}
          </div>
        )}
      </Section>

      {showNormalSections && (
        <>
          <div className="bg-bg-muted py-12 sm:py-14 lg:py-16">
            <div className="mx-auto max-w-5xl px-4 sm:px-6">
              <div className="overflow-hidden rounded-2xl bg-white shadow-card sm:rounded-full">
                <div className="grid divide-y divide-bg-muted sm:grid-cols-3 sm:divide-x sm:divide-y-0">
                  {featureHighlights.map((feature) => (
                    <FeatureHighlight
                      key={feature.title}
                      icon={feature.icon}
                      title={feature.title}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>

          <AppPromo />

          <Section>
            <div className="space-y-6 sm:space-y-8">
              {promoBanners.map((banner) => (
                <PromoBanner
                  key={banner.highlightedWord}
                  title={banner.title}
                  highlightedWord={banner.highlightedWord}
                  description={banner.description}
                  image={banner.image}
                  imagePosition={banner.imagePosition}
                />
              ))}
            </div>
          </Section>

          <OrderCtaBanner />
        </>
      )}

      <Footer />
    </div>
  )
}

export default Home
