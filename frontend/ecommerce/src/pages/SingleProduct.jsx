import React, { Component } from "react";
import ReactDOM from "react-dom";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import image1 from "../assets/apple-iphone-13-midnight-5.jpg";
import image2 from "../assets/apple-iphone-13-pink-2.jpg";
import image3 from "../assets/apple-iphone-13-pink-3.jpg";
import ReviewSection from "../components/Products/ReviewSection.jsx";
import Recommadation from "../components/Products/Recommadation.jsx";
const SingleProduct = () => {
  return (
    <div>
      <div className="grid lg:grid-cols-2 justify-center grid-cols-1 gap- p-4">
        <div className="p-4 flex justify-center">
    <Carousel className="w-full max-w-md">
      <div>
        <img src={image1} alt="Image 1" className="w-full object-cover" />
      </div>
      <div>
        <img src={image2} alt="Image 2" className="w-full object-cover" />
      </div>
      <div>
        <img src={image3} alt="Image 3" className="w-full object-cover" />
      </div>
    </Carousel>
  </div>

        <div className="space-y-4 my-10 ">
          <div>
            <p className="text-xl">Lenovo Yoga Slim 7</p>
            <p className="font-bold text-2xl">$ 200</p>
          </div>
          <div className="flex justify-content item-center">
            {/* <button className='btn '>1</button> */}
            <button className="btn bg-black text-white">Add To Cart</button>
          </div>
          <hr className="" />
          <div className="mt-2">
            <p>
              Fabrilife Men's Premium Quality Sports t-shirts are smooth and
              comfortable. The t-shirts are made with the finest quality
              polyester fabric, perfect for casual or sports wear.
            </p>

            <div className="my-2">
              <p className="text-xl font-semibold">Detailed Specification:</p>
              <ul className="list-disc list-inside text-gray-700 text-sm space-y-1">
                <li>Finest quality Polyester</li>
                <li>Regular fit, Crew Neck Mid-weight, 145gsm.</li>
                <li>Regular fit, Crew Neck Mid-weight, 145gsm.</li>
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
