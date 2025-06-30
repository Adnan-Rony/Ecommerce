import React from "react";
import LoadingSpinner from "../LoadingSpinner";
import { UseCurrentUser } from "../../features/users/userQueries.js";

const UserProfileSummary = () => {
  const { data: userData, isLoading, isError } = UseCurrentUser();
  const user = userData?.user;

  if (isLoading) return <LoadingSpinner />;
  if (isError || !user) return <p className="text-red-500">Failed to load user info.</p>;

  return (
    <div className="card bg-white shadow-lg rounded-lg mb-6 w-full mx-auto">
      <div className="card-body p-6">
        <h4 className="text-xl capitalize font-semibold mb-6 text-center text-gray-800">My Profile</h4>

        {/* Avatar */}
        <div className="flex justify-center mb-6">
          <div className="w-24  h-24 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 text-4xl font-semibold uppercase select-none">
            {user.name ? user.name.charAt(0) : "U"}
          </div>
        </div>

        {/* Info Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-gray-700 text-base">
          <div>
            <p className="font-semibold text-gray-600 mb-1">Name</p>
            <p className="capitalize">{user.name}</p>
          </div>

          <div>
            <p className="font-semibold text-gray-600 mb-1">Email</p>
            <p>{user.email}</p>
          </div>

          <div>
            <p className="font-semibold text-gray-600 mb-1">Role</p>
            <p className="capitalize">{user.role}</p>
          </div>

          <div>
            <p className="font-semibold text-gray-600 mb-1">Joined</p>
            <p>{new Date(user.createdAt).toLocaleDateString()}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfileSummary;
