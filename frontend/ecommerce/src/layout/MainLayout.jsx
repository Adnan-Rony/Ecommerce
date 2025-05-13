import React from "react";
import { Outlet, ScrollRestoration } from "react-router-dom"; 
import CartShowItems from "../components/CartShowItems.jsx";

const MainLayout = () => {
  return (
    <div className="bg-gray-50">
      <main className="container mx-auto bg-gray-50">
        <Outlet />
        <ScrollRestoration />
      </main>
      <CartShowItems />
    </div>
  );
};

export default MainLayout;
