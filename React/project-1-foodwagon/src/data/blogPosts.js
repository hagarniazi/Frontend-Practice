const blogPosts = [
  {
    id: '1',
    title: 'How we shave minutes off every delivery',
    excerpt: 'A peek at the routing tricks that keep Foodwagon orders on time.',
    date: 'Mar 12, 2026',
    category: 'Product',
    image: 'https://images.unsplash.com/photo-1526367790999-01507888fdfa?auto=format&fit=crop&w=800&q=80',
    body: 'At Foodwagon, speed is a promise we take seriously. Our dispatch tools group nearby orders, riders get clear turn-by-turn guidance, and restaurants see prep timers that match real kitchen flow. This demo article is placeholder copy for the Foodwagon clone — in a real product it would dive into maps, ETAs, and rider incentives.',
  },
  {
    id: '2',
    title: 'Five underrated dishes our customers reorder',
    excerpt: 'From spicy noodles to quiet comfort bowls, these meals keep coming back.',
    date: 'Mar 5, 2026',
    category: 'Food',
    image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=800&q=80',
    body: 'We looked at reorder patterns across demo cities and found a few quiet favorites: creamy pasta bowls, late-night sandwiches, and brightly seasoned rice plates. Placeholders like this help the Blog page feel alive without needing a CMS.',
  },
  {
    id: '3',
    title: 'Partner kitchens: what great delivery menus share',
    excerpt: 'Packaging, portion cues, and photos that convert hungry scrollers.',
    date: 'Feb 22, 2026',
    category: 'Partners',
    image: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=800&q=80',
    body: 'Restaurants that win on Foodwagon tend to keep menus scannable, use clear dish photos, and label spice levels. This post is mock content for the practice project.',
  },
  {
    id: '4',
    title: 'A day in the life of a Foodwagon rider',
    excerpt: 'Flexible hours, friendly kitchens, and the playlist that powers the hustle.',
    date: 'Feb 10, 2026',
    category: 'People',
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=800&q=80',
    body: 'Riders start their shift, check hot zones, and pick batches that fit their bike or car. Tips, bonuses, and safe routes matter. Again — demo narrative only for this Foodwagon clone.',
  },
  {
    id: '5',
    title: 'Why we built Foodwagon around trust',
    excerpt: 'Transparent ETAs, easy support, and refunds that don’t feel like a maze.',
    date: 'Jan 28, 2026',
    category: 'Company',
    image: 'https://images.unsplash.com/photo-1556740749-887f6717d7e4?auto=format&fit=crop&w=800&q=80',
    body: 'Trust means knowing where your bag is, talking to a real person when something’s off, and feeling good about the fee you pay. This placeholder story stands in for a longer brand essay.',
  },
  {
    id: '6',
    title: 'Seasonal eats: what to order this spring',
    excerpt: 'Fresh salads, lighter bowls, and citrus desserts trending on the app.',
    date: 'Jan 14, 2026',
    category: 'Food',
    image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=800&q=80',
    body: 'Spring menus lean green and bright. Try citrus desserts, herb-heavy salads, and grilled fish specials from partner kitchens. Demo text for the Foodwagon Blog grid.',
  },
]

export function getBlogPostById(id) {
  return blogPosts.find((post) => post.id === String(id)) ?? null
}

export default blogPosts
