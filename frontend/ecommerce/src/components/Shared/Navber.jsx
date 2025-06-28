import { FiPhoneCall } from "react-icons/fi";
import { Link, useNavigate } from "react-router";
import { UseCurrentUser, Uselogout } from "../../features/users/userQueries.js";
import img from "../../assets/user-1.jpg";
import SearchBar from "../SearchBar.jsx";

const Navbar = () => {
  const { data: userData } = UseCurrentUser();
  const { mutate: logout } = Uselogout();
  const navigate = useNavigate();
  const user = userData?.user;

  const handleLogout = () => {
    logout(undefined, {
      onSuccess: () => navigate("/login"),
    });
  };

  return (
    <header className="bg-white sticky  top-0 z-50 shadow-sm px-4 lg:px-6 py-2">
      <div className="max-w-7xl p-4 mx-auto flex justify-between items-center flex-wrap gap-4">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-1 flex-shrink-0">
          <h1 className="font-bold text-xl lg:text-2xl whitespace-nowrap">
            <span className="text-blue-600">Tech</span>
            <span className="text-black">Dev</span>
          </h1>
        </Link>

        {/* Search Bar */}
        <div className="flex-1 max-w-md w-full">
          <SearchBar />
        </div>

        {/* Nav Links */}
        <nav className="hidden lg:flex items-center gap-6 text-sm font-medium text-gray-700">
         
          <Link to="/allcategories">Products</Link>
          <Link to="/wishlist">Wishlist</Link>
          <Link to="/myorder">Orders</Link>
          <Link to="/blogs/1">Blog</Link>

          {/* Mega Menu */}
          <div className="dropdown dropdown-hover">
            <label tabIndex={0} className="cursor-pointer">
              Categories
            </label>
            <ul
              tabIndex={0}
              className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52 z-10"
            >
              <li><Link to="/allcategories?category=laptops">Laptops</Link></li>
              <li><Link to="/allcategories?category=phones">Phones</Link></li>
              <li><Link to="/allcategories?category=accessories">Accessories</Link></li>
              <li><Link to="/allcategories?category=gaming">Gaming</Link></li>
              <li><Link to="/allcategories?category=others">Others</Link></li>
            </ul>
          </div>
        </nav>

        

        {/* Support + Shipping */}
        {/* <div className="hidden md:flex items-center gap-6">
          <div className="flex items-center gap-2">
            <FiPhoneCall className="text-xl text-gray-700" />
            <div className="text-sm leading-tight">
              <p className="font-semibold text-gray-800">24 Support</p>
              <p className="text-blue-600 hover:underline cursor-pointer">
                +8801747430447
              </p>
            </div>
          </div>

          <div className="flex flex-col text-sm text-right">
            <span className="font-semibold text-gray-800">Bangladesh</span>
            <span className="text-blue-600 hover:underline cursor-pointer">
              Free Shipping
            </span>
          </div>
        </div> */}

        {/* User Dropdown */}
        <div className="dropdown dropdown-end">
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
                <li><Link to="/login">Login</Link></li>
                <li><Link to="/signup">Sign Up</Link></li>
              </>
            )}

            {user && (
              <>
                <li className="px-4 py-2 border-b border-gray-200 font-semibold text-gray-800">
                  {user.name}
                </li>

                {user.role === "admin" && (
                  <li>
                    <Link to="/dashboard" className="hover:bg-gray-100">Dashboard</Link>
                  </li>
                )}
                <li><Link to="/myorder" className="hover:bg-gray-100">My Order</Link></li>
                <li><Link to="/wishlist" className="hover:bg-gray-100">Wishlist</Link></li>
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
    </header>
  );
};

export default Navbar;
