import express from "express";
import { verifyToken } from "../middleware/verifyToken.js";
import { placeOrder } from "../controllers/order.controller.js";


const router = express.Router();

router.post("/create",verifyToken,placeOrder)


export default router;