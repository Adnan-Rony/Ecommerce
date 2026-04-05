import { Link } from "react-router-dom";
import { UseFetchProducts } from "../../features/products/ProductsQuery.js";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import { FaShippingFast, FaShieldAlt, FaBolt } from "react-icons/fa";
import { MdLocalOffer } from "react-icons/md";
import AddToCart from "../AddToCart.jsx";

const ProductCard = ({ product }) => (
  <div className="bg-white rounded-xl shadow hover:shadow-md transition overflow-hidden group border border-gray-100">
    <Link to={`/product/${product._id}`}>
      <div className="relative overflow-hidden">
        <img
          src={product.images?.[0]}
          alt={product.name}
          className="w-full h-36 object-cover group-hover:scale-105 transition duration-300"
        />
        {product.stock === 0 && (
          <span className="absolute top-2 left-2 bg-red-500 text-white text-xs px-2 py-0.5 rounded-full">
            Out of Stock
          </span>
        )}
        {product.stock > 0 && product.stock <= 5 && (
          <span className="absolute top-2 left-2 bg-yellow-400 text-blue-900 text-xs px-2 py-0.5 rounded-full font-bold">
            মাত্র {product.stock}টা!
          </span>
        )}
        {product.isNewArrival && (
          <span className="absolute top-2 right-2 bg-green-500 text-white text-xs px-2 py-0.5 rounded-full font-bold">
            New
          </span>
        )}
        {product.isFeatured && (
          <span className="absolute top-2 right-2 bg-blue-600 text-white text-xs px-2 py-0.5 rounded-full font-bold">
            ⭐
          </span>
        )}
      </div>
    </Link>
    <div className="p-3 space-y-2">
      <p className="text-xs font-semibold text-gray-700 line-clamp-2 leading-tight">
        {product.name}
      </p>
      <div className="flex items-center gap-1.5">
        <span className="text-green-600 font-bold text-sm">
          ৳{product.price}
        </span>
        {product.originalPrice > 0 && (
          <span className="text-gray-400 line-through text-xs">
            ৳{product.originalPrice}
          </span>
        )}
      </div>
      <AddToCart product={product} />
    </div>
  </div>
);

const ProductSection = ({ title, subtitle, products, emptyText }) => (
  <div className="max-w-screen-xl mx-auto px-4 py-8">
    <div className="flex items-center justify-between mb-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-800">{title}</h2>
        <p className="text-gray-500 text-sm mt-1">{subtitle}</p>
      </div>
      <Link
        to="/allcategories"
        className="text-blue-600 hover:text-blue-800 btn text-sm font-semibold"
      >
        View All
      </Link>
    </div>

    {products.length === 0 ? (
      <div className="text-center py-10 text-gray-400">
        <p>{emptyText}</p>
        <p className="text-xs mt-1">Server Problem!</p>
      </div>
    ) : (
      <Swiper
        slidesPerView={2}
        breakpoints={{
          640:  { slidesPerView: 3 },
          768:  { slidesPerView: 4 },
          1024: { slidesPerView: 5 },
        }}
        spaceBetween={16}
        autoplay={{ delay: 2500, disableOnInteraction: false }}
        loop={products.length > 5}
        modules={[Autoplay]}
      >
        {products.map((product) => (
          <SwiperSlide key={product._id}>
            <ProductCard product={product} />
          </SwiperSlide>
        ))}
      </Swiper>
    )}
  </div>
);

