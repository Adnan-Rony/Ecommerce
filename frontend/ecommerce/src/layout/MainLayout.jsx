import React from "react";
import { Outlet, ScrollRestoration } from "react-router-dom";
import CartShowItems from "../components/CartShowItems.jsx";
import Navber from "../components/Shared/Navber.jsx";
import Footer from "../components/Shared/Footer.jsx";

const MainLayout = () => {
  
  return (
    <div className="bg-gray-50">
      <Navber></Navber>
      <main className="max-w-screen-xl mx-auto bg-gray-50 lg:p-0
       p-2 ">
        <Outlet />
        <ScrollRestoration />
      </main>
      <CartShowItems />
      <Footer></Footer>
    </div>
  );
};

export default MainLayout;
