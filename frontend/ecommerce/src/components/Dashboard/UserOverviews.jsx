import { useState } from "react";
import { useFetchUsers, UseMakeAdmin } from "../../features/users/userQueries.js";
import Swal from "sweetalert2";
import toast from "react-hot-toast";
import LoadingSpinner from "../LoadingSpinner.jsx";
import { FiUsers, FiShield, FiUser } from "react-icons/fi";

const UserOverviews = () => {
  const { data: users = [], isLoading, isError } = useFetchUsers();
  const { mutate: makeAdmin, isPending } = UseMakeAdmin();

  const [currentPage, setCurrentPage] = useState(1);
  const [searchText, setSearchText]   = useState("");
  const usersPerPage = 10;

  const handleMakeAdmin = (userId, userName) => {
    Swal.fire({
      title: `Promote ${userName}?`,
      text: "This user will have full admin access.",
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
            onSuccess: () => toast.success(`${userName} is now an admin!`),
            onError: () => toast.error("Failed to promote user."),
          }
        );
      }
    });
  };

  if (isLoading) return <LoadingSpinner />;
  if (isError) return (
    <p className="text-red-500 text-center mt-10">Error fetching users.</p>
  );

  // Search filter
  const filtered = users.filter(u =>
    u.name?.toLowerCase().includes(searchText.toLowerCase()) ||
    u.email?.toLowerCase().includes(searchText.toLowerCase())
  );

  // Stats
  const totalAdmins = users.filter(u => u.role === "admin").length;
  const totalUsers  = users.length;

  // Pagination
  const totalPages      = Math.ceil(filtered.length / usersPerPage);
  const indexOfFirst    = (currentPage - 1) * usersPerPage;
  const currentUsers    = filtered.slice(indexOfFirst, indexOfFirst + usersPerPage);

  return (
    <div className="bg-gray-50 min-h-screen p-4 md:p-6">

      {/* Header */}
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-800">User Management</h2>
        <p className="text-gray-500 text-sm mt-1">Manage all registered users</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-3 mb-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 flex items-center gap-3">
          <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center">
            <FiUsers className="text-blue-600 text-lg" />
          </div>
          <div>
            <p className="text-xs text-gray-500">Total Users</p>
            <p className="text-2xl font-extrabold text-gray-800">{totalUsers}</p>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 flex items-center gap-3">
          <div className="w-10 h-10 bg-green-50 rounded-xl flex items-center justify-center">
            <FiShield className="text-green-600 text-lg" />
          </div>
          <div>
            <p className="text-xs text-gray-500">Admins</p>
            <p className="text-2xl font-extrabold text-green-600">{totalAdmins}</p>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 flex items-center gap-3">
          <div className="w-10 h-10 bg-purple-50 rounded-xl flex items-center justify-center">
            <FiUser className="text-purple-600 text-lg" />
          </div>
          <div>
            <p className="text-xs text-gray-500">Customers</p>
            <p className="text-2xl font-extrabold text-purple-600">
              {totalUsers - totalAdmins}
            </p>
          </div>
        </div>
      </div>

      {/* Search */}
      <div className="flex flex-col sm:flex-row gap-3 mb-4">
        <input
          type="text"
          placeholder="Search by name or email..."
          value={searchText}
          onChange={(e) => { setSearchText(e.target.value); setCurrentPage(1); }}
          className="border rounded-xl px-4 py-2 text-sm w-full sm:w-72 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <p className="text-sm text-gray-500 self-center ml-auto">
          {filtered.length} users found
        </p>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-x-auto">
        <table className="w-full min-w-[600px] text-sm text-left">
          <thead className="text-xs uppercase text-gray-400 border-b border-gray-100">
            <tr>
              <th className="px-4 py-3">#</th>
              <th className="px-4 py-3">User</th>
              <th className="px-4 py-3">Email</th>
              <th className="px-4 py-3">Role</th>
              <th className="px-4 py-3">Joined</th>
              <th className="px-4 py-3">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {currentUsers.length === 0 ? (
              <tr>
                <td colSpan={6} className="text-center py-12 text-gray-300">
                  No users found.
                </td>
              </tr>
            ) : (
              currentUsers.map((user, index) => (
                <tr key={user._id} className="hover:bg-gray-50 transition">
                  <td className="px-4 py-3 text-gray-400 text-xs">
                    {indexOfFirst + index + 1}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                        {user.name?.charAt(0).toUpperCase()}
                      </div>
                      <p className="font-semibold text-gray-800">{user.name}</p>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-gray-500 text-xs">{user.email}</td>
                  <td className="px-4 py-3">
                    <span className={`px-2.5 py-1 rounded-full text-xs font-bold capitalize flex items-center gap-1 w-fit ${
                      user.role === "admin"
                        ? "bg-green-100 text-green-700"
                        : "bg-blue-100 text-blue-700"
                    }`}>
                      {user.role === "admin"
                        ? <><FiShield className="text-xs" /> Admin</>
                        : <><FiUser className="text-xs" /> Customer</>
                      }
                    </span>
                  </td>
                  <td className="px-4 py-3 text-xs text-gray-400">
                    {user.createdAt
                      ? new Date(user.createdAt).toLocaleDateString("en-GB")
                      : "—"
                    }
                  </td>
                  <td className="px-4 py-3">
                    <button
                      onClick={() => handleMakeAdmin(user._id, user.name)}
                      disabled={isPending || user.role === "admin"}
                      className={`text-xs px-3 py-1.5 rounded-lg font-semibold transition ${
                        user.role === "admin"
                          ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                          : "bg-green-100 text-green-700 hover:bg-green-200"
                      }`}
                    >
                      {user.role === "admin" ? "✅ Admin" : "⬆️ Make Admin"}
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center gap-2 py-4 border-t">
            <button
              onClick={() => setCurrentPage(p => Math.max(p - 1, 1))}
              disabled={currentPage === 1}
              className="px-3 py-1 text-sm rounded-lg border bg-white hover:bg-gray-50 disabled:opacity-40"
            >
              ← Prev
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
              <button
                key={p}
                onClick={() => setCurrentPage(p)}
                className={`px-3 py-1 text-sm rounded-lg border transition ${
                  currentPage === p
                    ? "bg-blue-600 text-white border-blue-600"
                    : "bg-white text-gray-700 hover:bg-blue-50"
                }`}
              >
                {p}
              </button>
            ))}
            <button
              onClick={() => setCurrentPage(p => Math.min(p + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="px-3 py-1 text-sm rounded-lg border bg-white hover:bg-gray-50 disabled:opacity-40"
            >
              Next →
            </button>
          </div>
        )}
      </div>

    </div>
  );
};

export default UserOverviews;