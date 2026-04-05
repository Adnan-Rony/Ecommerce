import { IoCartOutline } from "react-icons/io5";
import CartItemsAll from "./CartItemsAll";
import { UseFetchAllCart } from "../features/carts/CardQuery.js";
import { UseCurrentUser } from "../features/users/userQueries.js";
import { useCart } from "../contex/CartContext.jsx";
import { Link } from "react-router";

const CartShowItems = () => {
  const { data, isLoading, isError, refetch } = UseFetchAllCart();
  const { data: user } = UseCurrentUser();
  const { cart: localCart, cartTotal } = useCart();

  const cartItemsCount = user
    ? (data?.cart?.products?.reduce((sum, item) => sum + item.quantity, 0) || 0)
    : localCart.reduce((sum, item) => sum + item.quantity, 0);

  const totalPrice = user
    ? (data?.cart?.totalPrice || 0)
    : cartTotal;

  return (
    <div className="z-50">
      <div className="drawer drawer-end">
        <input id="cart-drawer" type="checkbox" className="drawer-toggle" />

        {/* Floating Cart Button */}
        <div className="drawer-content">
          <label
            htmlFor="cart-drawer"
            className="fixed bottom-6 right-4 sm:bottom-auto sm:top-1/2 sm:-translate-y-1/2 sm:right-0 sm:translate-x-0 z-50 cursor-pointer"
          >
            {/* Mobile — bottom center pill */}
            <div className="flex sm:hidden items-center gap-2 bg-[#1d4c9e] text-white px-5 py-3 rounded-full shadow-2xl border-2 border-blue-300 active:scale-95 transition">
              <div className="relative">
                <IoCartOutline className="text-2xl" />
                {cartItemsCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-yellow-400 text-blue-900 text-xs font-extrabold rounded-full w-5 h-5 flex items-center justify-center">
                    {cartItemsCount}
                  </span>
                )}
              </div>
              <span className="font-bold text-sm">
                Cart {cartItemsCount > 0 ? `(${cartItemsCount})` : ""}
              </span>
              {totalPrice > 0 && (
                <span className="bg-yellow-400 text-blue-900 font-extrabold text-xs px-2 py-0.5 rounded-full">
                  ৳{totalPrice}
                </span>
              )}
            </div>

            {/* Desktop — right side tab */}
            <div className="hidden sm:flex flex-col items-center justify-center bg-[#1d4c9e] text-white w-12 py-4 rounded-l-2xl shadow-2xl hover:w-14 transition-all duration-200 relative">
              <div className="relative">
                <IoCartOutline className="text-2xl" />
                {cartItemsCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-yellow-400 text-blue-900 text-xs font-extrabold rounded-full w-5 h-5 flex items-center justify-center">
                    {cartItemsCount > 9 ? "9+" : cartItemsCount}
                  </span>
                )}
              </div>
              {totalPrice > 0 && (
                <span className="text-xs text-yellow-300 font-bold mt-1 rotate-90 whitespace-nowrap text-[10px]">
                  ৳{totalPrice}
                </span>
              )}
            </div>
          </label>
        </div>

        {/* Drawer Panel */}
        <div className="drawer-side z-50">
          <label htmlFor="cart-drawer" className="drawer-overlay" />

          <div className="w-[90vw] sm:w-96 bg-white text-gray-800 h-full flex flex-col shadow-2xl">

            {/* Header */}
            <div className="bg-[#1d4c9e] text-white px-5 py-4 flex justify-between items-center">
              <div>
                <h2 className="text-lg font-bold flex items-center gap-2">
                  <IoCartOutline className="text-xl" />
                  Your Cart
                </h2>
                <p className="text-blue-200 text-xs mt-0.5">
                  {cartItemsCount} item{cartItemsCount !== 1 ? "s" : ""}
                </p>
              </div>
              <label
                htmlFor="cart-drawer"
                className="cursor-pointer bg-white/20 hover:bg-white/30 w-8 h-8 rounded-full flex items-center justify-center transition font-bold"
              >
                ✕
              </label>
            </div>

            {/* Cart Items */}
            <div className="flex-1 overflow-y-auto p-4">
              <CartItemsAll refetch={refetch} />
            </div>

            {/* Footer */}
            <div className="border-t bg-gray-50 p-4 space-y-3">
              {totalPrice > 0 && (
                <div className="flex justify-between items-center bg-white rounded-xl px-4 py-2 shadow-sm">
                  <span className="text-sm font-semibold text-gray-600">Total:</span>
                  <span className="text-green-600 font-extrabold text-lg">৳{totalPrice}</span>
                </div>
              )}

              <label htmlFor="cart-drawer">
                <Link to={cartItemsCount === 0 ? "#" : "/checkout"}>
                  <button
                    disabled={cartItemsCount === 0}
                    className={`w-full py-3 rounded-xl text-white font-bold transition text-sm ${
                      cartItemsCount === 0
                        ? "bg-gray-300 cursor-not-allowed"
                        : "bg-green-600 hover:bg-green-700 shadow-lg"
                    }`}
                  >
                    {cartItemsCount === 0
                      ? "Cart is Empty"
                      : `Checkout — ৳${totalPrice}`
                    }
                  </button>
                </Link>
              </label>

              <Link to="/allcategories">
                <label htmlFor="cart-drawer" className="cursor-pointer">
                  <p className="text-center text-blue-600 text-xs font-semibold hover:underline">
                    Continue Shopping →
                  </p>
                </label>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartShowItems;