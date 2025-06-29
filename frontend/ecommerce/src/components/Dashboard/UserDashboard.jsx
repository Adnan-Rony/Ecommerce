import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  ShoppingBag,
  Heart,
  UserCog,
  LogOut,
  X,
} from "lucide-react";
import { CiMenuBurger } from "react-icons/ci";
import Swal from "sweetalert2";

import WishlistPage from "../../pages/WishlistPage.jsx";
import MyOrderOverview from "../../pages/MyOrderOverview.jsx";
import UserDashboardOverview from "./UserDashboardOverview.jsx";
import { Uselogout } from "../../features/users/userQueries.js";

const UserDashboard = () => {
  const [activeTab, setActiveTab] = useState("dashboard");
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
    { id: "dashboard", label: "Dashboard", icon: <LayoutDashboard size={18} /> },
    { id: "orders", label: "My Orders", icon: <ShoppingBag size={18} /> },
    { id: "wishlist", label: "Wishlist", icon: <Heart size={18} /> },
  ];

  const handleNavClick = (id) => {
    setActiveTab(id);
    setIsSidebarOpen(false);
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Mobile Header */}
      <header className="md:hidden fixed top-0 left-0 right-0 z-30 flex items-center justify-between bg-gradient-to-r from-[#f6cece] to-[#e4efff] p-4 shadow-md">
        <Link to="/">
          <h1 className="font-bold text-xl whitespace-nowrap">
            <span className="text-blue-600">Tech</span>
            <span className="text-black">Dev.</span>
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
        className={`fixed top-0 left-0 h-full w-64 bg-gradient-to-r from-[#f6cece] to-[#e4efff] shadow-md p-4 md:p-6 transform transition-transform duration-300 z-40
        ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"} 
        md:translate-x-0 md:static md:block`}
      >
        <div className="mb-6 mt-16 md:mt-0">
          <Link to="/" onClick={() => setIsSidebarOpen(false)}>
            <h1 className="font-bold text-2xl whitespace-nowrap">
              <span className="text-blue-600">Tech</span>
              <span className="text-black">Dev.</span>
            </h1>
          </Link>
        </div>

        <nav className="flex flex-col gap-2">
          {navItems.map((item) => (
            <button
              key={item.id}
              className={`w-full flex items-center gap-2 px-3 py-2 rounded ${
                activeTab === item.id
                  ? "bg-[#1e4db7] text-white"
                  : "hover:bg-blue-100 text-gray-700"
              }`}
              onClick={() => handleNavClick(item.id)}
            >
              {item.icon}
              <span>{item.label}</span>
            </button>
          ))}

          {/* Logout Button */}
          <button
            className="w-full flex items-center gap-2 px-3 py-2 rounded hover:bg-red-100   "
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

      {/* Sidebar overlay on mobile */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-30 z-30 md:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Main Content */}
      <main className="flex-1 pt-16 md:pt-6 p-4 md:p-6 overflow-y-auto">
        {activeTab === "dashboard" && <UserDashboardOverview />}
        {activeTab === "orders" && <MyOrderOverview />}
        {activeTab === "wishlist" && <WishlistPage />}
      </main>
    </div>
  );
};

export default UserDashboard;
