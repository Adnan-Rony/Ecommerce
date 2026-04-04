import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FiX, FiMenu } from "react-icons/fi";
import { MdLocalShipping } from "react-icons/md";
import { UseCurrentUser, Uselogout } from "../../features/users/userQueries.js";
import img from "../../assets/user-1.jpg";
import SearchBar from "../SearchBar.jsx";

const Navbar = () => {
  const { data: userData } = UseCurrentUser();
  const { mutate: logout } = Uselogout();
  const navigate = useNavigate();
  const user = userData?.user;

  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleLogout = () => {
    logout(undefined, {
      onSuccess: () => {
        navigate("/login");
        setSidebarOpen(false);
      },
    });
  };

  return (
    <>
      {/* Top bar */}
      <div className="bg-[#0f3580] text-white text-xs py-1.5 px-4 text-center hidden md:block">
        🚚 Free delivery on all orders &nbsp;|&nbsp; Cash on Delivery available &nbsp;|&nbsp;
        <Link to="/track-order" className="underline font-semibold hover:text-yellow-300 transition">
          Track your order
        </Link>
      </div>

      <header className="bg-[#1d4c9e] text-white sticky top-0 z-50 shadow-md">
        <div className="max-w-7xl mx-auto px-4 lg:px-6 py-3 flex items-center justify-between gap-4">

          {/* Logo */}
          <Link to="/" className="font-extrabold text-xl whitespace-nowrap tracking-tight">
            ZapZone<span className="text-yellow-300">BD</span>
          </Link>

          {/* Search Bar — center */}
          <div className="flex-1 max-w-lg hidden sm:block">
            <SearchBar />
          </div>

          {/* Desktop Links */}
          <nav className="hidden lg:flex items-center gap-5 text-sm font-medium">
            <Link
              to="/allcategories"
              className="hover:text-yellow-300 transition"
            >
              Products
            </Link>
            <Link
              to="/blogs"
              className="hover:text-yellow-300 transition"
            >
              Blog
            </Link>
            <Link
              to="/contact"
              className="hover:text-yellow-300 transition"
            >
              Contact
            </Link>

            {/* Track Order — highlighted */}
            <Link
              to="/track-order"
              className="flex items-center gap-1.5 bg-yellow-400 text-[#1d4c9e] px-3 py-1.5 rounded-full text-xs font-bold hover:bg-yellow-300 transition"
            >
              <MdLocalShipping className="text-base" />
              Track Order
            </Link>

            {/* Non-admin links */}
            {user && user.role !== "admin" && (
              <>
                <Link to="/wishlist" className="hover:text-yellow-300 transition">
                  Wishlist
                </Link>
                <Link to="/myorder" className="hover:text-yellow-300 transition">
                  My Orders
                </Link>
              </>
            )}

            {/* Profile Dropdown */}
            <div className="dropdown dropdown-end text-black">
              <div tabIndex={0} className="cursor-pointer relative">
                <img
                  src={img}
                  alt="User"
                  className="w-9 h-9 rounded-full object-cover border-2 border-yellow-300"
                />
                {user && (
                  <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-400 rounded-full border-2 border-white" />
                )}
              </div>

              <ul
                tabIndex={0}
                className="dropdown-content menu bg-white rounded-xl z-10 w-56 p-2 shadow-xl border border-gray-100"
              >
                {!user ? (
                  <>
                    <li>
                      <Link to="/login" className="text-gray-700 hover:bg-blue-50 rounded-lg">
                        Login
                      </Link>
                    </li>
                    <li>
                      <Link to="/SingUp" className="text-gray-700 hover:bg-blue-50 rounded-lg">
                        Sign Up
                      </Link>
                    </li>
                    <li className="border-t mt-1 pt-1">
                      <Link
                        to="/track-order"
                        className="text-blue-600 font-semibold hover:bg-blue-50 rounded-lg flex items-center gap-2"
                      >
                        <MdLocalShipping /> Track Order
                      </Link>
                    </li>
                  </>
                ) : (
                  <>
                    <li className="px-3 py-2 border-b border-gray-100">
                      <div>
                        <p className="font-bold text-gray-800">{user.name}</p>
                        <p className="text-xs text-gray-400">{user.email}</p>
                        <span className={`text-xs px-2 py-0.5 rounded-full mt-1 inline-block font-semibold ${
                          user.role === "admin"
                            ? "bg-red-100 text-red-600"
                            : "bg-blue-100 text-blue-600"
                        }`}>
                          {user.role}
                        </span>
                      </div>
                    </li>
                    <li>
                      <Link
                        to={user.role === "admin" ? "/dashboard" : "/userdashboard"}
                        className="text-gray-700 hover:bg-blue-50 rounded-lg"
                      >
                        Dashboard
                      </Link>
                    </li>
                    <li>
                      <button
                        onClick={handleLogout}
                        className="text-red-600 hover:bg-red-50 w-full text-left px-3 py-2 rounded-lg transition text-sm"
                      >
                        Logout
                      </button>
                    </li>
                  </>
                )}
              </ul>
            </div>
          </nav>

          {/* Mobile right side */}
          <div className="lg:hidden flex items-center gap-3">
            <Link
              to="/track-order"
              className="flex items-center gap-1 bg-yellow-400 text-[#1d4c9e] px-2.5 py-1.5 rounded-full text-xs font-bold"
            >
              <MdLocalShipping />
              Track
            </Link>
            <button onClick={() => setSidebarOpen(true)}>
              <FiMenu size={26} className="text-white" />
            </button>
          </div>
        </div>

        {/* Mobile Search */}
        <div className="sm:hidden px-4 pb-3">
          <SearchBar />
        </div>
      </header>

      {/* Mobile Sidebar Overlay */}
      <div
        className={`fixed inset-0 bg-black bg-opacity-50 z-50 transition-opacity duration-300 ${
          sidebarOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setSidebarOpen(false)}
      >
        <aside
          className={`bg-white text-black w-72 h-full p-0 shadow-2xl transition-transform duration-300 ${
            sidebarOpen ? "translate-x-0" : "-translate-x-full"
          }`}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Sidebar Header */}
          <div className="bg-[#1d4c9e] text-white flex justify-between items-center px-5 py-4">
            <Link to="/" className="font-extrabold text-lg">
              ZapZone<span className="text-yellow-300">BD</span>
            </Link>
            <button onClick={() => setSidebarOpen(false)}>
              <FiX size={24} />
            </button>
          </div>

          {/* User Info */}
          {user && (
            <div className="flex items-center gap-3 px-5 py-4 bg-blue-50 border-b">
              <img src={img} alt="User" className="w-10 h-10 rounded-full object-cover border-2 border-blue-300" />
              <div>
                <p className="font-bold text-gray-800 text-sm">{user.name}</p>
                <span className={`text-xs px-2 py-0.5 rounded-full font-semibold ${
                  user.role === "admin"
                    ? "bg-red-100 text-red-600"
                    : "bg-blue-100 text-blue-600"
                }`}>
                  {user.role}
                </span>
              </div>
            </div>
          )}

          {/* Sidebar Links */}
          <ul className="p-5 space-y-1 text-sm font-medium">
            {[
              { to: "/", label: "🏠 Home" },
              { to: "/allcategories", label: "📦 Products" },
              { to: "/blogs", label: "📝 Blog" },
              { to: "/contact", label: "📞 Contact" },
            ].map((item) => (
              <li key={item.to}>
                <Link
                  to={item.to}
                  onClick={() => setSidebarOpen(false)}
                  className="block px-3 py-2.5 rounded-lg hover:bg-blue-50 text-gray-700 transition"
                >
                  {item.label}
                </Link>
              </li>
            ))}

            {/* Track Order — highlighted */}
            <li>
              <Link
                to="/track-order"
                onClick={() => setSidebarOpen(false)}
                className="flex items-center gap-2 px-3 py-2.5 rounded-lg bg-yellow-50 text-yellow-700 font-bold hover:bg-yellow-100 transition"
              >
                <MdLocalShipping className="text-lg" /> Track Order
              </Link>
            </li>

            {user && user.role !== "admin" && (
              <>
                <li>
                  <Link
                    to="/wishlist"
                    onClick={() => setSidebarOpen(false)}
                    className="block px-3 py-2.5 rounded-lg hover:bg-blue-50 text-gray-700 transition"
                  >
                    ❤️ Wishlist
                  </Link>
                </li>
                <li>
                  <Link
                    to="/myorder"
                    onClick={() => setSidebarOpen(false)}
                    className="block px-3 py-2.5 rounded-lg hover:bg-blue-50 text-gray-700 transition"
                  >
                    📋 My Orders
                  </Link>
                </li>
              </>
            )}

            {user ? (
              <>
                <li className="border-t pt-2">
                  <Link
                    to={user.role === "admin" ? "/dashboard" : "/userdashboard"}
                    onClick={() => setSidebarOpen(false)}
                    className="block px-3 py-2.5 rounded-lg hover:bg-blue-50 text-gray-700 transition"
                  >
                    🖥️ Dashboard
                  </Link>
                </li>
                <li>
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-3 py-2.5 rounded-lg text-red-600 hover:bg-red-50 transition font-semibold"
                  >
                    🚪 Logout
                  </button>
                </li>
              </>
            ) : (
              <>
                <li className="border-t pt-2">
                  <Link
                    to="/login"
                    onClick={() => setSidebarOpen(false)}
                    className="block px-3 py-2.5 rounded-lg hover:bg-blue-50 text-gray-700 transition"
                  >
                    🔐 Login
                  </Link>
                </li>
                <li>
                  <Link
                    to="/SingUp"
                    onClick={() => setSidebarOpen(false)}
                    className="block px-3 py-2.5 rounded-lg bg-blue-600 text-white text-center font-semibold hover:bg-blue-700 transition"
                  >
                    ✨ Sign Up
                  </Link>
                </li>
              </>
            )}
          </ul>
        </aside>
      </div>
    </>
  );
};

export default Navbar;