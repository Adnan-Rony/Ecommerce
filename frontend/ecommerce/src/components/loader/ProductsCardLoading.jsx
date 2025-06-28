import React from "react";

const ProductsCardLoading = () => {
  return (
    <div>
      
        <div className="bg-white p-4 rounded-lg shadow animate-pulse flex flex-col justify-between min-h-[380px]">
          {/* Image */}
          <div  className="relative overflow-hidden">
            <div className="w-full h-40 bg-gray-300 rounded mb-3" />
          </div>

          {/* Title */}
          <div className="h-4 bg-gray-300 rounded w-3/4 mb-2" />

          {/* Brand */}
          <div className="h-3 bg-gray-200 rounded w-1/2 mb-2" />

          {/* Review */}
          <div className="h-3 bg-gray-200 rounded w-1/3 mb-2" />

          {/* Stock */}
          <div className="h-3 bg-gray-200 rounded w-2/5 mb-2" />

          {/* Price + Wishlist */}
          <div className="flex items-center justify-between gap-2 mb-3">
            <div className="h-4 bg-gray-300 rounded w-16" />
            <div className="h-5 w-5 bg-gray-300 rounded-full" />
          </div>

          {/* Add to Cart Button */}
          <div className="h-9 bg-gray-300 rounded w-full mt-auto" />
        </div>
   
    </div>
  );
};

export default ProductsCardLoading;
