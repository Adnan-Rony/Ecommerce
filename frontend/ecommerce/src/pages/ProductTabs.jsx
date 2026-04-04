import React, { useState } from "react";

const ProductTabs = ({ product }) => {
  const [activeTab, setActiveTab] = useState("description");

  return (
    <div className="bg-white border rounded-xl shadow-sm p-4 sm:p-6">

      {/* Tabs Buttons */}
      <div className="flex gap-2 border-b pb-3 mb-4 overflow-x-auto">

        <button
          onClick={() => setActiveTab("description")}
          className={`px-3 py-1 text-sm rounded-full whitespace-nowrap transition ${
            activeTab === "description"
              ? "bg-blue-600 text-white"
              : "bg-gray-100 text-gray-600 hover:bg-gray-200"
          }`}
        >
          Description
        </button>

        <button
          onClick={() => setActiveTab("specs")}
          className={`px-3 py-1 text-sm rounded-full whitespace-nowrap transition ${
            activeTab === "specs"
              ? "bg-blue-600 text-white"
              : "bg-gray-100 text-gray-600 hover:bg-gray-200"
          }`}
        >
          Specifications
        </button>

      </div>

      {/* Content */}
      <div className="text-sm sm:text-base text-gray-700 leading-relaxed">

        {/* Description */}
        {activeTab === "description" && (
          <div className="whitespace-pre-line">
            {product?.description || "No description available"}
          </div>
        )}

        {/* Specifications */}
        {activeTab === "specs" && (
          <div className="space-y-3">

            <div className="flex justify-between border-b pb-2">
              <span className="text-gray-500">Name</span>
              <span className="font-medium">{product?.name}</span>
            </div>

            <div className="flex justify-between border-b pb-2">
              <span className="text-gray-500">Brand</span>
              <span className="font-medium">{product?.brand || "N/A"}</span>
            </div>

            <div className="flex justify-between border-b pb-2">
              <span className="text-gray-500">Price</span>
              <span className="font-medium text-green-600">
                ৳{product?.price}
              </span>
            </div>

            <div className="flex justify-between border-b pb-2">
              <span className="text-gray-500">Stock</span>
              <span className="font-medium">
                {product?.stock > 0 ? product.stock : "Out of stock"}
              </span>
            </div>

            <div className="flex justify-between border-b pb-2">
              <span className="text-gray-500">Category</span>
              <span className="font-medium">{product?.category || "General"}</span>
            </div>

          </div>
        )}

      </div>
    </div>
  );
};

export default ProductTabs;