import tabletImg from "../../assets/apple-watch-ultra-1-removebg-preview.png"; // Replace with your actual tablet image

const TabletBanner = () => {
  return (
    <div className="bg-white  overflow-hidden ">
      <div className="flex flex-col md:flex-row items-center justify-between px-6 py-6 md:py-8 relative">
        {/* Text Content */}
        <div className="flex-1 text-center md:text-left">
          <h2 className="text-lg md:text-2xl font-light text-gray-800">
            SHOP AND <span className="font-bold">SAVE BIG</span> ON HOTTEST SMART WATCHS
          </h2>
        </div>

        {/* Price Box */}
        <div className="bg-blue-700 text-white text-center px-4 py-2 rounded-md font-semibold text-sm md:text-base mt-4 md:mt-0">
          <p className="text-xs font-medium uppercase">Starting At</p>
          <p className="text-lg font-extrabold tracking-wide">$79<span className="text-sm align-top">99</span></p>
        </div>

        {/* Image */}
        <div className="absolute right-4 bottom-0 hidden md:block">
          <img
            src={tabletImg}
            alt="Tablet"
            className="w-32 md:w-40 lg:w-52 object-contain"
          />
        </div>
      </div>
    </div>
  );
};

export default TabletBanner;
