// import userOTP from "../../../models/index.js";
// import bcrypt from "bcryptjs";
// import send_email from "../../../lib/node-mailer/index.js";
// import { insertNewDocument, findOneAndSelect } from "../../../helpers/index.js";

// const sendOTPSignup = async (req, res) => {
//   console.log("heelo");
//   console.log(req,"req");
  
//   try {
//     const {  userEmail } = req.body;
//     console.log(userEmail, "email");
//     const user = await findOneAndSelect("user", { userEmail });

//     console.log(user, "user");

//     if (!userEmail) {
//       return res.status(400).send({ status: 400, message: "Invalid Email" });
//     }

//     const otp = `${Math.floor(1000 + Math.random() * 9000)}`;
//     console.log(otp, "otp");

 

//     // hash the otp
//     const saltRounds = 10;

//     const hashedOTP = await bcrypt.hash(otp, saltRounds);
//     console.log(hashedOTP, "hashedOTP");

//     const otpRes = await insertNewDocument("userOTP", {
//       userEmail: userEmail,
//       otp: hashedOTP,
//       createdAt: Date.now(),
//       expiresAt: Date.now() + 3600000,
//     });
  
//     await send_email(
//       "otptemplate",
//       {
//         otp: otp,
//       },
//       "owaisy028@gmail.com",
//       "Verify Your Email",
//       userEmail
//     );

//     res.status(200).json({
//       status: "Pending",
//       message: "Verification otp email sent",
//       data: {
//         userEmail: userEmail,
//       },
//     });
//   } catch (error) {
//     res.status(500).json({
//       status: "Failed",
//       message: "Enter current otp",
//     });
//   }
// };

// export default sendOTPSignup;
