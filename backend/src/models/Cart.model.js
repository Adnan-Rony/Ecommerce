import mongoose from "mongoose";

const cartSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: false
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

export default mongoose.model("Cart", cartSchema);