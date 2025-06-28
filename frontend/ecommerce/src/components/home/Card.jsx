import { Link } from "react-router";
import { UseFetchProducts } from "../../features/products/ProductsQuery.js";
import ProductCard from "../ProductCard.jsx";
import ProductsCardLoading from "../loader/ProductsCardLoading.jsx";

const Card = ({ product }) => {
  const { data: products, isLoading, isError } = UseFetchProducts();

  // if (isLoading) return <LoadingSpinner></LoadingSpinner>;
  if (isError) return <p>Error fetching products</p>;

  return (
    <div>
      <div className=" my-10 bg-gray-50">
        <div className="">
          {/* <h2 className="text-2xl font-semibold">New Arrivals</h2> */}
          <div className=" mb-8 text-center">
            <h2 className="text-2xl font-semibold text-gray-800">
              New Arrivals
            </h2>
            <p className="text-gray-500">Explore New Arrivals products</p>
          </div>

          {/* <Link to="/allcategories">
            <button className="btn btn-ghost rounded-2xl">
              More Products{" "}
            </button>
          </Link> */}
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
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

        <div className="text-center mt-10">
          <Link to="/allcategories">
            <button className="px-6 py-2 border border-blue-600 text-blue-600 rounded-full hover:bg-[#1d4c9e] hover:text-white transition">
              More Products
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Card;
