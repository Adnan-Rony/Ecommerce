import { FiPhoneCall } from "react-icons/fi";
import { CgProfile } from "react-icons/cg";
import { Link } from "react-router";

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
          <label className="flex items-center gap-2 border rounded px-2 py-1 w-full max-w-xl">
            <svg
              className="h-4 w-4 opacity-50"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <g
                strokeLinejoin="round"
                strokeLinecap="round"
                strokeWidth="2.5"
                fill="none"
                stroke="currentColor"
              >
                <circle cx="11" cy="11" r="8"></circle>
                <path d="m21 21-4.3-4.3"></path>
              </g>
            </svg>
            <input
              type="search"
              required
              placeholder="Search"
              className="outline-none w-full bg-transparent"
            />
          </label>
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
