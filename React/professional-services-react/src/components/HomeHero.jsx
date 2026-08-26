import { Link } from "react-router-dom";
import Container from "./Container";

function HomeHero() {
  return (
    <section className="home-hero">
      <Container>
        <div className="home-hero-content">
          <p className="section-label">Professional Services</p>

          <h1>
            Professional solutions
            <br />
            for your business.
          </h1>

          <p>
            We provide reliable and creative solutions to help
            businesses grow and achieve their goals.
          </p>

          <Link to="/services" className="primary-button">
            Explore Services
          </Link>
        </div>
      </Container>
    </section>
  );
}

export default HomeHero;