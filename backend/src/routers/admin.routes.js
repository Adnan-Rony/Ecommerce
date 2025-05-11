import express from "express";
import { verifyToken } from './../middleware/verifyToken.js';
import { checkAdmin } from './../middleware/checkAdmin.js';
import { getAdminStats, getSalesReport } from "../controllers/admin.controller.js";


const router = express.Router();


router.get('/stats',verifyToken,checkAdmin,getAdminStats)
router.get('/stats-report',verifyToken,checkAdmin,getSalesReport)







export default router;