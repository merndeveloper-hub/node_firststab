import express from "express";
//const { tokenVerification } = require("../../middleware");
// const adminLogin = require("./admin-auth/login");
// const adminSignup = require("./admin-auth/signup");
 import loginUser from "./login/index.js";
import forgetPaasswd from "./forgot-password/index.js";
import resendOTPVerificationCode from "./otpVerification/resendOTPVerificationCode.js";
import verifyOTP from "./otpVerification/verifyOTP.js";
import sendOTP from "./otpVerification/sendOTPVerificationEmail.js";

// const addWalletAddress = require("./signup/add-wallet-address");
import userSignup from "./signup/userSignup.js";
import proSignup from "./signup/proSignup.js";
import logout from "./logout/index.js";
const router = express.Router();

// User
router.post("/forgetpassword", forgetPaasswd);
router.post("/verifyotp", verifyOTP);
router.post("/sendotp", sendOTP);
router.post("/resendotp", resendOTPVerificationCode);
router.post("/register/user", userSignup);
router.post("/register/pro", proSignup);

router.post("/userlogin", loginUser);
router.delete("/logout/:id",logout)
// router.get("/register/metamask/:username", tokenVerification, addWalletAddress);

// Admin
//router.post("/admin/register", adminSignup);
//router.post("/admin/login", adminLogin);

export default router;
