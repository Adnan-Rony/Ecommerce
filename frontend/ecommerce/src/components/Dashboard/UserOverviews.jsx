import React, { useState } from "react";
import {
  useFetchUsers,
  UseMakeAdmin,
} from "../../features/users/userQueries.js";
import Swal from "sweetalert2";
import toast from "react-hot-toast";
import LoadingSpinner from "../LoadingSpinner.jsx";

const UserOverviews = () => {
  const { data: users, isLoading, isError } = useFetchUsers();
  const { mutate: makeAdmin, isPending } = UseMakeAdmin();

  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 10; // Change as needed

const handleMakeAdmin = (userId) => {
    Swal.fire({
      title: "Are you sure?",
      text: "Do you want to promote this user to admin?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#16a34a",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, promote",
    }).then((result) => {
      if (result.isConfirmed) {
        makeAdmin(
          { id: userId, Updateduser: { role: "admin" } },
          {
            onSuccess: () => toast.success("User is now an admin!"),
            onError: () => toast.error("Failed to promote user."),
          }
        );
      }
    });
  };

  if (isLoading) return <LoadingSpinner />;
  if (isError) return <p>Error fetching users</p>;

  // Pagination Logic
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);
  const totalPages = Math.ceil(users.length / usersPerPage);

  return (
    <div className="bg-gray-100 min-h-screen ">
      {/* <h2 className="text-xl md:text-2xl font-semibold mb-2">User Overview</h2> */}

      <div className="bg-white rounded-lg shadow overflow-x-auto lg:my-10 my-4">
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
            {currentUsers.map((item, index) => (
              <tr key={item._id} className="border-b hover:bg-gray-50">
                <td className="p-3">{indexOfFirstUser + index + 1}</td>
                <td className="px-4 py-3 font-medium text-gray-900">{item.name}</td>
                <td className="px-4 py-3">{item.email}</td>
                <td className="px-4 py-3 capitalize">
                  <span className={`px-3 py-1 text-xs rounded-full font-medium ${
                    item.role === "admin" ? "bg-green-100 text-green-600" : "bg-blue-100 text-blue-600"
                  }`}>
                    {item.role}
                  </span>
                </td>
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

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center gap-2 py-4">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((number) => (
              <button
                key={number}
                onClick={() => setCurrentPage(number)}
                className={`px-3 py-1 rounded border ${
                  currentPage === number
                    ? "bg-blue-600 text-white"
                    : "bg-white text-gray-700 hover:bg-blue-50"
                }`}
              >
                {number}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default UserOverviews;
