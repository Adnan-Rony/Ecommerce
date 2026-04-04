import { Link } from "react-router";
import { UseFetchProducts } from "../../features/products/ProductsQuery.js";
import ProductCard from "../ProductCard.jsx";
import ProductsCardLoading from "../loader/ProductsCardLoading.jsx";

const AllCards = () => {
  const { data: products = [], isLoading, isError } = UseFetchProducts();
 
  if (isError) return null;
 
  // Skip the 4 newest (shown in NewArrivals), show next 8
  const featured = [...products].reverse().slice(4, 12);
 
  return (
    <div>
      {/* Section Header */}
      <div className="flex items-center justify-between mb-5 my-10">
        <div>
          <h2 className="text-lg font-semibold text-gray-900">Featured Products</h2>
          <p className="text-xs text-gray-400 mt-0.5">Handpicked for you</p>
        </div>
        <Link
          to="/allcategories"
          className="text-xs font-medium text-[#1d4c9e] hover:underline"
        >
          See all products →
        </Link>
      </div>
 
      {/* Responsive grid — 2 cols mobile, 4 desktop */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
        {isLoading
          ? Array.from({ length: 8 }).map((_, i) => <ProductsCardLoading key={i} />)
          : featured.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
      </div>
 
      {/* Bottom CTA */}
      <div className="text-center mt-8">
        <Link
          to="/allcategories"
          className="inline-block px-6 py-2.5 text-sm font-medium border border-[#1d4c9e] text-[#1d4c9e] rounded-full hover:bg-[#1d4c9e] hover:text-white transition-colors"
        >
          Browse all products
        </Link>
      </div>
    </div>
  );
};
 
export default AllCards;