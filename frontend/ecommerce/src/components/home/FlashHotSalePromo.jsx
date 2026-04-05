import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { UseFetchProducts } from "../../features/products/ProductsQuery.js";
import { UseGetActiveFlashSale } from "../../features/flashSale/FlashSaleQuery.js";
import AddToCart from "../AddToCart.jsx";
import { FaBolt } from "react-icons/fa";

const FlashHotSalePromo = () => {
  const { data: flashSaleData, isLoading: saleLoading } = UseGetActiveFlashSale();
  const { data: allProducts } = UseFetchProducts();

  const flashSale = flashSaleData?.flashSale;

  // Fallback — featured products if no flash sale
  const flashProducts = flashSale?.products?.length > 0
    ? flashSale.products
    : allProducts?.filter(p => p.isFeatured && p.stock > 0)?.slice(0, 4)
    || allProducts?.slice(0, 4) || [];

  const endDate = flashSale?.endDate
    ? new Date(flashSale.endDate).getTime()
    : new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).getTime();

  const [timeLeft, setTimeLeft] = useState({
    days: "00", hours: "00", minutes: "00", seconds: "00",
  });

  useEffect(() => {
    const countdown = setInterval(() => {
      const now      = new Date().getTime();
      const distance = endDate - now;

      if (distance < 0) {
        clearInterval(countdown);
        setTimeLeft({ days: "00", hours: "00", minutes: "00", seconds: "00" });
        return;
      }

      setTimeLeft({
        days:    String(Math.floor(distance / (1000 * 60 * 60 * 24))).padStart(2, "0"),
        hours:   String(Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))).padStart(2, "0"),
        minutes: String(Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60))).padStart(2, "0"),
        seconds: String(Math.floor((distance % (1000 * 60)) / 1000)).padStart(2, "0"),
      });
    }, 1000);

    return () => clearInterval(countdown);
  }, [endDate]);

  if (saleLoading) return null;

  return (
    <div className="bg-gradient-to-r from-[#0f2d6e] to-[#1d4c9e] py-10">
      <div className="max-w-screen-xl mx-auto px-4">

        {/* Header */}
        <div className="flex flex-col md:flex-row items-center justify-between mb-8 gap-4">
          <div className="flex items-center gap-3">
            <div className="bg-yellow-400 text-blue-900 p-2.5 rounded-xl">
              <FaBolt className="text-2xl" />
            </div>
            <div>
              <h2 className="text-2xl md:text-3xl font-extrabold text-white">
                {flashSale?.title || "Flash Sale"}
              </h2>
              <p className="text-blue-200 text-sm">
                {flashSale
                  ? `${flashSale.discountPercent}% ছাড় — সীমিত সময়ের অফার`
                  : "সীমিত সময়ের অফার — এখনই কিনুন"
                }
              </p>
            </div>
          </div>

          {/* Countdown */}
          <div className="flex items-center gap-3">
            <p className="text-blue-200 text-sm font-medium hidden md:block">
              শেষ হওয়ার আগেই নিন:
            </p>
            <div className="flex gap-2">
              {[
                { label: "দিন",     value: timeLeft.days },
                { label: "ঘন্টা",   value: timeLeft.hours },
                { label: "মিনিট",  value: timeLeft.minutes },
                { label: "সেকেন্ড", value: timeLeft.seconds },
              ].map(({ label, value }, i) => (
                <div key={i} className="flex flex-col items-center">
                  <div className="bg-white text-blue-900 font-extrabold text-xl w-12 h-12 rounded-xl flex items-center justify-center shadow-lg">
                    {value}
                  </div>
                  <span className="text-blue-300 text-xs mt-1">{label}</span>
                </div>
              ))}
            </div>
          </div>

          <Link to="/allcategories">
            <button className="bg-yellow-400 hover:bg-yellow-300 text-blue-900 font-bold px-5 py-2.5 btn rounded-xl transition text-sm">
              সব দেখুন 
            </button>
          </Link>
        </div>

        {/* Products */}
        {flashProducts.length === 0 ? (
          <div className="text-center text-blue-200 py-8">
            <p>কোনো flash sale product নেই।</p>
            <p className="text-xs mt-1">
              
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {flashProducts.map((product) => (
              <div
                key={product._id}
                className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition group"
              >
                <Link to={`/product/${product._id}`}>
                  <div className="relative overflow-hidden">
                    <img
                      src={product.images?.[0]}
                      alt={product.name}
                      className="w-full h-40 object-cover group-hover:scale-105 transition duration-300"
                    />
                    {flashSale?.discountPercent && (
                      <span className="absolute top-2 left-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                        -{flashSale.discountPercent}%
                      </span>
                    )}
                    {!flashSale && product.originalPrice > product.price && (
                      <span className="absolute top-2 left-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                        -{Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}%
                      </span>
                    )}
                    <span className="absolute top-2 right-2 bg-yellow-400 text-blue-900 text-xs font-bold px-2 py-1 rounded-full flex items-center gap-1">
                      <FaBolt className="text-xs" /> Sale
                    </span>
                  </div>
                </Link>

                <div className="p-3 space-y-2">
                  <p className="text-sm font-semibold text-gray-800 line-clamp-2 leading-tight">
                    {product.name}
                  </p>
                  <div className="flex items-center gap-2">
                    <span className="text-green-600 font-extrabold text-base">
                      ৳{flashSale
                        ? Math.round(product.price * (1 - flashSale.discountPercent / 100))
                        : product.price
                      }
                    </span>
                    {flashSale && (
                      <span className="text-gray-400 line-through text-xs">
                        ৳{product.price}
                      </span>
                    )}
                    {!flashSale && product.originalPrice > 0 && (
                      <span className="text-gray-400 line-through text-xs">
                        ৳{product.originalPrice}
                      </span>
                    )}
                  </div>

                  {/* Stock bar */}
                  <div>
                    <div className="flex justify-between text-xs text-gray-500 mb-1">
                      <span>Stock</span>
                      <span>{product.stock} বাকি</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-1.5">
                      <div
                        className="bg-red-500 h-1.5 rounded-full"
                        style={{
                          width: `${Math.min(100, (product.stock / 20) * 100)}%`
                        }}
                      />
                    </div>
                  </div>

                  <AddToCart product={product} />
                </div>
              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
};

export default FlashHotSalePromo;