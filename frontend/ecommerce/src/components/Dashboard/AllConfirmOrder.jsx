import { useState } from "react";
import LoadingSpinner from "../LoadingSpinner.jsx";
import { UseAllOrderFetch, UseUpdateOrderStatus } from "../../features/order/OrderQuery";
import toast from "react-hot-toast";
import OrderDetailModal from "./OrderDetailModal.jsx";

export { STATUS_COLORS };
const STATUS_COLORS = {
  pending:   "bg-yellow-100 text-yellow-700",
  confirmed: "bg-blue-100 text-blue-700",
  shipped:   "bg-purple-100 text-purple-700",
  delivered: "bg-green-100 text-green-700",
  cancelled: "bg-red-100 text-red-700",
};

const STATUS_FLOW = ["pending", "confirmed", "shipped", "delivered", "cancelled"];

const AllConfirmOrders = () => {
  const { data, isLoading, isError } = UseAllOrderFetch();
  const { mutate: updateStatus, isPending: isUpdating } = UseUpdateOrderStatus();

  const [currentPage, setCurrentPage]   = useState(1);
  const [searchText, setSearchText]     = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [selectedOrder, setSelectedOrder] = useState(null);

  const ordersPerPage = 10;

  if (isLoading) return <LoadingSpinner />;
  if (isError) return (
    <div className="flex items-center justify-center min-h-[40vh]">
      <p className="text-red-500 font-semibold">Failed to load orders. Please refresh.</p>
    </div>
  );

  const orders = data?.orders || [];

  // Search + Filter
  const filtered = orders.filter((o) => {
    const name  = o.user?.name || o.guestInfo?.name || o.shippingAddress?.name || "";
    const phone = o.shippingAddress?.phone || "";
    const matchSearch = name.toLowerCase().includes(searchText.toLowerCase())
      || phone.includes(searchText);
    const matchStatus = filterStatus === "all" || o.status === filterStatus;
    return matchSearch && matchStatus;
  });

  // Pagination
  const totalPages     = Math.ceil(filtered.length / ordersPerPage);
  const indexOfFirst   = (currentPage - 1) * ordersPerPage;
  const currentOrders  = filtered.slice(indexOfFirst, indexOfFirst + ordersPerPage);

  // Stats
  const stats = {
    total:     orders.length,
    pending:   orders.filter(o => o.status === "pending").length,
    confirmed: orders.filter(o => o.status === "confirmed").length,
    shipped:   orders.filter(o => o.status === "shipped").length,
    delivered: orders.filter(o => o.status === "delivered").length,
  };

  const totalRevenue = orders
    .filter(o => o.status !== "cancelled")
    .reduce((sum, o) => sum + (o.totalAmount || 0), 0);

  const handleStatusChange = (orderId, newStatus) => {
    updateStatus(
      { orderId, status: newStatus },
      {
        onSuccess: () => toast.success(`Status updated to ${newStatus}`),
        onError:   () => toast.error("Failed to update status"),
      }
    );
  };

  return (
    <div className="bg-gray-50 min-h-screen p-4 md:p-6">

      {/* Header */}
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Order Management</h2>
        <p className="text-gray-500 text-sm mt-1">
          Manage and track all customer orders
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-3 mb-6">
        {[
          { label: "Total Orders",  value: stats.total,     color: "bg-white border-l-4 border-blue-500" },
          { label: "Pending",       value: stats.pending,   color: "bg-white border-l-4 border-yellow-500" },
          { label: "Confirmed",     value: stats.confirmed, color: "bg-white border-l-4 border-blue-400" },
          { label: "Shipped",       value: stats.shipped,   color: "bg-white border-l-4 border-purple-500" },
          { label: "Delivered",     value: stats.delivered, color: "bg-white border-l-4 border-green-500" },
        ].map((s) => (
          <div key={s.label} className={`${s.color} rounded-lg shadow p-4`}>
            <p className="text-xs text-gray-500 font-medium">{s.label}</p>
            <p className="text-2xl font-bold text-gray-800 mt-1">{s.value}</p>
          </div>
        ))}
      </div>

      {/* Revenue */}
      <div className="bg-white rounded-lg shadow p-4 mb-6 flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-500">Total Revenue</p>
          <p className="text-3xl font-bold text-green-600">৳{totalRevenue.toLocaleString()}</p>
        </div>
        <div className="text-right">
          <p className="text-sm text-gray-500">Avg. Order Value</p>
          <p className="text-xl font-semibold text-gray-700">
            ৳{orders.length ? Math.round(totalRevenue / orders.length).toLocaleString() : 0}
          </p>
        </div>
      </div>

      {/* Search + Filter */}
      <div className="flex flex-col sm:flex-row gap-3 mb-4">
        <input
          type="text"
          placeholder="Search by name or phone..."
          value={searchText}
          onChange={(e) => { setSearchText(e.target.value); setCurrentPage(1); }}
          className="border rounded-lg px-4 py-2 text-sm w-full sm:w-72 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <select
          value={filterStatus}
          onChange={(e) => { setFilterStatus(e.target.value); setCurrentPage(1); }}
          className="border rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          <option value="all">All Status</option>
          {STATUS_FLOW.map(s => (
            <option key={s} value={s}>{s.charAt(0).toUpperCase() + s.slice(1)}</option>
          ))}
        </select>
        <p className="text-sm text-gray-500 self-center ml-auto">
          {filtered.length} orders found
        </p>
      </div>

      {/* Table */}
      <div className="bg-white rounded-lg shadow overflow-x-auto">
        <table className="w-full min-w-[900px] text-sm text-left text-gray-700">
          <thead className="text-xs uppercase bg-gray-50 text-gray-500 border-b">
            <tr>
              <th className="px-4 py-3">#</th>
              <th className="px-4 py-3">Customer</th>
              <th className="px-4 py-3">Phone</th>
              <th className="px-4 py-3">Address</th>
              <th className="px-4 py-3">Items</th>
              <th className="px-4 py-3">Total</th>
              <th className="px-4 py-3">Payment</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Date</th>
              <th className="px-4 py-3">Action</th>
            </tr>
          </thead>
          <tbody>
            {currentOrders.length === 0 ? (
              <tr>
                <td colSpan={10} className="text-center py-12 text-gray-400">
                  No orders found.
                </td>
              </tr>
            ) : (
              currentOrders.map((order, index) => {
                const customerName = order.user?.name
                  || order.guestInfo?.name
                  || order.shippingAddress?.name
                  || "Guest";
                const isGuest = !order.user;
                const itemCount = order.items?.reduce((sum, i) => sum + (i.quantity || 1), 0) || 0;

                return (
                  <tr key={order._id} className="border-b hover:bg-gray-50 transition">
                    <td className="px-4 py-3 text-gray-400 text-xs">
                      {indexOfFirst + index + 1}
                    </td>
                    <td className="px-4 py-3">
                      <div className="font-semibold text-gray-800">{customerName}</div>
                      {isGuest ? (
                        <span className="text-xs bg-gray-100 text-gray-500 px-1.5 py-0.5 rounded">
                          Guest
                        </span>
                      ) : (
                        <span className="text-xs text-blue-500">
                          {order.user?.email}
                        </span>
                      )}
                    </td>
                    <td className="px-4 py-3 font-medium">
                      {order.shippingAddress?.phone || "—"}
                    </td>
                    <td className="px-4 py-3 text-xs text-gray-500 max-w-[140px] truncate">
                      {order.shippingAddress?.address}, {order.shippingAddress?.city}
                    </td>
                    <td className="px-4 py-3">
                      <span className="bg-blue-50 text-blue-700 font-bold px-2 py-1 rounded text-xs">
                        {itemCount} pcs
                      </span>
                    </td>
                    <td className="px-4 py-3 font-bold text-green-600">
                      ৳{order.totalAmount?.toLocaleString()}
                    </td>
                    <td className="px-4 py-3 capitalize">
                      <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                        order.paymentMethod === "COD"
                          ? "bg-orange-100 text-orange-600"
                          : "bg-green-100 text-green-600"
                      }`}>
                        {order.paymentMethod}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <span className={`px-2 py-1 rounded-full text-xs font-semibold capitalize ${STATUS_COLORS[order.status] || "bg-gray-100 text-gray-600"}`}>
                        {order.status}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-xs text-gray-500">
                      {new Date(order.createdAt).toLocaleDateString("en-GB")}
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex gap-2">
                        {/* View Details */}
                        <button
                          onClick={() => setSelectedOrder(order)}
                          className="text-xs bg-blue-600 text-white px-2 py-1 rounded hover:bg-blue-700"
                        >
                          View
                        </button>
                        {/* Status Update */}
                        <select
                          value={order.status}
                          disabled={isUpdating}
                          onChange={(e) => handleStatusChange(order._id, e.target.value)}
                          className="text-xs border rounded px-1 py-1 focus:outline-none focus:ring-1 focus:ring-blue-400"
                        >
                          {STATUS_FLOW.map(s => (
                            <option key={s} value={s}>
                              {s.charAt(0).toUpperCase() + s.slice(1)}
                            </option>
                          ))}
                        </select>
                      </div>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-2 mt-6">
          <button
            onClick={() => setCurrentPage(p => Math.max(p - 1, 1))}
            disabled={currentPage === 1}
            className="px-3 py-1 text-sm rounded border bg-white hover:bg-gray-50 disabled:opacity-40"
          >
            ← Prev
          </button>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
            <button
              key={p}
              onClick={() => setCurrentPage(p)}
              className={`px-3 py-1 text-sm rounded border transition ${
                currentPage === p
                  ? "bg-blue-600 text-white border-blue-600"
                  : "bg-white text-gray-700 hover:bg-blue-50"
              }`}
            >
              {p}
            </button>
          ))}
          <button
            onClick={() => setCurrentPage(p => Math.min(p + 1, totalPages))}
            disabled={currentPage === totalPages}
            className="px-3 py-1 text-sm rounded border bg-white hover:bg-gray-50 disabled:opacity-40"
          >
            Next →
          </button>
        </div>
      )}

      {/* Order Detail Modal */}
      {/* Order Detail Modal */}
{selectedOrder && (
  <OrderDetailModal
    order={selectedOrder}
    onClose={() => setSelectedOrder(null)}
    onStatusChange={(id, status) => {
      handleStatusChange(id, status);
      setSelectedOrder(prev => ({ ...prev, status }));
    }}
    STATUS_FLOW={STATUS_FLOW}
    isUpdating={isUpdating}
  />
)}



    </div>
  );
};

export default AllConfirmOrders;