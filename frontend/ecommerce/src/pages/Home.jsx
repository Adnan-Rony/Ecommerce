import Card from "../components/home/Card.jsx";
import BlogSection from "../components/home/BlogSection.jsx";
import ExtraFeature01 from "../components/home/ExtraFeature01.jsx";
import { NewsLetter } from "../components/home/NewsLetter.jsx";

import FeaturesBar from "../components/home/FeaturesBar.jsx";

import Categories from "../components/home/Categories.jsx";

import BannerGrid from "../components/home/BannerGrid.jsx";


import FaqSection from "../components/home/FAQ.jsx";
import AllCards from "../components/home/AllCards.jsx";
import FlashHotSalePromo from "../components/home/FlashHotSalePromo.jsx";

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
      {/* <section className="max-w-7xl mx-auto lg:p-0 p-2">
        <Card />
      </section> */}
      {/* <section className="max-w-7xl mx-auto lg:p-0 p-2">
        <AllCards />
      </section> */}
      <section className="max-w-7xl mx-auto ">
        <Categories />
      </section>

      

      <section className="w-full ">
        <FlashHotSalePromo />
      </section>

      {/* <section className="max-w-7xl mx-auto ">
        <BannerGrid />
      </section> */}
      {/* Newsletter Full Width */}
      <section className="w-full">
        <FaqSection />
      </section>
      <section className="w-full">
        <NewsLetter />
      </section>
      
    </div>
  );
};

export default Home;
