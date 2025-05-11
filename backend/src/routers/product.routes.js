import express from 'express';
import { createProduct, deleteProduct, getAllProducts, getProductById, updateProduct } from '../controllers/products.controller.js';
import { verifyToken } from './../middleware/verifyToken.js';
import { checkAdmin } from './../middleware/checkAdmin.js';


const router = express.Router();

//users
router.get("/",getAllProducts)
router.get("/:id",getProductById)


//user but protected
router.post("/create",verifyToken,checkAdmin,createProduct)

//admin
router.delete("/delete/:id",verifyToken,checkAdmin,deleteProduct)
router.put("/:id",verifyToken,checkAdmin,updateProduct)



export default router;