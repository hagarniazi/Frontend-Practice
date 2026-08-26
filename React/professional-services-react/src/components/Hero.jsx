import { Link } from "react-router-dom";
import Container from "./Container";

function Hero() {
  return (
    <section className="hero">
      <Container>
        <div className="hero-content">
          <p className="hero-subtitle">Professional Services</p>

          <h1>We help businesses grow and succeed.</h1>

          <p>
            We provide professional solutions designed to help
            businesses achieve their goals.
          </p>

          <Link to="/contact">Get Started</Link>
        </div>
      </Container>
    </section>
  );
}

export default Hero;