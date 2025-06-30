import { Link } from "react-router-dom"; // usually from react-router-dom
import img from "../../assets/apple-shopping-event-full-img.png";
import "swiper/css";
import "swiper/css/scrollbar";
import { Scrollbar, Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { UseFetchProducts } from "../../features/products/ProductsQuery.js";
import BannerCardLoader from './../loader/BannerCardLoader';


const ExtraFeature01 = () => {
  const { data: products, isLoading } = UseFetchProducts();

  const filteredProducts = products?.filter(
    (product) => product.brand.toLowerCase() === "apple"
  );

  return (
    <section className="bg-gradient-to-r from-[#f6cece] to-[#e4efff] py-8">
      <div className="max-w-screen-xl mx-auto px-4">
        {/* Two-column grid */}
        <div className="grid lg:grid-cols-2 grid-cols-1 gap-6 items-center">
          <div className="flex justify-center lg:justify-start">
            <img
              src={img}
              alt="Apple Shopping Event Banner"
              className="w-64 sm:w-80 md:w-[400px] lg:w-full rounded-lg  object-cover"
            />
          </div>

          <div className="text-center lg:text-left px-2 lg:px-0">
            <h2 className="text-3xl sm:text-4xl font-semibold text-gray-900">
              Apple Shopping Event
            </h2>
            <p className="mt-4 lg:text-lg sm:text-xl text-gray-700">
              Hurry and get discounts on all Apple devices up to 20%
            </p>
            <Link to="/allcategories" aria-label="Go Shopping Apple Products">
              <button className="mt-6 lg:px-6 lg:py-3 px-3 py-2 bg-[#1d4c9e] hover:bg-[#173d7a] transition text-white font-semibold rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#1d4c9e]">
                Go Shopping
              </button>
            </Link>
          </div>
        </div>

        {/* Products carousel */}
        <div className="mt-10">
          {isLoading ? (
            <BannerCardLoader />
          ) : filteredProducts?.length ? (
            <Swiper
              slidesPerView={1}
              breakpoints={{
                640: { slidesPerView: 2 },
                768: { slidesPerView: 3 },
                1024: { slidesPerView: 4 },
              }}
              spaceBetween={15}
              autoplay={{
                delay: 2000,
                disableOnInteraction: false,
              }}
              loop={filteredProducts.length > 4}
              modules={[Autoplay, Scrollbar]}
              className="px-2"
              // scrollbar={{ draggable: true }}
              aria-label="Apple products carousel"
            >
              {filteredProducts.map((product) => (
                <SwiperSlide key={product._id}>
                  <Link
                    to={`/product/${product._id}`}
                    className="block focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#1d4c9e]"
                  >
                    <div className="flex flex-col lg:flex-row justify-start items-center gap-4 bg-white rounded-xl shadow-md hover:shadow-lg transition p-4 min-h-[160px] max-w-[300px] mx-auto">
                      <img
                        className="w-24 h-24 object-cover rounded-md"
                        src={product.images[0]}
                        alt={product.name}
                      />
                      <div className="flex flex-col justify-center text-center lg:text-left">
                        <h3 className="font-semibold text-lg text-gray-900">
                          {product.name}
                        </h3>
                        <p className="text-yellow-500 text-lg leading-none select-none">
                          ☆ ☆ ☆ 
                        </p>
                        <p className="text-blue-600 font-semibold mt-1">
                          ${product.price.toFixed(2)}
                        </p>
                      </div>
                    </div>
                  </Link>
                </SwiperSlide>
              ))}
            </Swiper>
          ) : (
            <p className="text-center text-gray-500">No Apple products found.</p>
          )}
        </div>
      </div>
    </section>
  );
};

export default ExtraFeature01;
