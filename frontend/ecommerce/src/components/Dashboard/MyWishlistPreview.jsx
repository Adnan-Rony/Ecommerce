// src/components/UserDashboard/MyWishlistPreview.jsx
import React from "react";
import { Link } from "react-router-dom";
import LoadingSpinner from "../LoadingSpinner";
import { useFetchWishlist } from "../../features/wishlist/wishlistQuery.js";
import WishlistSkeleton from "../loader/WishlistSkeleton.jsx";

const MyWishlistPreview = () => {
  const { data, isLoading, isError } = useFetchWishlist();

  if (isLoading) return <WishlistSkeleton />;
  if (isError) return <p className="text-red-600">Failed to load wishlist</p>;

  const wishlistItems = data?.wishlist?.products || [];

  return (
    <div className="card bg-base-200 shadow mb-6">
      <div className="card-body">
        <div className="flex justify-between items-center mb-4">
          <h4 className="text-xl font-semibold">My Wishlist</h4>
          <Link
            to="/wishlist"
            className="text-sm btn btn-sm text-blue-600 hover:underline"
          >
            View All
          </Link>
        </div>

        {wishlistItems.length === 0 ? (
          <p className="text-gray-500">You have no items in your wishlist.</p>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {wishlistItems.slice(0, 4).map((item) => (
              <div
                key={item._id}
                className="bg-white rounded-lg shadow p-3 flex flex-col items-center"
              >
                <img
                  src={item.images?.[0]}
                  alt={item.name}
                  className="h-24 w-24 object-cover rounded mb-2"
                />
                <p className="text-sm text-center font-medium">{item.name}</p>
                <p className="text-blue-600 font-semibold text-sm">
                  ${item.price}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyWishlistPreview;
