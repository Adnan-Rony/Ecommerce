import React from "react";
import img from "../assets/apple-iphone-13-midnight-5.jpg";
import img2 from "../assets/card-pay.png";
import img3 from "../assets/cod-pay.png";

const Checkout = () => {
  return (
    <div>
      <div className="grid md:grid-cols-2 gap-8 p-6 ">
        {/* Left Side: Checkout Info */}
        <div>
          <h2 className="text-2xl font-semibold mb-6">Checkout Info</h2>

          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="font-semibold">Contact Info</h3>
            <input
              type="text"
              placeholder="Full Name"
              className="input input-bordered w-full"
            />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="email"
                placeholder="Email"
                className="input input-bordered w-full"
              />
              <input
                type="tel"
                placeholder="Phone Number"
                className="input input-bordered w-full"
              />
            </div>
          </div>

          {/* Shipping Info */}
          <div className="space-y-4 mt-6">
            <h3 className="font-semibold">Shipping Info</h3>
            <input
              type="text"
              placeholder="Detailed Address"
              className="input input-bordered w-full"
            />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="Select City"
                className="input input-bordered w-full"
              />
              <input
                type="tel"
                placeholder="Alt. Phone (01XXXXXXXXX)"
                className="input input-bordered w-full"
              />
            </div>
            <input
              type="text"
              placeholder="Note for Fabrilife (optional)"
              className="input input-bordered w-full"
            />
          </div>

          {/* Price Breakdown */}
          <div className="bg-gray-200 mt-8 p-4 rounded-md shadow-sm">
            <p className="text-gray-800 text-center">
              Your total payable amount is
              <p className="text-green-600 font-bold lg:text-3xl text-xl">
                ৳1200
              </p>
            </p>
            <p className="mt-2 font-semibold text-center text-2xl">Breakdown</p>
            <table className="table w-full mt-2 text-sm">
              <thead>
                <tr>
                  <th>Purpose</th>
                  <th>Amount</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Total</td>
                  <td>৳1140</td>
                </tr>
                <tr>
                  <td>Shipping</td>
                  <td>৳60</td>
                </tr>
              </tbody>
            </table>
            <p className="mt-2 text-green-600 font-medium">
              You will get the delivery{" "}
              <span className="font-bold">within 2-3 Days</span> after
              confirmation.
            </p>
          </div>
          {/* Payment Options */}
          <div className="my-4">
            <p className="font-semibold mb-2">Payment Options</p>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center justify-center border rounded p-4 cursor-pointer hover:shadow">
                <img src={img2} alt="Cash on Delivery" className="h-8" />
              </div>
              <div className="flex items-center justify-center border rounded p-4 cursor-pointer hover:shadow">
                <img src={img3} alt="Card Payment" className="h-8" />
              </div>
            </div>
            <button className="btn bg-green-600 text-white w-full my-4 ">
              Confirm Order
            </button>
          </div>
        </div>

        {/* Right Side: Cart Overview */}
        <div className="bg-gray-200 p-6 rounded-md shadow-sm">
          <div className=" mb-4">
            <h3 className="text-xl font-semibold">Cart Overview</h3>
          </div>{" "}
          <hr className="border-t-2 border-gray-300 my-2" />
          <div className=" space-y-4 ">
            <p className="text-xl">
              Mens Premium Sports Active Wear T-shirt - Vigilant (L)
            </p>
            <img
              src={img}
              alt="Product"
              className="lg:w-96 w-46 rounded-2xl object-cover"
            />{" "}
            <hr className="border-t-2 py-2 border-gray-300" />
          </div>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="font-semibold">Total:</span>
              <span className="text-green-600 font-semibold">৳1140</span>
            </div>
            <div className="flex justify-between">
              <span className="font-semibold">Shipping (+):</span>
              <span className="text-green-600 font-semibold">৳60</span>
            </div>
            <hr className="border-t-2 py-2 border-gray-300" />
            <div className="flex justify-between text-xl font-bold">
              <span>Payable:</span>
              <span className="text-green-600">৳1200</span>
            </div>
          </div>
        </div>
      </div>

        {/* cart*/}
      <div>


 



      </div>
    </div>
  );
};

export default Checkout;
