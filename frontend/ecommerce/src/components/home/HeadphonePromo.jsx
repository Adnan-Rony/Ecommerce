import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { FaBolt } from "react-icons/fa";

import AddToCart from "../AddToCart.jsx";
import LoadingSpinner from "../LoadingSpinner.jsx";

import { UseGetAllFlashSales } from "../../features/flashSale/FlashSaleQuery.js";

const HeadphonePromo = () => {
  const { data: salesData, isLoading } = UseGetAllFlashSales();

  const [timeLeft, setTimeLeft] = useState({
    days: "00",
    hours: "00",
    minutes: "00",
    seconds: "00",
  });

  // 🔥 Get active flash sale
  const now = new Date();

  const activeSale = salesData?.flashSales?.find((sale) => {
    return (
      sale.isActive &&
      new Date(sale.startDate) <= now &&
      new Date(sale.endDate) >= now
    );
  });

  const flashProducts = activeSale?.products || [];

  // 🎯 Countdown target
  const targetDate = activeSale
    ? new Date(activeSale.endDate).getTime()
    : null;

  // ⏳ Countdown logic
  useEffect(() => {
    if (!targetDate) return;

    const countdown = setInterval(() => {
      const now = new Date().getTime();
      const distance = targetDate - now;

      if (distance <= 0) {
        clearInterval(countdown);
        return;
      }

      setTimeLeft({
        days: String(
          Math.floor(distance / (1000 * 60 * 60 * 24))
        ).padStart(2, "0"),
        hours: String(
          Math.floor(
            (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
          )
        ).padStart(2, "0"),
        minutes: String(
          Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60))
        ).padStart(2, "0"),
        seconds: String(
          Math.floor((distance % (1000 * 60)) / 1000)
        ).padStart(2, "0"),
      });
    }, 1000);

    return () => clearInterval(countdown);
  }, [targetDate]);

  // 💸 Discounted price
  const getDiscountedPrice = (price) => {
    if (!activeSale) return price;
    return Math.round(price - (price * activeSale.discountPercent) / 100);
  };

  if (isLoading) return <LoadingSpinner />;

  // ❌ No active sale
  if (!activeSale) {
    return (
      <div className="bg-gradient-to-r from-[#0f2d6e] to-[#1d4c9e] py-10 text-center text-white">
        <FaBolt className="text-4xl mx-auto mb-3 opacity-50" />
        <p className="text-lg font-semibold">No active flash sale right now</p>
        <p className="text-sm text-blue-200 mt-1">
          Please check back later 🚀
        </p>
      </div>
    );
  }

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
                {activeSale.title || "Flash Sale"}
              </h2>
              <p className="text-blue-200 text-sm">
                সীমিত সময়ের অফার — এখনই কিনুন
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
                { label: "দিন", value: timeLeft.days },
                { label: "ঘন্টা", value: timeLeft.hours },
                { label: "মিনিট", value: timeLeft.minutes },
                { label: "সেকেন্ড", value: timeLeft.seconds },
              ].map(({ label, value }, i) => (
                <div key={i} className="flex flex-col items-center">
                  <div className="bg-white text-blue-900 font-extrabold text-xl w-12 h-12 rounded-xl flex items-center justify-center shadow-lg">
                    {value}
                  </div>
                  <span className="text-blue-300 text-xs mt-1">
                    {label}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <Link to="/allcategories">
            <button className="bg-yellow-400 hover:bg-yellow-300 text-blue-900 font-bold px-5 py-2.5 rounded-xl transition text-sm">
              সব দেখুন →
            </button>
          </Link>
        </div>

        {/* Products */}
        {flashProducts.length === 0 ? (
          <div className="text-center text-blue-200 py-8">
            <p>No products in this flash sale.</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {flashProducts.map((product) => (
              <div
                key={product._id}
                className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition group"
              >
                {/* Image */}
                <Link to={`/product/${product._id}`}>
                  <div className="relative overflow-hidden">
                    <img
                      src={product.images?.[0]}
                      alt={product.name}
                      className="w-full h-40 object-cover group-hover:scale-105 transition duration-300"
                    />

                    {/* Discount badge */}
                    <span className="absolute top-2 left-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                      -{activeSale.discountPercent}%
                    </span>

                    <span className="absolute top-2 right-2 bg-yellow-400 text-blue-900 text-xs font-bold px-2 py-1 rounded-full flex items-center gap-1">
                      <FaBolt className="text-xs" /> Sale
                    </span>
                  </div>
                </Link>

                {/* Info */}
                <div className="p-3 space-y-2">
                  <p className="text-sm font-semibold text-gray-800 line-clamp-2">
                    {product.name}
                  </p>

                  <div className="flex items-center gap-2">
                    <span className="text-green-600 font-extrabold text-base">
                      ৳{getDiscountedPrice(product.price)}
                    </span>
                    <span className="text-gray-400 line-through text-xs">
                      ৳{product.price}
                    </span>
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

export default HeadphonePromo;