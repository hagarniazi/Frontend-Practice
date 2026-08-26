import HomeHero from "../components/HomeHero";
import ServicesPreview from "../components/ServicesPreview";
import AboutPreview from "../components/AboutPreview";
import CTA from "../components/CTA";

function Home() {
  return (
    <main>
      <HomeHero />
      <ServicesPreview />
      <AboutPreview />
      <CTA />
    </main>
  );
}

export default Home;