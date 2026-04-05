import { useRef } from "react";
import { STATUS_COLORS } from "./AllConfirmOrder.jsx";
import ShippingLabel from "./ShippingLabel.jsx";

const OrderDetailModal = ({ order, onClose, onStatusChange, STATUS_FLOW, isUpdating }) => {
  const labelRef = useRef();

  const handlePrint = () => {
    const printContent = labelRef.current.innerHTML;
    const win = window.open("", "_blank");
    win.document.write(`
      <html>
        <head>
          <title>Shipping Label - ${order._id}</title>
          <style>
            * { margin: 0; padding: 0; box-sizing: border-box; }
            body { font-family: Arial, sans-serif; background: white; }
            @media print {
              @page { size: 100mm 150mm; margin: 0; }
              body { print-color-adjust: exact; -webkit-print-color-adjust: exact; }
            }
          </style>
        </head>
        <body>${printContent}</body>
      </html>
    `);
    win.document.close();
    win.focus();
    setTimeout(() => { win.print(); win.close(); }, 500);
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[92vh] overflow-y-auto">

        {/* Header */}
        <div className="flex justify-between items-center px-6 py-4 border-b sticky top-0 bg-white z-10 rounded-t-2xl">
          <div>
            <h3 className="text-lg font-bold text-gray-800">Order Details</h3>
            <p className="text-xs text-gray-400 font-mono mt-0.5">#{order._id.slice(-8).toUpperCase()}</p>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="flex items-center gap-1.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold px-3 py-2 rounded-lg transition"
            >
              🖨️ Print Label
            </button>
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-500 font-bold transition"
            >
              ✕
            </button>
          </div>
        </div>

        <div className="p-6 space-y-4">

          {/* Order ID */}
          <div className="bg-gray-50 rounded-xl p-3 flex items-center justify-between">
            <div>
              <p className="text-xs text-gray-400">Full Order ID</p>
              <p className="text-sm font-mono font-semibold text-gray-700">{order._id}</p>
            </div>
            <span className={`px-3 py-1 rounded-full text-xs font-bold capitalize ${STATUS_COLORS[order.status]}`}>
              {order.status}
            </span>
          </div>

          {/* Customer Info */}
          <div className="bg-blue-50 rounded-xl p-4">
            <p className="text-xs font-bold text-blue-700 uppercase tracking-widest mb-3">
              👤 Customer Info
            </p>
            <div className="grid grid-cols-2 gap-3 text-sm">
              <div>
                <p className="text-gray-400 text-xs">Name</p>
                <p className="font-bold text-gray-800">
                  {order.user?.name || order.guestInfo?.name || order.shippingAddress?.name}
                </p>
              </div>
              <div>
                <p className="text-gray-400 text-xs">Phone</p>
                <p className="font-bold text-gray-800 text-lg">
                  {order.shippingAddress?.phone}
                </p>
              </div>
              {(order.user?.email || order.guestInfo?.email) && (
                <div className="col-span-2">
                  <p className="text-gray-400 text-xs">Email</p>
                  <p className="font-medium text-gray-700">
                    {order.user?.email || order.guestInfo?.email}
                  </p>
                </div>
              )}
              <div>
                <p className="text-gray-400 text-xs">Type</p>
                <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${
                  order.user ? "bg-blue-100 text-blue-700" : "bg-gray-100 text-gray-600"
                }`}>
                  {order.user ? "Registered" : "Guest"}
                </span>
              </div>
            </div>
          </div>

          {/* Shipping Address */}
         {/* Shipping Address */}
<div className="bg-gradient-to-br from-purple-50 to-white border border-purple-100 rounded-2xl p-5 shadow-sm">

  {/* Header */}
  <div className="flex items-center justify-between mb-4">
    <div>
      <p className="text-xs font-bold text-purple-600 uppercase tracking-widest">
        Shipping Address
      </p>
      <p className="text-[11px] text-gray-400">Delivery Location</p>
    </div>

    <span className="text-[10px] bg-purple-100 text-purple-700 px-2 py-1 rounded-full font-semibold">
      📍 Verified
    </span>
  </div>

  {/* Name + Phone */}
  <div className="flex items-center justify-between bg-white border border-gray-100 rounded-xl px-4 py-3 mb-3">
    <div>
      <p className="text-xs text-gray-400">Receiver</p>
      <p className="text-sm font-bold text-gray-800">
        {order.shippingAddress?.name}
      </p>
    </div>

    <div className="text-right">
      <p className="text-xs text-gray-400">Phone</p>
      <p className="text-lg font-extrabold text-blue-600 tracking-wide">
        {order.shippingAddress?.phone}
      </p>
    </div>
  </div>

  {/* Address */}
  <div className="bg-white border border-gray-100 rounded-xl p-4 space-y-2">

    {/* Full Address */}
    <p className="text-sm font-semibold text-gray-800 leading-relaxed">
      {order.shippingAddress?.address}
    </p>

    {/* District + Division */}
    <p className="text-sm text-gray-500">
      📌 {[order.shippingAddress?.district, order.shippingAddress?.division]
        .filter(Boolean)
        .join(", ")}
    </p>

    {/* Extra Info */}
    <div className="flex flex-wrap gap-2 mt-2">

      {order.shippingAddress?.postalCode && (
        <span className="text-[11px] bg-gray-100 text-gray-600 px-2 py-1 rounded-md">
          📮 {order.shippingAddress.postalCode}
        </span>
      )}

      {order.shippingAddress?.landmark && (
        <span className="text-[11px] bg-blue-50 text-blue-600 px-2 py-1 rounded-md">
          🏫 {order.shippingAddress.landmark}
        </span>
      )}

      {order.shippingAddress?.deliveryTime && (
        <span className="text-[11px] bg-green-50 text-green-600 px-2 py-1 rounded-md">
          🕐 {order.shippingAddress.deliveryTime}
        </span>
      )}
    </div>

    {/* Note */}
    {order.shippingAddress?.note && (
      <div className="mt-3 bg-yellow-50 border border-yellow-200 rounded-lg px-3 py-2">
        <p className="text-[11px] text-yellow-700 font-medium">
          📝 {order.shippingAddress.note}
        </p>
      </div>
    )}
  </div>
</div>

          {/* Products */}
          <div className="bg-green-50 rounded-xl p-4">
            <p className="text-xs font-bold text-green-700 uppercase tracking-widest mb-3">
              🛍️ Ordered Products ({order.items?.reduce((s, i) => s + i.quantity, 0)} pcs)
            </p>
            <div className="space-y-2">
              {order.items?.map((item, i) => (
                <div key={i} className="flex items-center gap-3 bg-white rounded-xl p-3">
                  {item.product?.images?.[0] && (
                    <img
                      src={item.product.images[0]}
                      alt={item.product?.name}
                      className="w-14 h-14 object-cover rounded-lg flex-shrink-0"
                    />
                  )}
                  <div className="flex-1">
                    <p className="text-sm font-semibold text-gray-800">
                      {item.product?.name || "Product"}
                    </p>
                    <p className="text-xs text-gray-500 mt-0.5">
                      ৳{item.product?.price} × {item.quantity} =
                      <span className="font-bold text-green-600 ml-1">
                        ৳{(item.product?.price || 0) * item.quantity}
                      </span>
                    </p>
                  </div>
                  <span className="bg-blue-600 text-white text-xs font-extrabold px-2.5 py-1.5 rounded-lg">
                    ×{item.quantity}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Total */}
          <div className="bg-gray-900 text-white rounded-xl p-4 flex justify-between items-center">
            <div>
              <p className="text-xs text-gray-400">Total Amount</p>
              <p className="text-3xl font-extrabold text-green-400 mt-0.5">
                ৳{order.totalAmount?.toLocaleString()}
              </p>
              <p className="text-xs text-gray-400 mt-1">
                {order.paymentMethod === "COD" ? "💵 Cash on Delivery" : "💳 Online Payment"}
              </p>
            </div>
            <div className="text-right">
              <p className="text-xs text-gray-400">Payment Status</p>
              <span className="text-sm font-semibold capitalize text-white">
                {order.paymentStatus}
              </span>
              <p className="text-xs text-gray-400 mt-2">
                {new Date(order.createdAt).toLocaleString("en-GB")}
              </p>
            </div>
          </div>

          {/* Status Update */}
          <div className="bg-white border border-gray-100 rounded-xl p-4">
            <p className="text-sm font-bold text-gray-700 mb-3">
              🔄 Update Order Status
            </p>
            <div className="flex flex-wrap gap-2">
              {STATUS_FLOW.map(s => (
                <button
                  key={s}
                  disabled={isUpdating}
                  onClick={() => {
                    onStatusChange(order._id, s);
                  }}
                  className={`px-3 py-2 rounded-lg text-xs font-bold capitalize transition border ${
                    order.status === s
                      ? "bg-blue-600 text-white border-blue-600 shadow"
                      : "bg-white text-gray-600 border-gray-200 hover:bg-gray-50"
                  }`}
                >
                  {s === "pending"   && "⏳ "}
                  {s === "confirmed" && "✅ "}
                  {s === "shipped"   && "🚚 "}
                  {s === "delivered" && "🎉 "}
                  {s === "cancelled" && "❌ "}
                  {s}
                </button>
              ))}
            </div>
          </div>

        </div>

        {/* Hidden Shipping Label for Print */}
        <div className="hidden">
          <div ref={labelRef}>
            <ShippingLabel order={order} />
          </div>
        </div>

      </div>
    </div>
  );
};

export default OrderDetailModal;