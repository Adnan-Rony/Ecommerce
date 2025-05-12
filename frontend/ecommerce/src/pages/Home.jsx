import Card from "../components/home/Card.jsx";
import Categories from "../components/home/Categories.jsx";
import Hero from "../components/home/Hero.jsx";


const Home = () => {
  return (
    <div className="">
      <div className="w-screen relative left-1/2 right-1/2 -mx-[50vw]">
        <Hero />
      </div>

      <Categories></Categories>
      <Card></Card>
      
    </div>
  );
};

export default Home;
