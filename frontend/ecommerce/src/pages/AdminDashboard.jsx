import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { CiMenuBurger } from "react-icons/ci";

import CreateProducts from "./CreateProducts.jsx";
import UserOverviews from "../components/Dashboard/UserOverviews.jsx";
import AllProductsOverviews from "../components/Dashboard/AllProductsOverview.jsx";
import AllConfirmOrders from "../components/Dashboard/AllConfirmOrder.jsx";
import DashboardOverview from "./DashboardOverview.jsx";
import CouponManagement from "../components/Dashboard/CouponManagement.jsx";

import {
  LayoutDashboard,
  PackageSearch,
  Users,
  ClipboardList,
  PlusCircle,
  LogOut,
  Tag,
  X,
} from "lucide-react";
import { Uselogout } from "../features/users/userQueries.js";
import Swal from "sweetalert2";

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { mutate: logout } = Uselogout();
  const navigate = useNavigate();

  const handleLogout = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You will be logged out.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, logout",
    }).then((result) => {
      if (result.isConfirmed) {
        logout(undefined, {
          onSuccess: () => {
            Swal.fire("Logged out!", "You have been successfully logged out.", "success");
            navigate("/login");
          },
        });
      }
    });
  };

  const navItems = [
    { id: "overview", label: "Dashboard",    icon: <LayoutDashboard size={18} /> },
    { id: "product",  label: "All Products", icon: <PackageSearch size={18} /> },
    { id: "users",    label: "Users",        icon: <Users size={18} /> },
    { id: "Orders",   label: "Orders",       icon: <ClipboardList size={18} /> },
    { id: "create",   label: "Post Products",icon: <PlusCircle size={18} /> },
    { id: "coupons",  label: "Coupons",      icon: <Tag size={18} /> },
  ];

  const handleNavClick = (id) => {
    setActiveTab(id);
    setIsSidebarOpen(false);
  };

  return (
    <div className="flex h-screen bg-gray-100">

      {/* Mobile Header */}
      <header className="md:hidden flex items-center justify-between bg-gradient-to-r from-[#f6cece] to-[#e4efff] p-4 shadow-md w-full fixed top-0 left-0 right-0 z-30">
        <Link to="/">
          <h1 className="font-bold text-xl whitespace-nowrap">
            <span className="text-blue-600">Zap</span>
            <span className="text-black">Zone</span>
            <span className="text-xs ml-1 bg-blue-600 text-white px-1.5 py-0.5 rounded">BD</span>
          </h1>
        </Link>
        <button
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="text-gray-700 hover:text-blue-700 transition"
        >
          {isSidebarOpen ? <X size={24} /> : <CiMenuBurger size={24} />}
        </button>
      </header>

      {/* Sidebar */}
      <aside
        className={`
          fixed top-0 left-0 h-full bg-gradient-to-b from-[#1d4c9e] to-[#0f2d6e]
          shadow-xl p-4 md:p-6 w-64
          transform md:transform-none md:static md:block
          transition-transform duration-300 ease-in-out
          z-40
          ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}
        `}
      >
        {/* Logo */}
        <div className="mb-8 mt-16 md:mt-0">
          <Link to="/" onClick={() => setIsSidebarOpen(false)}>
            <h1 className="font-bold text-2xl text-white">
              Zap<span className="text-yellow-300">Zone</span>
              <span className="text-xs ml-1 bg-yellow-300 text-blue-900 px-1.5 py-0.5 rounded">BD</span>
            </h1>
            <p className="text-blue-300 text-xs mt-1">Admin Dashboard</p>
          </Link>
        </div>

        {/* Nav Items */}
        <nav className="flex flex-col gap-1">
          {navItems.map((item) => (
            <button
              key={item.id}
              className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition ${
                activeTab === item.id
                  ? "bg-white text-blue-700 shadow"
                  : "text-blue-100 hover:bg-white/10"
              }`}
              onClick={() => handleNavClick(item.id)}
            >
              {item.icon}
              <span>{item.label}</span>
            </button>
          ))}

          {/* Divider */}
          <div className="border-t border-blue-700 my-3" />

          {/* Logout */}
          <button
            className="w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium text-red-300 hover:bg-red-500/20 transition"
            onClick={() => {
              setIsSidebarOpen(false);
              handleLogout();
            }}
          >
            <LogOut size={18} />
            <span>Logout</span>
          </button>
        </nav>
      </aside>

      {/* Mobile Overlay */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-40 z-30 md:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Main Content */}
      <main className="flex-1 pt-16 md:pt-0 overflow-y-auto">
        {activeTab === "overview" && <DashboardOverview />}
        {activeTab === "product"  && <AllProductsOverviews />}
        {activeTab === "users"    && <UserOverviews />}
        {activeTab === "Orders"   && <AllConfirmOrders />}
        {activeTab === "create"   && <CreateProducts />}
        {activeTab === "coupons"  && <CouponManagement />}
      </main>

    </div>
  );
};

export default AdminDashboard;