import  userOTP  from "../../../models/index.js";
import user from'../../../models/index.js';
import bcrypt from "bcryptjs";
import {
  deleteManyDocument,
  updateDocument,
  find,
} from "../../../helpers/index.js";

const verifyOTP = async (req, res) => {
  try {
    const { userEmail, otp } = req.body;
    if (!userEmail || !otp) {
      throw Error("Empty otp details are not allowed");
    } else {
      const UserOTPVerificationRecords = await find("userOTP", {
        userEmail,
      });
      if (UserOTPVerificationRecords.length <= 0) {
        // no record found
        throw new Error(
          "Account record doesn't exist or has been verified already. Please sign up or login"
        );
      } else {
        // user otp record exists
        const { expiresAt } = UserOTPVerificationRecords[0];
        const hashedOTP = UserOTPVerificationRecords[0].otp;

        if (expiresAt < Date.now()) {
          // user otp record has expired
          //await UserOTPVerification.deleteMany({ userId });
          const deleteOtp = await deleteManyDocument("userOTP", {
            userEmail,
          });

          throw new Error("Code has expired. Please request again");
        } else {
          const validOTP = await bcrypt.compare(otp, hashedOTP);

          if (!validOTP) {
            // supplied otp is wrong
            throw new Error("Invalid code passed. Check your inbox.");
          } else {
            // success
            await updateDocument("user", { email: userEmail }, { verified: true });
            //  await UserOTPVerification.deleteMany({ userId });
            await deleteManyDocument("userOTP", { userEmail });
      
            res.status(200).json({
              status: "Verified",
              message: "User email verified successfully.",
            });
          }
        }
      }
    }
  } catch (error) {
    res.json({
      status: "Failed",
      message: error.message,
    });
  }
};

export default verifyOTP;
