import express from "express";
import { verifyToken } from "../middleware/verifyToken.js";
import {
  getSingleOrder,
  getUserAllOrders,
  getUserOrders,
  placeOrder,
  updateOrderStatus,
  trackOrderByPhone
} from "../controllers/order.controller.js";
import { checkAdmin } from "../middleware/checkAdmin.js";

const router = express.Router();

// Guest & logged-in — no verifyToken
router.post("/create", placeOrder);

// Admin only — must be BEFORE /:id
router.get("/allorders", verifyToken, checkAdmin, getUserAllOrders);
router.put("/status/:id", verifyToken, checkAdmin, updateOrderStatus);

// Logged-in only — /:id must be LAST
router.get("/my-orders", verifyToken, getUserOrders);
router.get("/:id", verifyToken, getSingleOrder);

router.get("/track/:phone", trackOrderByPhone);

export default router;