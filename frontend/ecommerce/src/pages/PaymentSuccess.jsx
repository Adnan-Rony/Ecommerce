import { Link, useSearchParams } from "react-router-dom";
import { CheckCircle } from "lucide-react";

const PaymentSuccess = () => {
  const [params] = useSearchParams();
  const orderId  = params.get("orderId");

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="bg-white border border-gray-100 rounded-3xl shadow-sm p-10 max-w-md w-full text-center">

        {/* Icon */}
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle size={40} className="text-green-500" />
        </div>

        <h1 className="text-2xl font-bold text-gray-900 mb-2">Payment Successful!</h1>
        <p className="text-gray-500 text-sm mb-6">
          Your order has been confirmed. We'll send you a notification when it ships.
        </p>

        {orderId && (
          <div className="bg-gray-50 border border-gray-100 rounded-xl px-4 py-3 mb-6">
            <p className="text-xs text-gray-400 uppercase tracking-widest mb-1">Order ID</p>
            <p className="text-sm font-mono font-semibold text-gray-700 break-all">{orderId}</p>
          </div>
        )}

        <div className="flex flex-col sm:flex-row gap-3">
          <Link
            to="/myorder"
            className="flex-1 py-2.5 bg-[#1d4c9e] hover:bg-blue-700 text-white text-sm font-semibold rounded-xl transition text-center"
          >
            View My Orders
          </Link>
          <Link
            to="/"
            className="flex-1 py-2.5 border border-gray-200 text-gray-600 text-sm font-medium rounded-xl hover:bg-gray-50 transition text-center"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PaymentSuccess;