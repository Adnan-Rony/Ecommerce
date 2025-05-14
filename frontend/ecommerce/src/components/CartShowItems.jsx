import React, { } from "react";
import { IoCartOutline } from "react-icons/io5";
import CartItemsAll from "./CartItemsAll";
import { UseFetchAllCart } from "../features/carts/CardQuery.js";

const CartShowItems = () => {
  const { data, isLoading, isError, refetch } = UseFetchAllCart();



  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Failed to load cart.</p>;

  // Get the number of items in the cart
  const cartItemsCount = data?.cart?.products?.length || 0;

  return (
    <div className="z-50">
      <div className="drawer drawer-end">
        <input id="cart-drawer" type="checkbox" className="drawer-toggle" />

        {/* Floating Cart Button */}
        <div className="drawer-content">
          <label
            htmlFor="cart-drawer"
            className="btn btn-primary drawer-button fixed right-4 bottom-4 sm:top-1/2 sm:right-0 sm:transform sm:-translate-y-1/2 z-50 shadow-lg"
          >
            {/* Display the cart count */}
            {cartItemsCount > 0 && (
              <span className="absolute top-0 right-0  text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {cartItemsCount}
              </span>
            )}
            <IoCartOutline className="text-xl sm:text-3xl" />
          </label>
        </div>

        {/* Drawer Panel */}
        <div className="drawer-side z-50">
          {/* Overlay to close drawer on click */}
          <label htmlFor="cart-drawer" className="drawer-overlay"></label>

          <div className="w-80 sm:w-96 bg-white text-gray-800 h-full flex flex-col overflow-y-auto p-4 shadow-lg">
            {/* Header */}
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-bold">Your Cart</h2>
              <label
                htmlFor="cart-drawer"
                className="cursor-pointer text-red-600 font-semibold hover:text-red-800"
              >
                ✕
              </label>
            </div>

            {/* Cart Items List */}
            <CartItemsAll refetch={refetch} />

            <div className="mt-auto pt-4 border-t">
              <button className="w-full bg-green-600 text-white py-2 rounded hover:bg-blue-700 transition">
                Proceed to Checkout
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartShowItems;
