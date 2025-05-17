import { useState } from "react";
import CreateProducts from "./CreateProducts.jsx";
import UserOverviews from "../components/Dashboard/UserOverviews.jsx";
import AllProductsOverviews from "../components/Dashboard/AllProductsOverview.jsx";
import AllConfirmOrders from "../components/Dashboard/AllConfirmOrder.jsx";
import { Link } from 'react-router-dom';
import DashboardOverview from "./DashboardOverview.jsx";

const AdminDashboard = () => {
 
  const [activeTab, setActiveTab] = useState("overview");
  return (
    <div className="flex flex-col md:flex-row h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-full md:w-64 bg-white shadow-md p-4 md:p-6">
        <div className="mb-6">
        <Link to="/" >
       <h1 className="font-bold text-2xl whitespace-nowrap">
            <span className="text-blue-600">Tech</span>
            <span className="text-black">Dev.</span>
          </h1>
        </Link>
        </div>
        <nav className="flex md:flex-col gap-2">
          <button
            className={`w-full text-left px-3 py-2 rounded ${
              activeTab === "overview"
                ? "bg-[#1e4db7] text-white"
                : "hover:bg-blue-100"
            }`}
            onClick={() => setActiveTab("overview")}
          >
            Dashboard
          </button>
          <button
            className={`w-full text-left px-3 py-2 rounded ${
              activeTab === "product"
                ? "bg-[#1e4db7] text-white"
                : "hover:bg-blue-100"
            }`}
            onClick={() => setActiveTab("product")}
          >
            All Products
          </button>
          <button
            className={`w-full text-left px-3 py-2 rounded ${
              activeTab === "users"
                ? "bg-[#1e4db7] text-white"
                : "hover:bg-blue-100"
            }`}
            onClick={() => setActiveTab("users")}
          >
            Users
          </button>
          <button
            className={`w-full text-left px-3 py-2 rounded ${
              activeTab === "Orders"
                ? "bg-[#1e4db7] text-white"
                : "hover:bg-blue-100"
            }`}
            onClick={() => setActiveTab("Orders")}
          >
            Orders
          </button>
          <button
            className={`w-full text-left px-3 py-2 rounded ${
              activeTab === "create"
                ? "bg-[#1e4db7] text-white"
                : "hover:bg-blue-100"
            }`}
            onClick={() => setActiveTab("create")}
          >
            Post Products
          </button>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-4 md:p-6 overflow-y-auto">
        
        
        {activeTab === "overview" &&  (
          <div>
            <DashboardOverview></DashboardOverview>
          </div>
        )}

        {activeTab === "product" &&  (
          <div>
            
            <AllProductsOverviews></AllProductsOverviews>
          </div>
        )}
        {activeTab === "users" &&  (
          <div>
            <UserOverviews></UserOverviews>
          </div>
        )}
        {activeTab === "Orders" &&  (
          <div>
            <AllConfirmOrders/>
          </div>
        )}
        {activeTab === "create" &&  (
          <div>
            <CreateProducts/>
          </div>
        )}





      </div>
    </div>
  );
};

export default AdminDashboard;
