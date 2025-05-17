import { FiPhoneCall } from "react-icons/fi";
import { CgProfile } from "react-icons/cg";
import { Link, useNavigate } from "react-router";
import SearchBar from "../SearchBar.jsx";
import { UseCurrentUser, Uselogout } from "../../features/users/userQueries.js";
import img from "../../assets/user-1.jpg"
const Navber = () => {
  const { data, isLoading, error } = UseCurrentUser();
  const { mutate: logout } = Uselogout();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout(undefined, {
      onSuccess: () => {
        navigate("/login"); // redirect after logout
      },
    });
  };

 

  return (
    <div className="bg-white lg:p-2 px-2 rounded-sm sticky top-0 z-50 shadow-sm">
      {/* Main container */}
      <div className="max-w-7xl mx-auto flex justify-between items-center flex-wrap gap-4">
        {/* Left Section: Logo */}
        <Link to="/" className="flex items-center gap-1 flex-shrink-0">
          <h1 className="font-bold lg:text-2xl whitespace-nowrap">
            <span className="text-blue-600">Tech</span>
            <span className="text-black">Dev</span>
          </h1>
        </Link>

        {/* Center Section: Search Bar */}
        <div className="flex-1 lg:max-w-xl ">
          <SearchBar />
        </div>

        {/* Right Section: Support & Shipping */}
        <div className="flex items-center gap-10 whitespace-nowrap">
          {/* Support */}
          <div className="hidden md:flex items-center gap-2">
            <FiPhoneCall className="text-2xl text-gray-700" />
            <div className="text-sm leading-tight">
              <p className="font-semibold text-gray-800">24 Support</p>
              <p className="text-blue-600 hover:underline cursor-pointer">
                +8801747430447
              </p>
            </div>
          </div>

          {/* Worldwide Shipping */}
          <div className="hidden md:flex flex-col text-sm text-right">
            <span className="font-semibold text-gray-800">Bangladesh</span>
            <span className="text-blue-600 hover:underline cursor-pointer">
              Free Shipping
            </span>
          </div>

          {/* Profile Icon */}
          <div className="text-gray-700 cursor-pointer">
            <div className="dropdown dropdown-center">
              <div tabIndex={0} role="" className=" m-1">
                <img  src={img} className="lg:w-10 w-8 rounded-full" alt="" />
              </div>
              <ul
                tabIndex={0}
                className="dropdown-content menu bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm"
              >
                {!data && (
                  <div>
                    <li>
                      <Link to="/login">Login</Link>
                    </li>
                    <li>
                      <Link to="/SingUp">SingUp</Link>
                    </li>
                  </div>
                )}
                {data && (
  <>
    <li className="px-4 py-2 border-b border-gray-200">
      <button
        className="w-full text-left font-semibold text-gray-800 hover:bg-gray-100 rounded"
        disabled
      >
        {data.user?.name}
      </button>
    </li>

    <li>
      <button
        onClick={handleLogout}
        className="w-full text-left px-4 py-2 text-red-600 hover:bg-red-100 rounded transition"
      >
        Logout
      </button>
    </li>

    {data.user?.role === "admin" && (
      <li>
        <Link
          to="/dashboard"
          className="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded transition"
        >
          Dashboard
        </Link>
      </li>
    )}

    <li>
      <Link
        to="/myorder"
        className="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded transition"
      >
        My Order
      </Link>
    </li>

    <li>
      <Link
        to="/wishlist"
        className="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded transition"
      >
        WishList
      </Link>
    </li>
  </>
)}

              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navber;
