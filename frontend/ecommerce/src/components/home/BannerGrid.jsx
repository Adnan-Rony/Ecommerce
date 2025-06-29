import Feature from "./ExtraFeature02.jsx";
import RightSideBanners from "./RightSideBanners.jsx";


const BannerGrid = () => {
  return (
    <section className=" mx-auto  ">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-2">
        {/* Left side big banner with Swiper */}
        <div className="lg:col-span-2">
          <Feature />
        </div>

        {/* Right side banners */}
        <RightSideBanners />
      </div>
    </section>
  );
};

export default BannerGrid;
