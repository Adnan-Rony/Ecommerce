import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom"; // use react-router-dom instead of "react-router"
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
        console.log("User logged in successfully", data);
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
    <div className="bg-gradient-to-r  from-[#f6cece] to-[#e4efff]">
      <div className="min-h-screen rounded-3xl flex items-center justify-center ">
        <div className="w-full max-w-lg mx-auto lg:p-4 p-6 bg-white rounded-3xl shadow-md">
          <div className="space-y-2 text-center">
            <p className="text-3xl font-semibold">Welcome Back!</p>
          </div>
          {/* Demo Buttons */}
          <div className="flex justify-center gap-4 mb-4 my-4">
            <button
              type="button"
              onClick={handleDemoUser}
              className="px-4 py-2 text-sm bg-blue-100 text-blue-700 rounded-full hover:bg-blue-200 transition"
            >
              Demo User
            </button>
            <button
              type="button"
              onClick={handleDemoAdmin}
              className="px-4 py-2 text-sm bg-green-100 text-green-700 rounded-full hover:bg-green-200 transition"
            >
              Demo Admin
            </button>
          </div>

          <hr className="my-2" />

          <form onSubmit={handleSubmit(onSubmit)} className="my-6 p-2">
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Email
              </label>
              <input
                required
                {...register("email")}
                type="email"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                placeholder="Your Email"
              />
            </div>

            <div className="mb-4 relative">
              <label className="block mb-1 font-medium text-sm text-gray-700">
                Password
              </label>
              <input
                required
                {...register("password")}
                type="password"
                placeholder="Enter your password"
                className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:ring-blue-200"
              />
            </div>

            <div className="flex items-center justify-between">
              <button
                type="submit"
                className="bg-[#1d4c9e] text-white w-full p-2 rounded-full focus:outline-none focus:shadow-outline"
                disabled={isPending}
              >
                {isPending ? "Logging in..." : "Login"}
              </button>
            </div>
          </form>

          <div className="mt-4 text-center">
            <p>
              Don't have an account?
              <Link className="ml-2 text-blue-600" to="/SingUp">
                Sign Up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
