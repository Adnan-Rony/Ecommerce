import React from "react";
import { Outlet } from "react-router";

const MainLayout = () => {
  return (
    <div>
      <main className="max-w-screen mx-auto">
        <Outlet />
      </main>
    </div>
  );
};

export default MainLayout;
