import React from "react";

const LoginModal = () => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="w-full max-w-5xl bg-white rounded-lg overflow-hidden shadow-lg flex flex-col md:flex-row relative">
        {/* Left Side - Welcome Panel */}
        <div className="md:w-1/2 w-full bg-gradient-to-br from-[#d31313] to-[#e94057] text-white p-10 flex flex-col justify-center items-start relative">
          <h2 className="text-2xl font-bold mb-4">Welcome</h2>
          <p className="text-sm leading-relaxed mb-6">
            HATIL is a fast-growing Global Furniture Brand with customers and
            connoisseurs around the globe.
          </p>
          <button className="border border-white px-6 py-2 rounded hover:bg-white hover:text-red-600 transition font-medium">
            Sign Up
          </button>
          {/* Optional Background Circles */}
          <div className="absolute top-0 right-0 w-40 h-40 bg-white bg-opacity-10 rounded-full -z-10 blur-2xl"></div>
          <div className="absolute bottom-0 left-0 w-32 h-32 bg-white bg-opacity-10 rounded-full -z-10 blur-2xl"></div>
        </div>

        {/* Right Side - Login Form */}
        <div className="md:w-1/2 w-full p-10 relative flex flex-col justify-center">
          {/* Close Button */}
          <button className="absolute top-4 right-4 text-red-600 text-2xl font-bold hover:text-red-800">
            &times;
          </button>

          <h3 className="text-2xl font-semibold text-gray-800 mb-8">
            Log in to HATIL
          </h3>

          <form>
            <div className="mb-4">
              <input
                type="email"
                placeholder="Email Address *"
                className="w-full border border-gray-300 px-4 py-3 rounded text-sm focus:outline-none focus:ring-2 focus:ring-red-400"
              />
            </div>
            <div className="mb-2">
              <input
                type="password"
                placeholder="Password *"
                className="w-full border border-gray-300 px-4 py-3 rounded text-sm focus:outline-none focus:ring-2 focus:ring-red-400"
              />
            </div>
            <div className="mb-6 text-right">
              <a href="#" className="text-sm text-red-600 hover:underline">
                Forgot Password
              </a>
            </div>
            <button
              type="submit"
              className="w-full bg-red-600 text-white py-3 rounded hover:bg-red-700 transition font-semibold"
            >
              Log In
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginModal;
