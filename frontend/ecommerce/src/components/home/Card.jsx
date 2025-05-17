import React from "react";
import img1 from "../../assets/apple-macbook-air-13-space-gray-1-2-80x80.jpg";
import { Link } from "react-router";
import { UseFetchProducts } from "../../features/products/ProductsQuery.js";
import LoadingSpinner from "../LoadingSpinner.jsx";
import ProductCard from "../ProductCard.jsx";

const Card = ({ product }) => {
  const { data: products, isLoading, isError } = UseFetchProducts();

  if (isLoading) return <LoadingSpinner></LoadingSpinner>;
  if (isError) return <p>Error fetching products</p>;

  return (
    <div>
      {/* <div className="text-center ">
        <small className="text-blue-500">Hurry up to buy</small>
        <p className="text-4xl ">New Arrivals</p>
      </div> */}

      <div className="px-4 py-10 bg-gray-50">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold">New Arrivals</h2>

          <Link to="/allcategories">
            <button className="btn btn-ghost rounded-2xl">
              More Products{" "}
            </button>
          </Link>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-6">
          {products.slice(0, 5).map((product) => (
            <ProductCard key={product._id} product={product}></ProductCard>
          ))}
        </div>
      </div>

      
    </div>
  );
};

export default Card;
