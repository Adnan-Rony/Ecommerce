import { FiPhoneCall } from "react-icons/fi";
import { CgProfile } from "react-icons/cg";
import { Link, useNavigate } from "react-router";
import SearchBar from "../SearchBar.jsx";
import { UseCurrentUser, Uselogout } from "../../features/users/userQueries.js";

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

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="bg-white p-2 rounded-sm sticky top-0 z-50 shadow-sm">
      {/* Main container */}
      <div className="max-w-7xl mx-auto flex justify-between items-center flex-wrap gap-4">
        {/* Left Section: Logo */}
        <Link to="/" className="flex items-center gap-1 flex-shrink-0">
          <h1 className="font-bold text-2xl whitespace-nowrap">
            <span className="text-blue-600">Tech</span>
            <span className="text-black">Dev.</span>
          </h1>
        </Link>

        {/* Center Section: Search Bar */}
        <div className="flex-1 max-w-xl">
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
                <CgProfile className="text-2xl" />
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
                    <li>
                     <button onClick={handleLogout}>Logout</button>
                    </li>
                    <li>
                      <Link to="/dashboard"><p>DashBoard</p></Link>
                    </li>
                    <li>
                        <Link to="/myorder"><p>My Order</p></Link>
                   
                    </li>
                    <li>
                        <Link to="/wishlist"><p>WishList</p></Link>
                   
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
