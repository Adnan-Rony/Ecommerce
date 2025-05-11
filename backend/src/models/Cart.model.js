
import mongoose from "mongoose";

const cartSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true ,unique: true},
  products: [
    {
      product: { type: mongoose.Schema.Types.ObjectId, ref: "Product",required: true },
      quantity: { type: Number, default: 1 },
       size: { type: String }, // e.g., "L", "XL"
    }
  ]
}, { timestamps: true });

export default mongoose.model("Cart", cartSchema);
