import React from "react";

const BannerCardLoader = () => {
  return (
    <div className="max-w-screen-xl mx-auto">
     <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 px-4">
      {Array.from({ length: 4 }).map((_, index) => (
        <div
          key={index}
          className="animate-pulse flex justify-between px-4 bg-white rounded-xl items-center gap-2 shadow w-full lg:max-w-[300px] min-h-[140px]"
        >
          {/* Left: Image placeholder */}
          <div className="w-20 h-20 bg-gray-300 rounded-md" />

          {/* Right: Content placeholder */}
          <div className="flex flex-col justify-between space-y-2 w-full">
            <div className="h-4 bg-gray-300 rounded w-3/4" />
            <div className="h-3 bg-gray-200 rounded w-1/2" />
            <div className="h-4 bg-gray-300 rounded w-1/3" />
          </div>
        </div>
      ))}
    </div>
    </div>
  );
};

export default BannerCardLoader;
