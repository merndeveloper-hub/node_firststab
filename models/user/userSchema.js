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
    profile: {
      type: schemaType.TypeString,
    },
    countryCode: {
      type: schemaType.TypeString,
    },
    video: {
      type: schemaType.TypeString,
    },
    address_Type: {
      type: schemaType.TypeString,
    },
    address_line1: {
      type: schemaType.TypeString,
    },
    address_line2: {
      type: schemaType.TypeString,
    },
    state: {
      type: schemaType.TypeString,
    },
    date: {
      type: schemaType.TypeString,
    },
    time: {
      type: schemaType.TypeString,
    },
    mobile: {
      type: schemaType.TypeString,
      unique: true,
    },
    password: {
      type: schemaType.TypeString,
    },
    businessname: {
      type: schemaType.TypeString,
    },
    businessaddress: {
      type: schemaType.TypeString,
    },
    businessphoneNo: {
      type: schemaType.TypeString,
    },

    city: {
      type: schemaType.TypeString,
    },
    zipCode: {
      type: schemaType.TypeString,
    },
    totalPro: {
      type: schemaType.TypeNumber,
      default: 0,
    },
    userType: { type: schemaType.TypeString, enum: ["user", "pro"] },
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
