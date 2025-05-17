import Card from "../components/home/Card.jsx";
import Categories from "../components/home/Categories.jsx";
import ExtraFeature01 from "../components/home/ExtraFeature01.jsx";
import Feature from "../components/home/ExtraFeature02.jsx";
import Hero from "../components/home/Hero.jsx";
import PromoBanner from "../components/home/PromoBanner.jsx";
import LoginModal from "./Logintwo.jsx";

const Home = () => {
  return (
    <div className="">


      <div className="w-screen relative left-1/2 right-1/2 -mx-[50vw]">
        <ExtraFeature01></ExtraFeature01>
      </div>

        <Card></Card>


      <div className="w-screen relative left-1/2 right-1/2 -mx-[50vw]">
        {/* <Feature></Feature> */}
      </div>

      {/* <Categories></Categories> */}
    
      <Hero />
      {/* <PromoBanner></PromoBanner> */}
    </div>
  );
};

export default Home;
