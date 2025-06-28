import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { LayoutDashboard, ShoppingBag, Heart, UserCog } from "lucide-react";
import WishlistPage from "../../pages/WishlistPage.jsx";
import MyOrderOverview from "../../pages/MyOrderOverview.jsx";
import { Uselogout } from "../../features/users/userQueries.js";
import Swal from "sweetalert2";

const UserDashboard = () => {
  const [activeTab, setActiveTab] = useState("dashboard");
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
            Swal.fire(
              "Logged out!",
              "You have been successfully logged out.",
              "success"
            );
            navigate("/login");
          },
        });
      }
    });
  };

  const navItems = [
    {
      id: "dashboard",
      label: "Dashboard",
      icon: <LayoutDashboard size={18} />,
    },
    { id: "orders", label: "My Orders", icon: <ShoppingBag size={18} /> },
    { id: "wishlist", label: "Wishlist", icon: <Heart size={18} /> },
  ];

  return (
    <div className="flex flex-col md:flex-row h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-full md:w-64 bg-gradient-to-r from-[#f6cece] to-[#e4efff] shadow-md p-4 md:p-6">
        <div className="mb-6">
          <Link to="/">
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
              onClick={() => setActiveTab(item.id)}
            >
              {item.icon}
              <span>{item.label}</span>
            </button>
          ))}

          {/* Logout Button */}
          <button
            className="w-full flex items-center gap-2 px-3 py-2 rounded  hover:bg-red-100"
            onClick={handleLogout}
          >
            <UserCog size={18} />
            <span>Logout</span>
          </button>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-4 md:p-6 overflow-y-auto">
        {activeTab === "dashboard" && (
          <h2 className="text-xl font-bold">Welcome to your Dashboard</h2>
        )}
        {activeTab === "orders" && <MyOrderOverview />}
        {activeTab === "wishlist" && <WishlistPage />}
      </div>
    </div>
  );
};

export default UserDashboard;
