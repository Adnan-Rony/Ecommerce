import { FiPhoneCall } from "react-icons/fi";
import { CgProfile } from "react-icons/cg";
import { Link } from "react-router";
import SearchBar from "../SearchBar.jsx";

const Navber = () => {



  
  return (
    <div className="  bg-gray-50 p-2 rounded-sm sticky top-0 z-50 ">
      {/* Main container */}
      <div className="flex justify-between items-center flex-wrap gap-2">
        {/* Left Section: Logo + Search Bar */}
        <div className="flex items-center gap-2 flex-1">
          {/* Logo */}
          <Link to="/">
            <h1 className="font-semibold text-xl whitespace-nowrap">Techlio</h1>
          </Link>

          {/* Search Bar */}
          
          <div className="w-full max-w-xl">
            <SearchBar />
          </div>
        </div>

        {/* Right Section: Support & Profile */}
        <div className="flex items-center gap-4">
          {/* Phone Support - Hidden on small screens */}
          <div className="hidden md:flex items-center gap-2">
            <FiPhoneCall className="text-2xl" />
            <div className="text-sm leading-tight">
              <p className="font-medium">24 Support</p>
              <p className="text-xs">+8801747430447</p>
            </div>
          </div>

          {/* Profile Icon - Always visible */}
          <div>
            <CgProfile className="text-2xl" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navber;
