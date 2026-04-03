import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router";
import img2 from "../assets/card-pay.png";
import img3 from "../assets/cod-pay.png";
import CheckoutPageSkeleton from "../components/loader/CheckoutPageSkeleton.jsx";
import { UseFetchAllCart } from "../features/carts/CardQuery.js";
import axiosInstance from "./../api/axiosInstance";
import { getGuestId, clearGuestId } from "../utils/guestSession.js";
import { useCart } from "../contex/CartContext.jsx";
import { UseCurrentUser } from "../features/users/userQueries.js";

const Checkout = () => {
  const { register, handleSubmit, watch, formState: { errors } } = useForm();
  const { data, isLoading } = UseFetchAllCart();
  const { data: user } = UseCurrentUser();
  const { cart: localCart, clearCart } = useCart();
  const navigate = useNavigate();
  const [isPending, setIsPending] = useState(false);

  const selectedPayment = watch("paymentMethod");

  // Cart items — guest or logged in
  const cartItems = user ? (data?.cart?.products || []) : localCart;
  const totalPrice = user
    ? (data?.cart?.totalPrice || 0)
    : localCart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  if (isLoading && user) return <CheckoutPageSkeleton />;

  if (cartItems.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh]">
        <p className="text-xl font-semibold text-gray-500">Your cart is empty.</p>
        <button
          onClick={() => navigate("/")}
          className="mt-4 btn bg-blue-600 text-white"
        >
          Continue Shopping
        </button>
      </div>
    );
  }

  const onSubmit = async (formData) => {
    if (formData.paymentMethod !== "COD") {
      toast.error("Only Cash on Delivery is available.");
      return;
    }

    setIsPending(true);

    const payload = {
      shippingAddress: {
        name: formData.fullName,
        email: formData.email || "",
        phone: formData.phone,
        address: formData.address,
        city: formData.city,
        postalCode: formData.postalCode || "",
        country: formData.country || "Bangladesh",
        note: formData.note || "",
      },
      paymentMethod: "COD",
    };

    // Add guestId if not logged in
    if (!user) {
      payload.guestId = getGuestId();
    }

    try {
      await axiosInstance.post("/order/create", payload);
      toast.success("✅ Order Placed Successfully!");

      // Clear cart
      if (!user) {
        clearCart();
        clearGuestId();
      }

      navigate("/");
    } catch (err) {
      toast.error(err?.response?.data?.message || "Order failed. Try again.");
    } finally {
      setIsPending(false);
    }
  };

  return (
    <div className="max-w-screen-xl mx-auto">
      <div className="grid md:grid-cols-2 gap-8 p-6">

        {/* Left — Form */}
        <div>
          <h2 className="text-2xl font-semibold mb-6">Checkout Info</h2>

          <form onSubmit={handleSubmit(onSubmit)}>
            {/* Contact Info */}
            <div className="space-y-4">
              <h3 className="font-semibold">Contact Info</h3>
              <input
                {...register("fullName", { required: "Name is required" })}
                type="text"
                placeholder="Full Name *"
                className="input input-bordered w-full"
              />
              {errors.fullName && (
                <p className="text-red-500 text-sm">{errors.fullName.message}</p>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  {...register("email")}
                  type="email"
                  placeholder="Email (optional)"
                  className="input input-bordered w-full"
                />
                <input
                  {...register("phone", { required: "Phone is required" })}
                  type="tel"
                  placeholder="Phone Number *"
                  className="input input-bordered w-full"
                />
              </div>
              {errors.phone && (
                <p className="text-red-500 text-sm">{errors.phone.message}</p>
              )}
            </div>

            {/* Shipping Info */}
            <div className="space-y-4 mt-6">
              <h3 className="font-semibold">Shipping Info</h3>
              <input
                {...register("address", { required: "Address is required" })}
                type="text"
                placeholder="Detailed Address *"
                className="input input-bordered w-full"
              />
              {errors.address && (
                <p className="text-red-500 text-sm">{errors.address.message}</p>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  {...register("city", { required: "City is required" })}
                  type="text"
                  placeholder="City *"
                  className="input input-bordered w-full"
                />
                <input
                  {...register("postalCode")}
                  type="text"
                  placeholder="Postal Code (optional)"
                  className="input input-bordered w-full"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  {...register("country")}
                  type="text"
                  placeholder="Country (default: Bangladesh)"
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
              <p className="text-sm text-gray-500 mt-2">
                ✅ Cash on Delivery — pay when you receive.
              </p>
            </div>

            <button
              type="submit"
              disabled={isPending}
              className="btn bg-green-600 text-white w-full my-4"
            >
              {isPending ? "Processing..." : "Place Order (COD)"}
            </button>
          </form>
        </div>

        {/* Right — Order Summary */}
        <div className="bg-gray-100 p-6 rounded-md shadow-sm">
          <h3 className="text-xl font-semibold mb-4">Order Summary</h3>
          <hr className="border-t-2 border-gray-300 my-2" />

          {cartItems.map((item) => {
            const name = user ? item.product?.name : item.name;
            const image = user ? item.product?.images?.[0] : item.images?.[0];
            const price = user ? item.product?.price : item.price;

            return (
              <div key={item._id} className="flex items-center gap-4 my-4">
                <img
                  src={image}
                  alt={name}
                  className="w-20 h-20 rounded-lg object-cover"
                />
                <div className="flex-1">
                  <p className="font-medium text-sm">{name}</p>
                  <div className="flex items-center gap-2 mt-1">
                    {/* Quantity counter */}
                    <span className="bg-blue-100 text-blue-700 font-bold px-2 py-0.5 rounded text-sm">
                      x{item.quantity}
                    </span>
                    <span className="text-gray-500 text-sm">
                      ৳{price} each
                    </span>
                  </div>
                  <p className="text-green-600 font-semibold mt-1">
                    ৳{price * item.quantity}
                  </p>
                </div>
              </div>
            );
          })}

          <hr className="border-t-2 border-gray-300 my-4" />

          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="font-semibold">
                Total Items:
              </span>
              <span className="font-bold">
                {cartItems.reduce((sum, item) => sum + item.quantity, 0)} pcs
              </span>
            </div>
            <div className="flex justify-between">
              <span className="font-semibold">Subtotal:</span>
              <span className="text-green-600 font-semibold">৳{totalPrice}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-semibold">Shipping:</span>
              <span className="text-green-600 font-semibold">FREE</span>
            </div>
            <hr className="border-t-2 py-2 border-gray-300" />
            <div className="flex justify-between text-xl font-bold">
              <span>Total Payable:</span>
              <span className="text-green-600">৳{totalPrice}</span>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Checkout;