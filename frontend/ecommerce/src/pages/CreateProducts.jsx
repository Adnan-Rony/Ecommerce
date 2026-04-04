import { useState, useRef, useCallback } from "react";
import { useForm } from "react-hook-form";
import { UseCreateProduct } from "../features/products/ProductsQuery.js";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";
import axios from "axios";

const CLOUD_NAME = "dnpycgwch";
const UPLOAD_PRESET = "blogging";

const CATEGORIES = [
  "Smartphones", "Laptops", "Tablets", "Headphones", "Cameras",
  "Smart Watches", "Gaming", "Accessories", "TVs", "Audio", "Other"
];

const uploadImageToCloudinary = async (file) => {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", UPLOAD_PRESET);
  const res = await axios.post(
    `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
    formData
  );
  return res.data.secure_url;
};


const ImageCard = ({ file, index, onRemove, isCover }) => {
  const src = URL.createObjectURL(file);
  return (
    <div className={`relative group rounded-xl overflow-hidden border-2 transition-all duration-200 ${isCover ? "border-blue-500 ring-2 ring-blue-200" : "border-gray-200"}`}>
      <img src={src} alt="" className="w-full aspect-square object-cover" />
      {isCover && (
        <span className="absolute top-2 left-2 bg-blue-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wide">
          Cover
        </span>
      )}
      <button
        type="button"
        onClick={() => onRemove(index)}
        className="absolute top-2 right-2 w-7 h-7 bg-red-500 hover:bg-red-600 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shadow-md text-sm font-bold"
      >
        ×
      </button>
      <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/50 to-transparent px-2 py-1.5">
        <p className="text-white text-[10px] truncate">{file.name}</p>
      </div>
    </div>
  );
};


const DropZone = ({ onFiles }) => {
  const [dragging, setDragging] = useState(false);
  const inputRef = useRef(null);

  const handleDrop = useCallback((e) => {
    e.preventDefault();
    setDragging(false);
    const files = Array.from(e.dataTransfer.files).filter(f => f.type.startsWith("image/"));
    if (files.length) onFiles(files);
  }, [onFiles]);

  return (
    <div
      onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
      onDragLeave={() => setDragging(false)}
      onDrop={handleDrop}
      onClick={() => inputRef.current?.click()}
      className={`relative cursor-pointer rounded-xl border-2 border-dashed transition-all duration-200 flex flex-col items-center justify-center py-10 px-4 text-center select-none
        ${dragging ? "border-blue-500 bg-blue-50 scale-[1.01]" : "border-gray-300 bg-gray-50 hover:border-blue-400 hover:bg-blue-50/40"}`}
    >
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        multiple
        className="hidden"
        onChange={(e) => {
          const files = Array.from(e.target.files).filter(f => f.type.startsWith("image/"));
          if (files.length) onFiles(files);
          e.target.value = "";
        }}
      />
      <div className={`w-14 h-14 rounded-full flex items-center justify-center mb-3 transition-colors ${dragging ? "bg-blue-100" : "bg-gray-100"}`}>
        <svg className={`w-7 h-7 ${dragging ? "text-blue-500" : "text-gray-400"}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
            d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
        </svg>
      </div>
      <p className="font-semibold text-gray-700 text-sm">Drop images here or <span className="text-blue-600">browse</span></p>
      <p className="text-xs text-gray-400 mt-1">PNG, JPG, WEBP — up to 10 images</p>
    </div>
  );
};


