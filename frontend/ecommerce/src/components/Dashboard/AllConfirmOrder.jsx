import React from "react";

import LoadingSpinner from "../LoadingSpinner.jsx";
import { UseAllOrderFetch } from "./../../features/order/OrderQuery";

const AllConfirmOrders = () => {
  const { data, isLoading, isError } = UseAllOrderFetch();
  if (isLoading) return <LoadingSpinner></LoadingSpinner>;
  console.log(data);

  const orders = data?.orders || [];

  return (
    <div className="p-6 bg-gray-100 lg:min-h-screen">
      <h2 className="lg:text-2xl font-semibold mb-1">Order Overview</h2>
      <p className="text-gray-500 mb-6">Monthly performance metrics</p>

      <div className="bg-white rounded-lg shadow overflow-x-auto">
        <table className="w-full text-sm text-left text-gray-700">
          <thead className="lg:text-xs uppercase bg-gray-50 text-gray-500 ">
            <tr>
              <th></th>
              <th className="lg:px-6 py-3">User Name</th>
              <th className="lg:px-6 py-3">Phone</th>
              <th className="lg:px-6 py-3">Total</th>
              <th className="lg:px-6 py-3">Payment</th>
              <th className="lg:px-6 py-3">Status</th>
              <th className="lg:px-6 py-3">Date</th>
              <th className="lg:px-6 py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((item, index) => (
              <tr key={index} className="border-b  hover:bg-gray-50">
                <td className="p-2">{index+1}</td>
                <td className="px-6 py-4">
                  <div className="font-medium text-gray-900">
                    {item.user?.name}
                  </div>
                </td>
                <td className="px-6 py-4">{item.shippingAddress?.phone}</td>
                <td className="px-6 py-4">${item.totalAmount}</td>
                <td className="px-6 py-4">{item.paymentMethod}</td>
                <td className="px-6 py-4">{item.paymentStatus}</td>
                <td className="px-6 py-4">
                  {new Date(item.createdAt).toLocaleDateString()}
                </td>
                <td className="px-6 py-4">
                  <button>view</button>
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
