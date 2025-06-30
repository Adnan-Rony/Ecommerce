import React from "react";
import UserProfileSummary from "./UserProfileSummary.jsx";
import MyWishlistPreview from "./MyWishlistPreview.jsx";
import MyRecentOrders from "./MyRecentOrders.jsx";

const UserDashboardOverview = () => {
  return (
    <div className="max-w-screen-xl  mx-auto">
      <div className="p-4 space-y-3 ">
        <h2 className="lg:text-3xl font-semibold text-2xl">My Dashboard</h2>

        {/* User Profile Card */}

        <div className="grid lg:grid-cols-2 grid-cols-1 gap-4">
          <MyRecentOrders />
          <UserProfileSummary />
        </div>

        {/* Grid for Orders & Wishlist */}
        <div className="">
          <MyWishlistPreview />
        </div>
      </div>
    </div>
  );
};

export default UserDashboardOverview;
