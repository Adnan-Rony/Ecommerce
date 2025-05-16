// src/components/RecommendedProducts.js
import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useRecommendedProducts } from "../../features/products/ProductsQuery.js";

const RecommendedProducts = () => {
  const { id: productId } = useParams();
  const { data: recommendedProducts, isLoading, error } = useRecommendedProducts(productId);

  useEffect(() => {
    console.log("Product ID:", productId);
    console.log("Recommended Products:", recommendedProducts);
  }, [productId, recommendedProducts]);

  if (isLoading) return <p className="text-center text-gray-600">Loading recommendations...</p>;
  if (error) return <p className="text-center text-red-500">Failed to load recommendations.</p>;

  return (
    <div className="mt-10">
      <h2 className="text-2xl font-bold mb-4">You May Also Like</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {recommendedProducts?.map((product) => (
          <div key={product._id} className="border rounded-lg p-4 shadow hover:shadow-lg transition">
            <img
              src={product.images[0]}
              alt={product.name}
              className="w-full h-48 object-cover rounded-md mb-2"
            />
            <h3 className="text-lg font-semibold">{product.name}</h3>
            <p className="text-gray-700">৳ {product.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecommendedProducts;
