import { useState } from "react";
import { MdDeleteOutline } from "react-icons/md";
import { GrUpdate } from "react-icons/gr";
import {
  UseDeleteProductsById,
  UseFetchProducts,
} from "../../features/products/ProductsQuery.js";
import LoadingSpinner from "../LoadingSpinner.jsx";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import Swal from "sweetalert2";

const AllProductsOverviews = () => {
  const { data: products = [], isLoading, isError } = UseFetchProducts();
  const { mutate: deleteProductItem, isPending } = UseDeleteProductsById();

  // Pagination State
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 8;
  const totalPages = Math.ceil(products.length / productsPerPage);

  const startIndex = (currentPage - 1) * productsPerPage;
  const currentProducts = products.slice(startIndex, startIndex + productsPerPage);

  const handleDelete = (productId) => {
    Swal.fire({
      title: "Are you sure delete this product?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes",
      cancelButtonText: "No",
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteProductItem(productId, {
          onSuccess: () => toast.success("Product deleted successfully."),
          onError: () => Swal.fire("Error!", "Failed to delete product.", "error"),
        });
      }
    });
  };

  if (isLoading) return <LoadingSpinner />;
  if (isError) return <p>Error fetching products.</p>;

  return (
    <div className="lg:p-4 p-2 bg-gray-100 min-h-screen">
      <h2 className="text-xl md:text-2xl font-semibold mb-1">Product Overview</h2>
      <p className="text-gray-500 mb-6 text-sm md:text-base">
        Monthly performance metrics
      </p>

      <div className="bg-white rounded-lg shadow overflow-x-auto">
        <table className="w-full text-sm text-left text-gray-700 min-w-[600px]">
          <thead className="text-xs uppercase bg-gray-50 text-gray-500">
            <tr>
              <th className="p-3">#</th>
              <th className="px-4 py-3">Picture</th>
              <th className="px-4 py-3">Product Name</th>
              <th className="px-4 py-3">Price</th>
              <th className="px-4 py-3">Stock</th>
              <th className="px-4 py-3">Update/Delete</th>
            </tr>
          </thead>
          <tbody>
            {currentProducts.map((item, index) => (
              <tr key={item._id} className="border-b hover:bg-gray-50">
                <td className="p-3">{startIndex + index + 1}</td>
                <td className="px-4 py-3">
                  <Link to={`/product/${item._id}`}>
                    <img
                      className="lg:w-10 lg:h-10 w-20 object-cover rounded"
                      src={item.images[0]}
                      alt={item.name}
                    />
                  </Link>
                </td>
                <td className="px-4 py-3">{item.name}</td>
                <td className="px-4 py-3 font-semibold">${item.price}</td>
                <td className="px-4 py-3 font-semibold">{item.stock}</td>
                <td className="px-4 py-3">
                  <div className="flex gap-4">
                    <button
                      onClick={() => handleDelete(item._id)}
                      disabled={isPending}
                      className="hover:scale-105"
                    >
                      <MdDeleteOutline className="text-xl text-red-600" />
                    </button>
                    <button>
                      <GrUpdate className="text-green-600" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination Controls */}
      <div className="flex justify-center items-center gap-2 mt-6">
        <button
          onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
          disabled={currentPage === 1}
          className="px-3 py-1 border rounded hover:bg-gray-200 disabled:opacity-50"
        >
          Prev
        </button>

        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i + 1}
            onClick={() => setCurrentPage(i + 1)}
            className={`px-3 py-1 border rounded ${
              currentPage === i + 1
                ? "bg-blue-600 text-white"
                : "hover:bg-gray-200"
            }`}
          >
            {i + 1}
          </button>
        ))}

        <button
          onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
          disabled={currentPage === totalPages}
          className="px-3 py-1 border rounded hover:bg-gray-200 disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default AllProductsOverviews;
