import React from 'react';
import { Link } from 'react-router';

const SingUp = () => {
    return (
        <div>
             <div className="min-h-screen rounded-3xl flex items-center justify-center bg-gray-200 ">
      <div className="w-full max-w-lg mx-auto lg:p-4 p-6 bg-white rounded-3xl shadow-md">
        <div className="space-y-2 text-center">
          <p className="text-3xl font-semibold">Welcome Back!</p>
        </div>

        <form className="my-6 p-2">
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-semibold mb-2">
              User Name
            </label>
            <input
              type="text"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Username"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-semibold mb-2">
              Email
            </label>
            <input
              type="email"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="email"
            />
          </div>

          <div className="mb-4 relative">
            <label className="block mb-1 font-semibold text-sm text-gray-700">
              Password
            </label>
            <input
              type="password"
              placeholder="Enter your password"
              className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:ring-blue-200"
            />
          </div>

          <div className="flex items-center justify-between">
            <button
              type="button"
              className="bg-black text-white w-full p-2 rounded-full focus:outline-none focus:shadow-outline"
            >
              Login
            </button>
          </div>
        </form>

        <div className="mt-4 text-center">
          <p>
            Allready have an account?
            <Link className="ml-2 text-blue-600" to="/login">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
        </div>
    );
};

export default SingUp;