import React from "react";
import LoadingSpinner from "../LoadingSpinner.jsx";
import { UseAllOrderFetch } from "../../features/order/OrderQuery.js";


const RecentOrder = () => {
const { data, isLoading, isError } = UseAllOrderFetch();

  if (isLoading) return <LoadingSpinner />;
  if (isError) return <p className="text-red-600">Error loading orders</p>;

  const orders = data?.orders || [];
  const top5Orders = orders.slice(0, 5); // get first 5 orders

  return (
    <div className=" bg-gray-100 min-h-screen">
      <div className="bg-white rounded-lg shadow overflow-x-auto my-2">
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
            {top5Orders.map((item, index) => (
              <tr key={item._id} className="border-b hover:bg-gray-50">
                <td className="p-3">{index + 1}</td>
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
    </div>
  );
};

export default RecentOrder;