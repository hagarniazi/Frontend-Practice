import { Route, Routes } from 'react-router-dom'
import Navbar from './components/Navbar.jsx'
import { AuthProvider } from './context/AuthContext.jsx'
import { CartProvider } from './context/CartContext.jsx'
import Home from './pages/Home.jsx'
import Login from './pages/Login.jsx'
import MealDetails from './pages/MealDetails.jsx'
import NotFound from './pages/NotFound.jsx'
import Order from './pages/Order.jsx'
import PageNotBuilt from './pages/PageNotBuilt.jsx'
import Restaurants from './pages/Restaurants.jsx'
import Signup from './pages/Signup.jsx'

function App() {
  // Single CartProvider around Navbar + all Routes (not per-page) so MealDetails
  // and Order share one cart state + localStorage persistence.
  return (
    <AuthProvider>
      <CartProvider>
        <div className="min-h-screen bg-white font-body text-text-dark">
          <Navbar />
          <main>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/meal/:id" element={<MealDetails />} />
              <Route path="/order" element={<Order />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/restaurants" element={<Restaurants />} />
              <Route path="/page-not-built" element={<PageNotBuilt />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>
        </div>
      </CartProvider>
    </AuthProvider>
  )
}

export default App
