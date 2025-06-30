import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FiX } from "react-icons/fi";
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
      onSuccess: () => navigate("/login"),
    });
  };

  return (
    <>
      <header className="bg-[#1d4c9e]  text-white sticky top-0 z-50 shadow-sm px-4 lg:px-6 py-2">
        <div className="max-w-7xl p-2 mx-auto flex justify-between items-center gap-4">
          {/* Logo */}
          <Link to="/" className="font-bold text-xl whitespace-nowrap">
            Tech<span className="text-yellow-300">Dev</span>
          </Link>

          {/* Search Bar */}
          <div className="flex-1 max-w-md">
            <SearchBar />
          </div>

          {/* Desktop Links */}
          <div className="hidden lg:flex items-center gap-6 text-sm font-medium">
            <Link to="/allcategories">Products</Link>
            <Link to="/blogs">Blog</Link>
            <Link to="/contact">Contact</Link>

            {/* Show only for non-admin */}
            {user && user.role !== "admin" && (
              <>
                <Link to="/wishlist">Wishlist</Link>
                <Link to="/myorder">Orders</Link>
              </>
            )}

            {/* Profile Dropdown (Desktop) */}
            <div className="dropdown dropdown-end text-black">
              <div tabIndex={0} className="cursor-pointer">
                <img
                  src={img}
                  alt="User"
                  className="w-9 h-9 lg:w-10 lg:h-10 rounded-full object-cover"
                />
              </div>

              <ul
                tabIndex={0}
                className="dropdown-content menu bg-base-100 rounded-box z-10 w-52 p-2 shadow-md"
              >
                {!user && (
                  <>
                    <li>
                      <Link to="/login">Login</Link>
                    </li>
                    <li>
                      <Link to="/SingUp">Sign Up</Link>
                    </li>
                  </>
                )}

                {user && (
                  <>
                    <li className="px-4 py-2 border-b border-gray-200 font-semibold text-gray-800">
                      {user.name}
                    </li>
                    <li>
                      <Link
                        to={
                          user.role === "admin"
                            ? "/dashboard"
                            : "/userdashboard"
                        }
                      >
                        Dashboard
                      </Link>
                    </li>
                    <li>
                      <button
                        onClick={handleLogout}
                        className="text-red-600 hover:bg-red-100 w-full text-left px-4 py-2 rounded transition"
                      >
                        Logout
                      </button>
                    </li>
                  </>
                )}
              </ul>
            </div>
          </div>

          {/* Mobile Profile Icon */}
          <div className="lg:hidden">
            <img
              src={img}
              alt="User"
              onClick={() => setSidebarOpen(true)}
              className="w-9 h-9 rounded-full object-cover cursor-pointer"
            />
          </div>
        </div>
      </header>

      {/* Mobile Sidebar */}
      <div
        className={`fixed inset-0 bg-black bg-opacity-40 z-50 transition-all duration-300 ${
          sidebarOpen ? "block" : "hidden"
        }`}
        onClick={() => setSidebarOpen(false)}
      >
        <aside
          className="bg-white text-black w-64 h-full p-5"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Sidebar Header */}
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg font-bold">Menu</h2>
            <button onClick={() => setSidebarOpen(false)}>
              <FiX size={24} />
            </button>
          </div>

          <ul className="space-y-4 text-sm font-medium">
            <li>
              <Link to="/allcategories" onClick={() => setSidebarOpen(false)}>
                Products
              </Link>
            </li>
            <li>
              <Link to="/blogs" onClick={() => setSidebarOpen(false)}>
                Blog
              </Link>
            </li>
            <li>
              <Link to="/contact" onClick={() => setSidebarOpen(false)}>
                Contact
              </Link>
            </li>

            {user && user.role !== "admin" && (
              <>
                <li>
                  <Link to="/wishlist" onClick={() => setSidebarOpen(false)}>
                    Wishlist
                  </Link>
                </li>
                <li>
                  <Link to="/myorder" onClick={() => setSidebarOpen(false)}>
                    Orders
                  </Link>
                </li>
              </>
            )}

            {user && (
              <>
                <li>
                  <Link
                    to={user.role === "admin" ? "/dashboard" : "/userdashboard"}
                    onClick={() => setSidebarOpen(false)}
                  >
                    Dashboard
                  </Link>
                </li>
                <li>
                  <button
                    onClick={() => {
                      handleLogout();
                      setSidebarOpen(false);
                    }}
                    className="text-red-600"
                  >
                    Logout
                  </button>
                </li>
              </>
            )}

            {!user && (
              <>
                <li>
                  <Link to="/login" onClick={() => setSidebarOpen(false)}>
                    Login
                  </Link>
                </li>
                <li>
                  <Link to="/signup" onClick={() => setSidebarOpen(false)}>
                    Sign Up
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
