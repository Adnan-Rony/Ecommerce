import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../contex/CartContext.jsx";
import { UseAddToCart } from "../features/carts/CardQuery.js";
import { UseLogin } from "../features/users/userQueries.js";
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import useSEO from "../hooks/useSEO.js";

const Login = () => {


  useSEO({ title: "Login" });
  const navigate = useNavigate();
  const { register, handleSubmit, reset } = useForm();
  const { mutate: loginUser, isPending } = UseLogin();
  const { mutate: addCart } = UseAddToCart();
  const { cart: localCart, clearCart } = useCart();
  const [showPassword, setShowPassword] = useState(false);

  const onSubmit = (data) => {
    loginUser(data, {
      onSuccess: () => {
        reset();
        toast.success("Login successful!");

        if (localCart.length > 0) {
          localCart.forEach(item => {
            addCart({ productId: item._id, quantity: item.quantity });
          });
          clearCart();
          toast.success("Cart synced!");
        }

        navigate("/");
      },
      onError: () => {
        toast.error("Invalid email or password");
      },
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 px-4">

      {/* Card */}
      <div className="w-full max-w-md bg-white/80 backdrop-blur-md border border-gray-100 shadow-xl rounded-3xl p-8">

        {/* Title */}
        <div className="text-center mb-6">
          <h2 className="text-3xl font-bold text-gray-800">Welcome Back</h2>
          <p className="text-gray-500 text-sm mt-1">
            Login to your account
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">

          {/* Email */}
          <div>
            <label className="text-sm font-medium text-gray-600">Email</label>
            <input
              {...register("email")}
              type="email"
              required
              placeholder="you@example.com"
              className="w-full mt-1 px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            />
          </div>

          {/* Password */}
          <div>
            <label className="text-sm font-medium text-gray-600">Password</label>

            <div className="relative mt-1">
              <input
                {...register("password")}
                type={showPassword ? "text" : "password"}
                required
                placeholder="••••••••"
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>

            <div className="text-right mt-1">
              <Link to="/forgot-password" className="text-xs text-blue-600 hover:underline">
                Forgot password?
              </Link>
            </div>
          </div>

          {/* Button */}
          <button
            type="submit"
            disabled={isPending}
            className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3 rounded-xl font-semibold shadow-md hover:shadow-lg hover:scale-[1.02] transition-all disabled:opacity-60"
          >
            {isPending ? "Logging in..." : "Login"}
          </button>
        </form>

        {/* Footer */}
        <p className="text-center text-sm text-gray-500 mt-6">
          Don’t have an account?
          <Link to="/SingUp" className="text-blue-600 ml-1 font-medium hover:underline">
            Sign Up
          </Link>
        </p>

      </div>
    </div>
  );
};

export default Login;