import React from "react";
import { Outlet } from "react-router";
import CartShowItems from "../components/CartShowItems.jsx";

const MainLayout = () => {
  return (
    <div className="bg-gray-50">
      <main className="container  mx-auto bg-gray-50">
        <Outlet />
      </main>
      <CartShowItems></CartShowItems>
    </div>
  );
};

export default MainLayout;
