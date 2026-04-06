import { useState } from "react";
import axiosInstance from "../api/axiosInstance.js";
import {
  MdLocalShipping,
  MdCheckCircle,
  MdPending,
  MdCancel,
} from "react-icons/md";
import { FaBoxOpen } from "react-icons/fa";
import useSEO from "../hooks/useSEO.js";

const STATUS_STEPS = ["pending", "confirmed", "shipped", "delivered"];

const STATUS_ICON = {
  pending: <MdPending className="text-yellow-500 text-2xl" />,
  confirmed: <MdCheckCircle className="text-blue-500 text-2xl" />,
  shipped: <MdLocalShipping className="text-purple-500 text-2xl" />,
  delivered: <MdCheckCircle className="text-green-500 text-2xl" />,
  cancelled: <MdCancel className="text-red-500 text-2xl" />,
};

const STATUS_COLOR = {
  pending: "bg-yellow-100 text-yellow-700",
  confirmed: "bg-blue-100 text-blue-700",
  shipped: "bg-purple-100 text-purple-700",
  delivered: "bg-green-100 text-green-700",
  cancelled: "bg-red-100 text-red-700",
};

const TrackOrder = () => {
  useSEO({
      title: "Track Your Order",
      description:
        "Track your ZapZoneBD order status in real time using your phone number.",
    });
  const [phone, setPhone] = useState("");
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [searched, setSearched] = useState(false);

  const handleTrack = async () => {
    
    if (!phone.trim()) {
      setError("Please enter your phone number.");
      return;
    }

    setLoading(true);
    setError("");
    setOrders([]);

    try {
      const res = await axiosInstance.get(`/order/track/${phone.trim()}`);
      setOrders(res.data.orders || []);
      setSearched(true);
    } catch (err) {
      setError(
        err?.response?.data?.message ||
          "No orders found with this phone number.",
      );
      setSearched(true);
    } finally {
      setLoading(false);
    }
  };

  const getStepIndex = (status) => STATUS_STEPS.indexOf(status);

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <FaBoxOpen className="text-5xl text-blue-600 mx-auto mb-3" />
          <h1 className="text-3xl font-bold text-gray-800">Track Your Order</h1>
          <p className="text-gray-500 mt-2">
            Enter your phone number to see your order status
          </p>
        </div>

        {/* Search Box */}
        <div className="bg-white rounded-2xl shadow p-6 mb-6">
          <label className="block text-sm font-semibold text-gray-600 mb-2">
            Phone Number
          </label>
          <div className="flex gap-3">
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleTrack()}
              placeholder="e.g. 01712345678"
              className="flex-1 border rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <button
              onClick={handleTrack}
              disabled={loading}
              className="bg-blue-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-blue-700 transition disabled:opacity-60"
            >
              {loading ? "Searching..." : "Track"}
            </button>
          </div>

          {/* Error */}
          {error && (
            <div className="mt-4 bg-red-50 border border-red-200 text-red-600 rounded-xl p-3 text-sm">
              {error}
            </div>
          )}
        </div>

        {/* Results */}
        {searched && orders.length > 0 && (
          <div className="space-y-6">
            <p className="text-sm text-gray-500 font-medium">
              {orders.length} order{orders.length > 1 ? "s" : ""} found
            </p>

            {orders.map((order, idx) => (
              <div
                key={order._id}
                className="bg-white rounded-2xl shadow overflow-hidden"
              >
                {/* Order Header */}
                <div className="bg-gray-800 text-white px-5 py-4 flex justify-between items-center">
                  <div>
                    <p className="text-xs text-gray-400">Order #{idx + 1}</p>
                    <p className="text-xs font-mono text-gray-300 mt-0.5">
                      {order._id}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-gray-400">
                      {new Date(order.createdAt).toLocaleDateString("en-GB")}
                    </p>
                    <p className="text-green-400 font-bold text-lg">
                      ৳{order.totalAmount?.toLocaleString()}
                    </p>
                  </div>
                </div>

                <div className="p-5 space-y-5">
                  {/* Progress Bar */}
                  {order.status !== "cancelled" && (
                    <div>
                      <p className="text-xs font-semibold text-gray-500 mb-3 uppercase">
                        Order Progress
                      </p>
                      <div className="flex items-center justify-between relative">
                        {/* Line */}
                        <div className="absolute top-4 left-0 right-0 h-1 bg-gray-200 z-0" />
                        <div
                          className="absolute top-4 left-0 h-1 bg-blue-500 z-0 transition-all"
                          style={{
                            width: `${(getStepIndex(order.status) / (STATUS_STEPS.length - 1)) * 100}%`,
                          }}
                        />

                        {STATUS_STEPS.map((step, i) => {
                          const isDone = i <= getStepIndex(order.status);
                          const isCurrent = i === getStepIndex(order.status);
                          return (
                            <div
                              key={step}
                              className="flex flex-col items-center z-10"
                            >
                              <div
                                className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold border-2 transition ${
                                  isDone
                                    ? "bg-blue-600 border-blue-600 text-white"
                                    : "bg-white border-gray-300 text-gray-400"
                                } ${isCurrent ? "ring-4 ring-blue-100" : ""}`}
                              >
                                {i + 1}
                              </div>
                              <p
                                className={`text-xs mt-1 capitalize font-medium ${
                                  isDone ? "text-blue-600" : "text-gray-400"
                                }`}
                              >
                                {step}
                              </p>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}

                  {/* Status Badge */}
                  <div className="flex items-center gap-2">
                    {STATUS_ICON[order.status]}
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-semibold capitalize ${STATUS_COLOR[order.status]}`}
                    >
                      {order.status}
                    </span>
                    <span className="text-xs text-gray-400 ml-auto">
                      {order.paymentMethod} · {order.paymentStatus}
                    </span>
                  </div>

                  {/* Products */}
                  <div>
                    <p className="text-xs font-semibold text-gray-500 mb-2 uppercase">
                      Items Ordered (
                      {order.items?.reduce((s, i) => s + i.quantity, 0)} pcs)
                    </p>
                    <div className="space-y-2">
                      {order.items?.map((item, i) => (
                        <div
                          key={i}
                          className="flex items-center gap-3 bg-gray-50 rounded-xl p-3"
                        >
                          {item.product?.images?.[0] && (
                            <img
                              src={item.product.images[0]}
                              alt={item.product?.name}
                              className="w-12 h-12 object-cover rounded-lg"
                            />
                          )}
                          <div className="flex-1">
                            <p className="text-sm font-medium text-gray-700">
                              {item.product?.name || "Product"}
                            </p>
                            <p className="text-xs text-gray-400">
                              ৳{item.product?.price} × {item.quantity}
                            </p>
                          </div>
                          <span className="bg-blue-100 text-blue-700 text-xs font-bold px-2 py-1 rounded-lg">
                            x{item.quantity}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Shipping Address */}
                  <div className="bg-purple-50 rounded-xl p-4">
                    <p className="text-xs font-semibold text-purple-700 mb-2 uppercase">
                      Delivery Address
                    </p>
                    <p className="text-sm font-semibold text-gray-700">
                      {order.shippingAddress?.name}
                    </p>
                    <p className="text-sm text-gray-500">
                      {order.shippingAddress?.address},{" "}
                      {order.shippingAddress?.city}
                    </p>
                    <p className="text-sm text-gray-500">
                      {order.shippingAddress?.phone}
                    </p>
                    {order.shippingAddress?.note && (
                      <p className="text-xs text-yellow-600 mt-1 italic">
                        Note: {order.shippingAddress.note}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* No result */}
        {searched && orders.length === 0 && !error && (
          <div className="text-center text-gray-400 py-12">
            <FaBoxOpen className="text-5xl mx-auto mb-3 opacity-30" />
            <p>No orders found.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default TrackOrder;
