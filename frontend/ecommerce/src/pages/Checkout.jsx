import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { useNavigate, Link } from "react-router-dom";
import img3 from "../assets/cod-pay.png";
import CheckoutPageSkeleton from "../components/loader/CheckoutPageSkeleton.jsx";
import { UseFetchAllCart } from "../features/carts/CardQuery.js";
import { applyCoupon } from "../features/carts/CartsApi.js";
import axiosInstance from "./../api/axiosInstance";
import { getGuestId, clearGuestId } from "../utils/guestSession.js";
import { useCart } from "../contex/CartContext.jsx";
import { UseCurrentUser } from "../features/users/userQueries.js";
import ShippingAddress from "../components/home/Shippingaddress.jsx";

const inputClass =
  "w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#1d4c9e]/30 focus:border-[#1d4c9e] transition";

const Field = ({ label, error, children }) => (
  <div>
    <label className="block text-xs font-semibold text-gray-500 uppercase tracking-widest mb-1.5">
      {label}
    </label>
    {children}
    {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
  </div>
);

const Checkout = () => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();
  const { data, isLoading } = UseFetchAllCart();
  const { data: userData } = UseCurrentUser();
  const { cart: localCart, clearCart } = useCart();
  const navigate = useNavigate();
 

  const user = userData?.user;

  const [isPending, setIsPending] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("COD");
  const [couponCode, setCouponCode] = useState("");
  const [couponLoading, setCouponLoading] = useState(false);
  const [appliedCoupon, setAppliedCoupon] = useState(null);
  const [couponError, setCouponError] = useState("");

  const cartItems = user ? data?.cart?.products || [] : localCart;
  const subtotal = user
    ? data?.cart?.totalPrice || 0
    : localCart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const discount = appliedCoupon?.discountAmount || 0;
  const totalPrice = Math.max(0, subtotal - discount);

  if (isLoading && user) return <CheckoutPageSkeleton />;

  if (cartItems.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
        <p className="text-xl font-semibold text-gray-500">
          Your cart is empty.
        </p>
        <button
          onClick={() => navigate("/")}
          className="px-6 py-2.5 bg-[#1d4c9e] text-white text-sm font-semibold rounded-full hover:bg-blue-700 transition"
        >
          Continue Shopping
        </button>
      </div>
    );
  }

  // ── Coupon handlers ─────────────────────────────────────────────────────
  const handleApplyCoupon = async () => {
    if (!couponCode.trim()) {
      setCouponError("Please enter a coupon code.");
      return;
    }
    setCouponLoading(true);
    setCouponError("");
    setAppliedCoupon(null);
    try {
      const res = await applyCoupon({
        code: couponCode,
        orderAmount: subtotal,
      });
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

  // ── Form submit ─────────────────────────────────────────────────────────
  const onSubmit = async (formData) => {
    setIsPending(true);

  const shippingAddress = {
  name: formData.fullName,
  email: formData.email || "",
  phone: formData.phone,

  division: formData.division,
  district: formData.district,

  address: formData.address,
  landmark: formData.landmark || "",
  postalCode: formData.postalCode || "1207",

  country: "Bangladesh",
  note: formData.note || "",
  deliveryTime: formData.deliveryTime || "",
};

    // ── COD ───────────────────────────────────────────────────────────────
    if (paymentMethod === "COD") {
      const payload = {
        shippingAddress,
        paymentMethod: "COD",
        totalAmount: totalPrice,
        couponCode: appliedCoupon?.code || null,
      };
      if (!user) payload.guestId = getGuestId();

      try {
        await axiosInstance.post("/order/create", payload);
        toast.success("Order Placed Successfully!");
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
      return;
    }

    // ── SSLCommerz Online Payment ─────────────────────────────────────────
    if (paymentMethod === "Online") {
      const payload = { shippingAddress };
      if (!user) payload.guestId = getGuestId();

      try {
        const res = await axiosInstance.post("/payment/ssl/init", payload);

        if (res.data?.gatewayUrl) {
          // Redirect to SSLCommerz — bKash / Nagad / Card
          window.location.href = res.data.gatewayUrl;
          // Note: setIsPending stays true intentionally — page is leaving
        } else {
          toast.error("Could not connect to payment gateway. Try COD.");
          setIsPending(false);
        }
      } catch (err) {
        toast.error(
          err?.response?.data?.message || "Payment initiation failed.",
        );
        setIsPending(false);
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-5xl mx-auto">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-1.5 text-xs text-gray-400 mb-6">
          <Link to="/" className="hover:text-[#1d4c9e] transition">
            Home
          </Link>
          <span>/</span>
          <span className="text-gray-600">Checkout</span>
        </nav>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
            {/* ── LEFT: Form ──────────────────────────────────────────── */}
            <div className="lg:col-span-3 space-y-5">
              {/* Contact */}
              <div className="bg-white border border-gray-100 rounded-2xl p-6">
                <h2 className="text-base font-bold text-gray-900 mb-4">
                  Contact Information
                </h2>
                <div className="space-y-4">
                  <Field label="Full Name *" error={errors.fullName?.message}>
                    <input
                      {...register("fullName", {
                        required: "Name is required",
                      })}
                      placeholder="Your full name"
                      className={inputClass}
                    />
                  </Field>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Field label="Email (optional)">
                      <input
                        {...register("email")}
                        type="email"
                        placeholder="you@example.com"
                        className={inputClass}
                      />
                    </Field>
                    <Field label="Phone *" error={errors.phone?.message}>
                      <input
                        {...register("phone", {
                          required: "Phone is required",
                        })}
                        type="tel"
                        placeholder="+880 1X XX XXX XXX"
                        className={inputClass}
                      />
                    </Field>
                  </div>
                </div>
              </div>

              {/* Shipping */}
              <div className="bg-white border border-gray-100 rounded-2xl p-6">
                <h2 className="text-base font-bold text-gray-900 mb-4">
                  Shipping Address
                </h2>

                <ShippingAddress
  register={register}
  errors={errors}
  setValue={setValue}
/>
              </div>

              {/* Coupon */}
              <div className="bg-white border border-gray-100 rounded-2xl p-6">
                <h2 className="text-base font-bold text-gray-900 mb-4">
                  Coupon Code
                </h2>

                {!appliedCoupon ? (
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={couponCode}
                      onChange={(e) => {
                        setCouponCode(e.target.value.toUpperCase());
                        setCouponError("");
                      }}
                      placeholder="e.g. WELCOME20"
                      className={`${inputClass} flex-1`}
                    />
                    <button
                      type="button"
                      onClick={handleApplyCoupon}
                      disabled={couponLoading}
                      className="px-5 py-2.5 bg-[#1d4c9e] hover:bg-blue-700 text-white text-sm font-semibold rounded-xl transition disabled:opacity-60"
                    >
                      {couponLoading ? "..." : "Apply"}
                    </button>
                  </div>
                ) : (
                  <div className="flex items-center justify-between bg-green-50 border border-green-200 rounded-xl px-4 py-3">
                    <div>
                      <p className="font-bold text-green-700 text-sm">
                        {appliedCoupon.code} applied!
                      </p>
                      <p className="text-xs text-green-600 mt-0.5">
                        You saved ৳{appliedCoupon.discountAmount}
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={handleRemoveCoupon}
                      className="text-red-500 text-xs font-semibold hover:text-red-700"
                    >
                      Remove
                    </button>
                  </div>
                )}

                {couponError && (
                  <p className="text-red-500 text-xs mt-2">{couponError}</p>
                )}
              </div>

              {/* Payment Method */}
              <div className="bg-white border border-gray-100 rounded-2xl p-6">
                <h2 className="text-base font-bold text-gray-900 mb-4">
                  Payment Method
                </h2>
                <div className="space-y-3">
                  {/* <label
                    className={`flex items-center gap-3 p-4 border-2 rounded-xl cursor-pointer transition-all ${
                      paymentMethod === "Online"
                        ? "border-[#1d4c9e] bg-blue-50/40"
                        : "border-gray-100 hover:border-gray-200"
                    }`}
                  >
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="Online"
                      checked={paymentMethod === "Online"}
                      onChange={() => setPaymentMethod("Online")}
                      className="sr-only"
                    />
                    <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${
                      paymentMethod === "Online" ? "border-[#1d4c9e]" : "border-gray-300"
                    }`}>
                      {paymentMethod === "Online" && (
                        <div className="w-2 h-2 rounded-full bg-[#1d4c9e]" />
                      )}
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-semibold text-gray-800">Pay Online</p>
                      <p className="text-xs text-gray-400 mt-0.5">bKash · Nagad · Rocket · Visa / Mastercard</p>
                    </div>
                    <div className="flex items-center gap-1.5 flex-shrink-0">
                      <span className="text-[10px] font-bold bg-[#E2136E] text-white px-1.5 py-0.5 rounded">bKash</span>
                      <span className="text-[10px] font-bold bg-[#F4821F] text-white px-1.5 py-0.5 rounded">Nagad</span>
                    </div>
                  </label> */}

                  <label
                    className={`flex items-center gap-3 p-4 border-2 rounded-xl cursor-pointer transition-all ${
                      paymentMethod === "COD"
                        ? "border-[#1d4c9e] bg-blue-50/40"
                        : "border-gray-100 hover:border-gray-200"
                    }`}
                  >
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="COD"
                      checked={paymentMethod === "COD"}
                      onChange={() => setPaymentMethod("COD")}
                      className="sr-only"
                    />
                    <div
                      className={`w-4 h-4 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${
                        paymentMethod === "COD"
                          ? "border-[#1d4c9e]"
                          : "border-gray-300"
                      }`}
                    >
                      {paymentMethod === "COD" && (
                        <div className="w-2 h-2 rounded-full bg-[#1d4c9e]" />
                      )}
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-semibold text-gray-800">
                        Cash on Delivery
                      </p>
                      <p className="text-xs text-gray-400 mt-0.5">
                        Pay in cash when your order arrives
                      </p>
                    </div>
                    <img src={img3} alt="COD" className="h-7 flex-shrink-0" />
                  </label>
                </div>

                {paymentMethod === "Online" && (
                  <div className="mt-3 p-3 bg-blue-50 border border-blue-100 rounded-xl text-xs text-blue-700 leading-relaxed">
                    You'll be redirected to the secure SSLCommerz page to pay
                    with bKash, Nagad, or card.
                  </div>
                )}
              </div>
            </div>

            {/* ── RIGHT: Order Summary ───────────────────────────────── */}
            <div className="lg:col-span-2">
              <div className="bg-white border border-gray-100 rounded-2xl p-6 sticky top-24">
                <h3 className="text-base font-bold text-gray-900 mb-4">
                  Order Summary
                </h3>

                {/* Items */}
                <div className="space-y-3 max-h-60 overflow-y-auto pr-1">
                  {cartItems.map((item) => {
                    const name = user ? item.product?.name : item.name;
                    const image = user
                      ? item.product?.images?.[0]
                      : item.images?.[0];
                    const price = user ? item.product?.price : item.price;
                    return (
                      <div key={item._id} className="flex items-center gap-3">
                        <div className="w-14 h-14 bg-gray-50 rounded-xl overflow-hidden flex-shrink-0 border border-gray-100">
                          <img
                            src={image}
                            alt={name}
                            className="w-full h-full object-contain p-1"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-xs font-medium text-gray-800 truncate">
                            {name}
                          </p>
                          <p className="text-xs text-gray-400 mt-0.5">
                            x{item.quantity} · ৳{price} each
                          </p>
                        </div>
                        <p className="text-sm font-semibold text-gray-800 flex-shrink-0">
                          ৳{(price * item.quantity).toLocaleString()}
                        </p>
                      </div>
                    );
                  })}
                </div>

                {/* Price breakdown */}
                <div className="border-t border-gray-100 mt-4 pt-4 space-y-2.5">
                  <div className="flex justify-between text-sm text-gray-500">
                    <span>
                      Subtotal ({cartItems.reduce((s, i) => s + i.quantity, 0)}{" "}
                      items)
                    </span>
                    <span>৳{subtotal.toLocaleString()}</span>
                  </div>

                  {appliedCoupon && (
                    <div className="flex justify-between text-sm">
                      <span className="text-green-600">
                        Discount ({appliedCoupon.code})
                      </span>
                      <span className="text-green-600 font-semibold">
                        - ৳{discount}
                      </span>
                    </div>
                  )}

                  <div className="flex justify-between text-sm text-gray-500">
                    <span>Delivery</span>
                    <span className="text-green-600 font-medium">Free</span>
                  </div>

                  <div className="flex justify-between text-base font-bold text-gray-900 pt-2 border-t border-gray-100">
                    <span>Total Payable</span>
                    <span className="text-[#1d4c9e]">
                      ৳{totalPrice.toLocaleString()}
                    </span>
                  </div>

                  {appliedCoupon && (
                    <div className="bg-green-50 rounded-xl p-2 text-center">
                      <p className="text-green-600 text-xs font-semibold">
                        🎉 You saved ৳{discount}!
                      </p>
                    </div>
                  )}
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  disabled={isPending}
                  className="w-full mt-5 py-3 bg-[#1d4c9e] hover:bg-blue-700 text-white text-sm font-bold rounded-xl transition disabled:opacity-60 flex items-center justify-center gap-2"
                >
                  {isPending ? (
                    <>
                      <svg
                        className="animate-spin w-4 h-4"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        />
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8v8H4z"
                        />
                      </svg>
                      {paymentMethod === "Online"
                        ? "Redirecting to payment..."
                        : "Placing Order..."}
                    </>
                  ) : paymentMethod === "Online" ? (
                    `Pay Now — ৳${totalPrice.toLocaleString()}`
                  ) : (
                    `Place Order (COD) — ৳${totalPrice.toLocaleString()}`
                  )}
                </button>

                <p className="text-[11px] text-gray-400 text-center mt-3">
                  🔒 Payments secured by SSLCommerz
                </p>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Checkout;
