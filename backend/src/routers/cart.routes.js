import express from "express";
import { verifyToken } from "../middleware/verifyToken.js";
import {
  addToCart,
  removeCartItem,
  getCart,
  updateCartItem,
  clearCart
} from "../controllers/cart.controller.js";

const router = express.Router();

// Guest & logged-in users — no verifyToken
router.post("/add", addToCart);
router.get("/", getCart);
router.put("/:id", updateCartItem);
router.delete("/item", removeCartItem);

// Logged-in only
router.delete("/clear", verifyToken, clearCart);

export default router;