import { Link, useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import { UseRegister } from "../features/users/userQueries.js";
import toast from "react-hot-toast";
import { useState } from "react";
import { FiEye, FiEyeOff } from "react-icons/fi";

const SingUp = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();

  const { mutate: registerUser, isPending } = UseRegister();
  const [showPassword, setShowPassword] = useState(false);

  const onSubmit = (data) => {
    registerUser(data, {
      onSuccess: () => {
        reset(); // Reset form on success
        toast.success("registered successfully");
        navigate("/");
        console.log("User registered successfully");
      },
      onError: (err) => {
        const message =
          err?.response?.data?.message || err?.message || "Unknown error";
        toast.error(message);
      },
    });
  };

  return (
    <div className="bg-gradient-to-r  from-[#f6cece] to-[#e4efff]">
      <div className="min-h-screen rounded-3xl flex items-center justify-center">
        <div className="w-full max-w-lg bg-white shadow-md rounded-lg p-8">
          <div className="mb-6 text-center">
            <h2 className="text-3xl font-bold text-gray-800">
              Create an Account
            </h2>
            <p className="text-sm text-gray-500">Register to get started</p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            {/* Username */}
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700"
              >
                Username
              </label>
              <input
                id="name"
                {...register("name", { required: "Username is required" })}
                type="text"
                placeholder="Your username"
                className="mt-1 w-full px-4 py-2 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              />
              {errors.name && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.name.message}
                </p>
              )}
            </div>

            {/* Email */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email
              </label>
              <input
                id="email"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^\S+@\S+$/i,
                    message: "Invalid email address",
                  },
                })}
                type="email"
                placeholder="you@example.com"
                className="mt-1 w-full px-4 py-2 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* Password */}
            <div className="relative">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Password
              </label>
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 8,
                    message: "Password must be at least 8 characters",
                  },
                  validate: {
                    hasUpperCase: (value) =>
                      /[A-Z]/.test(value) || "Must include an uppercase letter",
                    hasLowerCase: (value) =>
                      /[a-z]/.test(value) || "Must include a lowercase letter",
                    hasNumber: (value) =>
                      /\d/.test(value) || "Must include a number",
                    hasSpecialChar: (value) =>
                      /[!@#$%^&*(),.?":{}|<>]/.test(value) ||
                      "Must include a special character",
                  },
                })}
                placeholder="••••••••"
                className="mt-1 w-full px-4 py-2 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              />
              <span
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-[40px] cursor-pointer text-gray-500"
              >
                {showPassword ? <FiEye /> : <FiEyeOff />}
              </span>
              {errors.password && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.password.message}
                </p>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isPending}
              className="w-full py-2 px-4 bg-[#1d4c9e] text-white font-semibold rounded-md hover:bg-blue-700 transition focus:outline-none focus:ring-2 focus:ring-blue-400 disabled:opacity-50"
            >
              {isPending ? "Registering..." : "Register"}
            </button>
          </form>

          {/* Footer */}
          <p className="mt-6 text-sm text-center text-gray-600">
            Already have an account?
            <Link to="/login" className="text-blue-600 hover:underline ml-1">
              Log In
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SingUp;
