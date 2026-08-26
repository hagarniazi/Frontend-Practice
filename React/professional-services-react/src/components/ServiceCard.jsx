import useCart from "../context/useCart";

function ServiceCard({ id, title, description }) {
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    addToCart({
      id,
      title,
      description,
    });
  };

  return (
    <article className="service-card">
      <div className="service-icon">✦</div>

      <h3>{title}</h3>

      <p>{description}</p>

      <button onClick={handleAddToCart}>
        Add to Cart
      </button>
    </article>
  );
}

export default ServiceCard;