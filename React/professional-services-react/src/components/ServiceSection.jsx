import ServiceCard from "./ServiceCard";

function ServiceSection({ services, showAll }) {
  const visibleServices = services.slice(
    0,
    showAll ? services.length : 2
  );

  return (
    <section>
      {visibleServices.map((service) => (
        <ServiceCard
          key={service.id}
          id={service.id}
          title={service.title}
          description={service.description}
        />
      ))}
    </section>
  );
}

export default ServiceSection;