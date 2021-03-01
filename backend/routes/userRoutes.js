import express from "express";
const router = express.Router();

import { authHandler, adminHandler } from "../middleware/adminMiddleware.js";
import validateUser from "../utils/validator.js";
import {
  registerUser,
  loginUser,
  getAllUser,
  getUserById,
  getUserProfile,
  updateUserProfile,
  updateUser,
  deleteUser,
} from "../controllers/userController.js";

router
  .route("/")
  .post(validateUser, registerUser)
  .get(authHandler, adminHandler, getAllUser);
router.post("/login", loginUser);
router
  .route("/profile")
  .get(authHandler, getUserProfile)
  .put(authHandler, updateUserProfile);
router
  .route("/:id")
  .delete(authHandler, adminHandler, deleteUser)
  .get(authHandler, adminHandler, getUserById)
  .put(authHandler, adminHandler, updateUser);

export default router;
