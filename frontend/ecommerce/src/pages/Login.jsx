import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom"; // use react-router-dom instead of "react-router"
import { UseLogin } from "../features/users/userQueries.js";
import toast from "react-hot-toast";

const Login = () => {

    const navigate=useNavigate()
  const { register, handleSubmit, reset } = useForm();

  const { mutate: loginUser, isPending, } = UseLogin();

  const onSubmit = (data) => {
    loginUser(data, {
      onSuccess: () => {
        reset();
        toast.success("Login successful!");
        navigate("/")
        console.log("User logged in successfully");
      },
      onError: () => {
        toast.error("Login failed!");
      }
    });
  };

  return (
    <div className="min-h-screen rounded-3xl flex items-center justify-center bg-gray-200">
      <div className="w-full max-w-lg mx-auto lg:p-4 p-6 bg-white rounded-3xl shadow-md">
        <div className="space-y-2 text-center">
          <p className="text-3xl font-semibold">Welcome Back!</p>
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
              className="bg-black text-white w-full p-2 rounded-full focus:outline-none focus:shadow-outline"
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
  );
};

export default Login;
