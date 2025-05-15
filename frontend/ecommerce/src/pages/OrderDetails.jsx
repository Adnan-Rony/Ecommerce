import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { UseMyOrders } from '../features/order/OrderQuery';

const OrderDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data, isLoading, isError } = UseMyOrders();

  const order = data?.orders?.find((order) => order._id === id);

  if (isLoading) return null;
  if (!order) return null;

  const closeModal = () => {
    navigate(-1);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 z-50 flex items-center justify-center">
      <div className="bg-white w-full max-w-3xl rounded-lg shadow-lg p-6 relative">
        <button
          onClick={closeModal}
          className="absolute top-4 right-4 text-gray-500 hover:text-red-500"
        >
          ✕
        </button>

        <h2 className="text-xl font-semibold mb-2">Order Details</h2>
        <p className="text-sm text-gray-500 mb-4">Order ID: {order._id}</p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <h3 className="font-semibold mb-1">Shipping Address</h3>
            <p>{order.shippingAddress.name}</p>
            <p>{order.shippingAddress.phone}</p>
            <p>{order.shippingAddress.address}, {order.shippingAddress.city}</p>
            <p>{order.shippingAddress.country}</p>
          </div>

          <div>
            <h3 className="font-semibold mb-1">Payment Info</h3>
            <p>Method: {order.paymentMethod}</p>
            <p>Status: {order.paymentStatus}</p>
            <p>Total: ${order.totalAmount}</p>
            <p>Date: {new Date(order.createdAt).toLocaleDateString()}</p>
          </div>
        </div>

        <h3 className="font-semibold mt-6 mb-2">Items</h3>
        <div className="grid grid-cols-1 gap-3">
          {order.items.map((item) => (
            <div key={item._id} className="flex items-center border p-2 rounded-md">
              <img src={item.product.images[0]} className="w-16 h-16 object-cover mr-4" />
              <div>
                <p className="font-medium">{item.product.name}</p>
                <p>Qty: {item.quantity} — ${item.product.price}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default OrderDetails;
