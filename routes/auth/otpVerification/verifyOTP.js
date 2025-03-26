import  userOTP  from "../../../models/index.js";
import user from'../../../models/index.js';
import bcrypt from "bcryptjs";
import {
  deleteManyDocument,
  updateDocument,
  find,
} from "../../../helpers/index.js";
import Joi from "joi";

const schema = Joi.object({
  userEmail: Joi.string().email().required(),
  otp: Joi.string().required()
});


const verifyOTP = async (req, res) => {

  try {

    await schema.validateAsync(req.body)
    const { userEmail, otp } = req.body;
      if (!userEmail || !otp) {
        return res.status(400).send({ status: 400, message: "Both email and OTP are required" });
      }
     else {
      const UserOTPVerificationRecords = await find("userOTP", {
        userEmail,
        status:"Pending"
      });
      if (!UserOTPVerificationRecords || UserOTPVerificationRecords.length == 0) {
        // no record found
        return res.status(401).send({ status: 401, message: "No OTP verification record found for this email. Please sign up again" });
      
      } else {
        // user otp record exists
        const { expiresAt } = UserOTPVerificationRecords[0];
        const hashedOTP = UserOTPVerificationRecords[0].otp;

        if (expiresAt < Date.now()) {
          // user otp record has expired
          //await UserOTPVerification.deleteMany({ userId });
          const deleteOtp = await deleteManyDocument("userOTP", {
            userEmail,
            status:"Pending"
          });
          return res.status(400).send({ status: 400, message: "Code has expired. Please request again" });
      
        } else {
          const validOTP = await bcrypt.compare(otp, hashedOTP);
          if (!validOTP) {
            // supplied otp is wrong
            return res.status(400).send({ status: 400, message: "The OTP you entered is invalid. Please check your inbox and try again." });
          } else {
            // success
            await updateDocument("user", { email: userEmail }, { status: "Active" });
            //  await UserOTPVerification.deleteMany({ userId });
            await deleteManyDocument("userOTP", { userEmail });
      
            res.status(200).json({
              status: 200,
              message: "OTP verified successfully.",
            });
          }
        }
      }
    }
  } catch (error) {
    res.status(400).json({
      status: 400,
      message: error.message,
    });
  }
};

export default verifyOTP;
