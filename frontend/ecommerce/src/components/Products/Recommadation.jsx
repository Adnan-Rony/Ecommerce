// src/components/RecommendedProducts.js
import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useRecommendedProducts } from "../../features/products/ProductsQuery.js";
import ProductCard from "../ProductCard.jsx";
import ProductsCardLoading from "../loader/ProductsCardLoading.jsx";

const RecommendedProducts = () => {
  const { id: productId } = useParams();
  const {
    data: recommendedProducts,
    isLoading,
    error,
  } = useRecommendedProducts(productId);

  useEffect(() => {
    console.log("Product ID:", productId);
    console.log("Recommended Products:", recommendedProducts);
  }, [productId, recommendedProducts]);

  if (isLoading)
    return (
      <ProductsCardLoading/>
    );
  if (error)
    return (
      <p className="text-center text-red-500">
        Failed to load recommendations.
      </p>
    );

  return (
    <div className="mt-10">
      <h2 className="text-2xl font-bold mb-4">You May Also Like</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {recommendedProducts?.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default RecommendedProducts;
