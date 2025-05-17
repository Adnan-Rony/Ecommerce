import React from "react";
import { useForm } from "react-hook-form";
import { UseCreateProduct } from "../features/products/ProductsQuery.js";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";

const CreateProducts = () => {
  const { register, handleSubmit, reset } = useForm();
  const { mutate, isPending } = UseCreateProduct();
  const navigate = useNavigate();

  const onSubmit = (data) => {
    const images = [data.image1, data.image2, data.image3].filter(
      (img) => img.trim() !== ""
    );

    const product = {
      name: data.name,
      description: data.description,
      price: Number(data.price),
      category: data.category,
      brand: data.brand,
      stock: Number(data.stock),
      images: images,
    };

    mutate(product);
    toast.success("Product created successfully!");
    reset();
  };

  return (
    <div className="inset-0 z-50 flex items-center justify-center lg:px-4 py-0 ">
      <div className="bg-white w-full max-w-4xl rounded-2xl shadow-2xl p-6 md:p-10 max-h-screen overflow-y-auto">
        <h2 className="text-xl md:text-2xl font-bold text-gray-800 mb-6">
          Create New Product
        </h2>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-8">
            {/* Product Name */}
            <div>
              <label className="block mb-1 text-sm font-medium text-gray-700">Product Name</label>
              <input
                {...register("name", { required: true })}
                type="text"
                className="w-full p-2 border border-gray-300 rounded-lg focus:ring focus:ring-blue-200"
                placeholder="Product name"
              />
            </div>

            {/* Category */}
            <div>
              <label className="block mb-1 text-sm font-medium text-gray-700">Category</label>
              <input
                {...register("category", { required: true })}
                type="text"
                className="w-full p-2 border border-gray-300 rounded-lg focus:ring focus:ring-blue-200"
                placeholder="Category"
              />
            </div>

            {/* Price */}
            <div>
              <label className="block mb-1 text-sm font-medium text-gray-700">Price</label>
              <input
                {...register("price", { required: true })}
                type="text"
                className="w-full p-2 border border-gray-300 rounded-lg focus:ring focus:ring-blue-200"
                placeholder="Price"
              />
            </div>

            {/* Brand */}
            <div>
              <label className="block mb-1 text-sm font-medium text-gray-700">Brand</label>
              <input
                {...register("brand", { required: true })}
                type="text"
                className="w-full p-2 border border-gray-300 rounded-lg focus:ring focus:ring-blue-200"
                placeholder="Brand"
              />
            </div>

            {/* Stock */}
            <div>
              <label className="block mb-1 text-sm font-medium text-gray-700">Stock</label>
              <input
                {...register("stock", { required: true })}
                type="number"
                className="w-full p-2 border border-gray-300 rounded-lg focus:ring focus:ring-blue-200"
                placeholder="Stock"
              />
            </div>

            {/* Image URLs */}
            <div>
              <label className="block mb-1 text-sm font-medium text-gray-700">Image URL 1</label>
              <input
                {...register("image1", { required: true })}
                type="text"
                className="w-full p-2 border border-gray-300 rounded-lg focus:ring focus:ring-blue-200"
                placeholder="Image URL"
              />
            </div>

            <div>
              <label className="block mb-1 text-sm font-medium text-gray-700">Image URL 2</label>
              <input
                {...register("image2")}
                type="text"
                className="w-full p-2 border border-gray-300 rounded-lg focus:ring focus:ring-blue-200"
                placeholder="Image URL"
              />
            </div>

            <div>
              <label className="block mb-1 text-sm font-medium text-gray-700">Image URL 3</label>
              <input
                {...register("image3")}
                type="text"
                className="w-full p-2 border border-gray-300 rounded-lg focus:ring focus:ring-blue-200"
                placeholder="Image URL"
              />
            </div>
          </div>

          {/* Description */}
          <div className="mb-6">
            <label className="block mb-1 text-sm font-medium text-gray-700">Description</label>
            <textarea
              {...register("description", { required: true })}
              rows="4"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring focus:ring-blue-200"
              placeholder="Product description"
            />
          </div>

          {/* Submit Button */}
          <div className="flex justify-end">
            <button
              type="submit"
              disabled={isPending}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
            >
              {isPending ? "Submitting..." : "Submit"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateProducts;
