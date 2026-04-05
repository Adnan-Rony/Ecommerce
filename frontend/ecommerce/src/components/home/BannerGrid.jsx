import Feature from "./ExtraFeature02.jsx";
import RightSideBanners from "./RightSideBanners.jsx";

const BannerGrid = () => {
  return (
    <section className="max-w-screen-xl mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold text-gray-800">Hot Picks</h2>
        <p className="text-gray-400 text-sm">সেরা পণ্যগুলো দেখুন</p>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2">
          <Feature />
        </div>
        <div>
          <RightSideBanners />
        </div>
      </div>
    </section>
  );
};

export default BannerGrid;