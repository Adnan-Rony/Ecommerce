import React from "react";
import { Outlet, ScrollRestoration } from "react-router-dom";
import CartShowItems from "../components/CartShowItems.jsx";
import Navber from "../components/Shared/Navber.jsx";
import Footer from "../components/Shared/Footer.jsx";

const MainLayout = () => {
  // max-w-screen-xl  mx-auto
  return (
    <div className="bg-gray-50">
      <Navber></Navber>
      <main
        className=" bg-gray-50 lg:p-0
        "
      >
        <Outlet />
        <ScrollRestoration />
      </main>
      <CartShowItems />
      <Footer></Footer>
    </div>
  );
};

export default MainLayout;
