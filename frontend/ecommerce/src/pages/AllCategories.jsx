import { Link } from "react-router";
import img from "../assets/apple-macbook-air-13-space-gray-1-2-80x80.jpg";
import img1 from "../assets/xiaomi-mi-tv-p1-1.jpg";
import img2 from "../assets/apple-iphone-14-plus-blue-1.jpg";
import img3 from "../assets/outlet-580x326.png";
const AllCategories = () => {
  return (
    <div className="   bg-gray-50">
      <div className="grid grid-cols-2 justify-between items-center mb-6 border p-4 bg-blue-400 rounded-2xl text-white">
       <div>
        <p className="text-3xl font-semibold">Outlet Store</p>
        <p>Here you will find discounted products that have been found to have minor damage that does not affect performance.</p>
       </div>
       <div>
        <img src={img3} alt="" />
       </div>
      </div>








      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold">Laptops</h2>

        <Link to="/allcategories">
          <button className="btn btn-ghost rounded-2xl">More Products </button>
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-6">
       
        <div className="bg-white p-4 rounded-lg shadow hover:shadow-lg transition">
          <Link>
            <div className="relative">
              <img
                className="w-full h-40 object-contain mb-3"
                src={img}
                alt=""
              />
            </div>
          </Link>

          <h3 className="text-sm font-semibold text-gray-900">
            Apple MacBook Pro 16″ M1 Pro
          </h3>
          <p className="text-xs text-gray-500 mb-1">Device</p>

          <div className="flex items-center text-yellow-400 text-sm mb-1">
            ☆ ☆ ☆ ☆
          </div>

          <p className="text-green-600 text-sm mb-1">
            <h1> ✔ In stock</h1>
          </p>

          <div className="text-sm text-gray-800 mb-2">
            <span className="text-blue-600 font-bold">
              <p>$200</p>
            </span>
          </div>

          <button className="w-full bg-blue-600 text-white py-1.5 rounded hover:bg-blue-700 text-sm mb-2">
            Add To Cart
          </button>
        </div>
        <div className="bg-white p-4 rounded-lg shadow hover:shadow-lg transition">
          <Link>
            <div className="relative">
              <img
                className="w-full h-40 object-contain mb-3"
                src={img}
                alt=""
              />
            </div>
          </Link>

          <h3 className="text-sm font-semibold text-gray-900">
            Apple MacBook Pro 16″ M1 Pro
          </h3>
          <p className="text-xs text-gray-500 mb-1">Device</p>

          <div className="flex items-center text-yellow-400 text-sm mb-1">
            ☆ ☆ ☆ ☆
          </div>

          <p className="text-green-600 text-sm mb-1">
            <h1> ✔ In stock</h1>
          </p>

          <div className="text-sm text-gray-800 mb-2">
            <span className="text-blue-600 font-bold">
              <p>$200</p>
            </span>
          </div>

          <button className="w-full bg-blue-600 text-white py-1.5 rounded hover:bg-blue-700 text-sm mb-2">
            Add To Cart
          </button>
        </div>
        <div className="bg-white p-4 rounded-lg shadow hover:shadow-lg transition">
          <Link>
            <div className="relative">
              <img
                className="w-full h-40 object-contain mb-3"
                src={img}
                alt=""
              />
            </div>
          </Link>

          <h3 className="text-sm font-semibold text-gray-900">
            Apple MacBook Pro 16″ M1 Pro
          </h3>
          <p className="text-xs text-gray-500 mb-1">Device</p>

          <div className="flex items-center text-yellow-400 text-sm mb-1">
            ☆ ☆ ☆ ☆
          </div>

          <p className="text-green-600 text-sm mb-1">
            <h1> ✔ In stock</h1>
          </p>

          <div className="text-sm text-gray-800 mb-2">
            <span className="text-blue-600 font-bold">
              <p>$200</p>
            </span>
          </div>

          <button className="w-full bg-blue-600 text-white py-1.5 rounded hover:bg-blue-700 text-sm mb-2">
            Add To Cart
          </button>
        </div>
        <div className="bg-white p-4 rounded-lg shadow hover:shadow-lg transition">
          <Link>
            <div className="relative">
              <img
                className="w-full h-40 object-contain mb-3"
                src={img}
                alt=""
              />
            </div>
          </Link>

          <h3 className="text-sm font-semibold text-gray-900">
            Apple MacBook Pro 16″ M1 Pro
          </h3>
          <p className="text-xs text-gray-500 mb-1">Device</p>

          <div className="flex items-center text-yellow-400 text-sm mb-1">
            ☆ ☆ ☆ ☆
          </div>

          <p className="text-green-600 text-sm mb-1">
            <h1> ✔ In stock</h1>
          </p>

          <div className="text-sm text-gray-800 mb-2">
            <span className="text-blue-600 font-bold">
              <p>$200</p>
            </span>
          </div>

          <button className="w-full bg-blue-600 text-white py-1.5 rounded hover:bg-blue-700 text-sm mb-2">
            Add To Cart
          </button>
        </div>
        <div className="bg-white p-4 rounded-lg shadow hover:shadow-lg transition">
          <Link>
            <div className="relative">
              <img
                className="w-full h-40 object-contain mb-3"
                src={img}
                alt=""
              />
            </div>
          </Link>

          <h3 className="text-sm font-semibold text-gray-900">
            Apple MacBook Pro 16″ M1 Pro
          </h3>
          <p className="text-xs text-gray-500 mb-1">Device</p>

          <div className="flex items-center text-yellow-400 text-sm mb-1">
            ☆ ☆ ☆ ☆
          </div>

          <p className="text-green-600 text-sm mb-1">
            <h1> ✔ In stock</h1>
          </p>

          <div className="text-sm text-gray-800 mb-2">
            <span className="text-blue-600 font-bold">
              <p>$200</p>
            </span>
          </div>

          <button className="w-full bg-blue-600 text-white py-1.5 rounded hover:bg-blue-700 text-sm mb-2">
            Add To Cart
          </button>
        </div>


      </div>


      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold">Tv</h2>

        <Link to="/allcategories">
          <button className="btn btn-ghost rounded-2xl">More Products </button>
        </Link>
      </div>




      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-6">
       
        <div className="bg-white p-4 rounded-lg shadow hover:shadow-lg transition">
          <Link>
            <div className="relative">
              <img
                className="w-full h-40 object-contain mb-3"
                src={img1}
                alt=""
              />
            </div>
          </Link>

          <h3 className="text-sm font-semibold text-gray-900">
            Apple MacBook Pro 16″ M1 Pro
          </h3>
          <p className="text-xs text-gray-500 mb-1">Device</p>

          <div className="flex items-center text-yellow-400 text-sm mb-1">
            ☆ ☆ ☆ ☆
          </div>

          <p className="text-green-600 text-sm mb-1">
            <h1> ✔ In stock</h1>
          </p>

          <div className="text-sm text-gray-800 mb-2">
            <span className="text-blue-600 font-bold">
              <p>$200</p>
            </span>
          </div>

          <button className="w-full bg-blue-600 text-white py-1.5 rounded hover:bg-blue-700 text-sm mb-2">
            Add To Cart
          </button>
        </div>
        <div className="bg-white p-4 rounded-lg shadow hover:shadow-lg transition">
          <Link>
            <div className="relative">
              <img
                className="w-full h-40 object-contain mb-3"
                src={img1}
                alt=""
              />
            </div>
          </Link>

          <h3 className="text-sm font-semibold text-gray-900">
            Apple MacBook Pro 16″ M1 Pro
          </h3>
          <p className="text-xs text-gray-500 mb-1">Device</p>

          <div className="flex items-center text-yellow-400 text-sm mb-1">
            ☆ ☆ ☆ ☆
          </div>

          <p className="text-green-600 text-sm mb-1">
            <h1> ✔ In stock</h1>
          </p>

          <div className="text-sm text-gray-800 mb-2">
            <span className="text-blue-600 font-bold">
              <p>$200</p>
            </span>
          </div>

          <button className="w-full bg-blue-600 text-white py-1.5 rounded hover:bg-blue-700 text-sm mb-2">
            Add To Cart
          </button>
        </div>
        <div className="bg-white p-4 rounded-lg shadow hover:shadow-lg transition">
          <Link>
            <div className="relative">
              <img
                className="w-full h-40 object-contain mb-3"
                src={img1}
                alt=""
              />
            </div>
          </Link>

          <h3 className="text-sm font-semibold text-gray-900">
            Apple MacBook Pro 16″ M1 Pro
          </h3>
          <p className="text-xs text-gray-500 mb-1">Device</p>

          <div className="flex items-center text-yellow-400 text-sm mb-1">
            ☆ ☆ ☆ ☆
          </div>

          <p className="text-green-600 text-sm mb-1">
            <h1> ✔ In stock</h1>
          </p>

          <div className="text-sm text-gray-800 mb-2">
            <span className="text-blue-600 font-bold">
              <p>$200</p>
            </span>
          </div>

          <button className="w-full bg-blue-600 text-white py-1.5 rounded hover:bg-blue-700 text-sm mb-2">
            Add To Cart
          </button>
        </div>
        <div className="bg-white p-4 rounded-lg shadow hover:shadow-lg transition">
          <Link>
            <div className="relative">
              <img
                className="w-full h-40 object-contain mb-3"
                src={img1}
                alt=""
              />
            </div>
          </Link>

          <h3 className="text-sm font-semibold text-gray-900">
            Apple MacBook Pro 16″ M1 Pro
          </h3>
          <p className="text-xs text-gray-500 mb-1">Device</p>

          <div className="flex items-center text-yellow-400 text-sm mb-1">
            ☆ ☆ ☆ ☆
          </div>

          <p className="text-green-600 text-sm mb-1">
            <h1> ✔ In stock</h1>
          </p>

          <div className="text-sm text-gray-800 mb-2">
            <span className="text-blue-600 font-bold">
              <p>$200</p>
            </span>
          </div>

          <button className="w-full bg-blue-600 text-white py-1.5 rounded hover:bg-blue-700 text-sm mb-2">
            Add To Cart
          </button>
        </div>
        <div className="bg-white p-4 rounded-lg shadow hover:shadow-lg transition">
          <Link>
            <div className="relative">
              <img
                className="w-full h-40 object-contain mb-3"
                src={img1}
                alt=""
              />
            </div>
          </Link>

          <h3 className="text-sm font-semibold text-gray-900">
            Apple MacBook Pro 16″ M1 Pro
          </h3>
          <p className="text-xs text-gray-500 mb-1">Device</p>

          <div className="flex items-center text-yellow-400 text-sm mb-1">
            ☆ ☆ ☆ ☆
          </div>

          <p className="text-green-600 text-sm mb-1">
            <h1> ✔ In stock</h1>
          </p>

          <div className="text-sm text-gray-800 mb-2">
            <span className="text-blue-600 font-bold">
              <p>$200</p>
            </span>
          </div>

          <button className="w-full bg-blue-600 text-white py-1.5 rounded hover:bg-blue-700 text-sm mb-2">
            Add To Cart
          </button>
        </div>


      </div>



      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold">Smartphones</h2>

        <Link to="/allcategories">
          <button className="btn btn-ghost rounded-2xl">More Products </button>
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-6">
       
        <div className="bg-white p-4 rounded-lg shadow hover:shadow-lg transition">
          <Link>
            <div className="relative">
              <img
                className="w-full h-40 object-contain mb-3"
                src={img2}
                alt=""
              />
            </div>
          </Link>

          <h3 className="text-sm font-semibold text-gray-900">
            Apple MacBook Pro 16″ M1 Pro
          </h3>
          <p className="text-xs text-gray-500 mb-1">Device</p>

          <div className="flex items-center text-yellow-400 text-sm mb-1">
            ☆ ☆ ☆ ☆
          </div>

          <p className="text-green-600 text-sm mb-1">
            <h1> ✔ In stock</h1>
          </p>

          <div className="text-sm text-gray-800 mb-2">
            <span className="text-blue-600 font-bold">
              <p>$200</p>
            </span>
          </div>

          <button className="w-full bg-blue-600 text-white py-1.5 rounded hover:bg-blue-700 text-sm mb-2">
            Add To Cart
          </button>
        </div>
        <div className="bg-white p-4 rounded-lg shadow hover:shadow-lg transition">
          <Link>
            <div className="relative">
              <img
                className="w-full h-40 object-contain mb-3"
                src={img2}
                alt=""
              />
            </div>
          </Link>

          <h3 className="text-sm font-semibold text-gray-900">
            Apple MacBook Pro 16″ M1 Pro
          </h3>
          <p className="text-xs text-gray-500 mb-1">Device</p>

          <div className="flex items-center text-yellow-400 text-sm mb-1">
            ☆ ☆ ☆ ☆
          </div>

          <p className="text-green-600 text-sm mb-1">
            <h1> ✔ In stock</h1>
          </p>

          <div className="text-sm text-gray-800 mb-2">
            <span className="text-blue-600 font-bold">
              <p>$200</p>
            </span>
          </div>

          <button className="w-full bg-blue-600 text-white py-1.5 rounded hover:bg-blue-700 text-sm mb-2">
            Add To Cart
          </button>
        </div>
        <div className="bg-white p-4 rounded-lg shadow hover:shadow-lg transition">
          <Link>
            <div className="relative">
              <img
                className="w-full h-40 object-contain mb-3"
                src={img2}
                alt=""
              />
            </div>
          </Link>

          <h3 className="text-sm font-semibold text-gray-900">
            Apple MacBook Pro 16″ M1 Pro
          </h3>
          <p className="text-xs text-gray-500 mb-1">Device</p>

          <div className="flex items-center text-yellow-400 text-sm mb-1">
            ☆ ☆ ☆ ☆
          </div>

          <p className="text-green-600 text-sm mb-1">
            <h1> ✔ In stock</h1>
          </p>

          <div className="text-sm text-gray-800 mb-2">
            <span className="text-blue-600 font-bold">
              <p>$200</p>
            </span>
          </div>

          <button className="w-full bg-blue-600 text-white py-1.5 rounded hover:bg-blue-700 text-sm mb-2">
            Add To Cart
          </button>
        </div>
        <div className="bg-white p-4 rounded-lg shadow hover:shadow-lg transition">
          <Link>
            <div className="relative">
              <img
                className="w-full h-40 object-contain mb-3"
                src={img2}
                alt=""
              />
            </div>
          </Link>

          <h3 className="text-sm font-semibold text-gray-900">
            Apple MacBook Pro 16″ M1 Pro
          </h3>
          <p className="text-xs text-gray-500 mb-1">Device</p>

          <div className="flex items-center text-yellow-400 text-sm mb-1">
            ☆ ☆ ☆ ☆
          </div>

          <p className="text-green-600 text-sm mb-1">
            <h1> ✔ In stock</h1>
          </p>

          <div className="text-sm text-gray-800 mb-2">
            <span className="text-blue-600 font-bold">
              <p>$200</p>
            </span>
          </div>

          <button className="w-full bg-blue-600 text-white py-1.5 rounded hover:bg-blue-700 text-sm mb-2">
            Add To Cart
          </button>
        </div>
        <div className="bg-white p-4 rounded-lg shadow hover:shadow-lg transition">
          <Link>
            <div className="relative">
              <img
                className="w-full h-40 object-contain mb-3"
                src={img2}
                alt=""
              />
            </div>
          </Link>

          <h3 className="text-sm font-semibold text-gray-900">
            Apple MacBook Pro 16″ M1 Pro
          </h3>
          <p className="text-xs text-gray-500 mb-1">Device</p>

          <div className="flex items-center text-yellow-400 text-sm mb-1">
            ☆ ☆ ☆ ☆
          </div>

          <p className="text-green-600 text-sm mb-1">
            <h1> ✔ In stock</h1>
          </p>

          <div className="text-sm text-gray-800 mb-2">
            <span className="text-blue-600 font-bold">
              <p>$200</p>
            </span>
          </div>

          <button className="w-full bg-blue-600 text-white py-1.5 rounded hover:bg-blue-700 text-sm mb-2">
            Add To Cart
          </button>
        </div>


      </div>



    </div>
  );
};

export default AllCategories;
