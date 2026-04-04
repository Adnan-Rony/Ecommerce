import express from "express";
import {
  applyCoupon,
  createCoupon,
  getAllCoupons,
  deleteCoupon,
  toggleCoupon
} from "../controllers/coupon.controller.js";
import { verifyToken } from "../middleware/verifyToken.js";
import { checkAdmin } from "../middleware/checkAdmin.js";

const router = express.Router();

// Public — customer apply করবে
router.post("/apply", applyCoupon);

// Admin only
router.post("/create", verifyToken, checkAdmin, createCoupon);
router.get("/all", verifyToken, checkAdmin, getAllCoupons);
router.delete("/:id", verifyToken, checkAdmin, deleteCoupon);
router.patch("/toggle/:id", verifyToken, checkAdmin, toggleCoupon);

export default router;