import React, { Component } from "react";
import ReactDOM from "react-dom";
import "react-responsive-carousel/lib/styles/carousel.min.css"; //
import { Carousel } from "react-responsive-carousel";

import ReviewSection from "../components/Products/ReviewSection.jsx";
import Recommadation from "../components/Products/Recommadation.jsx";
import { UseFetchProductsById } from "../features/products/ProductsQuery.js";
import { useParams } from "react-router";
import LoadingSpinner from "../components/LoadingSpinner.jsx";

const SingleProduct = () => {
  const { id } = useParams();




  const { data: product, isLoading, isError } = UseFetchProductsById(id);




  if (isLoading) return <LoadingSpinner></LoadingSpinner>;
  if (isError) return <p>Error loading product</p>;

  return (
    <div>
           
      <div className="grid lg:grid-cols-2 justify-center grid-cols-1 gap- p-4">
        <div className="p-4 flex justify-center">
          {product.images &&
          Array.isArray(product.images) &&
          product.images.length > 0 ? (
            <Carousel className="w-full max-w-md">
              {product.images.map((url, index) => (
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
          <div>
            <p className="text-xl">{product.name}</p>
            <p className="font-bold text-2xl">$ {product.price}</p>
          </div>
          <div className="flex justify-content item-center">
            {/* <button className='btn '>1</button> */}
            <button className="btn bg-black text-white">Add To Cart</button>
          </div>
          <hr className="" />
          <div className="mt-2">
            <p>{product.description}</p>

            <div className="my-2">
              <p className="text-xl font-semibold">Detailed Specification:</p>
              <ul className="list-disc list-inside text-gray-700 text-sm space-y-1">
                <li>Brand: {product.brand}</li>
                <li>Category: {product.category}</li>
                <li>Stock: {product.stock}</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <hr className="my-4" />
      <div>
        <ReviewSection></ReviewSection>
      </div>
      <hr className="my-2" />
      <div className="my-4">
        <Recommadation></Recommadation>
      </div>
    </div>
  );
};

export default SingleProduct;
