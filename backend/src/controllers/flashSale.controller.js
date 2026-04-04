import FlashSaleModel from "../models/FlashSale.model.js";

// Public — current active flash sale
export const getActiveFlashSale = async (req, res) => {
  try {
    const now = new Date();
    const flashSale = await FlashSaleModel.findOne({
      isActive: true,
      startDate: { $lte: now },
      endDate: { $gte: now }
    }).populate("products", "name price originalPrice images stock isFeatured");

    if (!flashSale) {
      return res.status(404).json({
        success: false,
        message: "No active flash sale."
      });
    }

    res.status(200).json({ success: true, flashSale });
  } catch (err) {
    res.status(500).json({ success: false, message: "Server error", error: err.message });
  }
};

// Admin — create flash sale
export const createFlashSale = async (req, res) => {
  const { title, discountPercent, startDate, endDate, products } = req.body;

  if (!discountPercent || !startDate || !endDate) {
    return res.status(400).json({
      success: false,
      message: "Discount, start date and end date required."
    });
  }

  try {
    const flashSale = new FlashSaleModel({
      title: title || "Flash Sale",
      discountPercent,
      startDate: new Date(startDate),
      endDate: new Date(endDate),
      products: products || [],
      isActive: true
    });

    await flashSale.save();
    res.status(201).json({ success: true, message: "Flash sale created!", flashSale });
  } catch (err) {
    res.status(500).json({ success: false, message: "Server error", error: err.message });
  }
};

// Admin — get all flash sales
export const getAllFlashSales = async (req, res) => {
  try {
    const flashSales = await FlashSaleModel.find({})
      .populate("products", "name price images")
      .sort({ createdAt: -1 });
    res.status(200).json({ success: true, flashSales });
  } catch (err) {
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// Admin — update flash sale
export const updateFlashSale = async (req, res) => {
  try {
    const flashSale = await FlashSaleModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!flashSale) {
      return res.status(404).json({ success: false, message: "Flash sale not found." });
    }
    res.status(200).json({ success: true, message: "Updated!", flashSale });
  } catch (err) {
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// Admin — delete flash sale
export const deleteFlashSale = async (req, res) => {
  try {
    await FlashSaleModel.findByIdAndDelete(req.params.id);
    res.status(200).json({ success: true, message: "Flash sale deleted." });
  } catch (err) {
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// Admin — toggle active
export const toggleFlashSale = async (req, res) => {
  try {
    const flashSale = await FlashSaleModel.findById(req.params.id);
    if (!flashSale) {
      return res.status(404).json({ success: false, message: "Not found." });
    }
    flashSale.isActive = !flashSale.isActive;
    await flashSale.save();
    res.status(200).json({
      success: true,
      message: `Flash sale ${flashSale.isActive ? "activated" : "deactivated"}.`,
      flashSale
    });
  } catch (err) {
    res.status(500).json({ success: false, message: "Server error" });
  }
};