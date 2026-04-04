import express from "express";
import {
  getActiveFlashSale,
  createFlashSale,
  getAllFlashSales,
  updateFlashSale,
  deleteFlashSale,
  toggleFlashSale
} from "../controllers/flashSale.controller.js";
import { verifyToken } from "../middleware/verifyToken.js";
import { checkAdmin } from "../middleware/checkAdmin.js";

const router = express.Router();

// Public
router.get("/active", getActiveFlashSale);

// Admin only
router.post("/create", verifyToken, checkAdmin, createFlashSale);
router.get("/all", verifyToken, checkAdmin, getAllFlashSales);
router.put("/:id", verifyToken, checkAdmin, updateFlashSale);
router.delete("/:id", verifyToken, checkAdmin, deleteFlashSale);
router.patch("/toggle/:id", verifyToken, checkAdmin, toggleFlashSale);

export default router;