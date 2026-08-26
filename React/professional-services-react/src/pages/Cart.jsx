import Container from "../components/Container";
import useCart from "../context/useCart";

function Cart() {
  const { cartItems, removeFromCart } = useCart();

  return (
    <main className="cart-page">
      <Container>
        <h1>Shopping Cart</h1>

        {cartItems.length === 0 ? (
          <p>Your cart is currently empty.</p>
        ) : (
          <div className="cart-items">
            {cartItems.map((item) => (
              <article className="cart-item" key={item.id}>
                <div>
                  <h2>{item.title}</h2>
                  <p>{item.description}</p>
                </div>

                <button onClick={() => removeFromCart(item.id)}>
                  Remove
                </button>
              </article>
            ))}
          </div>
        )}
      </Container>
    </main>
  );
}

export default Cart;