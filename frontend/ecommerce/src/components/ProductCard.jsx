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
    <div className="bg-white rounded-xl shadow hover:shadow-md transition overflow-hidden group border border-gray-100">

      {/* IMAGE */}
      <Link to={`/product/${product._id}`}>
        <div
          className="relative overflow-hidden"
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
        >
          <img
            src={hovered ? secondaryImage : primaryImage}
            alt={product.name}
            className="w-full h-36 object-cover group-hover:scale-105 transition duration-300"
          />

          {/* STOCK BADGES */}
          {product.stock === 0 && (
            <span className="absolute top-2 left-2 bg-red-500 text-white text-xs px-2 py-0.5 rounded-full">
              Out of Stock
            </span>
          )}

          {product.stock > 0 && product.stock <= 5 && (
            <span className="absolute top-2 left-2 bg-yellow-400 text-blue-900 text-xs px-2 py-0.5 rounded-full font-bold">
              মাত্র {product.stock}টা!
            </span>
          )}

          {/* NEW BADGE */}
          {product.isNewArrival && (
            <span className="absolute top-2 right-2 bg-green-500 text-white text-xs px-2 py-0.5 rounded-full font-bold">
              New
            </span>
          )}

          {/* FEATURED BADGE */}
          {product.isFeatured && (
            <span className="absolute top-2 right-2 bg-blue-600 text-white text-xs px-2 py-0.5 rounded-full font-bold">
              ⭐ Featured
            </span>
          )}
        </div>
      </Link>

      {/* CONTENT */}
      <div className="p-3 space-y-2">

        {/* TITLE */}
        <p className="text-xs font-semibold text-gray-700 line-clamp-2 leading-tight">
          {product.name}
        </p>

        {/* BRAND (optional) */}
        {product.brand && (
          <p className="text-[10px] text-gray-500">
            {product.brand}
          </p>
        )}

        {/* PRICE */}
        <div className="flex items-center gap-1.5">
          <span className="text-green-600 font-bold text-sm">
            ৳{product.price}
          </span>

          {product.originalPrice > 0 && (
            <span className="text-gray-400 line-through text-xs">
              ৳{product.originalPrice}
            </span>
          )}
        </div>

        {/* STOCK TEXT */}
        <p className="text-[10px] text-green-600">
          {product.stock > 0
            ? `✔ In stock (${product.stock})`
            : "Out of stock"}
        </p>

        {/* ACTION ROW */}
        <div className="flex items-center justify-between pt-1">

          {/* ADD TO CART */}
          <div className="flex-1">
            <AddToCart product={product} />
          </div>

          {/* WISHLIST */}
          {/* <button
            onClick={handleWishlistAdd}
            disabled={isPending}
            className="ml-2 p-2 rounded-full hover:bg-gray-100 transition"
          >
            <MdBookmarkAdd className="text-lg text-[#1d4c9e]" />
          </button> */}

        </div>

      </div>
    </div>
  );
};

export default ProductCard;