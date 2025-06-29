import React, { Component } from "react";
import ReactDOM from "react-dom";
import "react-responsive-carousel/lib/styles/carousel.min.css"; //
import { Carousel } from "react-responsive-carousel";

import ReviewSection from "../components/Products/ReviewSection.jsx";

import { UseFetchProductsById } from "../features/products/ProductsQuery.js";
import { useParams } from "react-router";
import LoadingSpinner from "../components/LoadingSpinner.jsx";
import AddToCart from "../components/AddToCart.jsx";
import RecommendedProducts from "../components/Products/Recommadation.jsx";
import DetailsPageLoading from "../components/loader/DetailsPageLoading.jsx";

const SingleProduct = () => {
  const { id } = useParams();

  const { data: products, isLoading, isError } = UseFetchProductsById(id);

  if (isLoading) return <DetailsPageLoading/>
  if (isError) return <p>Error loading product</p>;

  return (
    <div className="max-w-screen-xl  mx-auto">
      <div className="grid lg:grid-cols-2 justify-center grid-cols-1 gap- p-4">
        <div className="p-4 flex justify-center">
          {products.images &&
          Array.isArray(products.images) &&
          products.images.length > 0 ? (
            <Carousel className="w-full max-w-md">
              {products.images.map((url, index) => (
                <div key={index}>
                  <img
                    src={url}
                    alt={`Product image ${index + 1}`}
                    className="w-full object-cover"
                  />
                </div>
              ))}
            </Carousel>
          ) : (
            <p>No images available</p>
          )}
        </div>

        <div className="space-y-4 my-10 ">
          <div className="space-y-2">
            <p className="text-xl">{products.name}</p>
            <p className="font-bold text-2xl">$ {products.price}</p>
          </div>

          <div className="flex justify-content item-center w-32">
            {/* import add to cart */}
            <AddToCart product={products}></AddToCart>
          </div>

          <hr className="" />
          <div className="mt-2">
            <p>{products.description}</p>

            <div className="my-2">
              <p className="text-xl font-semibold">Detailed Specification:</p>
              <ul className="list-disc list-inside text-gray-700 text-sm space-y-1">
                <li>Brand: {products.brand}</li>
                <li>Category: {products.category}</li>
                <li>Stock: {products.stock}</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <hr className="my-4" />
      {/* <div>
        <ReviewSection
          reviews={products.reviews}
         
        ></ReviewSection>
      </div> */}
      <hr className="my-2" />
      <div className="my-4"><RecommendedProducts></RecommendedProducts></div>
    </div>
  );
};

export default SingleProduct;
