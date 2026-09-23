/**
 * MOCK / DERIVED FIELD HELPERS
 * -----------------------------------------------------------------------------
 * TheMealDB provides meal names, thumbnails, categories, and areas — but NOT
 * prices, restaurant brands, ratings, open/closed status, discount %, or
 * "days remaining". Everything in this file is generated client-side so it is
 * obvious later which fields are real (API) vs invented locally.
 * -----------------------------------------------------------------------------
 */

/**
 * MOCKED — TheMealDB has no prices.
 * Deterministic price from an id so the same meal keeps a stable price across
 * re-renders, refetches, and pages. Range: $2.50 – $8.00
 * @param {string|number} [seed]
 * @returns {number} e.g. 4.25
 */
export function generatePriceNumber(seed = Math.random()) {
  const n = typeof seed === 'string'
    ? [...seed].reduce((sum, ch) => sum + ch.charCodeAt(0), 0)
    : Number(seed) || Math.random() * 1000
  return 2.5 + (n % 550) / 100 // 2.50 … 7.99
}

/**
 * @param {string|number} [seed]
 * @returns {string} e.g. "$4.25"
 */
export function generatePrice(seed = Math.random()) {
  return `$${generatePriceNumber(seed).toFixed(2)}`
}

/**
 * Parse ingredients + measures from a TheMealDB meal (strIngredient1–20 / strMeasure1–20).
 * Empty ingredient slots are skipped.
 * @param {object} meal
 * @returns {Array<{ ingredient: string, measure: string }>}
 */
export function getMealIngredients(meal) {
  if (!meal) return []
  const list = []
  for (let i = 1; i <= 20; i += 1) {
    const ingredient = String(meal[`strIngredient${i}`] ?? '').trim()
    const measure = String(meal[`strMeasure${i}`] ?? '').trim()
    if (ingredient) {
      list.push({ ingredient, measure })
    }
  }
  return list
}

/**
 * Format a numeric price for display.
 * @param {number} amount
 * @returns {string}
 */
export function formatPrice(amount) {
  return `$${Number(amount).toFixed(2)}`
}

/**
 * MOCKED — TheMealDB has no restaurants; derive a fake name from meal area.
 * @param {string} [area] - meal.strArea from the API
 * @returns {string}
 */
export function generateRestaurantNameFromArea(area) {
  return `${area || 'Home'} Kitchen`
}

/**
 * Map a TheMealDB meal → PopularItemCard props.
 * Real from API: image, name (+ id for later).
 * MOCKED: restaurantName, price
 * @param {object} meal
 */
export function toPopularItem(meal) {
  return {
    id: meal.idMeal,
    image: meal.strMealThumb,
    name: meal.strMeal,
    // MOCKED — not provided by TheMealDB
    restaurantName: generateRestaurantNameFromArea(meal.strArea),
    // MOCKED — not provided by TheMealDB
    price: generatePrice(meal.idMeal),
  }
}

/** Fixed MOCK promo meta — discount % / countdown are not API fields. */
const PROMO_MOCK_META = [
  { discountPercent: 15, daysRemaining: 6 },
  { discountPercent: 10, daysRemaining: 4 },
  { discountPercent: 25, daysRemaining: 3 },
  { discountPercent: 20, daysRemaining: 5 },
]

/**
 * Map a TheMealDB meal → PromoCard props.
 * Real from API: image, title.
 * MOCKED: discountPercent, daysRemaining
 * @param {object} meal
 * @param {number} index
 */
export function toPromoItem(meal, index = 0) {
  const meta = PROMO_MOCK_META[index % PROMO_MOCK_META.length]
  return {
    id: meal.idMeal,
    image: meal.strMealThumb,
    title: meal.strMeal,
    // MOCKED — not provided by TheMealDB
    discountPercent: meta.discountPercent,
    // MOCKED — not provided by TheMealDB
    daysRemaining: meta.daysRemaining,
  }
}

/**
 * Fixed local "restaurant" definitions.
 * TheMealDB has no restaurant concept — only meal images are pulled from the API.
 * name / rating / status / badges stay MOCKED here.
 */
export const RESTAURANT_MOCK_TEMPLATES = [
  { restaurantName: 'Foodworld', discountBadge: '20% off', speedBadge: 'Fast', rating: '46', statusBadge: 'open' },
  { restaurantName: 'Pizzahub', discountBadge: '15% off', speedBadge: 'Fast', rating: '40', statusBadge: 'tomorrow' },
  { restaurantName: 'Donuts hut', discountBadge: '10% off', speedBadge: 'Fast', rating: '20', statusBadge: 'open' },
  { restaurantName: 'Ruby Tuesday', discountBadge: '25% off', speedBadge: 'Fast', rating: '50', statusBadge: 'open' },
  { restaurantName: 'Kuakata Fried Chicken', discountBadge: '20% off', speedBadge: 'Fast', rating: '26', statusBadge: 'tomorrow' },
  { restaurantName: 'Red Square', discountBadge: '15% off', speedBadge: 'Fast', rating: '34', statusBadge: 'open' },
  { restaurantName: 'Taco Bell', discountBadge: '12% off', speedBadge: 'Fast', rating: '30', statusBadge: 'open' },
  { restaurantName: 'Baba Can', discountBadge: '18% off', speedBadge: 'Fast', rating: '36', statusBadge: 'tomorrow' },
]

/**
 * Combine a TheMealDB meal thumbnail with a MOCK restaurant template.
 * Real from API: image, restaurantLogo (meal thumb reused as logo stand-in).
 * MOCKED: restaurantName, discountBadge, speedBadge, rating, statusBadge
 * @param {object} meal
 * @param {typeof RESTAURANT_MOCK_TEMPLATES[number]} template
 */
export function toRestaurantCard(meal, template) {
  return {
    // From API (meal used as stand-in — enables /meal/:id navigation)
    id: meal.idMeal,
    image: meal.strMealThumb,
    restaurantLogo: meal.strMealThumb,
    // MOCKED — inventing restaurants; TheMealDB has none
    restaurantName: template.restaurantName,
    discountBadge: template.discountBadge,
    speedBadge: template.speedBadge,
    rating: template.rating,
    statusBadge: template.statusBadge,
  }
}

/**
 * Map a TheMealDB category → CategoryCircle props.
 * All fields come from the API.
 * @param {object} category
 */
export function toCategoryItem(category) {
  return {
    id: category.idCategory,
    image: category.strCategoryThumb,
    label: category.strCategory,
  }
}
