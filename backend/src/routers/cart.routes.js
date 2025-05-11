import express from "express";
import { verifyToken } from './../middleware/verifyToken.js';
import { addToCart, removeCartItem, getCart, updateCartItem } from "../controllers/cart.controller.js";



const router = express.Router();


router.post("/add",verifyToken,addToCart)
router.get("/",verifyToken,getCart)
router.put("/:id",verifyToken,updateCartItem)
router.delete("/item",verifyToken,removeCartItem)






export default router;