import React from "react";

import img2 from "../assets/card-pay.png";
import img3 from "../assets/cod-pay.png";
import { UseMyOrderCreate, UseMyOrders } from "../features/order/OrderQuery.js";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { UseFetchAllCart } from "../features/carts/CardQuery.js";

const Checkout = () => {
  const { register, handleSubmit, watch } = useForm();
  const { mutate, isPending, isSuccess } = UseMyOrderCreate();
  const { data, isLoading, isError, refetch } = UseFetchAllCart();

  console.log(data);

  const selectedPayment = watch("paymentMethod");

  const onSubmit = (data) => {
    const payload = {
      shippingAddress: {
        name: data.fullName,
        email: data.email,
        phone: data.phone,
        address: data.address,
        city: data.city,
        postalCode: data.postalCode,
        country: data.country,
        note: data.note || "",
      },
      paymentMethod: data.paymentMethod,
      // Add below if your backend requires them
      // cartItems: [...],
      // totalPrice: 1200
    };
    toast.success("Order Confirm");
    console.log("Payload being sent:", payload);
    mutate(payload);
  };

  return (
    <div>
      <div className="grid md:grid-cols-2 gap-8 p-6">
        {/* Left Side */}
        <div>
          <h2 className="text-2xl font-semibold mb-6">Checkout Info</h2>

          <form onSubmit={handleSubmit(onSubmit)}>
            {/* Contact Info */}
            <div className="space-y-4">
              <h3 className="font-semibold">Contact Info</h3>
              <input
                {...register("fullName", { required: true })}
                type="text"
                placeholder="Full Name"
                className="input input-bordered w-full"
              />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  {...register("email", { required: true })}
                  type="email"
                  placeholder="Email"
                  className="input input-bordered w-full"
                />
                <input
                  {...register("phone", { required: true })}
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
                {...register("address", { required: true })}
                type="text"
                placeholder="Detailed Address"
                className="input input-bordered w-full"
              />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  {...register("city", { required: true })}
                  type="text"
                  placeholder="City"
                  className="input input-bordered w-full"
                />
                <input
                  {...register("postalCode", { required: true })}
                  type="text"
                  placeholder="Postal Code"
                  className="input input-bordered w-full"
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  {...register("country", { required: true })}
                  type="text"
                  placeholder="Country"
                  className="input input-bordered w-full"
                />
                <input
                  {...register("note")}
                  type="text"
                  placeholder="Note for TechLio (optional)"
                  className="input input-bordered w-full"
                />
              </div>
            </div>

            {/* Price Breakdown */}
            <div className="bg-gray-200 mt-8 p-4 rounded-md shadow-sm">
              <p className="text-gray-800 text-center">
                Your total payable amount is
                <p className="text-green-600 font-bold lg:text-3xl text-xl">
                  ৳1200
                </p>
              </p>
              <p className="mt-2 font-semibold text-center text-2xl">
                Breakdown
              </p>
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
                <label
                  className={`flex items-center justify-center border rounded p-4 cursor-pointer hover:shadow ${
                    selectedPayment === "online" ? "border-blue-500 shadow" : ""
                  }`}
                >
                  <input
                    type="radio"
                    value="online"
                    {...register("paymentMethod", { required: true })}
                    className="hidden"
                  />
                  <img src={img2} alt="Card Payment" className="h-8" />
                </label>

                <label
                  className={`flex items-center justify-center border rounded p-4 cursor-pointer hover:shadow ${
                    selectedPayment === "COD" ? "border-blue-500 shadow" : ""
                  }`}
                >
                  <input
                    type="radio"
                    value="COD"
                    {...register("paymentMethod", { required: true })}
                    className="hidden"
                  />
                  <img src={img3} alt="Cash on Delivery" className="h-8" />
                </label>
              </div>

              <button
                type="submit"
                disabled={isPending}
                className="btn bg-green-600 text-white w-full my-4"
              >
                {isPending ? "Processing..." : "Place Order"}
              </button>
            </div>
          </form>
        </div>

        {/* Right Side */}
        <div className="bg-gray-200 p-6 rounded-md shadow-sm">
          <div className="mb-4">
            <h3 className="text-xl font-semibold">Cart Overview</h3>
          </div>
          <hr className="border-t-2 border-gray-300 my-2" />

          {/* Check if cart and products exist */}
          {data?.cart?.products && data.cart.products.length > 0 ? (
            data.cart.products.map((item) => (
              <div key={item._id} className="space-y-4">
                <p className="my-4">{item.product.name}</p>
               <div className="flex items-center justify-between gap-2 ">
                 <img
                  src={item.product.images[0]} // Taking the first image
                  alt={item.product.name}
                  className="lg:w-24 w-24 rounded-2xl object-cover"
                />
                <div className="flex gap-2">
                  <p>{item.quantity}</p>X <span>{item.product.price}</span>
                  </div> 
               </div>
                
                
               
              </div>
            ))
          ) : (
            <p>No products in the cart</p>
          )}

          {/* Total Price and Shipping details */}
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="font-semibold">Total:</span>
              <span className="text-green-600 font-semibold">
                ৳{data?.cart?.totalPrice}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="font-semibold">Shipping (+):</span>
              <span className="text-green-600 font-semibold">00</span>
            </div>
            <hr className="border-t-2 py-2 border-gray-300" />
            <div className="flex justify-between text-xl font-bold">
              <span>Payable:</span>
              <span className="text-green-600">
                ৳{data?.cart?.totalPrice }
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
