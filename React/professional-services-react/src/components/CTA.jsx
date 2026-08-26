import Container from "./Container";
import { Link } from "react-router-dom";

function CTA() {
  return (
    <section className="cta">
      <Container>
        <h2>Ready to work with us?</h2>

        <p>
          Let's build something great together.
        </p>

        <Link to="/contact">Contact Us</Link>
      </Container>
    </section>
  );
}

export default CTA;