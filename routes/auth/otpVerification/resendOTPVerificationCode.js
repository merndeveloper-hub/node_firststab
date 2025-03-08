import sendOTPVerificationEmail from "./sendOTPSignup.js";
//const  UserOTPVerification  = require("../../../models/otpVerification/index.js");
import { deleteManyDocument } from "../../../helpers/index.js";

const resendOTPVerificationCode = async (req, res) => {
  try {
    const { email,userType } = req.body;
    if (!email) {
      throw new Error("Empty user details are not allowed");
    } else {
      const deleteOtp = await deleteManyDocument("userOTP", {
        userEmail:email,
        userType,
      });
      await sendOTPVerificationEmail({ email,userType }, res);

  return res.status(200).json({
      status: "Pending",
      message: "Verification otp email sent",
      data: {
        userEmail: email,
      },
    });

      // return res
      //   .status(200)
      //   .json({ status: 200, message: sendOTPVerificationEmail });
    }
  } catch (error) {
    res.json({
      status: "Failed",
      message: error.message,
    });
  }
};

export default resendOTPVerificationCode;
