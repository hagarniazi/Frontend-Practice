/**
 * City content for /city/:cityName routes.
 * slug must match Footer links (lowercase, hyphenated).
 */
const cities = [
  {
    slug: 'san-francisco',
    name: 'San Francisco',
    description:
      'From Mission burritos to waterfront seafood, Foodwagon brings San Francisco’s favorite kitchens to your door across the Bay.',
    image:
      'https://images.unsplash.com/photo-1501594907352-04cda38ebc29?auto=format&fit=crop&w=1400&q=80',
  },
  {
    slug: 'miami',
    name: 'Miami',
    description:
      'Cuban sandwiches, fresh ceviche, and late-night bites — Foodwagon keeps Miami fed from South Beach to Little Havana.',
    image:
      'https://images.unsplash.com/photo-1514214240176-9c6b8acfa8c4?auto=format&fit=crop&w=1400&q=80',
  },
  {
    slug: 'san-diego',
    name: 'San Diego',
    description:
      'Surf, sun, and great tacos. Foodwagon delivers San Diego’s coastal flavors whenever hunger hits.',
    image:
      'https://images.unsplash.com/photo-1538688525198-9b88f6c35504?auto=format&fit=crop&w=1400&q=80',
  },
  {
    slug: 'east-bay',
    name: 'East Bay',
    description:
      'Oakland, Berkeley, and beyond — Foodwagon connects East Bay neighborhoods with the restaurants they love.',
    image:
      'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?auto=format&fit=crop&w=1400&q=80',
  },
  {
    slug: 'long-beach',
    name: 'Long Beach',
    description:
      'Harbor views and diverse kitchens. Foodwagon makes Long Beach dining effortless from downtown to Belmont Shore.',
    image:
      'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=1400&q=80',
  },
  {
    slug: 'los-angeles',
    name: 'Los Angeles',
    description:
      'A city of endless menus. Foodwagon helps Angelenos discover and order from LA’s best spots, fast.',
    image:
      'https://images.unsplash.com/photo-1534190760961-74e8c1c5c3da?auto=format&fit=crop&w=1400&q=80',
  },
  {
    slug: 'washington-dc',
    name: 'Washington DC',
    description:
      'Capital flavors delivered. Foodwagon brings DC’s food halls, cafés, and classics straight to your address.',
    image:
      'https://images.unsplash.com/photo-1617581629397-a725307fb9ff?auto=format&fit=crop&w=1400&q=80',
  },
  {
    slug: 'seattle',
    name: 'Seattle',
    description:
      'Coffee, seafood, and Pacific Northwest comfort food — Foodwagon keeps Seattle warm one delivery at a time.',
    image:
      'https://images.unsplash.com/photo-1502175353174-a7a70e73b362?auto=format&fit=crop&w=1400&q=80',
  },
]

export function getCityBySlug(slug) {
  const key = String(slug || '').toLowerCase()
  return cities.find((city) => city.slug === key) ?? null
}

export default cities
