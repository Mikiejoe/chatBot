const express = require("express");
const router = express.Router();
const {body}  = require("express-validator");
const { User } = require("../models/user.model");
const authController = require("../controllers/auth.controller");


const validateUser =[
    body("username").trim().isLength({min:3}).withMessage("Username must be atleast 3 characters long"),
    body("email").isEmail().withMessage("Invalid email"),
    body("password").isLength({min:6}).withMessage("Password must be atleast 6 characters long").isStrongPassword().withMessage("Password must contain atleast 1 uppercase, 1 lowercase, 1 number and 1 special character"),
]


router.post("/signup",validateUser,authController.signup );

router.post("/login", authController.login);
router.post("/forgot-password", authController.forgotPassword);

router.post("/reset-password", authController.resetPassword);
router.post("/change-password", authController.changePassword);
router.post("/verify-otp", authController.verifyOTP);

module.exports = router;
