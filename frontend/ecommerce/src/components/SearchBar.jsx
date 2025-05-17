import  {  useState } from "react";
import { useSearchProducts } from "../features/products/ProductsQuery.js";
import { Link, useNavigate } from "react-router";

const SearchBar = () => {
  const [input, setInput] = useState("");
  const { data, isLoading } = useSearchProducts(input);
  const navigate = useNavigate();
    const handleSelect = (productId) => {
    setInput(""); // Clear input
    navigate(`/product/${productId}`); // Navigate to product
  };
    
  return (
   <div className="relative w-full max-w-md mx-auto">
      <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Search  products by Titles..."
        className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-gray-200"
      />

      {/* Dropdown */}
      {input.trim() && (
        <div className="absolute top-full left-0 right-0 mt-1 bg-white shadow-lg border border-gray-200 rounded z-50 max-h-60 overflow-y-auto">
          {isLoading ? (
            <p className="p-3 text-gray-500">Loading...</p>
          ) : data?.products?.length > 0 ? (
            data.products.map((product) => (
                <button
                key={product._id}
                onClick={() => handleSelect(product._id)}
                className="w-full text-left px-4 py-2 hover:bg-gray-100 text-sm text-gray-700"
              >
                {product.name}
              </button>
            ))
          ) : (
            <p className="p-3 text-gray-500 text-sm">No products found.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchBar;
