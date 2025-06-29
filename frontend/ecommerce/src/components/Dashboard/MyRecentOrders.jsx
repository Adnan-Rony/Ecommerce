// components/Dashboard/MyRecentOrders.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import { UseMyOrders } from "../../features/order/OrderQuery.js";
import OrderTableSkeleton from "../loader/OrderTableSkeleton.jsx";


const MyRecentOrders = () => {
  const navigate = useNavigate();
  const { data, isLoading, isError } = UseMyOrders();
  const recentOrders = data?.orders?.slice(0, 5) || [];

  if (isLoading) return <OrderTableSkeleton/>
  if (isError) return <p className="text-red-600">Failed to load orders</p>;

  return (
    <div className="bg-white rounded-lg shadow p-4">
      <h3 className="text-lg font-semibold mb-3">Recent Orders</h3>
      <div className="overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead>
            <tr className="text-left text-gray-600">
              <th className="py-2">Order ID</th>
              <th>Amount</th>
              <th>Status</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {recentOrders.map((order) => (
              <tr
                key={order._id}
                className="border-t hover:bg-gray-50 cursor-pointer"
                onClick={() => navigate(`/orders/${order._id}`)}
              >
                <td className="py-2">#{order._id.slice(-6)}</td>
                <td>${order.totalAmount}</td>
                <td className="capitalize">{order.paymentStatus}</td>
                <td>{new Date(order.createdAt).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyRecentOrders;
