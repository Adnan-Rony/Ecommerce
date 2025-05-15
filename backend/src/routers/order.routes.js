import express from "express";
import { verifyToken } from "../middleware/verifyToken.js";
import { getSingleOrder, getUserAllOrders, getUserOrders, placeOrder, updateOrderStatus } from "../controllers/order.controller.js";
import { checkAdmin } from "../middleware/checkAdmin.js";
import { createPaymentIntent } from "../controllers/paymentController.js";


const router = express.Router();

router.post("/create",verifyToken,placeOrder)
router.get("/my-orders",verifyToken,getUserOrders)
router.get("/allorders",verifyToken,checkAdmin,getUserAllOrders)
router.get("/:id",verifyToken,getSingleOrder)

router.get("/allorders",verifyToken,checkAdmin,getUserAllOrders)


router.put("/status/:id",verifyToken,checkAdmin,updateOrderStatus)

router.post('/create-payment-intent', verifyToken, createPaymentIntent);

export default router;