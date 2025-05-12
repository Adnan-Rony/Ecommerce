import React from "react";
import img from "../../assets/apple-iphone-14-plus-blue-1.jpg";
import { Link } from "react-router";
const Recommadation = () => {
  return (
    <div className="p-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-6">
        <div className="bg-white p-4 rounded-lg shadow hover:shadow-lg transition">
          <Link>
            <div className="relative">
              <img
                className="w-full h-40 object-contain mb-3"
                src={img}
                alt=""
              />
            </div>
          </Link>

          <h3 className="text-sm font-semibold text-gray-900">
            Apple MacBook Pro 16″ M1 Pro
          </h3>
          <p className="text-xs text-gray-500 mb-1">Device</p>

          <div className="flex items-center text-yellow-400 text-sm mb-1">
            ☆ ☆ ☆ ☆
          </div>

          <p className="text-green-600 text-sm mb-1">
            <h1> ✔ In stock</h1>
          </p>

          <div className="text-sm text-gray-800 mb-2">
            <span className="text-blue-600 font-bold">
              <p>$200</p>
            </span>
          </div>

          <button className="w-full bg-blue-600 text-white py-1.5 rounded hover:bg-blue-700 text-sm mb-2">
            Add To Cart
          </button>
        </div>
        <div className="bg-white p-4 rounded-lg shadow hover:shadow-lg transition">
          <Link>
            <div className="relative">
              <img
                className="w-full h-40 object-contain mb-3"
                src={img}
                alt=""
              />
            </div>
          </Link>

          <h3 className="text-sm font-semibold text-gray-900">
            Apple MacBook Pro 16″ M1 Pro
          </h3>
          <p className="text-xs text-gray-500 mb-1">Device</p>

          <div className="flex items-center text-yellow-400 text-sm mb-1">
            ☆ ☆ ☆ ☆
          </div>

          <p className="text-green-600 text-sm mb-1">
            <h1> ✔ In stock</h1>
          </p>

          <div className="text-sm text-gray-800 mb-2">
            <span className="text-blue-600 font-bold">
              <p>$200</p>
            </span>
          </div>

          <button className="w-full bg-blue-600 text-white py-1.5 rounded hover:bg-blue-700 text-sm mb-2">
            Add To Cart
          </button>
        </div>
        <div className="bg-white p-4 rounded-lg shadow hover:shadow-lg transition">
          <Link>
            <div className="relative">
              <img
                className="w-full h-40 object-contain mb-3"
                src={img}
                alt=""
              />
            </div>
          </Link>

          <h3 className="text-sm font-semibold text-gray-900">
            Apple MacBook Pro 16″ M1 Pro
          </h3>
          <p className="text-xs text-gray-500 mb-1">Device</p>

          <div className="flex items-center text-yellow-400 text-sm mb-1">
            ☆ ☆ ☆ ☆
          </div>

          <p className="text-green-600 text-sm mb-1">
            <h1> ✔ In stock</h1>
          </p>

          <div className="text-sm text-gray-800 mb-2">
            <span className="text-blue-600 font-bold">
              <p>$200</p>
            </span>
          </div>

          <button className="w-full bg-blue-600 text-white py-1.5 rounded hover:bg-blue-700 text-sm mb-2">
            Add To Cart
          </button>
        </div>
        <div className="bg-white p-4 rounded-lg shadow hover:shadow-lg transition">
          <Link>
            <div className="relative">
              <img
                className="w-full h-40 object-contain mb-3"
                src={img}
                alt=""
              />
            </div>
          </Link>

          <h3 className="text-sm font-semibold text-gray-900">
            Apple MacBook Pro 16″ M1 Pro
          </h3>
          <p className="text-xs text-gray-500 mb-1">Device</p>

          <div className="flex items-center text-yellow-400 text-sm mb-1">
            ☆ ☆ ☆ ☆
          </div>

          <p className="text-green-600 text-sm mb-1">
            <h1> ✔ In stock</h1>
          </p>

          <div className="text-sm text-gray-800 mb-2">
            <span className="text-blue-600 font-bold">
              <p>$200</p>
            </span>
          </div>

          <button className="w-full bg-blue-600 text-white py-1.5 rounded hover:bg-blue-700 text-sm mb-2">
            Add To Cart
          </button>
        </div>
        <div className="bg-white p-4 rounded-lg shadow hover:shadow-lg transition">
          <Link>
            <div className="relative">
              <img
                className="w-full h-40 object-contain mb-3"
                src={img}
                alt=""
              />
            </div>
          </Link>

          <h3 className="text-sm font-semibold text-gray-900">
            Apple MacBook Pro 16″ M1 Pro
          </h3>
          <p className="text-xs text-gray-500 mb-1">Device</p>

          <div className="flex items-center text-yellow-400 text-sm mb-1">
            ☆ ☆ ☆ ☆
          </div>

          <p className="text-green-600 text-sm mb-1">
            <h1> ✔ In stock</h1>
          </p>

          <div className="text-sm text-gray-800 mb-2">
            <span className="text-blue-600 font-bold">
              <p>$200</p>
            </span>
          </div>

          <button className="w-full bg-blue-600 text-white py-1.5 rounded hover:bg-blue-700 text-sm mb-2">
            Add To Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default Recommadation;
