import { Link } from "react-router-dom";
import img from "../assets/apple-macbook-air-13-space-gray-1-2-80x80.jpg";
import img3 from "../assets/outlet-580x326.png";
import { UseFetchProducts } from "../features/products/ProductsQuery.js";
import LoadingSpinner from "../components/LoadingSpinner.jsx";

const AllCategories = () => {
  const { data: products, isLoading, isError } = UseFetchProducts();

  if (isLoading) return <LoadingSpinner></LoadingSpinner>;
  if (isError) return <p>Error fetching products</p>;

  // Group products by category
  const groupedProducts = products.reduce((acc, product) => {
    const category = (product.category || "Others").toLowerCase();
    if (!acc[category]) acc[category] = [];
    acc[category].push(product);
    return acc;
  }, {});

  return (
    <div className="bg-gray-50">
      <div className="grid grid-cols-2 justify-between items-center mb-6 border p-4 bg-blue-400 rounded-2xl text-white">
        <div>
          <p className="text-3xl font-semibold">Outlet Store</p>
          <p>
            Here you will find discounted products that have been found to have
            minor damage that does not affect performance.
          </p>
        </div>
        <div>
          <img src={img3} alt="Outlet Banner" />
        </div>
      </div>

      {Object.entries(groupedProducts).map(([category, items]) => (
        <div key={category} className="mb-10">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-semibold">{category}</h2>
            <Link to={`/categories/${category.toLowerCase()}`}>
              <button className="btn btn-ghost rounded-2xl">
                More Products
              </button>
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-6">
            {items.map((product) => (
              <div
                key={product._id}
                className="bg-white p-4 rounded-lg shadow hover:shadow-lg transition flex flex-col justify-between min-h-[380px]"
              >
                <Link to={`/product/${product._id}`}>
                  <div className="relative">
                    <img
                      className="w-full h-40 object-contain mb-3"
                      src={product.images}
                      alt={product.name}
                    />
                  </div>
                </Link>

                <h3 className="text-sm font-semibold text-gray-900">
                  {product.name}
                </h3>
                <p className="text-xs text-gray-500 mb-1">{product.brand}</p>
                <div className="flex items-center text-yellow-400 text-sm mb-1">
                  ☆ ☆ ☆ ☆
                </div>
                <p className="text-green-600 text-sm mb-1">
                  ✔ In stock ({product.stock})
                </p>
                <div className="text-sm text-gray-800 mb-2">
                  <span className="text-blue-600 font-bold">
                    ${product.price}
                  </span>
                </div>

                <div className="mt-auto">
                  <button className="w-full bg-blue-600 text-white py-1.5 rounded hover:bg-blue-700 text-sm">
                    Add To Cart
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default AllCategories;
