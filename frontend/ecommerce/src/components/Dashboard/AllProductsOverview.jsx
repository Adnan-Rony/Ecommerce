import { MdDeleteOutline } from "react-icons/md";
import { GrUpdate } from "react-icons/gr";
import {
  UseDeleteProductsById,
  UseFetchProducts,
} from "../../features/products/ProductsQuery.js";
import LoadingSpinner from "../LoadingSpinner.jsx";
import { Link } from "react-router";
import toast from "react-hot-toast";
import Swal from "sweetalert2";

const AllProductsOverviews = () => {
  const { data: products, isLoading, isError } = UseFetchProducts();
  const { mutate: deleteProductItem, isPending } = UseDeleteProductsById();

  if (isLoading) return <LoadingSpinner></LoadingSpinner>;
  if (isError) return <p>Error fetching products</p>;

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
        onSuccess: () => {
          toast.success("Your product has been deleted.")
        },
        onError: (error) => {
          Swal.fire("Error!", "Failed to delete the product.", "error");
        },
      });
    }
  });
};

  return (
    <div className="p-6 bg-gray-100 lg:min-h-screen">
      <h2 className="lg:text-2xl font-semibold mb-1">Product Overview</h2>
      <p className="text-gray-500 mb-6">Monthly performance metrics</p>

      <div className="bg-white rounded-lg shadow overflow-x-auto">
        <table className="w-full text-sm text-left text-gray-700">
          <thead className="lg:text-xs uppercase bg-gray-50 text-gray-500">
            <tr>
              <th></th>
              <th className="lg:px-6 py-3">Picture</th>
              <th className="lg:px-6 py-3">Product Name</th>
              <th className="lg:px-6 py-3">Price</th>
              <th className="lg:px-6 py-3">Stock</th>
              <th className="lg:px-6 py-3">Update/Delete</th>
            </tr>
          </thead>
          <tbody>
            {products.map((item, index) => (
              <tr key={index} className="border-b hover:bg-gray-50">
                <td className="p-2">{index + 1}</td>
                <td className="px-6 py-4">
                  <Link to={`/product/${item._id}`}>
                    <img
                      className="w-12"
                      src={item.images[0]}
                      alt={item.name}
                    />
                  </Link>
                </td>

                <td className="px-6 py-4">{item.name}</td>

                <td className="px-6 py-4 font-semibold">${item.price}</td>
                <td className="px-6 py-4 font-semibold">{item.stock}</td>
                <td className="px-6 py-4">
                  <div className="grid grid-cols-2 item-center gap-4 ">
                    <button
                      onClick={() => handleDelete(item?._id)}
                      disabled={isPending}
                    >
                      <MdDeleteOutline className="text-xl text-red-600" />
                    </button>
                    <button>
                      <GrUpdate className=" text-green-600" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllProductsOverviews;