const Field = ({ label, error, required, children }) => (
  <div>
    <label className="block text-sm font-semibold text-gray-700 mb-1.5">
      {label} {required && <span className="text-red-500">*</span>}
    </label>
    {children}
    {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
  </div>
);


const CreateProducts = () => {
  const { register, handleSubmit, reset, formState: { errors } } = useForm();
  const { mutate, isPending } = UseCreateProduct();
  const navigate = useNavigate();

  const [images, setImages] = useState([]); // { file, preview }
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  const handleFiles = (files) => {
    const remaining = 10 - images.length;
    if (remaining <= 0) { toast.error("Maximum 10 images allowed"); return; }
    const toAdd = files.slice(0, remaining).map(file => ({ file }));
    setImages(prev => [...prev, ...toAdd]);
  };

  const removeImage = (index) => {
    setImages(prev => prev.filter((_, i) => i !== index));
  };

  const onSubmit = async (data) => {
    if (images.length === 0) {
      toast.error("Please add at least one product image");
      return;
    }

    try {
      setUploading(true);
      setUploadProgress(0);
      const imageUrls = [];

      for (let i = 0; i < images.length; i++) {
        const url = await uploadImageToCloudinary(images[i].file);
        if (url) imageUrls.push(url);
        setUploadProgress(Math.round(((i + 1) / images.length) * 100));
      }

      const product = {
        name: data.name,
        description: data.description,
        price: Number(data.price),
        originalPrice: data.originalPrice ? Number(data.originalPrice) : undefined,
        category: data.category,
        brand: data.brand,
        stock: Number(data.stock),
        images: imageUrls,
      };

      mutate(product, {
        onSuccess: () => {
          toast.success("Product created successfully!");
          reset();
          setImages([]);
          navigate("/dashboard");
        },
        onError: () => toast.error("Failed to create product"),
      });
    } catch {
      toast.error("Image upload failed");
    } finally {
      setUploading(false);
      setUploadProgress(0);
    }
  };

  const isSubmitting = isPending || uploading;

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-5xl mx-auto">

        {/* Header */}
        <div className="mb-8">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-800 transition mb-4"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back
          </button>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Add New Product</h1>
          <p className="text-gray-500 text-sm mt-1">Fill in the details below to list a new product</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">

            {/* ── LEFT COLUMN: Images*/}
            <div className="lg:col-span-2 space-y-4">
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
                <h2 className="font-bold text-gray-800 mb-1">Product Images</h2>
                <p className="text-xs text-gray-400 mb-4">First image will be the cover. Up to 10 images.</p>

                <DropZone onFiles={handleFiles} />

                {images.length > 0 && (
                  <div className="mt-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
                        {images.length} image{images.length > 1 ? "s" : ""} added
                      </span>
                      <button
                        type="button"
                        onClick={() => setImages([])}
                        className="text-xs text-red-500 hover:text-red-700 transition"
                      >
                        Remove all
                      </button>
                    </div>
                    <div className="grid grid-cols-3 gap-2">
                      {images.map((img, i) => (
                        <ImageCard
                          key={i}
                          file={img.file}
                          index={i}
                          onRemove={removeImage}
                          isCover={i === 0}
                        />
                      ))}
                      {images.length < 10 && (
                        <label className="aspect-square rounded-xl border-2 border-dashed border-gray-200 hover:border-blue-400 cursor-pointer flex items-center justify-center bg-gray-50 hover:bg-blue-50/40 transition-colors">
                          <input
                            type="file" accept="image/*" multiple className="hidden"
                            onChange={(e) => {
                              handleFiles(Array.from(e.target.files));
                              e.target.value = "";
                            }}
                          />
                          <span className="text-2xl text-gray-300">+</span>
                        </label>
                      )}
                    </div>
                  </div>
                )}

                {/* Upload progress */}
                {uploading && (
                  <div className="mt-4">
                    <div className="flex justify-between text-xs text-gray-500 mb-1">
                      <span>Uploading images...</span>
                      <span>{uploadProgress}%</span>
                    </div>
                    <div className="w-full bg-gray-100 rounded-full h-1.5">
                      <div
                        className="bg-blue-500 h-1.5 rounded-full transition-all duration-300"
                        style={{ width: `${uploadProgress}%` }}
                      />
                    </div>
                  </div>
                )}
              </div>

              {/* Tips */}
              <div className="bg-blue-50 border border-blue-100 rounded-2xl p-4">
                <p className="text-xs font-bold text-blue-700 mb-2 uppercase tracking-wide">📸 Image Tips</p>
                <ul className="text-xs text-blue-600 space-y-1">
                  <li>• Use square images (1:1) for best results</li>
                  <li>• White or neutral background preferred</li>
                  <li>• Minimum 800×800px recommended</li>
                  <li>• First image shown as the cover photo</li>
                </ul>
              </div>
            </div>

            {/* ── RIGHT COLUMN: Product Details ─────────────────────────── */}
            <div className="lg:col-span-3 space-y-5">

              {/* Basic Info */}
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
                <h2 className="font-bold text-gray-800 mb-4">Basic Information</h2>
                <div className="space-y-4">
                  <Field label="Product Name" required error={errors.name?.message}>
                    <input
                      {...register("name", { required: "Product name is required" })}
                      placeholder="e.g. iPhone 15 Pro Max 256GB"
                      className="w-full px-3.5 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition"
                    />
                  </Field>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Field label="Category" required error={errors.category?.message}>
                      <select
                        {...register("category", { required: "Category is required" })}
                        className="w-full px-3.5 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent bg-white transition"
                      >
                        <option value="">Select category</option>
                        {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
                      </select>
                    </Field>

                    <Field label="Brand" required error={errors.brand?.message}>
                      <input
                        {...register("brand", { required: "Brand is required" })}
                        placeholder="e.g. Apple, Samsung"
                        className="w-full px-3.5 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition"
                      />
                    </Field>
                  </div>

                  <Field label="Description" required error={errors.description?.message}>
                    <textarea
                      {...register("description", { required: "Description is required" })}
                      rows={5}
                      placeholder="Describe the product features, specifications, and what makes it special..."
                      className="w-full px-3.5 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent resize-y transition"
                    />
                  </Field>
                </div>
              </div>

              {/* Pricing & Stock */}
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
                <h2 className="font-bold text-gray-800 mb-4">Pricing & Inventory</h2>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <Field label="Selling Price (৳)" required error={errors.price?.message}>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm font-medium">৳</span>
                      <input
                        {...register("price", {
                          required: "Price is required",
                          min: { value: 0, message: "Price must be positive" }
                        })}
                        type="number" min={0} placeholder="0"
                        className="w-full pl-7 pr-3.5 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition"
                      />
                    </div>
                  </Field>

                  <Field label="Original Price (৳)" error={errors.originalPrice?.message}>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm font-medium">৳</span>
                      <input
                        {...register("originalPrice", {
                          min: { value: 0, message: "Must be positive" }
                        })}
                        type="number" min={0} placeholder="0"
                        className="w-full pl-7 pr-3.5 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition"
                      />
                    </div>
                    <p className="text-[10px] text-gray-400 mt-1">For showing discount (optional)</p>
                  </Field>

                  <Field label="Stock Quantity" required error={errors.stock?.message}>
                    <input
                      {...register("stock", {
                        required: "Stock is required",
                        min: { value: 0, message: "Stock must be 0 or more" }
                      })}
                      type="number" min={0} placeholder="0"
                      className="w-full px-3.5 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition"
                    />
                  </Field>
                </div>
              </div>

              {/* Submit */}
              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  type="button"
                  onClick={() => navigate(-1)}
                  className="flex-1 py-3 px-6 border border-gray-200 rounded-xl text-gray-600 font-semibold text-sm hover:bg-gray-50 transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex-[2] py-3 px-6 bg-[#1d4c9e] hover:bg-blue-700 text-white font-semibold text-sm rounded-xl transition disabled:opacity-60 flex items-center justify-center gap-2 shadow-sm"
                >
                  {isSubmitting ? (
                    <>
                      <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                      </svg>
                      {uploading ? `Uploading images... ${uploadProgress}%` : "Creating product..."}
                    </>
                  ) : (
                    <>
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                      </svg>
                      Create Product
                    </>
                  )}
                </button>
              </div>

            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateProducts;