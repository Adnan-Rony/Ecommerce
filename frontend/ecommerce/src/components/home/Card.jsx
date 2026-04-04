import { Link } from "react-router";
import { UseFetchProducts } from "../../features/products/ProductsQuery.js";
import ProductCard from "../ProductCard.jsx";
import ProductsCardLoading from "../loader/ProductsCardLoading.jsx";

const Card = () => {
  const { data: products = [], isLoading, isError } = UseFetchProducts();
 
  if (isError) return null;
 
  // Take last 4 (newest) — reverse so newest is first
  const newArrivals = [...products].reverse().slice(0, 4);
 
  return (
    <div>
      {/* Section Header */}
      <div className="flex items-center justify-between mb-5 py-4">
        <div>
          <h2 className="text-lg font-semibold text-gray-900">New Arrivals</h2>
          <p className="text-xs text-gray-400 mt-0.5">Just landed — fresh stock</p>
        </div>
        <Link
          to="/allcategories"
          className="text-xs font-medium text-[#1d4c9e] hover:underline"
        >
          View all →
        </Link>
      </div>
 
      {/* 4-column grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {isLoading
          ? Array.from({ length: 4 }).map((_, i) => <ProductsCardLoading key={i} />)
          : newArrivals.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
      </div>
    </div>
  );
};
 
export default Card;