import Card from "../components/home/Card.jsx";
import Categories from "../components/home/Categories.jsx";
import ExtraFeature01 from "../components/home/ExtraFeature01.jsx";
import Hero from "../components/home/Hero.jsx";
import PromoBanner from "../components/home/PromoBanner.jsx";
import LoginModal from "./Logintwo.jsx";

const Home = () => {
  return (
    <div className="">
      {/* <div className="w-screen relative left-1/2 right-1/2 -mx-[50vw]">
        <Hero />
      </div> */}
      <div className="">
        <Hero />
      </div>

      {/* <Categories></Categories> */}
      <Card></Card>
      <PromoBanner></PromoBanner>

      <div className="w-screen relative left-1/2 right-1/2 -mx-[50vw]">
        <ExtraFeature01></ExtraFeature01>
      </div>
    </div>
  );
};

export default Home;
