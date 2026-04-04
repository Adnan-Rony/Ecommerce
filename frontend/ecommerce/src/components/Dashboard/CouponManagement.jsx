import { useState } from "react";
import toast from "react-hot-toast";
import LoadingSpinner from "../LoadingSpinner.jsx";
import {
  UseGetAllCoupons,
  UseCreateCoupon,
  UseDeleteCoupon,
  UseToggleCoupon
} from "../../features/coupons/CouponQuery.js";

const CouponManagement = () => {
  const { data, isLoading } = UseGetAllCoupons();
  const { mutate: createCoupon, isPending: isCreating } = UseCreateCoupon();
  const { mutate: deleteCoupon, isPending: isDeleting } = UseDeleteCoupon();
  const { mutate: toggleCoupon } = UseToggleCoupon();

  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({
    code: "",
    discountType: "percentage",
    discountValue: "",
    minOrderAmount: "",
    maxUses: "100",
    expiresAt: ""
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleCreate = () => {
    if (!form.code || !form.discountValue || !form.expiresAt) {
      toast.error("Code, discount value and expiry date required.");
      return;
    }

    createCoupon(
      {
        code: form.code.toUpperCase(),
        discountType: form.discountType,
        discountValue: Number(form.discountValue),
        minOrderAmount: Number(form.minOrderAmount) || 0,
        maxUses: Number(form.maxUses) || 100,
        expiresAt: form.expiresAt
      },
      {
        onSuccess: () => {
          toast.success("Coupon created!");
          setShowForm(false);
          setForm({
            code: "",
            discountType: "percentage",
            discountValue: "",
            minOrderAmount: "",
            maxUses: "100",
            expiresAt: ""
          });
        },
        onError: (err) => {
          toast.error(err?.response?.data?.message || "Failed to create coupon.");
        }
      }
    );
  };

  const handleDelete = (id) => {
    if (!window.confirm("Delete this coupon?")) return;
    deleteCoupon(id, {
      onSuccess: () => toast.success("Coupon deleted."),
      onError: () => toast.error("Failed to delete.")
    });
  };

  const handleToggle = (id) => {
    toggleCoupon(id, {
      onSuccess: () => toast.success("Coupon status updated."),
      onError: () => toast.error("Failed to update.")
    });
  };

  if (isLoading) return <LoadingSpinner />;

  const coupons = data?.coupons || [];

  return (
    <div className="bg-gray-50 min-h-screen p-4 md:p-6">

      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Coupon Management</h2>
          <p className="text-gray-500 text-sm mt-1">Create and manage discount coupons</p>
        </div>
        <button
          onClick={() => setShowForm(!showForm)}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-blue-700 transition text-sm"
        >
          {showForm ? "Cancel" : "+ Create Coupon"}
        </button>
      </div>

      {/* Create Form */}
      {showForm && (
        <div className="bg-white rounded-xl shadow p-6 mb-6">
          <h3 className="text-lg font-semibold mb-4 text-gray-700">New Coupon</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

            <div>
              <label className="text-xs font-semibold text-gray-500 mb-1 block">
                Coupon Code *
              </label>
              <input
                name="code"
                value={form.code}
                onChange={handleChange}
                placeholder="e.g. WELCOME20"
                className="input input-bordered w-full uppercase"
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-gray-500 mb-1 block">
                Discount Type *
              </label>
              <select
                name="discountType"
                value={form.discountType}
                onChange={handleChange}
                className="input input-bordered w-full"
              >
                <option value="percentage">Percentage (%)</option>
                <option value="fixed">Fixed Amount (৳)</option>
              </select>
            </div>

            <div>
              <label className="text-xs font-semibold text-gray-500 mb-1 block">
                Discount Value *
              </label>
              <input
                name="discountValue"
                value={form.discountValue}
                onChange={handleChange}
                type="number"
                placeholder={form.discountType === "percentage" ? "e.g. 20 (= 20%)" : "e.g. 50 (= ৳50)"}
                className="input input-bordered w-full"
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-gray-500 mb-1 block">
                Min Order Amount (৳)
              </label>
              <input
                name="minOrderAmount"
                value={form.minOrderAmount}
                onChange={handleChange}
                type="number"
                placeholder="e.g. 500"
                className="input input-bordered w-full"
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-gray-500 mb-1 block">
                Max Uses
              </label>
              <input
                name="maxUses"
                value={form.maxUses}
                onChange={handleChange}
                type="number"
                placeholder="e.g. 100"
                className="input input-bordered w-full"
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-gray-500 mb-1 block">
                Expiry Date *
              </label>
              <input
                name="expiresAt"
                value={form.expiresAt}
                onChange={handleChange}
                type="date"
                className="input input-bordered w-full"
              />
            </div>

          </div>

          {/* Preview */}
          {form.code && form.discountValue && (
            <div className="mt-4 bg-blue-50 rounded-lg p-3 text-sm">
              <p className="font-semibold text-blue-700">Preview:</p>
              <p className="text-blue-600 mt-1">
                Code: <strong>{form.code.toUpperCase()}</strong> —
                {form.discountType === "percentage"
                  ? ` ${form.discountValue}% off`
                  : ` ৳${form.discountValue} off`}
                {form.minOrderAmount && ` on orders above ৳${form.minOrderAmount}`}
              </p>
            </div>
          )}

          <button
            onClick={handleCreate}
            disabled={isCreating}
            className="mt-4 bg-green-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-green-700 transition"
          >
            {isCreating ? "Creating..." : "Create Coupon"}
          </button>
        </div>
      )}

      {/* Stats */}
      <div className="grid grid-cols-3 gap-3 mb-6">
        <div className="bg-white rounded-lg shadow p-4 border-l-4 border-blue-500">
          <p className="text-xs text-gray-500">Total</p>
          <p className="text-2xl font-bold">{coupons.length}</p>
        </div>
        <div className="bg-white rounded-lg shadow p-4 border-l-4 border-green-500">
          <p className="text-xs text-gray-500">Active</p>
          <p className="text-2xl font-bold text-green-600">
            {coupons.filter(c => c.isActive).length}
          </p>
        </div>
        <div className="bg-white rounded-lg shadow p-4 border-l-4 border-red-500">
          <p className="text-xs text-gray-500">Inactive</p>
          <p className="text-2xl font-bold text-red-500">
            {coupons.filter(c => !c.isActive).length}
          </p>
        </div>
      </div>

      {/* Coupon Table */}
      <div className="bg-white rounded-xl shadow overflow-x-auto">
        <table className="w-full min-w-[700px] text-sm text-left">
          <thead className="bg-gray-50 text-xs uppercase text-gray-500 border-b">
            <tr>
              <th className="px-4 py-3">Code</th>
              <th className="px-4 py-3">Discount</th>
              <th className="px-4 py-3">Min Order</th>
              <th className="px-4 py-3">Used / Max</th>
              <th className="px-4 py-3">Expires</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {coupons.length === 0 ? (
              <tr>
                <td colSpan={7} className="text-center py-12 text-gray-400">
                  No coupons yet. Create one!
                </td>
              </tr>
            ) : (
              coupons.map((coupon) => {
                const isExpired = new Date() > new Date(coupon.expiresAt);
                return (
                  <tr key={coupon._id} className="border-b hover:bg-gray-50 transition">
                    <td className="px-4 py-3">
                      <span className="font-mono font-bold text-blue-700 bg-blue-50 px-2 py-1 rounded">
                        {coupon.code}
                      </span>
                    </td>
                    <td className="px-4 py-3 font-semibold text-green-600">
                      {coupon.discountType === "percentage"
                        ? `${coupon.discountValue}%`
                        : `৳${coupon.discountValue}`}
                    </td>
                    <td className="px-4 py-3">
                      {coupon.minOrderAmount > 0 ? `৳${coupon.minOrderAmount}` : "—"}
                    </td>
                    <td className="px-4 py-3">
                      <span className={`font-semibold ${
                        coupon.usedCount >= coupon.maxUses ? "text-red-500" : "text-gray-700"
                      }`}>
                        {coupon.usedCount} / {coupon.maxUses}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <span className={isExpired ? "text-red-500" : "text-gray-600"}>
                        {new Date(coupon.expiresAt).toLocaleDateString("en-GB")}
                        {isExpired && " (Expired)"}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                        coupon.isActive && !isExpired
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-600"
                      }`}>
                        {coupon.isActive && !isExpired ? "Active" : "Inactive"}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleToggle(coupon._id)}
                          className={`text-xs px-2 py-1 rounded font-semibold transition ${
                            coupon.isActive
                              ? "bg-yellow-100 text-yellow-700 hover:bg-yellow-200"
                              : "bg-green-100 text-green-700 hover:bg-green-200"
                          }`}
                        >
                          {coupon.isActive ? "Deactivate" : "Activate"}
                        </button>
                        <button
                          onClick={() => handleDelete(coupon._id)}
                          disabled={isDeleting}
                          className="text-xs px-2 py-1 rounded bg-red-100 text-red-600 hover:bg-red-200 font-semibold transition"
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

    </div>
  );
};

export default CouponManagement;