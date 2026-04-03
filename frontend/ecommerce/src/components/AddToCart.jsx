import React from "react";
import toast from "react-hot-toast";
import { UseAddToCart } from "../features/carts/CardQuery.js";
import { UseCurrentUser } from "../features/users/userQueries.js";
import { useCart } from "../contex/CartContext.jsx";
import { getGuestId } from "../utils/guestSession.js";

const AddToCart = ({ product, refetch }) => {
  const { mutate: addCart, isPending } = UseAddToCart();
  const { data: user } = UseCurrentUser();
  const { addToCart: addToLocalCart } = useCart();

  const handleAddToCart = () => {
    const payload = {
      productId: product._id,
      quantity: 1,
    };

    if (!user) {
      payload.guestId = getGuestId();
    }

    addCart(payload, {
      onSuccess: () => {
        if (!user) addToLocalCart(product);
        toast.success("Added to cart!");
        if (refetch) refetch();
      },
      onError: (err) => {
        console.error("Cart error:", err);
        if (!user) {
          addToLocalCart(product);
          toast.success("Added to cart!");
        } else {
          toast.error("Failed to add to cart.");
        }
      },
    });
  };

  return (
    <button
      onClick={handleAddToCart}
      disabled={isPending}
      className="w-full bg-[#1d4c9e] p-2 text-white py-1.5 rounded hover:bg-blue-700 text-sm"
    >
      {isPending ? "Adding..." : "Add To Cart"}
    </button>
  );
};

export default AddToCart;