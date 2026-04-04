import express from 'express';
import {
  createProduct,
  deleteProduct,
  getAllProducts,
  getProductById,
  getRecommendedProducts,
  updateProduct
} from '../controllers/products.controller.js';
import { verifyToken } from './../middleware/verifyToken.js';
import { checkAdmin } from './../middleware/checkAdmin.js';

const router = express.Router();

// Public
router.get("/", getAllProducts);
router.get("/recommendations/:id", getRecommendedProducts); // ← /:id এর আগে
router.get("/:id", getProductById);

// Admin only
router.post("/create", verifyToken, checkAdmin, createProduct);
router.put("/:id", verifyToken, checkAdmin, updateProduct);
router.delete("/delete/:id", verifyToken, checkAdmin, deleteProduct);

export default router;