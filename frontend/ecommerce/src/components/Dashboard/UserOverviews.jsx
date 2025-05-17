import React from "react";
import {
  useFetchUsers,
  UseMakeAdmin,
} from "../../features/users/userQueries.js";
import LoadingSpinner from "../LoadingSpinner.jsx";
import toast from "react-hot-toast";
import Swal from "sweetalert2";

const UserOverviews = () => {
  const { data: users, isLoading, isError } = useFetchUsers();
  const { mutate: makeAdmin, isPending } = UseMakeAdmin();

  const handleMakeAdmin = (userId) => {
    Swal.fire({
      title: "Are you sure?",
      text: "Do you want to make this user an admin?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#16a34a",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, make admin",
    }).then((result) => {
      if (result.isConfirmed) {
        makeAdmin(
          { id: userId, Updateduser: { role: "admin" } },
          {
            onSuccess: () => {
              toast.success("User promoted to admin successfully!");
            },
            onError: (error) => {
              console.error("Error making admin:", error);
              toast.error("Failed to promote user to admin.");
            },
          }
        );
      }
    });
  };

  if (isLoading) return <LoadingSpinner />;
  if (isError) return <p>Error fetching users</p>;

  return (
    <div className="p-0 lg:p-6 bg-gray-100 min-h-screen">
      <h2 className="text-xl md:text-2xl font-semibold mb-1">Users Overview</h2>
      <p className="text-gray-500 mb-6 text-sm md:text-base">
        Monthly performance metrics
      </p>

      <div className="bg-white rounded-lg shadow overflow-x-auto">
        <table className="w-full text-sm text-left text-gray-700 min-w-[500px]">
          <thead className="text-xs uppercase bg-gray-50 text-gray-500">
            <tr>
              <th className="p-3">#</th>
              <th className="px-4 py-3">Name</th>
              <th className="px-4 py-3">Email</th>
              <th className="px-4 py-3">Role</th>
              <th className="px-4 py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((item, index) => (
              <tr key={index} className="border-b hover:bg-gray-50">
                <td className="p-3">{index + 1}</td>
                <td className="px-4 py-3 font-medium text-gray-900">
                  {item.name}
                </td>
                <td className="px-4 py-3">{item.email}</td>
                <td className="px-4 py-3 capitalize">{item.role}</td>
                <td className="px-4 py-3">
                  <button
                    onClick={() => handleMakeAdmin(item._id)}
                    disabled={isPending || item.role === "admin"}
                    className={`text-white px-3 py-1 text-sm rounded ${
                      item.role === "admin"
                        ? "bg-gray-400 cursor-not-allowed"
                        : "bg-green-500 hover:bg-green-600"
                    }`}
                  >
                    {item.role === "admin" ? "Admin" : "Make Admin"}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserOverviews;
