import React from "react";

const CategorySectionLoading = () => {
  return (
    <div className="bg-gray-50 px-4 py-6">
      {/* Banner Skeleton */}
      <div className="w-full h-[250px] bg-gray-300 rounded-lg mb-6 animate-pulse" />

      {/* Section Title Skeleton */}
      <div className="h-6 w-40 bg-gray-300 rounded mb-6 animate-pulse" />

      {/* Grid of 4 Card Skeletons */}
      
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
        {Array.from({ length: 8 }).map((_, i) => (
          <div
            key={i}
            className="bg-white p-4 rounded-lg shadow animate-pulse flex flex-col justify-between min-h-[380px]"
          >
           
            <div className="w-full h-40 bg-gray-300 rounded mb-3" />

           
            <div className="h-4 bg-gray-300 rounded w-3/4 mb-2" />

           
            <div className="h-3 bg-gray-200 rounded w-1/2 mb-2" />

          
            <div className="h-3 bg-gray-200 rounded w-1/3 mb-2" />

           
            <div className="h-3 bg-gray-200 rounded w-2/5 mb-2" />

         
            <div className="flex items-center justify-between gap-2 mb-3">
              <div className="h-4 bg-gray-300 rounded w-16" />
              <div className="h-5 w-5 bg-gray-300 rounded-full" />
            </div>

           
            <div className="h-9 bg-gray-300 rounded w-full mt-auto" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategorySectionLoading;
