import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { CiMenuBurger } from "react-icons/ci";

import CreateProducts from "./CreateProducts.jsx";
import UserOverviews from "../components/Dashboard/UserOverviews.jsx";
import AllProductsOverviews from "../components/Dashboard/AllProductsOverview.jsx";
import AllConfirmOrders from "../components/Dashboard/AllConfirmOrder.jsx";
import DashboardOverview from "./DashboardOverview.jsx";

import {
  LayoutDashboard,
  PackageSearch,
  Users,
  ClipboardList,
  PlusCircle,
  LogOut,
  MoreVertical, // 3 dots icon from lucide-react
  X, // close icon
} from "lucide-react";
import { Uselogout } from "../features/users/userQueries.js";
import Swal from "sweetalert2";

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // sidebar toggle state
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
    { id: "overview", label: "Dashboard", icon: <LayoutDashboard size={18} /> },
    { id: "product", label: "All Products", icon: <PackageSearch size={18} /> },
    { id: "users", label: "Users", icon: <Users size={18} /> },
    { id: "Orders", label: "Orders", icon: <ClipboardList size={18} /> },
    { id: "create", label: "Post Products", icon: <PlusCircle size={18} /> },
  ];

  // Function to handle nav click + close sidebar on mobile
  const handleNavClick = (id) => {
    setActiveTab(id);
    setIsSidebarOpen(false); // close sidebar on mobile after selection
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Mobile header with toggle button */}
      <header className="md:hidden flex items-center justify-between bg-gradient-to-r from-[#f6cece] to-[#e4efff] p-4 shadow-md w-full fixed top-0 left-0 right-0 z-30">
        <Link to="/">
          <h1 className="font-bold text-xl whitespace-nowrap">
            <span className="text-blue-600">Tech</span>
            <span className="text-black">Dev.</span>
          </h1>
        </Link>
        <button
          aria-label="Toggle navigation menu"
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="text-gray-700 hover:text-blue-700 transition"
        >
          {isSidebarOpen ? <X size={24} /> : <CiMenuBurger size={24} />}
        </button>
      </header>

      {/* Sidebar */}
      <aside
        className={`
          fixed top-0 left-0 h-full bg-gradient-to-r from-[#f6cece] to-[#e4efff] shadow-md p-4 md:p-6
          w-64
          transform
          md:transform-none md:static md:block
          transition-transform duration-300 ease-in-out
          z-40
          ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}
        `}
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
            className="w-full flex items-center gap-2 px-3 py-2 rounded hover:bg-red-100 text-red-600 font-semibold mt-4"
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

      {/* Overlay for mobile when sidebar is open */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-30 z-30 md:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Main Content */}
      <main className="flex-1 pt-16 md:pt-6 p-4 md:p-6 overflow-y-auto">
        {activeTab === "overview" && <DashboardOverview />}
        {activeTab === "product" && <AllProductsOverviews />}
        {activeTab === "users" && <UserOverviews />}
        {activeTab === "Orders" && <AllConfirmOrders />}
        {activeTab === "create" && <CreateProducts />}
      </main>
    </div>
  );
};

export default AdminDashboard;
