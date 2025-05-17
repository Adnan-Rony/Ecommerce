import { Link } from "react-router";
import img from "../../assets/apple-shopping-event-full-img.png";
import "swiper/css";
import "swiper/css/scrollbar";
import { Scrollbar, Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { UseFetchProducts } from "../../features/products/ProductsQuery.js";

const ExtraFeature01 = () => {
  const { data: products, } = UseFetchProducts();

  const filteredProducts = products?.filter(
    (product) => product.brand === "apple"
  );

  return (
    <div className="bg-gradient-to-r py-4 from-[#f6cece] to-[#e4efff] my-10">
      <div className="max-w-screen-xl mx-auto py-6">
        <div className=" grid lg:grid-cols-2 grid-cols-1 gap-2 items-center lg:p-0 p-4">
          <div className="">
            <img src={img} className="lg:w-full w-64" alt="" />
          </div>

          <div className="">
            <p className="lg:text-4xl text-xl font-semibold">
              Apple Shopping Event
            </p>
            <p className="lg:text-xl my-3">
              Hurry and get discounts on all Apple devices up to 20%
            </p>
            <Link to="/allcategories">
              <button className="btn bg-blue-500 text-white">
                Go Shopping
              </button>
            </Link>
          </div>
        </div>

        <div className="py-6 ">
          <Swiper
            slidesPerView={1}
            breakpoints={{
              640: { slidesPerView: 2 },
              768: { slidesPerView: 3 },
              1024: { slidesPerView: 4 },
            }}
            spaceBetween={15}
            autoplay={{
              delay: 1500,
              disableOnInteraction: false,
            }}
           loop={filteredProducts?.length > 4} // ✅ Only enable loop if enough slides
            modules={[Autoplay]}
            className="px-4"
          >
            {filteredProducts?.map((product, index) => (
              <SwiperSlide key={index}>
                <Link to={`/product/${product._id}`}>
                <div className="flex justify-between px-4 bg-white  rounded-xl items-center gap-2 shadow hover:shadow-lg transition w-full lg:max-w-[300px] min-h-[140px]">
                  <img
                    className="w-20 h-20 object-cover"
                    src={product.images[0]}
                    alt={product.name}
                  />
                  <div className="flex flex-col justify-between">
                    <p className="font-semibold text-sm">{product.name}</p>
                    <p className="text-yellow-500 text-sm">☆ ☆ ☆ ☆</p>
                    <p className="text-blue-500 font-semibold">
                      ${product.price}
                    </p>
                  </div>
                </div>
                </Link>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </div>
  );
};

export default ExtraFeature01;
