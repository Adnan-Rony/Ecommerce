import React from "react";

import { MdDelete } from "react-icons/md";

import { Link } from "react-router-dom";
import { useFetchWishlist } from "../features/wishlist/wishlistQuery.js";

const WishlistPage = () => {
  const { data, isLoading, isError } = useFetchWishlist();
  



  const wishlistItems = data?.wishlist?.products || [];


  if (isLoading) return <div className="text-center py-10">Loading wishlist...</div>;
  if (isError) return <div className="text-center text-red-500 py-10">Failed to load wishlist.</div>;

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">My Wishlist</h1>

      {wishlistItems.length === 0 ? (
        <p className="text-gray-600">Your wishlist is empty.</p>
      ) : (
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
       {wishlistItems.map((item) => (
  <div
    key={item._id}
    className="bg-white rounded-xl shadow-md p-4 hover:shadow-lg transition"
  >
    <Link to={`/product/${item._id}`}>
      <img
        src={item.images?.[0]}
        alt={item.name}
        className="w-full h-40 object-contain mb-4"
      />
      <h2 className="text-lg font-semibold truncate">
        {item.name}
      </h2>
    </Link>

    <p className="text-sm text-gray-500">{item.brand}</p>
    <p className="text-blue-600 font-bold my-2">${item.price}</p>

    <div className="flex justify-end">
      
    </div>
  </div>
))}

        </div>
      )}
    </div>
  );
};

export default WishlistPage;
