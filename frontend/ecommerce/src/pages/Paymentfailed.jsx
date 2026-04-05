import { Link, useSearchParams } from "react-router-dom";
import { XCircle } from "lucide-react";

const PaymentFailed = () => {
  const [params] = useSearchParams();
  const orderId  = params.get("orderId");

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="bg-white border border-gray-100 rounded-3xl shadow-sm p-10 max-w-md w-full text-center">

        {/* Icon */}
        <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <XCircle size={40} className="text-red-500" />
        </div>

        <h1 className="text-2xl font-bold text-gray-900 mb-2">Payment Failed</h1>
        <p className="text-gray-500 text-sm mb-6">
          Your payment could not be processed. No money was charged. Please try again or use Cash on Delivery.
        </p>

        {orderId && (
          <div className="bg-gray-50 border border-gray-100 rounded-xl px-4 py-3 mb-6">
            <p className="text-xs text-gray-400 uppercase tracking-widest mb-1">Order Reference</p>
            <p className="text-sm font-mono font-semibold text-gray-700 break-all">{orderId}</p>
          </div>
        )}

        <div className="flex flex-col sm:flex-row gap-3">
          <Link
            to="/checkout"
            className="flex-1 py-2.5 bg-[#1d4c9e] hover:bg-blue-700 text-white text-sm font-semibold rounded-xl transition text-center"
          >
            Try Again
          </Link>
          <Link
            to="/"
            className="flex-1 py-2.5 border border-gray-200 text-gray-600 text-sm font-medium rounded-xl hover:bg-gray-50 transition text-center"
          >
            Go Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PaymentFailed;