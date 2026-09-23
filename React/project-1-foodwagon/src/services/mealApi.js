import { apiGet } from './api.js'

/**
 * TheMealDB meal/category helpers.
 * Docs: https://www.themealdb.com/api.php
 */

/**
 * Fetch all meal categories.
 * GET /categories.php
 * @returns {Promise<Array<{ idCategory: string, strCategory: string, strCategoryThumb: string, strCategoryDescription: string }>>}
 */
export async function getCategories() {
  const data = await apiGet('/categories.php')
  return data.categories ?? []
}

/**
 * Fetch meals filtered by category name.
 * GET /filter.php?c=<categoryName>
 * @param {string} categoryName
 * @returns {Promise<Array<{ idMeal: string, strMeal: string, strMealThumb: string }>>}
 */
export async function getMealsByCategory(categoryName) {
  if (!categoryName) {
    throw new Error('getMealsByCategory requires a categoryName')
  }
  const data = await apiGet(`/filter.php?c=${encodeURIComponent(categoryName)}`)
  return data.meals ?? []
}

/**
 * Fetch several random meals (TheMealDB /random.php returns one meal per call).
 * Useful for populating promos / popular items on the Home page.
 * @param {number} count - How many meals to fetch (default 4)
 * @returns {Promise<Array<object>>} Full meal objects (may include duplicates if API repeats)
 */
export async function getRandomMeals(count = 4) {
  const safeCount = Math.max(1, Number(count) || 1)
  const results = await Promise.all(
    Array.from({ length: safeCount }, () => apiGet('/random.php')),
  )

  const meals = results.map((data) => data.meals?.[0]).filter(Boolean)

  // Prefer unique meals when the API happens to return the same one twice
  const uniqueById = new Map()
  for (const meal of meals) {
    uniqueById.set(meal.idMeal, meal)
  }
  return Array.from(uniqueById.values())
}

/**
 * Search meals whose name starts with the given letter.
 * GET /search.php?f=<letter>
 * @param {string} letter - Single letter a–z
 * @returns {Promise<Array<object>>}
 */
export async function searchMealsByFirstLetter(letter) {
  if (!letter || String(letter).length !== 1) {
    throw new Error('searchMealsByFirstLetter requires a single letter')
  }
  const data = await apiGet(`/search.php?f=${encodeURIComponent(letter.toLowerCase())}`)
  return data.meals ?? []
}

/**
 * Search meals by name (partial match).
 * GET /search.php?s=<query>
 * @param {string} query
 * @returns {Promise<Array<object>>} Empty array when nothing matches (API returns meals: null)
 */
export async function searchMealsByName(query) {
  const trimmed = String(query ?? '').trim()
  if (!trimmed) {
    throw new Error('searchMealsByName requires a non-empty query')
  }
  const data = await apiGet(`/search.php?s=${encodeURIComponent(trimmed)}`)
  return data.meals ?? []
}

/**
 * Fetch a single meal by id (reserved for Phase 7 meal details).
 * GET /lookup.php?i=<id>
 * @param {string|number} id
 * @returns {Promise<object|null>}
 */
export async function getMealById(id) {
  if (id == null || id === '') {
    throw new Error('getMealById requires an id')
  }
  const data = await apiGet(`/lookup.php?i=${encodeURIComponent(id)}`)
  return data.meals?.[0] ?? null
}
