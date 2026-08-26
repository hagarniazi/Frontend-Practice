import { useEffect, useState } from "react";
import Container from "./Container";
import ServiceCard from "./ServiceCard";
import { Link } from "react-router-dom";

function ServicesPreview() {
  const [services, setServices] = useState([]);

  useEffect(() => {
    fetch("/data/services.json")
      .then((response) => response.json())
      .then((data) => setServices(data));
  }, []);

  return (
    <section className="services-preview">
      <Container>
        <h2>Our Services</h2>

        <div className="services-grid">
          {services.slice(0, 3).map((service) => (
            <ServiceCard
              key={service.id}
              title={service.title}
              description={service.description}
            />
          ))}
        </div>

        <Link to="/services">View All Services</Link>
      </Container>
    </section>
  );
}

export default ServicesPreview;