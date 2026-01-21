import Hero from "../components/hero/Hero";
import WhoItsFor from "../components/sections/WhoItsFor";
import Services from "../components/sections/Services";
import HowItWorks from "../components/sections/HowItWorks";
import Training from "../components/sections/Training";
import WhySoftwraith from "../components/sections/WhySoftwraith";
import CTA from "../components/sections/CTA";

const Home = () => {
  return (
    <>
      <Hero />
      <WhoItsFor />
      <Services />
      <HowItWorks />
      <Training />
      <WhySoftwraith />
      <CTA />
    </>
  );
};

export default Home;
