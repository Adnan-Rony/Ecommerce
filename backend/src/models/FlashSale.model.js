import mongoose from "mongoose";

const flashSaleSchema = new mongoose.Schema({
  title: {
    type: String,
    default: "Flash Sale"
  },
  discountPercent: {
    type: Number,
    required: true,
    default: 20
  },
  startDate: {
    type: Date,
    required: true
  },
  endDate: {
    type: Date,
    required: true
  },
  isActive: {
    type: Boolean,
    default: true
  },
  products: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product"
  }]
}, { timestamps: true });

export default mongoose.model("FlashSale", flashSaleSchema);