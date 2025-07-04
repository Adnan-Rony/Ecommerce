import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { MdBookmarkAdd } from "react-icons/md";
import toast from "react-hot-toast";
import Swal from "sweetalert2";

import AddToCart from "./AddToCart.jsx";
import { UseWishlistCreate } from "../features/wishlist/wishlistQuery.js";
import { UseCurrentUser } from "../features/users/userQueries.js";

const ProductCard = ({ product }) => {
  const navigate = useNavigate();
  const { data: user, isLoading: userLoading } = UseCurrentUser();
  const { mutate: addToWishlist, isPending } = UseWishlistCreate();
  const [hovered, setHovered] = useState(false);

  const handleWishlistAdd = () => {
    if (!user) {
      Swal.fire({
        title: "Not Logged In",
        text: "You need to log in to add to your wishlist.",
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

    addToWishlist(
      { productId: product._id },
      {
        onSuccess: () => toast.success("Added to wishlist"),
        onError: () => toast.error("Failed to add to wishlist"),
      }
    );
  };

  const primaryImage = product.images?.[0];
  const secondaryImage = product.images?.[1] || primaryImage;

  return (
    <div
      className="bg-white p-4 rounded-lg shadow hover:shadow-lg transition flex flex-col justify-between min-h-[380px]"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <Link to={`/product/${product._id}`}>
        <div className="relative overflow-hidden">
          <img
            className="w-full h-40 object-contain mb-3 transform transition-transform duration-300 hover:scale-110"
            src={hovered ? secondaryImage : primaryImage}
            alt={product.name}
          />
        </div>
      </Link>

      <h3 className="text-sm font-semibold text-gray-900">{product.name}</h3>
      <p className="text-xs text-gray-500 mb-1">{product.brand}</p>

      <div className="flex items-center text-yellow-400 text-sm mb-1">
        {product.review || "☆ ☆ ☆"}
      </div>

      <p className="text-green-600 text-sm mb-1">
        ✔ In stock ({product.stock})
      </p>

      <div className="text-sm text-gray-800 justify-between mb-2 flex items-center gap-2">
        <p className="text-[#1d4c9e] font-bold">${product.price}</p>
        <button
          onClick={handleWishlistAdd}
          disabled={isPending}
          title="Add to Wishlist"
        >
          <MdBookmarkAdd className="text-xl text-[#1d4c9e] hover:text-blue-700" />
        </button>
      </div>

      <div className="mt-auto">
        <AddToCart product={product} key={product._id} />
      </div>
    </div>
  );
};

export default ProductCard;
