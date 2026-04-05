import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { UseRegister } from "../features/users/userQueries.js";
import toast from "react-hot-toast";
import { useState } from "react";
import { FiEye, FiEyeOff } from "react-icons/fi";

const SignUp = () => {
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
        reset();
        toast.success("Account created successfully!");
        navigate("/");
      },
      onError: (err) => {
        const message =
          err?.response?.data?.message || err?.message || "Registration failed";
        toast.error(message);
      },
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 px-4">

      {/* Card */}
      <div className="w-full max-w-md bg-white/80 backdrop-blur-md border border-gray-100 shadow-xl rounded-3xl p-8">

        {/* Header */}
        <div className="text-center mb-6">
          <h2 className="text-3xl font-bold text-gray-800">
            Create Account
          </h2>
          <p className="text-gray-500 text-sm mt-1">
            Sign up to get started
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">

          {/* Name */}
          <div>
            <label className="text-sm font-medium text-gray-600">
              Username
            </label>
            <input
              {...register("name", { required: "Username is required" })}
              type="text"
              placeholder="Your name"
              className="w-full mt-1 px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            />
            {errors.name && (
              <p className="text-red-500 text-xs mt-1">
                {errors.name.message}
              </p>
            )}
          </div>

          {/* Email */}
          <div>
            <label className="text-sm font-medium text-gray-600">
              Email
            </label>
            <input
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^\S+@\S+$/i,
                  message: "Invalid email address",
                },
              })}
              type="email"
              placeholder="you@example.com"
              className="w-full mt-1 px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            />
            {errors.email && (
              <p className="text-red-500 text-xs mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Password */}
          <div className="relative">
            <label className="text-sm font-medium text-gray-600">
              Password
            </label>

            <input
              type={showPassword ? "text" : "password"}
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 8,
                  message: "At least 8 characters",
                },
                validate: {
                  hasUpperCase: (v) =>
                    /[A-Z]/.test(v) || "1 uppercase required",
                  hasLowerCase: (v) =>
                    /[a-z]/.test(v) || "1 lowercase required",
                  hasNumber: (v) =>
                    /\d/.test(v) || "1 number required",
                  hasSpecialChar: (v) =>
                    /[!@#$%^&*]/.test(v) || "1 special character required",
                },
              })}
              placeholder="••••••••"
              className="w-full mt-1 px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            />

            {/* Toggle */}
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-[38px] text-gray-400 hover:text-gray-600"
            >
              {showPassword ? <FiEyeOff /> : <FiEye />}
            </button>

            {errors.password && (
              <p className="text-red-500 text-xs mt-1">
                {errors.password.message}
              </p>
            )}
          </div>

          {/* Button */}
          <button
            type="submit"
            disabled={isPending}
            className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3 rounded-xl font-semibold shadow-md hover:shadow-lg hover:scale-[1.02] transition-all disabled:opacity-60"
          >
            {isPending ? "Creating account..." : "Sign Up"}
          </button>
        </form>

        {/* Footer */}
        <p className="text-center text-sm text-gray-500 mt-6">
          Already have an account?
          <Link
            to="/login"
            className="text-blue-600 ml-1 font-medium hover:underline"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignUp;