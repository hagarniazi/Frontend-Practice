/**
 * Shared Home-section cache so /restaurants and Home stay in sync
 * and navigating back does not re-fetch TheMealDB.
 */
export const homeDataCache = {
  categories: null,
  popularItems: null,
  restaurants: null,
  promos: null,
}
