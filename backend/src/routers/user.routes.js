import express from 'express';
import { deleteUser, getAllUsers, getUserProfile, loginUser, logoutUser, makeAdmin, registerUser, updateUserProfile } from '../controllers/user.controller.js';
import { verifyToken } from './../middleware/verifyToken.js';
import { checkAdmin } from './../middleware/checkAdmin.js';

const router = express.Router();


//public routes
router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/logout", logoutUser);

// Protected (user)

router.get("/profile",verifyToken, getUserProfile);
router.put("/profile/:id",verifyToken, updateUserProfile);







//admin routes
router.get("/",verifyToken, getAllUsers);
router.put("/makeadmin/:id",verifyToken, checkAdmin, makeAdmin);
router.delete("/:id",verifyToken, checkAdmin, deleteUser);









export default router;