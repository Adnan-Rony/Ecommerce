import React from "react";
import LoadingSpinner from "../LoadingSpinner.jsx";
import { UseAllOrderFetch } from "./../../features/order/OrderQuery";

const AllConfirmOrders = () => {
  const { data, isLoading, isError } = UseAllOrderFetch();
  if (isLoading) return <LoadingSpinner />;
  if (isError) return <p>Error loading orders</p>;

  const orders = data?.orders || [];

  return (
    <div className="p-4 md:p-6 bg-gray-100 min-h-screen">
      <h2 className="text-xl md:text-2xl font-semibold mb-1">Order Overview</h2>
      <p className="text-gray-500 mb-6 text-sm md:text-base">
        Monthly performance metrics
      </p>

      <div className="bg-white rounded-lg shadow overflow-x-auto">
        <table className="w-full min-w-[800px] text-sm text-left text-gray-700">
          <thead className="text-xs uppercase bg-gray-50 text-gray-500">
            <tr>
              <th className="p-3">#</th>
              <th className="px-4 py-3">User Name</th>
              <th className="px-4 py-3">Phone</th>
              <th className="px-4 py-3">Total</th>
              <th className="px-4 py-3">Payment</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Date</th>
           
            </tr>
          </thead>
          <tbody>
            {orders.map((item, index) => (
              <tr key={index} className="border-b hover:bg-gray-50">
                <td className="p-3">{index + 1}</td>
                <td className="px-4 py-3 font-medium text-gray-900">
                  {item.user?.name}
                </td>
                <td className="px-4 py-3">{item.shippingAddress?.phone}</td>
                <td className="px-4 py-3">${item.totalAmount}</td>
                <td className="px-4 py-3">{item.paymentMethod}</td>
                <td className="px-4 py-3 capitalize">{item.paymentStatus}</td>
                <td className="px-4 py-3">
                  {new Date(item.createdAt).toLocaleDateString()}
                </td>
                <td className="px-4 py-3">
                 
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllConfirmOrders;
