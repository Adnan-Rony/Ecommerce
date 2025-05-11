import express from "express";
import { verifyToken } from './../middleware/verifyToken.js';
import { addToWishlist, getWishlist, removeFromWishlist } from "../controllers/wishlist.Controller.js";

const router = express.Router();


router.post('/add',verifyToken,addToWishlist)
router.get('/',verifyToken,getWishlist)
router.delete('/:productId',verifyToken,removeFromWishlist)

export default router;
