// Checkout.jsx
import React, { useEffect, useState } from "react";
import img2 from "../assets/card-pay.png";
import img3 from "../assets/cod-pay.png";
import { UseMyOrderCreate } from "../features/order/OrderQuery.js";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { UseFetchAllCart } from "../features/carts/CardQuery.js";
import { useNavigate } from "react-router";
import CheckoutPageSkeleton from "../components/loader/CheckoutPageSkeleton.jsx";

import StripeProvider from "../components/payment/StripeProvider.jsx";
import StripeForm from "../components/payment/PaymentElement.jsx";
import axiosInstance from "./../api/axiosInstance";

const Checkout = () => {
  const { register, handleSubmit, watch, getValues } = useForm();
  const { mutate, isPending } = UseMyOrderCreate();
  const { data, isLoading } = UseFetchAllCart();
  const navigate = useNavigate();

  const selectedPayment = watch("paymentMethod");
  const [clientSecret, setClientSecret] = useState("");

  useEffect(() => {
    if (selectedPayment === "online" && data?.cart?.totalPrice) {
      axiosInstance
        .post("/order/create-payment-intent", {
          amount: data.cart.totalPrice * 100,
        })
        .then((res) => setClientSecret(res.data.clientSecret))
        .catch(() => toast.error("Stripe init failed"));
    } else {
      setClientSecret("");
    }
  }, [selectedPayment, data]);

  if (isLoading) return <CheckoutPageSkeleton />;

  const onSubmit = (formData) => {
    if (formData.paymentMethod === "COD") {
      const payload = {
        shippingAddress: {
          name: formData.fullName,
          email: formData.email,
          phone: formData.phone,
          address: formData.address,
          city: formData.city,
          postalCode: formData.postalCode,
          country: formData.country,
          note: formData.note || "",
        },
        paymentMethod: "COD",
      };
      mutate(payload, {
        onSuccess: () => {
          toast.success("Order Placed");
          navigate("/myorder");
        },
      });
    }
  };

  return (

    <div className="max-w-screen-xl  mx-auto">
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
                placeholder="Note (optional)"
                className="input input-bordered w-full"
              />
            </div>
          </div>

          {/* Payment Method */}
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
          </div>

          {selectedPayment === "COD" && (
            <button
              type="submit"
              disabled={isPending}
              className="btn bg-green-600 text-white w-full my-4"
            >
              {isPending ? "Processing..." : "Place Order"}
            </button>
          )}
        </form>

        {/* Stripe Form */}
        {selectedPayment === "online" && clientSecret && (
          <StripeProvider clientSecret={clientSecret}>
            <StripeForm shippingData={getValues()} mutate={mutate} />
          </StripeProvider>
        )}
      </div>

      {/* Right Side */}
      <div className="bg-gray-200 p-6 rounded-md shadow-sm">
        <div className="mb-4">
          <h3 className="text-xl font-semibold">Cart Overview</h3>
        </div>
        <hr className="border-t-2 border-gray-300 my-2" />
        {data?.cart?.products?.map((item) => (
          <div key={item._id} className="space-y-4">
            <p className="my-4">{item.product.name}</p>
            <div className="flex items-center justify-between gap-2 ">
              <img
                src={item.product.images[0]}
                alt={item.product.name}
                className="lg:w-24 w-24 rounded-2xl object-cover"
              />
              <div className="flex gap-2">
                <p>{item.quantity}</p>X <span>{item.product.price}</span>
              </div>
            </div>
          </div>
        ))}
        <div className="space-y-2 mt-4">
          <div className="flex justify-between">
            <span className="font-semibold">Total:</span>
            <span className="text-green-600 font-semibold">
              ৳{data?.cart?.totalPrice}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="font-semibold">Shipping:</span>
            <span className="text-green-600 font-semibold">৳0</span>
          </div>
          <hr className="border-t-2 py-2 border-gray-300" />
          <div className="flex justify-between text-xl font-bold">
            <span>Payable:</span>
            <span className="text-green-600">৳{data?.cart?.totalPrice}</span>
          </div>
        </div>
      </div>
    </div>
    </div>
  
  );
};

export default Checkout;
