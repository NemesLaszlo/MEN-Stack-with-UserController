import asyncHandler from "express-async-handler";
import generateToken from "../token/tokenGenerator.js";
import User from "../models/userModel.js";
import {successLogger, errorLogger} from "../utils/logger.js";

// @desc   New user registration with data validation
// @route  POST /api/users
// @access Public access
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;
  const userExists = await User.findOne({ email: email });

  if (userExists) {
    res.status(400);
    throw new Error("User already exist");
  }

  const user = await User.create({
    name,
    email,
    password,
  });

  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user._id),
    });
    successLogger.info(`User with this email: ${user.email} registered successfully`)
  } else {
    errorLogger.error("Invalid user data in register");
    res.status(400);
    throw new Error("Invalid user data");
  }
});

// @desc   User login functionality
// @route  POST /api/users/login
// @access Public access
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email: email });

  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user._id),
    });
    successLogger.info(`User with this email: ${email} logged in successfully`)
  } else {
    errorLogger.error(`Login invalid email or password - used email: ${email}`);
    res.status(401);
    throw new Error("Invalid email or password");
  }
});

// @desc   Get all users
// @route  GET /api/users/
// @access Private access, Admin permission needed
const getAllUser = asyncHandler(async (req, res) => {
  const users = await User.find({});
  res.json(users);
});

// @desc   Get user by id
// @route  GET /api/users/:id
// @access Private access, Admin permission needed
const getUserById = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id).select("-password");
  if (user) {
    res.json(user);
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

// @desc   Get user profile
// @route  GET /api/users/profile
// @access Private access auth needed
const getUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

// @desc   Update user profile
// @route  PUT /api/users/profile
// @access Private access auth needed
const updateUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    if (req.body.password) {
      user.password = req.body.password;
    }

    const updatedUser = await user.save();
    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
      token: generateToken(updatedUser._id),
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

// @desc   Update a user
// @route  PUT /api/users/:id
// @access Private access, Admin permission needed
const updateUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);

  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    user.isAdmin = req.body.isAdmin;

    const updatedUser = await user.save();
    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
    });
    successLogger.info(`User ${user.email} profile update success`)
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

// @desc   Delete user
// @route  DELETE /api/users/:id
// @access Private access, Admin permission needed
const deleteUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);
  if (user) {
    await user.remove();
    successLogger.info(`User ${user.email} profile delete success`)
    res.json({ message: "User removed" });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

export {
  registerUser,
  loginUser,
  getAllUser,
  getUserById,
  getUserProfile,
  updateUserProfile,
  updateUser,
  deleteUser,
};
