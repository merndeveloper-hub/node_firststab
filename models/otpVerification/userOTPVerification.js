import mongoose from "mongoose";
import schemaType from "../../types/index.js";

const userOTPVerificationSchema = new mongoose.Schema(
  {
    userEmail: schemaType.TypeString,
     userType: { type: schemaType.TypeString, enum: ["user", "pro"] }, // Identifies the user type
    otp: schemaType.TypeString,
    createdAt: Date,
    expiresAt: Date,
},
  { timestamps: true }
);

export default userOTPVerificationSchema;
