import React, { useState } from "react";
import LoadingSpinner from "../LoadingSpinner.jsx";
import { UseAllOrderFetch } from "./../../features/order/OrderQuery";

const AllConfirmOrders = () => {
  const { data, isLoading, isError } = UseAllOrderFetch();
  const [currentPage, setCurrentPage] = useState(1);
  const ordersPerPage = 9;

  if (isLoading) return <LoadingSpinner />;
  if (isError) return <p className="text-red-600">Error loading orders</p>;

  const orders = data?.orders || [];

  // Pagination logic
  const indexOfLastOrder = currentPage * ordersPerPage;
  const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
  const currentOrders = orders.slice(indexOfFirstOrder, indexOfLastOrder);
  const totalPages = Math.ceil(orders.length / ordersPerPage);

  return (
    <div className=" bg-gray-100 min-h-screen">
      {/* <h2 className="text-xl md:text-2xl font-semibold mb-1">Order Overview</h2>
      <p className="text-gray-500 mb-6 text-sm md:text-base">
        Monthly performance metrics
      </p> */}

      <div className="bg-white rounded-lg shadow overflow-x-auto lg:my-10 my-2">
        <table className="w-full min-w-[800px] text-sm text-left text-gray-700">
          <thead className="text-xs uppercase bg-gray-50 text-gray-500">
            <tr>
              <th className="p-3">#</th>
              <th className="px-4 py-3">User</th>
              <th className="px-4 py-3">Phone</th>
              <th className="px-4 py-3">Total</th>
              <th className="px-4 py-3">Payment</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Date</th>
            </tr>
          </thead>
          <tbody>
            {currentOrders.map((item, index) => (
              <tr key={index} className="border-b hover:bg-gray-50">
                <td className="p-3">{indexOfFirstOrder + index + 1}</td>
                <td className="px-4 py-3 font-medium text-gray-900">
                  {item.user?.name}
                </td>
                <td className="px-4 py-3">{item.shippingAddress?.phone}</td>
                <td className="px-4 py-3 font-semibold text-green-600">
                  ${item.totalAmount}
                </td>
                <td className="px-4 py-3 capitalize">{item.paymentMethod}</td>
                <td className="px-4 py-3 capitalize">
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-semibold ${
                      item.paymentStatus === "paid"
                        ? "bg-green-100 text-green-600"
                        : "bg-yellow-100 text-yellow-700"
                    }`}
                  >
                    {item.paymentStatus}
                  </span>
                </td>
                <td className="px-4 py-3">
                  {new Date(item.createdAt).toLocaleDateString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination Buttons */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-2 mt-6">
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
            <button
              key={pageNum}
              onClick={() => setCurrentPage(pageNum)}
              className={`px-4 py-1 text-sm rounded border transition ${
                currentPage === pageNum
                  ? "bg-blue-600 text-white"
                  : "bg-white text-gray-700 hover:bg-blue-50"
              }`}
            >
              {pageNum}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default AllConfirmOrders;
