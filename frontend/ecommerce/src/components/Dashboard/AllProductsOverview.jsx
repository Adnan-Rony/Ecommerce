import { useState } from "react";
import { MdDeleteOutline, MdEdit, MdClose, MdSave } from "react-icons/md";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import Swal from "sweetalert2";
import LoadingSpinner from "../LoadingSpinner.jsx";
import {
  UseDeleteProductsById,
  UseFetchProducts,
  UseUpdateProductById,
} from "../../features/products/ProductsQuery.js";

const AllProductsOverviews = () => {
  const { data: products = [], isLoading, isError } = UseFetchProducts();
  const { mutate: deleteProduct, isPending: isDeleting } =
    UseDeleteProductsById();
  const { mutate: updateProduct, isPending: isUpdating } =
    UseUpdateProductById();

  const [currentPage, setCurrentPage] = useState(1);
  const [searchText, setSearchText] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({});

  const productsPerPage = 8;

  // Search filter
  const filtered = products.filter(
    (p) =>
      p.name.toLowerCase().includes(searchText.toLowerCase()) ||
      p.category?.toLowerCase().includes(searchText.toLowerCase()),
  );

  const totalPages = Math.ceil(filtered.length / productsPerPage);
  const startIndex = (currentPage - 1) * productsPerPage;
  const currentProducts = filtered.slice(
    startIndex,
    startIndex + productsPerPage,
  );

  const handleDelete = (productId) => {
    Swal.fire({
      title: "Delete this product?",
      text: "This action cannot be undone.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete",
      cancelButtonText: "Cancel",
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteProduct(productId, {
          onSuccess: () => toast.success("Product deleted."),
          onError: () => toast.error("Failed to delete product."),
        });
      }
    });
  };

  const handleEditOpen = (product) => {
    setEditingId(product._id);
    setEditForm({
      name: product.name,
      price: product.price,
      originalPrice: product.originalPrice || "",
      stock: product.stock,
      category: product.category,
      brand: product.brand || "",
      description: product.description || "",
      isFeatured: product.isFeatured || false, // ← add
      isNewArrival: product.isNewArrival || false, // ← add
    });
  };

  const handleEditClose = () => {
    setEditingId(null);
    setEditForm({});
  };

  const handleEditChange = (e) => {
    setEditForm({ ...editForm, [e.target.name]: e.target.value });
  };

  const handleEditSave = (productId) => {
    if (!editForm.name || !editForm.price) {
      toast.error("Name and price are required.");
      return;
    }

    updateProduct(
      {
        productId,
        updatedData: {
          ...editForm,
          price: Number(editForm.price),
          originalPrice: Number(editForm.originalPrice) || 0,
          stock: Number(editForm.stock),
        },
      },
      {
        onSuccess: () => {
          toast.success("Product updated!");
          handleEditClose();
        },
        onError: () => toast.error("Failed to update product."),
      },
    );
  };

  if (isLoading) return <LoadingSpinner />;
  if (isError)
    return (
      <p className="text-red-500 text-center mt-10">Error fetching products.</p>
    );

  // Stats
  const totalStock = products.reduce((s, p) => s + (p.stock || 0), 0);
  const outOfStock = products.filter((p) => p.stock === 0).length;
  const lowStock = products.filter((p) => p.stock > 0 && p.stock <= 5).length;

  return (
    <div className="bg-gray-50 min-h-screen p-4 md:p-6">
      {/* Header */}
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Product Management</h2>
        <p className="text-gray-500 text-sm mt-1">
          Manage your product inventory
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
        <div className="bg-white rounded-lg shadow p-4 border-l-4 border-blue-500">
          <p className="text-xs text-gray-500">Total Products</p>
          <p className="text-2xl font-bold text-gray-800">{products.length}</p>
        </div>
        <div className="bg-white rounded-lg shadow p-4 border-l-4 border-green-500">
          <p className="text-xs text-gray-500">Total Stock</p>
          <p className="text-2xl font-bold text-green-600">{totalStock}</p>
        </div>
        <div className="bg-white rounded-lg shadow p-4 border-l-4 border-yellow-500">
          <p className="text-xs text-gray-500">Low Stock</p>
          <p className="text-2xl font-bold text-yellow-600">{lowStock}</p>
        </div>
        <div className="bg-white rounded-lg shadow p-4 border-l-4 border-red-500">
          <p className="text-xs text-gray-500">Out of Stock</p>
          <p className="text-2xl font-bold text-red-500">{outOfStock}</p>
        </div>
      </div>

      {/* Search */}
      <div className="flex flex-col sm:flex-row gap-3 mb-4">
        <input
          type="text"
          placeholder="Search by name or category..."
          value={searchText}
          onChange={(e) => {
            setSearchText(e.target.value);
            setCurrentPage(1);
          }}
          className="border rounded-lg px-4 py-2 text-sm w-full sm:w-72 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <p className="text-sm text-gray-500 self-center ml-auto">
          {filtered.length} products found
        </p>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl shadow overflow-x-auto">
        <table className="w-full min-w-[800px] text-sm text-left text-gray-700">
          <thead className="text-xs uppercase bg-gray-50 text-gray-500 border-b">
            <tr>
              <th className="px-4 py-3">#</th>
              <th className="px-4 py-3">Product</th>
              <th className="px-4 py-3">Price</th>
              <th className="px-4 py-3">Original Price</th>
              <th className="px-4 py-3">Stock</th>
              <th className="px-4 py-3">Category</th>
              <th className="px-4 py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentProducts.length === 0 ? (
              <tr>
                <td colSpan={7} className="text-center py-12 text-gray-400">
                  No products found.
                </td>
              </tr>
            ) : (
              currentProducts.map((item, index) => (
                <>
                  {/* Normal Row */}
                  <tr
                    key={item._id}
                    className={`border-b hover:bg-gray-50 transition ${editingId === item._id ? "bg-blue-50" : ""}`}
                  >
                    <td className="px-4 py-3 text-gray-400 text-xs">
                      {startIndex + index + 1}
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <Link to={`/product/${item._id}`}>
                          <img
                            src={item.images?.[0]}
                            alt={item.name}
                            className="w-12 h-12 object-cover rounded-lg hover:scale-105 transition"
                          />
                        </Link>
                        <div>
                          <p className="font-semibold text-gray-800 text-sm">
                            {item.name}
                          </p>
                          <p className="text-xs text-gray-400">
                            {item.brand || "—"}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3 font-bold text-green-600">
                      ৳{item.price}
                    </td>
                    <td className="px-4 py-3 text-gray-400 line-through text-xs">
                      {item.originalPrice ? `৳${item.originalPrice}` : "—"}
                    </td>
                    <td className="px-4 py-3">
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-semibold ${
                          item.stock === 0
                            ? "bg-red-100 text-red-600"
                            : item.stock <= 5
                              ? "bg-yellow-100 text-yellow-700"
                              : "bg-green-100 text-green-700"
                        }`}
                      >
                        {item.stock === 0
                          ? "Out of Stock"
                          : `${item.stock} units`}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-xs text-gray-500">
                      {item.category}
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleEditOpen(item)}
                          className="flex items-center gap-1 text-xs bg-blue-100 text-blue-700 hover:bg-blue-200 px-2 py-1.5 rounded-lg font-semibold transition"
                        >
                          <MdEdit className="text-base" />
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(item._id)}
                          disabled={isDeleting}
                          className="flex items-center gap-1 text-xs bg-red-100 text-red-600 hover:bg-red-200 px-2 py-1.5 rounded-lg font-semibold transition"
                        >
                          <MdDeleteOutline className="text-base" />
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>

                  {/* Inline Edit Row */}
                  {editingId === item._id && (
                    <tr
                      key={`edit-${item._id}`}
                      className="bg-blue-50 border-b"
                    >
                      <td colSpan={7} className="px-4 py-4">
                        <div className="bg-white rounded-xl shadow p-4">
                          <div className="flex justify-between items-center mb-4">
                            <h3 className="font-bold text-gray-700">
                              Edit: {item.name}
                            </h3>
                            <button
                              onClick={handleEditClose}
                              className="text-gray-400 hover:text-gray-600"
                            >
                              <MdClose className="text-xl" />
                            </button>
                          </div>

                          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                            <div>
                              <label className="text-xs font-semibold text-gray-500 mb-1 block">
                                Product Name *
                              </label>
                              <input
                                name="name"
                                value={editForm.name}
                                onChange={handleEditChange}
                                className="input input-bordered w-full text-sm"
                              />
                            </div>
                            <div>
                              <label className="text-xs font-semibold text-gray-500 mb-1 block">
                                Price (৳) *
                              </label>
                              <input
                                name="price"
                                type="number"
                                value={editForm.price}
                                onChange={handleEditChange}
                                className="input input-bordered w-full text-sm"
                              />
                            </div>
                            <div>
                              <label className="text-xs font-semibold text-gray-500 mb-1 block">
                                Original Price (৳)
                              </label>
                              <input
                                name="originalPrice"
                                type="number"
                                value={editForm.originalPrice}
                                onChange={handleEditChange}
                                placeholder="Crossed out price"
                                className="input input-bordered w-full text-sm"
                              />
                            </div>
                            <div>
                              <label className="text-xs font-semibold text-gray-500 mb-1 block">
                                Stock
                              </label>
                              <input
                                name="stock"
                                type="number"
                                value={editForm.stock}
                                onChange={handleEditChange}
                                className="input input-bordered w-full text-sm"
                              />
                            </div>
                            <div>
                              <label className="text-xs font-semibold text-gray-500 mb-1 block">
                                Category
                              </label>
                              <input
                                name="category"
                                value={editForm.category}
                                onChange={handleEditChange}
                                className="input input-bordered w-full text-sm"
                              />
                            </div>
                            <div>
                              <label className="text-xs font-semibold text-gray-500 mb-1 block">
                                Brand
                              </label>
                              <input
                                name="brand"
                                value={editForm.brand}
                                onChange={handleEditChange}
                                className="input input-bordered w-full text-sm"
                              />
                            </div>
                            <div className="col-span-2 md:col-span-3">
                              <label className="text-xs font-semibold text-gray-500 mb-1 block">
                                Description
                              </label>
                              <textarea
                                name="description"
                                value={editForm.description}
                                onChange={handleEditChange}
                                rows={3}
                                className="textarea textarea-bordered w-full text-sm"
                              />
                            </div>

                            {/* Featured & New Arrival Toggle */}
                            <div className="col-span-2 md:col-span-3 flex gap-6 mt-2">
                              <label className="flex items-center gap-3 cursor-pointer">
                                <div
                                  onClick={() =>
                                    setEditForm({
                                      ...editForm,
                                      isFeatured: !editForm.isFeatured,
                                    })
                                  }
                                  className={`w-12 h-6 rounded-full transition-colors ${
                                    editForm.isFeatured
                                      ? "bg-blue-600"
                                      : "bg-gray-300"
                                  } relative`}
                                >
                                  <span
                                    className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow transition-all ${
                                      editForm.isFeatured ? "left-7" : "left-1"
                                    }`}
                                  />
                                </div>
                                <span className="text-sm font-semibold text-gray-700">
                                  ⭐ Featured Product
                                </span>
                              </label>

                              <label className="flex items-center gap-3 cursor-pointer">
                                <div
                                  onClick={() =>
                                    setEditForm({
                                      ...editForm,
                                      isNewArrival: !editForm.isNewArrival,
                                    })
                                  }
                                  className={`w-12 h-6 rounded-full transition-colors ${
                                    editForm.isNewArrival
                                      ? "bg-green-500"
                                      : "bg-gray-300"
                                  } relative`}
                                >
                                  <span
                                    className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow transition-all ${
                                      editForm.isNewArrival
                                        ? "left-7"
                                        : "left-1"
                                    }`}
                                  />
                                </div>
                                <span className="text-sm font-semibold text-gray-700">
                                  🆕 New Arrival
                                </span>
                              </label>
                            </div>
                          </div>

                          <div className="flex gap-3 mt-4">
                            <button
                              onClick={() => handleEditSave(item._id)}
                              disabled={isUpdating}
                              className="flex items-center gap-2 bg-green-600 text-white px-5 py-2 rounded-lg font-semibold hover:bg-green-700 transition text-sm"
                            >
                              <MdSave className="text-base" />
                              {isUpdating ? "Saving..." : "Save Changes"}
                            </button>
                            <button
                              onClick={handleEditClose}
                              className="flex items-center gap-2 bg-gray-200 text-gray-700 px-5 py-2 rounded-lg font-semibold hover:bg-gray-300 transition text-sm"
                            >
                              <MdClose className="text-base" />
                              Cancel
                            </button>
                          </div>
                        </div>
                      </td>
                    </tr>
                  )}
                </>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-2 mt-6">
          <button
            onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
            disabled={currentPage === 1}
            className="px-3 py-1 text-sm rounded border bg-white hover:bg-gray-50 disabled:opacity-40"
          >
            ← Prev
          </button>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
            <button
              key={p}
              onClick={() => setCurrentPage(p)}
              className={`px-3 py-1 text-sm rounded border transition ${
                currentPage === p
                  ? "bg-blue-600 text-white border-blue-600"
                  : "bg-white text-gray-700 hover:bg-blue-50"
              }`}
            >
              {p}
            </button>
          ))}
          <button
            onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
            disabled={currentPage === totalPages}
            className="px-3 py-1 text-sm rounded border bg-white hover:bg-gray-50 disabled:opacity-40"
          >
            Next →
          </button>
        </div>
      )}
    </div>
  );
};

export default AllProductsOverviews;
