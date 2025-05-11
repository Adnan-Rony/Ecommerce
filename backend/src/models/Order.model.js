// models/Order.model.js
import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  items: [
    {
      product: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
      quantity: Number,
    }
  ],
  shippingAddress: {
    address: String,
    city: String,
    postalCode: String,
    country: String,
  },
  totalAmount: Number,
  status: {
    type: String,
    enum: ["pending", "shipped", "delivered", "cancelled"],
    default: "pending",
  },
  paymentMethod: {
  type: String,
  enum: ['COD', 'Online'],
  required: true,
  default: 'COD',
},
paymentStatus: {
  type: String,
  enum: ['pending', 'paid', 'failed'],
  default: 'pending',
},

}, { timestamps: true });

export default mongoose.model("Order", orderSchema);
