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
  const { data: user } = UseCurrentUser();
  const { mutate: addToWishlist, isPending } = UseWishlistCreate();
  const [hovered, setHovered] = useState(false);

  const handleWishlistAdd = () => {
    if (!user) {
      Swal.fire({
        title: "Not Logged In",
        text: "You need to log in to add to your wishlist.",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Login",
      }).then((result) => {
        if (result.isConfirmed) navigate("/login");
      });
      return;
    }

    addToWishlist(
      { productId: product._id },
      {
        onSuccess: () => toast.success("Added to wishlist"),
        onError: () => toast.error("Failed to add"),
      }
    );
  };

  const primaryImage = product.images?.[0];
  const secondaryImage = product.images?.[1] || primaryImage;

  return (
    <div
      className="
        bg-white rounded-xl shadow-sm hover:shadow-md
        transition duration-300
        flex flex-col justify-between
        p-2 sm:p-4
      "
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Image */}
      <Link to={`/product/${product._id}`}>
        <div className="relative overflow-hidden rounded-lg">
          <img
            src={hovered ? secondaryImage : primaryImage}
            alt={product.name}
            className="
              w-full h-28 sm:h-40
              object-contain
              transition-transform duration-300
              hover:scale-105
            "
          />
        </div>
      </Link>

      {/* Title */}
      <h3 className="text-xs sm:text-sm font-semibold text-gray-900 mt-2 line-clamp-2">
        {product.name}
      </h3>

      {/* Brand */}
      <p className="text-[10px] sm:text-xs text-gray-500">
        {product.brand}
      </p>

      {/* Stock */}
      <p className="text-[10px] sm:text-xs text-green-600 mt-1">
        ✔ {product.stock > 0 ? `In stock (${product.stock})` : "Out of stock"}
      </p>

      {/* Price + Wishlist */}
      <div className="flex items-center justify-between mt-2">
        <p className="text-sm sm:text-base font-bold text-[#1d4c9e]">
          ${product.price}
        </p>

        <button
          onClick={handleWishlistAdd}
          disabled={isPending}
          className="p-1 rounded-full hover:bg-gray-100 transition"
        >
          <MdBookmarkAdd className="text-lg sm:text-xl text-[#1d4c9e]" />
        </button>
      </div>

      {/* Add to Cart */}
      <div className="mt-2">
        <AddToCart product={product} />
      </div>
    </div>
  );
};

export default ProductCard;