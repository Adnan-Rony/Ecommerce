import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { UseLogin } from "../features/users/userQueries.js";
import toast from "react-hot-toast";

const Login = () => {
  const navigate = useNavigate();
  const { register, handleSubmit, reset, setValue } = useForm();
  const { mutate: loginUser, isPending } = UseLogin();

  const onSubmit = (data) => {
    loginUser(data, {
      onSuccess: () => {
        reset();
        toast.success("Login successful!");
        navigate("/");
      },
      onError: () => {
        toast.error("Login failed!");
      },
    });
  };

  const handleDemoUser = () => {
    setValue("email", "rony19@gmail.com");
    setValue("password", "Adnan@1999");
  };

  const handleDemoAdmin = () => {
    setValue("email", "sompod@gmail.com");
    setValue("password", "Adnan@1999");
  };

  return (
    <div className="bg-gradient-to-r from-[#f6cece] to-[#e4efff] min-h-screen  flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-md p-6 md:p-8">
        {/* Title */}
        <div className="text-center mb-6">
          <h2 className="text-3xl font-semibold text-gray-800">Welcome Back!</h2>
        </div>

        {/* Demo Buttons */}
        <div className="flex justify-center gap-3 mb-4">
          <button
            onClick={handleDemoUser}
            className="px-4 py-2 text-sm bg-blue-100 text-blue-700 rounded-full hover:bg-blue-200 transition"
          >
            Demo User
          </button>
          <button
            onClick={handleDemoAdmin}
            className="px-4 py-2 text-sm bg-green-100 text-green-700 rounded-full hover:bg-green-200 transition"
          >
            Demo Admin
          </button>
        </div>

        <hr className="my-4" />

        {/* Login Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block text-gray-700 text-sm font-medium mb-1">
              Email
            </label>
            <input
              {...register("email")}
              type="email"
              required
              placeholder="Enter your email"
              className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-300"
            />
          </div>

          <div>
            <label className="block text-gray-700 text-sm font-medium mb-1">
              Password
            </label>
            <input
              {...register("password")}
              type="password"
              required
              placeholder="Enter your password"
              className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-300"
            />
          </div>

          <button
            type="submit"
            disabled={isPending}
            className="w-full bg-[#1d4c9e] hover:bg-blue-700 text-white py-2 rounded-full transition"
          >
            {isPending ? "Logging in..." : "Login"}
          </button>
        </form>

        <p className="text-center text-sm mt-4">
          Don&apos;t have an account?
          <Link to="/SingUp" className="text-blue-600 ml-1 hover:underline">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
