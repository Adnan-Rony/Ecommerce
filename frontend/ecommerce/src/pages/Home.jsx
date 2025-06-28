import BlogSection from "../components/home/BlogSection.jsx";
import Card from "../components/home/Card.jsx";

import ExtraFeature01 from "../components/home/ExtraFeature01.jsx";

import Hero from "../components/home/Hero.jsx";

const Home = () => {
  return (
    <div className="">
      <div className="w-screen relative left-1/2 right-1/2 -mx-[50vw]">
        <ExtraFeature01></ExtraFeature01>
      </div>

      <Card></Card>

      <div className="w-screen relative left-1/2 right-1/2 -mx-[50vw]"></div>
      <BlogSection />

      <Hero />
    </div>
  );
};

export default Home;
