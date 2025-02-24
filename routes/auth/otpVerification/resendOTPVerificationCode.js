import sendOTPVerificationEmail from "./sendOTPVerificationEmail.js";
//const  UserOTPVerification  = require("../../../models/otpVerification/index.js");
import { deleteManyDocument } from "../../../helpers/index.js";

const resendOTPVerificationCode = async (req, res) => {
  try {
    const { userEmail } = req.body;
    if (!userEmail) {
      throw new Error("Empty user details are not allowed");
    } else {
      const deleteOtp = await deleteManyDocument("userOTP", {
        userEmail,
      });
      await sendOTPVerificationEmail(req, res);

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
