import { useEffect, useState } from "react";
import Container from "../components/Container";
import ServiceSection from "../components/ServiceSection";

function Services() {
  const [services, setServices] = useState([]);
  const [showAll, setShowAll] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const getServices = async () => {
      try {
        const response = await fetch("/data/services.json");

        if (!response.ok) {
          throw new Error("Failed to fetch services");
        }

        const data = await response.json();

        setServices(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    getServices();
  }, []);

  return (
    <main className="services-page">
      <section className="page-hero">
        <Container>
          <p>Our Services</p>

          <h1>Solutions designed for your business.</h1>

          <p>
            Explore the professional services we provide to help
            your business grow.
          </p>
        </Container>
      </section>

      <section className="services-list">
        <Container>
          {loading && <p>Loading services...</p>}

          {error && <p>{error}</p>}

          {!loading && !error && services.length === 0 && (
            <p>No services available.</p>
          )}

          {!loading && !error && services.length > 0 && (
            <>
              <ServiceSection
                services={services}
                showAll={showAll}
              />

              {services.length > 2 && (
                <button
                  className="secondary-button"
                  onClick={() => setShowAll((previous) => !previous)}
                >
                  {showAll ? "Show Less" : "Show More"}
                </button>
              )}
            </>
          )}
        </Container>
      </section>
    </main>
  );
}

export default Services;