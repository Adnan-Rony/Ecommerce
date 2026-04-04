import { Link } from "react-router";
import { UseFetchProducts } from "../../features/products/ProductsQuery.js";
import ProductCard from "../ProductCard.jsx";
import ProductsCardLoading from "../loader/ProductsCardLoading.jsx";

const Card = () => {
  const { data: products, isLoading, isError } = UseFetchProducts();

  if (isError) return <p className="text-center text-red-500">Error fetching products</p>;

  return (
    <div className="my-6 sm:my-10 bg-gray-50 px-3 sm:px-6 py-4 sm:py-6 rounded-xl">
      
      {/* Header */}
      <div className="mb-6 sm:mb-8 text-center">
        <h2 className="text-xl sm:text-2xl font-semibold text-gray-800">
          New Arrivals
        </h2>
        <p className="text-sm sm:text-base text-gray-500">
          Explore New Arrivals products
        </p>
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-6">
        {isLoading
          ? Array.from({ length: 4 }).map((_, index) => (
              <ProductsCardLoading key={index} />
            ))
          : products
              ?.slice(0, 4)
              .map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
      </div>

      {/* Button */}
      <div className="text-center mt-6 sm:mt-10">
        <Link to="/allcategories">
          <button className="px-5 sm:px-6 py-2 text-sm sm:text-base border border-blue-600 text-blue-600 rounded-full hover:bg-[#1d4c9e] hover:text-white transition">
            More Products
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Card;