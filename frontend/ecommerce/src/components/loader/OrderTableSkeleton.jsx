import React from "react";

const OrderTableSkeleton = () => {
  return (
    <div className="p-6 bg-gray-100 min-h-screen animate-pulse">
      <div className="h-6 w-48 bg-gray-300 rounded mb-2" />
      <div className="h-4 w-64 bg-gray-200 rounded mb-6" />

      <div className="bg-white rounded-lg shadow overflow-x-auto">
        <table className="w-full text-sm text-left text-gray-700">
          <thead className="text-xs uppercase bg-gray-50 text-gray-500">
            <tr>
              <th className="px-2 py-3">#</th>
              <th className="px-6 py-3">Image</th>
              <th className="px-6 py-3">Products</th>
              <th className="px-6 py-3">Phone</th>
              <th className="px-6 py-3">Total</th>
              <th className="px-6 py-3">Payment</th>
              <th className="px-6 py-3">Status</th>
              <th className="px-6 py-3">Date</th>
              <th className="px-6 py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {Array.from({ length: 5 }).map((_, index) => (
              <tr key={index} className="border-b">
                <td className="px-2 py-4">{index + 1}</td>
                <td className="px-6 py-4">
                  <div className="w-12 h-12 bg-gray-200 rounded" />
                </td>
                <td className="px-6 py-4">
                  <div className="h-4 bg-gray-200 rounded w-40" />
                </td>
                <td className="px-6 py-4">
                  <div className="h-4 bg-gray-200 rounded w-24" />
                </td>
                <td className="px-6 py-4">
                  <div className="h-4 bg-gray-200 rounded w-16" />
                </td>
                <td className="px-6 py-4">
                  <div className="h-4 bg-gray-200 rounded w-20" />
                </td>
                <td className="px-6 py-4">
                  <div className="h-4 bg-gray-200 rounded w-20" />
                </td>
                <td className="px-6 py-4">
                  <div className="h-4 bg-gray-200 rounded w-24" />
                </td>
                <td className="px-6 py-4">
                  <div className="h-4 bg-gray-300 rounded w-20" />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OrderTableSkeleton;
