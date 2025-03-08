import userOTP from "../../../models/index.js";
import bcrypt from "bcryptjs";
import send_email from "../../../lib/node-mailer/index.js";
import { insertNewDocument, findOneAndSelect, findOne } from "../../../helpers/index.js";

const sendOTP = async (req, res) => {
  console.log("heelo");
  console.log(req,"req");
  
  try {
    const { email,userType } = req.body;
  
    const user = await findOne("user", { email,userType });

    console.log(user, "user");

    if (!user) {
      return res.status(400).send({ status: 400, message: "Invalid Email" });
    }

    const otp = `${Math.floor(1000 + Math.random() * 9000)}`;
    console.log(otp, "otp");

 

    // hash the otp
    const saltRounds = 10;

    const hashedOTP = await bcrypt.hash(otp, saltRounds);
    console.log(hashedOTP, "hashedOTP");

    const otpRes = await insertNewDocument("userOTP", {
      userEmail: email,
      userType:userType,
      otp: hashedOTP,
      createdAt: Date.now(),
      expiresAt: Date.now() + 3600000,
    });
  console.log(otpRes,"otpRes");
  
    await send_email(
      "signuptemplate",
      {
        otp: otp,
      },
      "owaisy028@gmail.com",
      "Verify Your Email",
      email
    );
console.log("finalres");

  // return res.status(200).json({
  //     status: "Pending",
  //     message: "Verification otp email sent",
  //     data: {
  //       userEmail: email,
  //     },
  //   });
  } catch (error) {
    res.status(500).json({
      status: "Failed",
      message: "Enter current otp",
    });
  }
};

export default sendOTP;
