import Hero from "../components/home/Hero.jsx";
import Card from "../components/home/Card.jsx";
import BlogSection from "../components/home/BlogSection.jsx";
import ExtraFeature01 from "../components/home/ExtraFeature01.jsx";
import { NewsLetter } from "../components/home/NewsLetter.jsx";
import PromoBanner from "../components/home/PromoBanner.jsx";
import FeaturesBar from "../components/home/FeaturesBar.jsx";
import Feature from "../components/home/ExtraFeature02.jsx";
import Categories from "../components/home/Categories.jsx";

const Home = () => {
  return (
    <div className="">
      {/* Full Width Section */}
      <section className="w-full ">
        <ExtraFeature01 />
      </section>
      <section className="w-full">
        <FeaturesBar />
      </section>

      {/* Product Cards */}
      <section className="max-w-7xl mx-auto ">
        <Card />
      </section>
      <section className="max-w-7xl mx-auto ">
        <Categories />
      </section>

      {/* Blog Section */}
      <section className="bg-gray-50 ">
        <BlogSection />
      </section>

      {/* Newsletter Full Width */}
      <section className="w-full">
        <NewsLetter />
      </section>
      {/* <section className="max-w-7xl mx-auto">
        <PromoBanner />
      </section> */}

      {/* Hero / About */}
      {/* <section className="max-w-7xl mx-auto ">
        <Hero />
      </section> */}
      <section className="max-w-7xl mx-auto ">
        <Feature />
      </section>
    </div>
  );
};

export default Home;
