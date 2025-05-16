import React, { useState } from 'react';
import { UseMyOrders } from '../features/order/OrderQuery.js';
import LoadingSpinner from '../components/LoadingSpinner.jsx';

const MyOrderOverview = () => {
  const { data, isLoading, isError } = UseMyOrders();
  const [selectedOrder, setSelectedOrder] = useState(null);

  if (isLoading) return <LoadingSpinner />;
  if (isError) return <p className="text-red-500">Failed to load orders.</p>;

  const orders = data?.orders || [];

  const openModal = (order) => {
    setSelectedOrder(order);
  };

  const closeModal = () => {
    setSelectedOrder(null);
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h2 className="text-2xl font-semibold mb-1">Order Overview</h2>
      <p className="text-gray-500 mb-6">Monthly performance metrics</p>

      <div className="bg-white rounded-lg shadow overflow-x-auto">
        <table className="w-full text-sm text-left text-gray-700">
          <thead className="text-xs uppercase bg-gray-50 text-gray-500">
            <tr>
              <th></th>
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
            {orders.map((item, index) => (
              <tr key={item._id} className="border-b hover:bg-gray-50">
                <td className="p-2">{index + 1}</td>
                <td className="px-6 py-4">
                  <img
                    className="w-12"
                    src={item.items[0]?.product?.images?.[0] || '/fallback.jpg'}
                    alt="product"
                  />
                </td>
                <td className="px-6 py-4">
                  {item.items.map((i) => i.product?.name || 'Unknown').join(', ')}
                </td>
                <td className="px-6 py-4">{item.shippingAddress?.phone || 'N/A'}</td>
                <td className="px-6 py-4">${item.totalAmount}</td>
                <td className="px-6 py-4">{item.paymentMethod}</td>
                <td className="px-6 py-4">{item.paymentStatus}</td>
                <td className="px-6 py-4">
                  {new Date(item.createdAt).toLocaleDateString()}
                </td>
                <td className="px-6 py-4">
                  <button
                    onClick={() => openModal(item)}
                    className="text-blue-600 hover:underline"
                  >
                    View Details
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {selectedOrder && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
          <div className="bg-white w-full max-w-3xl rounded-lg shadow-lg p-6 relative">
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 text-gray-500 hover:text-red-500"
            >
              ✕
            </button>

            <h2 className="text-xl font-semibold mb-2">Order Details</h2>
            <p className="text-sm text-gray-500 mb-4">Order ID: {selectedOrder._id}</p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h3 className="font-semibold mb-1">Shipping Address</h3>
                {selectedOrder.shippingAddress ? (
                  <>
                    <p>{selectedOrder.shippingAddress.name}</p>
                    <p>{selectedOrder.shippingAddress.phone}</p>
                    <p>
                      {selectedOrder.shippingAddress.address},{" "}
                      {selectedOrder.shippingAddress.city}
                    </p>
                    <p>{selectedOrder.shippingAddress.country}</p>
                  </>
                ) : (
                  <p className="text-red-500">No shipping address available.</p>
                )}
              </div>
              <div>
                <h3 className="font-semibold mb-1">Payment Info</h3>
                <p>Method: {selectedOrder.paymentMethod || 'N/A'}</p>
                <p>Status: {selectedOrder.paymentStatus || 'N/A'}</p>
                <p>Total: ${selectedOrder.totalAmount || 0}</p>
                <p>
                  Date:{" "}
                  {selectedOrder.createdAt
                    ? new Date(selectedOrder.createdAt).toLocaleDateString()
                    : 'N/A'}
                </p>
              </div>
            </div>

            <h3 className="font-semibold mt-6 mb-2">Items</h3>
            <div className="grid grid-cols-1 gap-3">
              {selectedOrder.items?.map((item) => (
                <div
                  key={item._id}
                  className="flex items-center border p-2 rounded-md"
                >
                  <img
                    src={item.product?.images?.[0] || '/fallback.jpg'}
                    alt="product"
                    className="w-16 h-16 object-cover mr-4"
                  />
                  <div>
                    <p className="font-medium">{item.product?.name || 'Unknown'}</p>
                    <p>
                      quantity: {item.quantity} — $
                      {item.product?.price ? item.product.price : '0'}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyOrderOverview;
