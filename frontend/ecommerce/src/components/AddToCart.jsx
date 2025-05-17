import React from "react";
import toast from "react-hot-toast";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { UseAddToCart } from "../features/carts/CardQuery.js";
import { UseCurrentUser } from "../features/users/userQueries.js";


const AddToCart = ({ product, refetch }) => {
  const navigate = useNavigate();
  const { mutate: addCart, isLoading } = UseAddToCart();
  const { data: user, isLoading: userLoading } = UseCurrentUser();



  const handleAddToCart = () => {
    if (!user) {
      Swal.fire({
        title: "Not Logged In",
        text: "Please log in to add products to your cart.",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, Login",
        cancelButtonText: "No",
      }).then((result) => {
        if (result.isConfirmed) {
          navigate("/login");
        }
      });
      return;
    }

    // Optional: Wait until user is fully fetched before allowing cart mutation
    if (userLoading) return;

    addCart(
      { productId: product._id, quantity: 1 },
      {
        onSuccess: () => {
          toast.success("Product added to cart!");
          if (refetch) refetch();
        },
        onError: () => {
          toast.error("Failed to add product to cart.");
        },
      }
    );
  };

  return (
    <button
      onClick={handleAddToCart}
      disabled={isLoading}
      className="w-full bg-blue-600 p-2 text-white py-1.5 rounded hover:bg-blue-700 text-sm"
    >
      {isLoading ? "Adding..." : "Add To Cart"}
    </button>
  );
};

export default AddToCart;
