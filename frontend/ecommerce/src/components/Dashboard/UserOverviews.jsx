import React from "react";
import { useFetchUsers, UseMakeAdmin } from "../../features/users/userQueries.js";
import LoadingSpinner from "../LoadingSpinner.jsx";
import toast from "react-hot-toast";
import Swal from "sweetalert2";
const UserOverviews = () => {

  const { data: users, isLoading, isError } = useFetchUsers();
  const { mutate: makeAdmin, isPending  } = UseMakeAdmin();

  const handleMakeIdmin = (userId) => {
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

  if (isLoading) return <LoadingSpinner></LoadingSpinner>;
  if (isError) return <p>Error fetching products</p>;


  return (
    <div className="p-6 bg-gray-100 lg:min-h-screen">
      <h2 className="lg:text-2xl font-semibold mb-1">Users Overview</h2>
      <p className="text-gray-500 mb-6">Monthly performance metrics</p>

      <div className="bg-white rounded-lg shadow overflow-x-auto">
        <table className="w-full text-sm text-left text-gray-700">
          <thead className="lg:text-xs uppercase bg-gray-50 text-gray-500">
            <tr>
              <th></th>
              <th className="lg:px-6 py-3">Name</th>
              <th className="lg:px-6 py-3">Email</th>
              <th className="lg:px-6 py-3">Role</th>
              <th className="lg:px-6 py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((item, index) => (
              <tr key={index} className="border-b hover:bg-gray-50">
                <td className="p-2">{index + 1}</td>
                <td className="px-6 py-4">
                  <div className="font-medium text-gray-900">{item.name}</div>
                </td>
                <td className="px-6 py-4">{item.email}</td>
                <td className="px-6 py-4">{item.role}</td>
                <td className="px-6 py-4">
                  <button
                    onClick={()=>handleMakeIdmin(item._id)}
                    disabled={isPending}
                  className="btn btn-sm bg-green-500 text-white">
                    Make Admin
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
