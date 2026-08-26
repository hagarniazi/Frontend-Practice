import Container from "./Container";
import { Link } from "react-router-dom";

function AboutPreview() {
  return (
    <section className="about-preview">
      <Container>
        <div>
          <p>About Us</p>

          <h2>We create solutions that make a difference.</h2>

          <p>
            Our team provides professional digital solutions that
            help businesses improve, grow, and achieve their goals.
          </p>

          <Link to="/about">Learn More</Link>
        </div>
      </Container>
    </section>
  );
}

export default AboutPreview;