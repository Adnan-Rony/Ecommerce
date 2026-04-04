import CouponModel from "../models/Coupon.model.js";

// Apply coupon — customer use করবে
export const applyCoupon = async (req, res) => {
  const { code, orderAmount } = req.body;

  if (!code || !orderAmount) {
    return res.status(400).json({
      success: false,
      message: "Coupon code and order amount required."
    });
  }

  try {
    const coupon = await CouponModel.findOne({
      code: code.toUpperCase(),
      isActive: true
    });

    if (!coupon) {
      return res.status(404).json({
        success: false,
        message: "Invalid or expired coupon code."
      });
    }

    // Check expiry
    if (new Date() > coupon.expiresAt) {
      return res.status(400).json({
        success: false,
        message: "This coupon has expired."
      });
    }

    // Check max uses
    if (coupon.usedCount >= coupon.maxUses) {
      return res.status(400).json({
        success: false,
        message: "This coupon has reached its usage limit."
      });
    }

    // Check minimum order amount
    if (orderAmount < coupon.minOrderAmount) {
      return res.status(400).json({
        success: false,
        message: `Minimum order amount is ৳${coupon.minOrderAmount} for this coupon.`
      });
    }

    // Calculate discount
    let discountAmount = 0;
    if (coupon.discountType === "percentage") {
      discountAmount = Math.round((orderAmount * coupon.discountValue) / 100);
    } else {
      discountAmount = coupon.discountValue;
    }

    const finalAmount = Math.max(0, orderAmount - discountAmount);

    res.status(200).json({
      success: true,
      message: "Coupon applied successfully!",
      coupon: {
        code: coupon.code,
        discountType: coupon.discountType,
        discountValue: coupon.discountValue,
        discountAmount,
        finalAmount
      }
    });

  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Server error",
      error: err.message
    });
  }
};

// Admin — create coupon
export const createCoupon = async (req, res) => {
  const {
    code, discountType, discountValue,
    minOrderAmount, maxUses, expiresAt
  } = req.body;

  if (!code || !discountValue || !expiresAt) {
    return res.status(400).json({
      success: false,
      message: "Code, discount value and expiry date required."
    });
  }

  try {
    const existing = await CouponModel.findOne({ code: code.toUpperCase() });
    if (existing) {
      return res.status(400).json({
        success: false,
        message: "Coupon code already exists."
      });
    }

    const coupon = new CouponModel({
      code: code.toUpperCase(),
      discountType: discountType || "percentage",
      discountValue,
      minOrderAmount: minOrderAmount || 0,
      maxUses: maxUses || 100,
      expiresAt: new Date(expiresAt)
    });

    await coupon.save();
    res.status(201).json({ success: true, message: "Coupon created!", coupon });

  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Server error",
      error: err.message
    });
  }
};

// Admin — get all coupons
export const getAllCoupons = async (req, res) => {
  try {
    const coupons = await CouponModel.find({}).sort({ createdAt: -1 });
    res.status(200).json({ success: true, coupons });
  } catch (err) {
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// Admin — delete coupon
export const deleteCoupon = async (req, res) => {
  try {
    await CouponModel.findByIdAndDelete(req.params.id);
    res.status(200).json({ success: true, message: "Coupon deleted." });
  } catch (err) {
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// Admin — toggle active/inactive
export const toggleCoupon = async (req, res) => {
  try {
    const coupon = await CouponModel.findById(req.params.id);
    if (!coupon) {
      return res.status(404).json({ success: false, message: "Coupon not found." });
    }
    coupon.isActive = !coupon.isActive;
    await coupon.save();
    res.status(200).json({
      success: true,
      message: `Coupon ${coupon.isActive ? "activated" : "deactivated"}.`,
      coupon
    });
  } catch (err) {
    res.status(500).json({ success: false, message: "Server error" });
  }
};