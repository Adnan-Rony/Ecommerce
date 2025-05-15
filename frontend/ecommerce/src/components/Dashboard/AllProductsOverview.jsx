import { MdDeleteOutline } from "react-icons/md";
import { GrUpdate } from "react-icons/gr";
import { UseFetchProducts } from "../../features/products/ProductsQuery.js";
import LoadingSpinner from "../LoadingSpinner.jsx";

const AllProductsOverviews = () => {

const { data: products, isLoading, isError } = UseFetchProducts();

  if (isLoading) return <LoadingSpinner></LoadingSpinner>;
  if (isError) return <p>Error fetching products</p>;




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
                <td className="p-2">{index+1}</td>
                <td className="px-6 py-4">
                  <img className="w-12" src={item.images[0]} alt="" />
                </td>

                <td className="px-6 py-4">{item.name}</td>

                <td className="px-6 py-4 font-semibold">${item.price}</td>
                <td className="px-6 py-4 font-semibold">{item.stock}</td>
                <td className="px-6 py-4">
                  <div className="grid grid-cols-2 item-center gap-4 ">
                    <button>
                      <MdDeleteOutline className="text-xl text-red-600" />
                    </button>
                    <button>
                      <GrUpdate className=" text-green-600"  />
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
