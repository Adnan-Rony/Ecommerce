import React from "react";
import img from "../../assets/Smartphone-Mobile-PNG-Image-Background.png"
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css'

const  Categories = () => {
  const categories = [
    { name: "Mobile", img: img },
    { name: "Cosmetics", img: img },
    { name: "Electronics", img: img },
    { name: "Furniture", img: img },
    { name: "Watches", img: img },
    { name: "Decor", img: img },
 
  ];
  return (
    <div>
      <div className="my-10 px-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">
            Shop From <span className="text-blue-600">Top Categories</span>
          </h2>
          <button className="text-sm text-blue-600 hover:underline">
            View All →
          </button>
        </div> <hr  className="my-2"/>

        <div className="grid lg:grid-cols-6 grid-cols-3 justify-center sm:justify-start gap-6 my-4 ">
          {categories.map((cat, index) => (
            <SkeletonTheme  baseColor="#202020" highlightColor="#444">
            <div
              key={index}
              className="flex flex-col items-center hover:scale-105 transition-transform"
            >
              <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full shadow-md flex items-center justify-center overflow-hidden bg-gray-100">
                <img
                  src={cat.img }
                  alt={cat.name }
                  className="object-contain w-full h-full"
                />
              </div>
              <span className="mt-2 text-sm font-medium text-gray-700">
                {cat.name}
              </span>
            </div>
            </SkeletonTheme>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Categories;
