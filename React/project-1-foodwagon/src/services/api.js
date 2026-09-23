/**
 * Shared API configuration for TheMealDB.
 * Import BASE_URL from here so endpoints are not hardcoded in every function.
 */
export const BASE_URL = 'https://www.themealdb.com/api/json/v1/1'

/**
 * Low-level GET helper. Throws with a clear message on network / HTTP failure.
 * @param {string} path - Path relative to BASE_URL (e.g. "/categories.php")
 * @returns {Promise<object>} Parsed JSON body
 */
export async function apiGet(path) {
  const url = `${BASE_URL}${path.startsWith('/') ? path : `/${path}`}`

  let response
  try {
    response = await fetch(url)
  } catch {
    throw new Error(`Network error while requesting ${url}`)
  }

  if (!response.ok) {
    throw new Error(`TheMealDB request failed (${response.status}): ${url}`)
  }

  return response.json()
}
