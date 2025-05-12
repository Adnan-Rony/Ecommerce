import React from 'react';
import { IoCartOutline } from "react-icons/io5";
const CartShowItems = () => {
    return (
        <div>
             <div className="drawer drawer-end">
              <input id="my-drawer" type="checkbox" className="drawer-toggle" />
              
              <div className="drawer-content">
                {/* Fixed Cart Button */}
                <label
                  htmlFor="my-drawer"
                  className="btn btn-primary drawer-button fixed top-1/2 right-0 transform -translate-y-1/2 z-50"
                >
                  <IoCartOutline className="text-3xl" />
                </label>
              </div>
            
              <div className="drawer-side">
                <label
                  htmlFor="my-drawer"
                  aria-label="close sidebar"
                  className="drawer-overlay"
                ></label>
                
                <ul className="menu bg-base-200 text-base-content min-h-full w-80 p-4">
                  {/* Sidebar content here */}
                  <li><a>Sidebar Item 1</a></li>
                  <li><a>Sidebar Item 2</a></li>
                </ul>
              </div>
            </div>
        </div>
    );
};

export default CartShowItems;