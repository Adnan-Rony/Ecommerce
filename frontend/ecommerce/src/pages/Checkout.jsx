import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router";
import img3 from "../assets/cod-pay.png";
import CheckoutPageSkeleton from "../components/loader/CheckoutPageSkeleton.jsx";
import { UseFetchAllCart } from "../features/carts/CardQuery.js";
import { applyCoupon } from "../features/carts/CartsApi.js";
import axiosInstance from "./../api/axiosInstance";
import { getGuestId, clearGuestId } from "../utils/guestSession.js";
import { useCart } from "../contex/CartContext.jsx";
import { UseCurrentUser } from "../features/users/userQueries.js";

const Checkout = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const { data, isLoading } = UseFetchAllCart();
  const { data: user } = UseCurrentUser();
  const { cart: localCart, clearCart } = useCart();
  const navigate = useNavigate();

  const [isPending, setIsPending]       = useState(false);
  const [couponCode, setCouponCode]     = useState("");
  const [couponLoading, setCouponLoading] = useState(false);
  const [appliedCoupon, setAppliedCoupon] = useState(null);
  const [couponError, setCouponError]   = useState("");

  const cartItems = user ? (data?.cart?.products || []) : localCart;
  const subtotal  = user
    ? (data?.cart?.totalPrice || 0)
    : localCart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const discount    = appliedCoupon?.discountAmount || 0;
  const totalPrice  = Math.max(0, subtotal - discount);

  if (isLoading && user) return <CheckoutPageSkeleton />;

  if (cartItems.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh]">
        <p className="text-xl font-semibold text-gray-500">Your cart is empty.</p>
        <button onClick={() => navigate("/")} className="mt-4 btn bg-blue-600 text-white">
          Continue Shopping
        </button>
      </div>
    );
  }

  const handleApplyCoupon = async () => {
    if (!couponCode.trim()) {
      setCouponError("Please enter a coupon code.");
      return;
    }
    setCouponLoading(true);
    setCouponError("");
    setAppliedCoupon(null);

    try {
      const res = await applyCoupon({ code: couponCode, orderAmount: subtotal });
      setAppliedCoupon(res.coupon);
      toast.success(`Coupon applied! You saved ৳${res.coupon.discountAmount}`);
    } catch (err) {
      setCouponError(err?.response?.data?.message || "Invalid coupon code.");
    } finally {
      setCouponLoading(false);
    }
  };

  const handleRemoveCoupon = () => {
    setAppliedCoupon(null);
    setCouponCode("");
    setCouponError("");
  };

  const onSubmit = async (formData) => {
    setIsPending(true);

  console.log("Cart items:", cartItems);
  console.log("Guest ID:", getGuestId());
  console.log("User:", user);

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
      totalAmount: totalPrice,
      couponCode: appliedCoupon?.code || null,
    };

    if (!user) {
      payload.guestId = getGuestId();
    }

    try {
      await axiosInstance.post("/order/create", payload);
      toast.success("✅ Order Placed Successfully!");
      if (!user) {
        clearCart();
        clearGuestId();
      }
      navigate("/track-order");
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
              <h3 className="font-semibold text-gray-700">Contact Info</h3>
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
              <h3 className="font-semibold text-gray-700">Shipping Info</h3>
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

            {/* Coupon Section */}
            <div className="mt-6">
              <h3 className="font-semibold text-gray-700 mb-2">Coupon Code</h3>

              {!appliedCoupon ? (
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={couponCode}
                    onChange={(e) => {
                      setCouponCode(e.target.value.toUpperCase());
                      setCouponError("");
                    }}
                    placeholder="Enter coupon code (e.g. WELCOME20)"
                    className="input input-bordered flex-1"
                  />
                  <button
                    type="button"
                    onClick={handleApplyCoupon}
                    disabled={couponLoading}
                    className="btn bg-blue-600 text-white px-6"
                  >
                    {couponLoading ? "..." : "Apply"}
                  </button>
                </div>
              ) : (
                <div className="flex items-center justify-between bg-green-50 border border-green-200 rounded-xl px-4 py-3">
                  <div>
                    <p className="font-bold text-green-700">
                      {appliedCoupon.code} applied!
                    </p>
                    <p className="text-sm text-green-600">
                      You saved ৳{appliedCoupon.discountAmount}
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={handleRemoveCoupon}
                    className="text-red-500 text-sm font-semibold hover:text-red-700"
                  >
                    Remove
                  </button>
                </div>
              )}

              {couponError && (
                <p className="text-red-500 text-sm mt-2">{couponError}</p>
              )}
            </div>

            {/* Payment */}
            <div className="my-4">
              <p className="font-semibold mb-2">Payment Options</p>
              <div className="flex items-center gap-3 border rounded-xl p-4 bg-orange-50 border-orange-200">
                <img src={img3} alt="COD" className="h-8" />
                <div>
                  <p className="font-semibold text-sm">Cash on Delivery</p>
                  <p className="text-xs text-gray-500">Pay when you receive</p>
                </div>
              </div>
            </div>

            <button
              type="submit"
              disabled={isPending}
              className="btn bg-green-600 text-white w-full my-4 text-base"
            >
              {isPending ? "Processing..." : "Place Order (COD)"}
            </button>

          </form>
        </div>

        {/* Right — Order Summary */}
        <div className="bg-gray-50 p-6 rounded-xl shadow-sm">
          <h3 className="text-xl font-semibold mb-4">Order Summary</h3>
          <hr className="mb-4" />

          {cartItems.map((item) => {
            const name  = user ? item.product?.name  : item.name;
            const image = user ? item.product?.images?.[0] : item.images?.[0];
            const price = user ? item.product?.price : item.price;

            return (
              <div key={item._id} className="flex items-center gap-4 mb-4">
                <img
                  src={image}
                  alt={name}
                  className="w-16 h-16 rounded-lg object-cover"
                />
                <div className="flex-1">
                  <p className="font-medium text-sm">{name}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="bg-blue-100 text-blue-700 font-bold px-2 py-0.5 rounded text-xs">
                      x{item.quantity}
                    </span>
                    <span className="text-gray-500 text-xs">
                      ৳{price} each
                    </span>
                  </div>
                </div>
                <p className="font-semibold text-green-600 text-sm">
                  ৳{price * item.quantity}
                </p>
              </div>
            );
          })}

          <hr className="my-4" />

          {/* Price Breakdown */}
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">
                Subtotal ({cartItems.reduce((s, i) => s + i.quantity, 0)} items):
              </span>
              <span className="font-semibold">৳{subtotal}</span>
            </div>

            {appliedCoupon && (
              <div className="flex justify-between text-sm">
                <span className="text-green-600 font-medium">
                  Discount ({appliedCoupon.code}):
                </span>
                <span className="text-green-600 font-semibold">
                  - ৳{appliedCoupon.discountAmount}
                </span>
              </div>
            )}

            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Shipping:</span>
              <span className="text-green-600 font-semibold">FREE</span>
            </div>

            <hr className="my-2" />

            <div className="flex justify-between text-xl font-bold">
              <span>Total Payable:</span>
              <span className="text-green-600">৳{totalPrice}</span>
            </div>

            {appliedCoupon && (
              <div className="bg-green-50 rounded-lg p-2 text-center">
                <p className="text-green-600 text-sm font-semibold">
                  🎉 You saved ৳{appliedCoupon.discountAmount}!
                </p>
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
};

export default Checkout;