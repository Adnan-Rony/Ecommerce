import React from "react";

const WishlistSkeleton = () => {
  return (
    <div className="max-w-screen-xl mx-auto px-4 py-8 animate-pulse">
      <div className="h-6 w-40 bg-gray-300 rounded mb-6" />

      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
        {Array.from({ length: 3 }).map((_, idx) => (
          <div
            key={idx}
            className="bg-white rounded-xl shadow-md p-4 hover:shadow-lg transition"
          >
            <div className="w-full h-40 bg-gray-300 rounded mb-4" />
            <div className="h-4 bg-gray-300 rounded w-3/4 mb-2" />
            <div className="h-3 bg-gray-200 rounded w-1/2 mb-2" />
            <div className="h-4 bg-gray-300 rounded w-1/4" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default WishlistSkeleton;
