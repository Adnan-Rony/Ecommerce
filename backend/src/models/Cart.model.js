import mongoose from "mongoose";

const cartSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: false,
    default: null,
    sparse: true  // ← এটাই fix — null values কে unique থেকে বাদ দেয়
  },
  guestId: {
    type: String,
    required: false,
    index: true
  },
  products: [
    {
      product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: true
      },
      quantity: { type: Number, default: 1 },
      size: { type: String },
    }
  ],
  createdAt: {
    type: Date,
    default: Date.now,
    expires: 60 * 60 * 24 * 7
  }
}, { timestamps: true });

// Sparse unique index — শুধু logged-in user এর জন্য unique
cartSchema.index({ user: 1 }, { unique: true, sparse: true });

export default mongoose.model("Cart", cartSchema);