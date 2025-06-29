import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { UseCreateProduct } from "../features/products/ProductsQuery.js";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";
import axios from "axios";

const CLOUD_NAME = "dnpycgwch";
const UPLOAD_PRESET = "blogging";

const CreateProducts = () => {
  const { register, handleSubmit, reset } = useForm();
  const { mutate, isPending } = UseCreateProduct();
  const navigate = useNavigate();
  const [uploading, setUploading] = useState(false);

  const uploadImageToCloudinary = async (file) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", UPLOAD_PRESET);

    try {
      setUploading(true);
      const res = await axios.post(
        `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
        formData
      );
      return res.data.secure_url;
    } catch (error) {
      toast.error("Image upload failed");
      return null;
    } finally {
      setUploading(false);
    }
  };

  const onSubmit = async (data) => {
    const imageFiles = [data.image1[0], data.image2?.[0], data.image3?.[0]].filter(Boolean);
    const imageUrls = [];

    for (let file of imageFiles) {
      const url = await uploadImageToCloudinary(file);
      if (url) imageUrls.push(url);
    }

    const product = {
      name: data.name,
      description: data.description,
      price: Number(data.price),
      category: data.category,
      brand: data.brand,
      stock: Number(data.stock),
      images: imageUrls,
    };

    mutate(product);
    toast.success("Product created successfully!");
    reset();
  };

  return (
    <div className="flex justify-center py-8 px-4 bg-gray-50 min-h-screen">
      <div className="w-full max-w-4xl bg-white rounded-2xl p-6 md:p-10 shadow-md overflow-auto">
        <h2 className="text-xl md:text-2xl font-bold text-gray-800 mb-6 text-center">
          Create New Product
        </h2>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            {/* Inputs */}
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-700">Product Name</label>
              <input
                {...register("name", { required: true })}
                className="input w-full"
                placeholder="Product name"
              />
            </div>

            <div>
              <label className="block mb-2 text-sm font-medium text-gray-700">Category</label>
              <input
                {...register("category", { required: true })}
                className="input w-full"
                placeholder="Category"
              />
            </div>

            <div>
              <label className="block mb-2 text-sm font-medium text-gray-700">Price</label>
              <input
                {...register("price", { required: true })}
                className="input w-full"
                placeholder="Price"
                type="number"
                min={0}
              />
            </div>

            <div>
              <label className="block mb-2 text-sm font-medium text-gray-700">Brand</label>
              <input
                {...register("brand", { required: true })}
                className="input w-full"
                placeholder="Brand"
              />
            </div>

            <div>
              <label className="block mb-2 text-sm font-medium text-gray-700">Stock</label>
              <input
                {...register("stock", { required: true })}
                type="number"
                min={0}
                className="input w-full"
                placeholder="Stock"
              />
            </div>

            {/* Image Uploads */}
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-700">Image 1</label>
              <input
                {...register("image1", { required: true })}
                type="file"
                accept="image/*"
                className="file-input file-input-primary w-full"
              />
            </div>

            <div>
              <label className="block mb-2 text-sm font-medium text-gray-700">Image 2</label>
              <input
                {...register("image2")}
                type="file"
                accept="image/*"
                className="file-input file-input-primary w-full"
              />
            </div>

            <div>
              <label className="block mb-2 text-sm font-medium text-gray-700">Image 3</label>
              <input
                {...register("image3")}
                type="file"
                accept="image/*"
                className="file-input file-input-primary w-full"
              />
            </div>
          </div>

          {/* Description */}
          <div className="mb-6">
            <label className="block mb-2 text-sm font-medium text-gray-700">Description</label>
            <textarea
              {...register("description", { required: true })}
              rows="6"
              className="w-full border rounded-md p-3 text-gray-700 resize-y focus:outline-blue-500"
              placeholder="Describe the product"
            />
          </div>

          {/* Submit */}
          <div className="flex justify-center">
            <button
              type="submit"
              disabled={isPending || uploading}
              className="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 transition"
            >
              {isPending || uploading ? "Submitting..." : "Submit"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateProducts;
