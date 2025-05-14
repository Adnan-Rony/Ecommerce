import React from "react";
import toast from "react-hot-toast";
import { UseAddToCart } from "../features/carts/CardQuery.js";

const AddToCart = ({ product, refetch }) => {
  const { mutate: addCart, isPending } = UseAddToCart();

  const handleAddToCart = () => {
    const cartItem = {
      productId: product._id,
      quantity: 1,
    };

    addCart(cartItem, {
      onSuccess: () => {
        toast.success("Product added to cart!");
        // Refetch the cart data to update the cart count
        refetch();
      },
     
    });
  };

  return (
    <div>
      <button
        onClick={handleAddToCart}
        disabled={isPending}
        className="w-full bg-blue-600 p-2 text-white py-1.5 rounded hover:bg-blue-700 text-sm"
      >
        {isPending ? "Adding..." : "Add To Cart"}
      </button>
    </div>
  );
};

export default AddToCart;
