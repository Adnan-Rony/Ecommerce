import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

// console.log("Stripe Public Key:", import.meta.env.VITE_STRIPE_PUBLIC_KEY);
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);

const StripeProvider = ({ clientSecret, children }) => {
  if (!clientSecret) return null;

  return (
    <Elements options={{ clientSecret }} stripe={stripePromise}>
      {children}
    </Elements>
  );
};

export default StripeProvider;
