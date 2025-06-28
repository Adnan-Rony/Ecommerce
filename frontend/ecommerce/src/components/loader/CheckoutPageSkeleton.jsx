import React from "react";

const CheckoutPageSkeleton = () => {
  return (
    <div className="grid md:grid-cols-2 gap-8 p-6 animate-pulse">
      {/* Left Side */}
      <div>
        {/* Title */}
        <div className="h-6 w-48 bg-gray-300 mb-6 rounded" />

        {/* Form Sections */}
        <div className="space-y-6">
          {/* Contact Info */}
          <div className="space-y-4">
            <div className="h-5 w-32 bg-gray-200 rounded" />
            <div className="h-10 bg-gray-200 rounded w-full" />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="h-10 bg-gray-200 rounded w-full" />
              <div className="h-10 bg-gray-200 rounded w-full" />
            </div>
          </div>

          {/* Shipping Info */}
          <div className="space-y-4">
            <div className="h-5 w-32 bg-gray-200 rounded" />
            <div className="h-10 bg-gray-200 rounded w-full" />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="h-10 bg-gray-200 rounded w-full" />
              <div className="h-10 bg-gray-200 rounded w-full" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="h-10 bg-gray-200 rounded w-full" />
              <div className="h-10 bg-gray-200 rounded w-full" />
            </div>
          </div>

          {/* Total Box */}
          <div className="bg-gray-100 p-4 rounded-md shadow-sm space-y-3">
            <div className="h-6 w-2/3 bg-gray-300 rounded mx-auto" />
            <div className="h-10 bg-gray-300 rounded w-1/3 mx-auto" />
            <div className="h-5 bg-gray-300 rounded w-1/4 mx-auto" />

            <table className="table w-full mt-3 text-sm">
              <thead>
                <tr>
                  <th className="h-4 bg-gray-200 rounded w-1/2" />
                  <th className="h-4 bg-gray-200 rounded w-1/4" />
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="h-4 bg-gray-100 rounded w-1/2" />
                  <td className="h-4 bg-gray-100 rounded w-1/4" />
                </tr>
                <tr>
                  <td className="h-4 bg-gray-100 rounded w-1/2" />
                  <td className="h-4 bg-gray-100 rounded w-1/4" />
                </tr>
              </tbody>
            </table>

            <div className="h-4 bg-gray-200 rounded w-3/4 mx-auto" />
          </div>

          {/* Payment Methods */}
          <div className="space-y-4">
            <div className="h-5 w-40 bg-gray-300 rounded" />
            <div className="grid grid-cols-2 gap-4">
              <div className="h-14 bg-gray-200 rounded" />
              <div className="h-14 bg-gray-200 rounded" />
            </div>
            <div className="h-12 bg-gray-300 rounded w-full" />
          </div>
        </div>
      </div>

      {/* Right Side - Cart Overview */}
      <div className="bg-gray-100 p-6 rounded-md shadow-sm space-y-4">
        <div className="h-6 w-48 bg-gray-300 rounded" />
        <hr className="border-t-2 border-gray-300 my-2" />

        {/* Product List */}
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="space-y-2">
            <div className="h-4 w-2/3 bg-gray-300 rounded" />
            <div className="flex items-center gap-4">
              <div className="w-24 h-24 bg-gray-300 rounded-2xl" />
              <div className="h-4 w-24 bg-gray-300 rounded" />
            </div>
          </div>
        ))}

        {/* Price Summary */}
        <div className="space-y-3 pt-4">
          <div className="flex justify-between">
            <div className="h-4 w-20 bg-gray-300 rounded" />
            <div className="h-4 w-16 bg-gray-300 rounded" />
          </div>
          <div className="flex justify-between">
            <div className="h-4 w-24 bg-gray-300 rounded" />
            <div className="h-4 w-12 bg-gray-300 rounded" />
          </div>
          <hr className="border-t-2 py-2 border-gray-300" />
          <div className="flex justify-between">
            <div className="h-6 w-20 bg-gray-400 rounded" />
            <div className="h-6 w-24 bg-gray-400 rounded" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPageSkeleton;
