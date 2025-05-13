import React from "react";
import { IoCartOutline } from "react-icons/io5";
import CartItemsAll from "./CartItemsAll.jsx";

const CartShowItems = () => {
  return (
    <div className="z-50 ">
      <div className="drawer drawer-end">
        <input id="my-drawer" type="checkbox" className="drawer-toggle" />

        {/* Floating Button */}
        <div className="drawer-content">
          <label
            htmlFor="my-drawer"
            className="btn btn-primary drawer-button fixed right-4 bottom-4 sm:top-1/2 sm:right-0 sm:transform sm:-translate-y-1/2 z-50"
          >
            <IoCartOutline className="lg:text-3xl " />
          </label>
        </div>

        {/* Drawer Sidebar */}
        <div className="drawer-side">
          <label
            htmlFor="my-drawer"
            aria-label="close sidebar"
            className="drawer-overlay"
          ></label>
         <div className="menu bg-base-200 text-base-content w-72 h-full sm:w-80 p-4 fixed top-10 right-0 max-h-[calc(100vh-64px)] overflow-y-auto">

            <CartItemsAll />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartShowItems;
