import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: String,
  price: { type: Number, required: true },
  originalPrice: { type: Number, default: 0 },
  category: { type: String, required: true },
  brand: String,
  stock: { type: Number, default: 0 },
  images: [String],
  ratings: { type: Number, default: 0 },
  isFeatured: { type: Boolean, default: false },   // ← new
  isNewArrival: { type: Boolean, default: false },  // ← new
  reviews: [{
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    comment: String,
    rating: Number,
  }],
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
}, { timestamps: true });

export default mongoose.model("Product", productSchema);