const ExtraFeature01 = () => {
  const { data: products, isLoading } = UseFetchProducts();

  const featuredProducts  = products?.filter(p => p.isFeatured) || [];
  const newArrivalProducts = products?.filter(p => p.isNewArrival) || [];
  const allProducts       = products?.slice(0, 10) || [];

  const slides = [
    {
      badge: "🔥 Best Deals",
      title: "Latest Tech",
      highlight: "Gadgets & Electronics",
      subtitle: "সেরা দামে সেরা পণ্য — সারা বাংলাদেশে ডেলিভারি",
      bg: "from-[#0f2d6e] to-[#1d4c9e]",
      cta: "Shop Now",
      tag: "Free Delivery"
    },
    {
      badge: "⚡ Flash Sale",
      title: "Up to 30% Off",
      highlight: "On Selected Items",
      subtitle: "সীমিত সময়ের অফার — এখনই অর্ডার করুন",
      bg: "from-[#1a1a2e] to-[#16213e]",
      cta: "Grab Deal",
      tag: "Limited Stock"
    },
    {
      badge: "🛡️ 100% Original",
      title: "Trusted Products",
      highlight: "Quality Guaranteed",
      subtitle: "প্রতিটি পণ্য যাচাই করা — নিশ্চিত মান",
      bg: "from-[#0d3b00] to-[#1a5c02]",
      cta: "Explore",
      tag: "COD Available"
    },
  ];

  return (
    <section className="w-full">

      {/* Hero Slider */}
      <Swiper
        modules={[Autoplay, Pagination]}
        autoplay={{ delay: 4000, disableOnInteraction: false }}
        pagination={{ clickable: true }}
        loop
        className="w-full"
      >
        {slides.map((slide, i) => (
          <SwiperSlide key={i}>
            <div className={`bg-gradient-to-r ${slide.bg} text-white`}>
              <div className="max-w-screen-xl mx-auto px-6 py-14 md:py-20 grid md:grid-cols-2 gap-8 items-center">
                <div className="space-y-5">
                  <span className="inline-block bg-yellow-400 text-blue-900 text-xs font-bold px-3 py-1.5 rounded-full">
                    {slide.badge}
                  </span>
                  <div>
                    <h1 className="text-4xl md:text-5xl font-extrabold leading-tight">
                      {slide.title}
                      <br />
                      <span className="text-yellow-300">{slide.highlight}</span>
                    </h1>
                    <p className="text-blue-200 mt-3 text-base md:text-lg">
                      {slide.subtitle}
                    </p>
                  </div>
                  <div className="flex items-center gap-4">
                    <Link to="/allcategories">
                      <button className="bg-yellow-400 hover:bg-yellow-300 text-blue-900 font-bold px-6 py-3 rounded-xl transition text-sm shadow-lg">
                        {slide.cta} →
                      </button>
                    </Link>
                    <span className="bg-white/10 text-white text-xs font-semibold px-3 py-2 rounded-lg">
                      {slide.tag}
                    </span>
                  </div>
                </div>

                <div className="hidden md:grid grid-cols-2 gap-4">
                  {[
                    { icon: <FaShippingFast className="text-2xl text-yellow-300" />, title: "Free Delivery", sub: "সারা বাংলাদেশে" },
                    { icon: <FaBolt className="text-2xl text-yellow-300" />, title: "Fast Shipping", sub: "২-৩ দিনের মধ্যে" },
                    { icon: <FaShieldAlt className="text-2xl text-yellow-300" />, title: "100% Original", sub: "যাচাইকৃত পণ্য" },
                    { icon: <MdLocalOffer className="text-2xl text-yellow-300" />, title: "Best Price", sub: "সেরা দামে গ্যারান্টি" },
                  ].map((item, j) => (
                    <div key={j} className="bg-white/10 backdrop-blur rounded-xl p-4 flex items-center gap-3">
                      {item.icon}
                      <div>
                        <p className="font-bold text-sm">{item.title}</p>
                        <p className="text-xs text-blue-200">{item.sub}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Loading */}
      {isLoading && (
        <div className="max-w-screen-xl mx-auto px-4 py-10">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="bg-gray-100 rounded-xl h-48 animate-pulse" />
            ))}
          </div>
        </div>
      )}

      {/* Featured Products */}
      {!isLoading && (
        <div className="bg-blue-50">
          <ProductSection
            title=" Featured Products"
            
            products={featuredProducts.length > 0 ? featuredProducts : allProducts}
            emptyText="কোনো featured product নেই।"
          />
        </div>
      )}

      {/* New Arrivals */}
      {!isLoading && (
        <div className="bg-white">
          <ProductSection
            title="🆕 New Arrivals"
            
            products={newArrivalProducts.length > 0 ? newArrivalProducts : allProducts.slice(0, 6)}
            emptyText="কোনো new arrival নেই।"
          />
        </div>
      )}

    </section>
  );
};

export default ExtraFeature01;