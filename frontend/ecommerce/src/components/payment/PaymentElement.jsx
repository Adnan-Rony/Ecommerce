// components/payment/PaymentElement.jsx
import { useStripe, useElements, PaymentElement } from "@stripe/react-stripe-js";
import { useState } from "react";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const StripeForm = ({ shippingData, mutate }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) return;

    setIsLoading(true);

    const { error, paymentIntent } = await stripe.confirmPayment({
      elements,
      redirect: "if_required", // prevent auto redirect
    });

    if (error) {
      toast.error(error.message);
      setIsLoading(false);
      return;
    }

    if (paymentIntent?.status === "succeeded") {
      const payload = {
        shippingAddress: {
          name: shippingData.fullName,
          email: shippingData.email,
          phone: shippingData.phone,
          address: shippingData.address,
          city: shippingData.city,
          postalCode: shippingData.postalCode,
          country: shippingData.country,
          note: shippingData.note || "",
        },
        paymentMethod: "Online",
      };

      mutate(payload, {
        onSuccess: () => {
          toast.success("Payment & Order Success!");
          navigate("/myorder");
        },
        onError: () => {
          toast.error("Payment was successful, but order failed!");
        },
      });
    }

    setIsLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="mt-4">
      <PaymentElement />
      <button
        type="submit"
        disabled={!stripe || isLoading}
        className="btn w-full mt-4 bg-blue-600 text-white"
      >
        {isLoading ? "Processing..." : "Pay Now"}
      </button>
    </form>
  );
};

export default StripeForm;
