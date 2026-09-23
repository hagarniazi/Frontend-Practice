import Badge from '../components/Badge.jsx'
import Button from '../components/Button.jsx'
import CategoryCircle from '../components/CategoryCircle.jsx'
import FeatureHighlight from '../components/FeatureHighlight.jsx'
import Footer from '../components/Footer.jsx'
import HeroSection from '../components/HeroSection.jsx'
import HowItWorksStep from '../components/HowItWorksStep.jsx'
import Navbar from '../components/Navbar.jsx'
import PopularItemCard from '../components/PopularItemCard.jsx'
import PromoBanner from '../components/PromoBanner.jsx'
import PromoCard from '../components/PromoCard.jsx'
import RestaurantCard from '../components/RestaurantCard.jsx'

const pizza = 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=800&q=80'
const burger = 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=800&q=80'
const noodles = 'https://images.unsplash.com/photo-1552611052-33e04de081de?auto=format&fit=crop&w=800&q=80'
const sandwich = 'https://images.unsplash.com/photo-1553909489-cd47e0907980?auto=format&fit=crop&w=1000&q=80'

function Section({ title, children, className = '' }) {
  return <section className={`mx-auto max-w-7xl px-4 py-10 sm:px-6 ${className}`}><h2 className="mb-6 font-heading text-2xl font-bold text-text-dark">{title}</h2>{children}</section>
}

function ComponentsPreview() {
  return <div className="bg-white">
    <Navbar />
    <HeroSection image={pizza} />
    <Section title="Buttons & Badges" className="bg-bg-cream"><div className="flex flex-wrap items-center gap-4"><Button icon="arrow">PROCEED TO ORDER</Button><Button variant="outline">Login</Button><Badge text="15% Off" type="discount" /><Badge text="Fast" type="fast" /><Badge text="Open Now" type="open" /><Badge text="Opens tomorrow" type="tomorrow" /></div></Section>
    <Section title="Featured Promotions"><div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4"><PromoCard image={pizza} discountPercent="15" title="Greys Vage" daysRemaining="6" /><PromoCard image={burger} discountPercent="10" title="Burgers & Bites" daysRemaining="4" /><PromoCard image={noodles} discountPercent="25" title="Noodle House" daysRemaining="3" /><PromoCard image={sandwich} discountPercent="20" title="Sandwich Corner" daysRemaining="5" /></div></Section>
    <Section title="How does it work" className="bg-bg-cream"><div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4"><HowItWorksStep icon="location" title="Select location" description="Choose the location where your food will be delivered." /><HowItWorksStep icon="menu" title="Choose order" description="Check over hundreds of menus to pick your favorite." /><HowItWorksStep icon="card" title="Pay advanced" description="It is quick, safe and simple. Select several methods." /><HowItWorksStep icon="smile" title="Enjoy meals" description="Food is made and delivered directly to your home." /></div></Section>
    <Section title="Popular items"><div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4"><PopularItemCard image={burger} name="Cheese Burger" restaurantName="Burger Arena" price="$3.88" onOrderClick={() => {}} /><PopularItemCard image={pizza} name="Toffe's Cake" restaurantName="Top Sticks" price="$4.00" onOrderClick={() => {}} /><PopularItemCard image={noodles} name="Dancake" restaurantName="Cake World" price="$1.99" onOrderClick={() => {}} /><PopularItemCard image={sandwich} name="Crispy Sandwich" restaurantName="Fastfood Dine" price="$3.00" onOrderClick={() => {}} /></div></Section>
    <Section title="Featured restaurants" className="bg-bg-cream"><div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4"><RestaurantCard image={burger} discountBadge="20% off" speedBadge="Fast" restaurantLogo={burger} restaurantName="Foodworld" rating="46" statusBadge="open" /><RestaurantCard image={pizza} discountBadge="15% off" speedBadge="Fast" restaurantLogo={pizza} restaurantName="Pizzahub" rating="40" statusBadge="tomorrow" /><RestaurantCard image={noodles} discountBadge="10% off" speedBadge="Fast" restaurantLogo={noodles} restaurantName="Donuts hut" rating="20" statusBadge="open" /><RestaurantCard image={sandwich} discountBadge="25% off" speedBadge="Fast" restaurantLogo={sandwich} restaurantName="Ruby Tuesday" rating="50" statusBadge="open" /></div></Section>
    <Section title="Search by Food"><div className="flex gap-5 overflow-x-auto pb-3"><CategoryCircle image={pizza} label="Pizza" /><CategoryCircle image={burger} label="Burger" /><CategoryCircle image={noodles} label="Noodles" /><CategoryCircle image={sandwich} label="Sandwiches" /></div></Section>
    <Section title="Feature highlights" className="bg-bg-cream"><div className="grid gap-4 sm:grid-cols-3"><FeatureHighlight icon="tag" title="Daily Discounts" /><FeatureHighlight icon="location" title="Live Tracing" /><FeatureHighlight icon="delivery" title="Quick Delivery" /></div></Section>
    <Section title="Promo banners"><div className="space-y-6"><PromoBanner title="Best deals" highlightedWord="Crispy Sandwiches" description="Enjoy the large size of sandwiches. Complete your meal with the perfect slice." image={sandwich} imagePosition="right" /><PromoBanner title="Celebrate parties with" highlightedWord="Fried Chicken" description="Get the best fried chicken and daily offers from the places you love." image={burger} imagePosition="left" /></div></Section>
    <Footer />
  </div>
}

export default ComponentsPreview
