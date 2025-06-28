import React from 'react';

const DetailsPageLoading = () => {
    return (
        <div>
            <div className="grid lg:grid-cols-2 justify-center grid-cols-1 gap-4 p-4 animate-pulse">
      {/* Left Column - Image Carousel */}
      <div className="p-4 flex justify-center">
        <div className="w-full max-w-md h-[300px] bg-gray-300 rounded-lg" />
      </div>

      {/* Right Column - Product Info */}
      <div className="space-y-4 my-10 px-2">
        {/* Title and Price */}
        <div>
          <div className="h-6 bg-gray-300 rounded w-3/4 mb-2" />
          <div className="h-6 bg-gray-300 rounded w-24" />
        </div>

        {/* Add to Cart Button Placeholder */}
        <div className="flex items-center gap-2">
          <div className="h-4 w-32 bg-gray-300 rounded" />
        </div>

        <hr />

        {/* Description */}
        <div className="mt-2 space-y-2">
          <div className="h-4 bg-gray-300 rounded w-full" />
          <div className="h-4 bg-gray-300 rounded w-5/6" />
        </div>

        {/* Specifications */}
        <div className="mt-4">
          <div className="h-5 w-48 bg-gray-400 rounded mb-3" />
          <ul className="space-y-2">
            <li className="h-4 w-40 bg-gray-200 rounded" />
            <li className="h-4 w-36 bg-gray-200 rounded" />
            <li className="h-4 w-32 bg-gray-200 rounded" />
          </ul>
        </div>
      </div>
    </div>
        </div>
    );
};

export default DetailsPageLoading;