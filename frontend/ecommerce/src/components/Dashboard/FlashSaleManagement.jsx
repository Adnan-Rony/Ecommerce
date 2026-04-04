import { useState } from "react";
import toast from "react-hot-toast";
import LoadingSpinner from "../LoadingSpinner.jsx";
import { UseFetchProducts } from "../../features/products/ProductsQuery.js";
import {
  UseGetAllFlashSales,
  UseCreateFlashSale,
  UseDeleteFlashSale,
  UseToggleFlashSale,
  UseUpdateFlashSale
} from "../../features/flashSale/FlashSaleQuery.js";
import { FaBolt } from "react-icons/fa";
import { MdDelete, MdEdit, MdClose } from "react-icons/md";

const FlashSaleManagement = () => {
  const { data: salesData, isLoading } = UseGetAllFlashSales();
  const { data: productsData }         = UseFetchProducts();
  const { mutate: createSale, isPending: isCreating } = UseCreateFlashSale();
  const { mutate: deleteSale }         = UseDeleteFlashSale();
  const { mutate: toggleSale }         = UseToggleFlashSale();
  const { mutate: updateSale, isPending: isUpdating } = UseUpdateFlashSale();

  const [showForm, setShowForm]       = useState(false);
  const [editingId, setEditingId]     = useState(null);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [form, setForm] = useState({
    title: "",
    discountPercent: "",
    startDate: "",
    endDate: "",
  });

  const flashSales = salesData?.flashSales || [];
  const products   = productsData || [];

  const resetForm = () => {
    setForm({ title: "", discountPercent: "", startDate: "", endDate: "" });
    setSelectedProducts([]);
    setEditingId(null);
    setShowForm(false);
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleProductToggle = (productId) => {
    setSelectedProducts(prev =>
      prev.includes(productId)
        ? prev.filter(id => id !== productId)
        : [...prev, productId]
    );
  };

  const handleSubmit = () => {
    if (!form.discountPercent || !form.startDate || !form.endDate) {
      toast.error("Discount, start date and end date required.");
      return;
    }

    if (new Date(form.startDate) >= new Date(form.endDate)) {
      toast.error("End date must be after start date.");
      return;
    }

    const payload = {
      title: form.title || "Flash Sale",
      discountPercent: Number(form.discountPercent),
      startDate: form.startDate,
      endDate: form.endDate,
      products: selectedProducts,
    };

    if (editingId) {
      updateSale(
        { id: editingId, data: payload },
        {
          onSuccess: () => { toast.success("Flash sale updated!"); resetForm(); },
          onError: () => toast.error("Failed to update.")
        }
      );
    } else {
      createSale(payload, {
        onSuccess: () => { toast.success("Flash sale created!"); resetForm(); },
        onError: (err) => toast.error(err?.response?.data?.message || "Failed to create.")
      });
    }
  };

  const handleEdit = (sale) => {
    setEditingId(sale._id);
    setForm({
      title: sale.title,
      discountPercent: sale.discountPercent,
      startDate: new Date(sale.startDate).toISOString().slice(0, 16),
      endDate: new Date(sale.endDate).toISOString().slice(0, 16),
    });
    setSelectedProducts(sale.products?.map(p => p._id || p) || []);
    setShowForm(true);
  };

  const handleDelete = (id) => {
    if (!window.confirm("Delete this flash sale?")) return;
    deleteSale(id, {
      onSuccess: () => toast.success("Deleted."),
      onError: () => toast.error("Failed to delete.")
    });
  };

  const handleToggle = (id) => {
    toggleSale(id, {
      onSuccess: () => toast.success("Status updated."),
      onError: () => toast.error("Failed.")
    });
  };

  const isExpired = (endDate) => new Date() > new Date(endDate);
  const isUpcoming = (startDate) => new Date() < new Date(startDate);

  if (isLoading) return <LoadingSpinner />;

  return (
    <div className="bg-gray-50 min-h-screen p-4 md:p-6">

      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
            <FaBolt className="text-yellow-500" />
            Flash Sale Management
          </h2>
          <p className="text-gray-500 text-sm mt-1">
            Create and manage flash sales
          </p>
        </div>
        <button
          onClick={() => { resetForm(); setShowForm(!showForm); }}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-blue-700 transition text-sm"
        >
          {showForm ? "Cancel" : "+ Create Flash Sale"}
        </button>
      </div>

      {/* Create/Edit Form */}
      {showForm && (
        <div className="bg-white rounded-xl shadow p-6 mb-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold text-gray-700">
              {editingId ? "Edit Flash Sale" : "New Flash Sale"}
            </h3>
            <button onClick={resetForm}>
              <MdClose className="text-xl text-gray-400 hover:text-gray-600" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-semibold text-gray-500 mb-1 block">
                Sale Title
              </label>
              <input
                name="title"
                value={form.title}
                onChange={handleChange}
                placeholder="e.g. Eid Special Sale"
                className="input input-bordered w-full"
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-gray-500 mb-1 block">
                Discount % *
              </label>
              <input
                name="discountPercent"
                type="number"
                value={form.discountPercent}
                onChange={handleChange}
                placeholder="e.g. 20"
                min="1"
                max="90"
                className="input input-bordered w-full"
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-gray-500 mb-1 block">
                Start Date & Time *
              </label>
              <input
                name="startDate"
                type="datetime-local"
                value={form.startDate}
                onChange={handleChange}
                className="input input-bordered w-full"
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-gray-500 mb-1 block">
                End Date & Time *
              </label>
              <input
                name="endDate"
                type="datetime-local"
                value={form.endDate}
                onChange={handleChange}
                className="input input-bordered w-full"
              />
            </div>
          </div>

          {/* Product Selection */}
          <div className="mt-4">
            <label className="text-xs font-semibold text-gray-500 mb-2 block">
              Select Products ({selectedProducts.length} selected)
            </label>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2 max-h-60 overflow-y-auto border rounded-xl p-3">
              {products.map((product) => (
                <div
                  key={product._id}
                  onClick={() => handleProductToggle(product._id)}
                  className={`flex items-center gap-2 p-2 rounded-lg cursor-pointer border transition ${
                    selectedProducts.includes(product._id)
                      ? "border-blue-500 bg-blue-50"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                >
                  <img
                    src={product.images?.[0]}
                    alt={product.name}
                    className="w-10 h-10 object-cover rounded-lg flex-shrink-0"
                  />
                  <div className="overflow-hidden">
                    <p className="text-xs font-semibold text-gray-700 truncate">
                      {product.name}
                    </p>
                    <p className="text-xs text-green-600 font-bold">
                      ৳{product.price}
                    </p>
                  </div>
                  {selectedProducts.includes(product._id) && (
                    <span className="ml-auto text-blue-600 text-lg">✓</span>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Preview */}
          {form.discountPercent && form.startDate && form.endDate && (
            <div className="mt-4 bg-yellow-50 border border-yellow-200 rounded-xl p-3 text-sm">
              <p className="font-semibold text-yellow-700">Preview:</p>
              <p className="text-yellow-600 mt-1">
                <strong>{form.title || "Flash Sale"}</strong> —
                {form.discountPercent}% discount
                from <strong>{new Date(form.startDate).toLocaleString()}</strong>
                to <strong>{new Date(form.endDate).toLocaleString()}</strong>
                with <strong>{selectedProducts.length}</strong> products
              </p>
            </div>
          )}

          <button
            onClick={handleSubmit}
            disabled={isCreating || isUpdating}
            className="mt-4 bg-green-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-green-700 transition"
          >
            {isCreating || isUpdating
              ? "Saving..."
              : editingId ? "Update Sale" : "Create Sale"
            }
          </button>
        </div>
      )}

      {/* Flash Sales List */}
      {flashSales.length === 0 ? (
        <div className="bg-white rounded-xl shadow p-12 text-center text-gray-400">
          <FaBolt className="text-5xl mx-auto mb-3 opacity-20" />
          <p>No flash sales yet. Create one!</p>
        </div>
      ) : (
        <div className="space-y-4">
          {flashSales.map((sale) => {
            const expired  = isExpired(sale.endDate);
            const upcoming = isUpcoming(sale.startDate);
            const active   = sale.isActive && !expired && !upcoming;

            return (
              <div
                key={sale._id}
                className="bg-white rounded-xl shadow p-5"
              >
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <div className={`p-3 rounded-xl ${active ? "bg-yellow-100" : "bg-gray-100"}`}>
                      <FaBolt className={`text-xl ${active ? "text-yellow-500" : "text-gray-400"}`} />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-bold text-gray-800">{sale.title}</h3>
                        <span className={`text-xs px-2 py-0.5 rounded-full font-semibold ${
                          expired
                            ? "bg-red-100 text-red-600"
                            : upcoming
                            ? "bg-blue-100 text-blue-600"
                            : active
                            ? "bg-green-100 text-green-600"
                            : "bg-gray-100 text-gray-600"
                        }`}>
                          {expired ? "Expired" : upcoming ? "Upcoming" : active ? "Live" : "Inactive"}
                        </span>
                      </div>
                      <p className="text-sm text-gray-500 mt-0.5">
                        {sale.discountPercent}% off ·
                        {new Date(sale.startDate).toLocaleDateString()} →
                        {new Date(sale.endDate).toLocaleDateString()}
                      </p>
                      <p className="text-xs text-gray-400 mt-0.5">
                        {sale.products?.length || 0} products selected
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleToggle(sale._id)}
                      className={`text-xs px-3 py-1.5 rounded-lg font-semibold transition ${
                        sale.isActive
                          ? "bg-yellow-100 text-yellow-700 hover:bg-yellow-200"
                          : "bg-green-100 text-green-700 hover:bg-green-200"
                      }`}
                    >
                      {sale.isActive ? "Deactivate" : "Activate"}
                    </button>
                    <button
                      onClick={() => handleEdit(sale)}
                      className="text-xs px-3 py-1.5 rounded-lg bg-blue-100 text-blue-700 hover:bg-blue-200 font-semibold transition flex items-center gap-1"
                    >
                      <MdEdit /> Edit
                    </button>
                    <button
                      onClick={() => handleDelete(sale._id)}
                      className="text-xs px-3 py-1.5 rounded-lg bg-red-100 text-red-600 hover:bg-red-200 font-semibold transition flex items-center gap-1"
                    >
                      <MdDelete /> Delete
                    </button>
                  </div>
                </div>

                {/* Selected Products Preview */}
                {sale.products?.length > 0 && (
                  <div className="mt-4 flex gap-2 flex-wrap">
                    {sale.products.slice(0, 6).map((p, i) => (
                      <img
                        key={i}
                        src={p.images?.[0]}
                        alt={p.name}
                        className="w-10 h-10 object-cover rounded-lg border border-gray-200"
                        title={p.name}
                      />
                    ))}
                    {sale.products.length > 6 && (
                      <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center text-xs text-gray-500 font-bold">
                        +{sale.products.length - 6}
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default FlashSaleManagement;