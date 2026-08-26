import Container from "../components/Container";

function About() {
  return (
    <main className="about-page">
      <section className="page-hero">
        <Container>
          <p>About Us</p>
          <h1>We build solutions that help businesses grow.</h1>
          <p>
            We are a professional team focused on creating digital
            solutions that solve real business problems.
          </p>
        </Container>
      </section>

      <section className="about-content">
        <Container>
          <div className="about-grid">
            <div>
              <h2>Who We Are</h2>
              <p>
                We are a team of passionate professionals who believe
                that great digital experiences can make a real
                difference for businesses.
              </p>
            </div>

            <div>
              <h2>Our Mission</h2>
              <p>
                Our mission is to provide simple, effective and
                high-quality solutions for our clients.
              </p>
            </div>
          </div>
        </Container>
      </section>
    </main>
  );
}

export default About;