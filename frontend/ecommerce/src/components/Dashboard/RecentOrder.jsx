import LoadingSpinner from "../LoadingSpinner.jsx";
import { UseAllOrderFetch } from "../../features/order/OrderQuery.js";
import { STATUS_COLORS } from "./AllConfirmOrder.jsx";
import { Link } from "react-router-dom";

const RecentOrder = () => {
  const { data, isLoading, isError } = UseAllOrderFetch();

  if (isLoading) return <LoadingSpinner />;
  if (isError) return (
    <p className="text-red-500 text-sm text-center py-4">Failed to load orders.</p>
  );

  const orders = (data?.orders || []).slice(0, 5);

  if (orders.length === 0) {
    return (
      <div className="text-center py-10 text-gray-300">
        <p className="text-3xl mb-2">📦</p>
        <p className="text-sm">No orders yet.</p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[700px] text-sm text-left">
        <thead>
          <tr className="text-xs uppercase text-gray-400 border-b border-gray-100">
            <th className="pb-3 px-2">#</th>
            <th className="pb-3 px-2">Customer</th>
            <th className="pb-3 px-2">Phone</th>
            <th className="pb-3 px-2">Amount</th>
            <th className="pb-3 px-2">Payment</th>
            <th className="pb-3 px-2">Status</th>
            <th className="pb-3 px-2">Date</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-50">
          {orders.map((order, index) => {
            const name = order.user?.name
              || order.guestInfo?.name
              || order.shippingAddress?.name
              || "Guest";
            const isGuest = !order.user;

            return (
              <tr key={order._id} className="hover:bg-gray-50 transition group">
                <td className="py-3 px-2 text-gray-400 text-xs font-mono">
                  {index + 1}
                </td>
                <td className="py-3 px-2">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold text-xs flex-shrink-0">
                      {name.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <p className="font-semibold text-gray-800 text-sm">{name}</p>
                      {isGuest ? (
                        <span className="text-xs text-gray-400">Guest</span>
                      ) : (
                        <span className="text-xs text-blue-400">{order.user?.email}</span>
                      )}
                    </div>
                  </div>
                </td>
                <td className="py-3 px-2 font-medium text-gray-700">
                  {order.shippingAddress?.phone || "—"}
                </td>
                <td className="py-3 px-2">
                  <span className="font-extrabold text-green-600">
                    ৳{order.totalAmount?.toLocaleString()}
                  </span>
                </td>
                <td className="py-3 px-2">
                  <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                    order.paymentMethod === "COD"
                      ? "bg-orange-100 text-orange-600"
                      : "bg-green-100 text-green-600"
                  }`}>
                    {order.paymentMethod}
                  </span>
                </td>
                <td className="py-3 px-2">
                  <span className={`px-2 py-1 rounded-full text-xs font-semibold capitalize ${
                    STATUS_COLORS[order.status] || "bg-gray-100 text-gray-600"
                  }`}>
                    {order.status}
                  </span>
                </td>
                <td className="py-3 px-2 text-xs text-gray-400">
                  {new Date(order.createdAt).toLocaleDateString("en-GB")}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default RecentOrder;