import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/pagination";
import { Link } from "react-router-dom";
import { UseFetchProducts } from "../../features/products/ProductsQuery.js";
import { FaBolt, FaShippingFast } from "react-icons/fa";
import { MdVerified } from "react-icons/md";

const Feature = () => {
  const { data: products, isLoading } = UseFetchProducts();

  const bannerProducts = products
    ?.filter(p => p.isNewArrival && p.stock > 0)
    ?.slice(0, 5) ||
    products?.slice(0, 5) || [];

  if (isLoading) {
    return (
      <div className="w-full h-[320px] bg-gradient-to-r from-gray-200 to-gray-300 animate-pulse rounded-2xl" />
    );
  }

  if (bannerProducts.length === 0) {
    return (
      <div className="w-full h-[320px] bg-gradient-to-br from-[#0f2d6e] to-[#1d4c9e] rounded-2xl flex flex-col items-center justify-center gap-4">
        <p className="text-white text-xl font-bold">ZapZone BD</p>
        <p className="text-blue-200 text-sm">সেরা দামে সেরা পণ্য</p>
        <Link to="/allcategories">
          <button className="bg-yellow-400 text-blue-900 font-bold px-6 py-3 rounded-xl hover:bg-yellow-300 transition">
            Shop Now →
          </button>
        </Link>
      </div>
    );
  }

  return (
    <div className="relative w-full h-[320px] rounded-2xl overflow-hidden shadow-xl">
      <Swiper
        effect="fade"
        pagination={{ clickable: true }}
        autoplay={{ delay: 3500, disableOnInteraction: false }}
        modules={[Autoplay, EffectFade, Pagination]}
        className="w-full h-full"
      >
        {bannerProducts.map((product, index) => {
          const gradients = [
            "from-[#0f2d6e] via-[#1d4c9e]/80 to-transparent",
            "from-[#1a0a2e] via-[#4a1a6e]/80 to-transparent",
            "from-[#0d3b00] via-[#1a5c02]/80 to-transparent",
            "from-[#1a0000] via-[#6e1a1a]/80 to-transparent",
            "from-[#0a1a3b] via-[#1a3b6e]/80 to-transparent",
          ];

          const accentColors = [
            "text-yellow-400",
            "text-purple-300",
            "text-green-400",
            "text-red-400",
            "text-blue-300",
          ];

          const badgeColors = [
            "bg-yellow-400 text-blue-900",
            "bg-purple-400 text-white",
            "bg-green-400 text-white",
            "bg-red-400 text-white",
            "bg-blue-400 text-white",
          ];

          return (
            <SwiperSlide key={product._id}>
              <div className="relative w-full h-[320px]">
                {/* Background Image */}
                <img
                  src={product.images?.[0]}
                  alt={product.name}
                  className="absolute inset-0 w-full h-full object-cover"
                />

                {/* Gradient Overlay */}
                <div className={`absolute inset-0 bg-gradient-to-r ${gradients[index % gradients.length]}`} />
                <div className="absolute inset-0 bg-black/20" />

                {/* Content */}
                <div className="absolute inset-0 flex flex-col justify-between p-6">

                  {/* Top badges */}
                  <div className="flex items-center justify-between">
                    <span className={`${badgeColors[index % badgeColors.length]} text-xs font-bold px-3 py-1.5 rounded-full flex items-center gap-1 shadow-lg`}>
                      {product.isNewArrival ? "🆕 New Arrival" : "⭐ Featured"}
                    </span>
                    {product.originalPrice > product.price && (
                      <span className="bg-red-500 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg">
                        -{Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% OFF
                      </span>
                    )}
                  </div>

                  {/* Middle content */}
                  <div className="space-y-3">
                    <p className="text-white/80 text-xs font-medium uppercase tracking-widest">
                      {product.category}
                    </p>
                    <h3 className="text-white font-extrabold text-2xl md:text-3xl leading-tight max-w-xs drop-shadow-lg">
                      {product.name}
                    </h3>

                    {/* Price */}
                    <div className="flex items-center gap-3">
                      <span className={`font-extrabold text-2xl ${accentColors[index % accentColors.length]} drop-shadow-lg`}>
                        ৳{product.price}
                      </span>
                      {product.originalPrice > 0 && (
                        <span className="text-white/60 line-through text-sm">
                          ৳{product.originalPrice}
                        </span>
                      )}
                    </div>

                    {/* Trust badges */}
                    <div className="flex items-center gap-3">
                      <span className="flex items-center gap-1 text-white/80 text-xs">
                        <FaShippingFast className="text-green-400" />
                        Free Delivery
                      </span>
                      <span className="flex items-center gap-1 text-white/80 text-xs">
                        <MdVerified className="text-blue-400" />
                        Original
                      </span>
                      <span className="flex items-center gap-1 text-white/80 text-xs">
                        <FaBolt className="text-yellow-400" />
                        COD
                      </span>
                    </div>
                  </div>

                  {/* Bottom CTA */}
                  <div className="flex items-center gap-3">
                    <Link to={`/product/${product._id}`}>
                      <button className="bg-yellow-400 hover:bg-yellow-300 text-blue-900 font-extrabold px-6 py-2.5 rounded-xl transition shadow-lg text-sm">
                        Buy Now →
                      </button>
                    </Link>
                    <Link to="/allcategories">
                      <button className="bg-white/20 hover:bg-white/30 backdrop-blur text-white font-semibold px-5 py-2.5 rounded-xl transition text-sm border border-white/30">
                        View All
                      </button>
                    </Link>
                  </div>
                </div>

                {/* Slide number */}
                <div className="absolute bottom-4 right-4 bg-black/40 backdrop-blur text-white text-xs px-2 py-1 rounded-full">
                  {index + 1} / {bannerProducts.length}
                </div>
              </div>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
};

export default Feature;