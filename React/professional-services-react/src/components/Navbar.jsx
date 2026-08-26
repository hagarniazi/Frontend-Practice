import { Link, NavLink } from "react-router-dom";
import Container from "./Container";
import useCart from "../context/useCart";

function Navbar() {
  const { cartItems } = useCart();

  return (
    <header className="navbar">
      <Container>
        <Link to="/" className="logo">
          Professional Services
        </Link>

        <nav className="nav-links">
          <NavLink to="/">Home</NavLink>
          <NavLink to="/services">Services</NavLink>
          <NavLink to="/about">About</NavLink>
          <NavLink to="/contact">Contact</NavLink>

          <Link to="/cart" className="cart-link" aria-label="Shopping cart">
            🛍️

            {cartItems.length > 0 && (
              <span className="cart-count">
                {cartItems.length}
              </span>
            )}
          </Link>
        </nav>
      </Container>
    </header>
  );
}

export default Navbar;