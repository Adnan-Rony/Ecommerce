import React from "react";
import { Outlet } from "react-router";

const MainLayout = () => {
  return (
    <div>
      <main className="container  mx-auto">
        <Outlet />
      </main>
    </div>
  );
};

export default MainLayout;
