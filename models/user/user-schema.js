import mongoose from "mongoose";
import schemaType from "../../types/index.js";

const userSchema = new mongoose.Schema(
  {
    first_Name: {
      type: schemaType.TypeString,
    },
    last_Name: {
      type: schemaType.TypeString,
    },
    email: {
      type: schemaType.TypeString,
      unique: true,
    },
    dateOfBirth: {
      type: schemaType.TypeString,
    },
    ssn_Number: {
      type: schemaType.TypeString,
    },
    mobile: {
      type: schemaType.TypeString,

      unique: true,
    },
    serviceType: {
      type: [String], // Array of strings
      enum: ["video", "message", "remote", "in_personal"], // Allowed values
      default: undefined,
    },

    password: {
      type: schemaType.TypeString,
    },

    type: {
      type: schemaType.TypeString,
      ref: "userTypes",
    },

    userType: { type: schemaType.TypeString, enum: ["user", "pro"] }, // Identifies the user type

    created_date: {
      type: schemaType.TypeDate,
      default: Date.now,
    },
    status: {
      type: schemaType.TypeString,
      enum: ["Active", "Disabled"],
      default: "Active",
    },
  },
  { timestamps: true }
);

export default userSchema;
