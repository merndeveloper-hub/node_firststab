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
    // dateOfBirth: {
    //   type: schemaType.TypeString,
    // },
    // ssn_Number: {
    //   type: schemaType.TypeString,
    // },
    mobile: {
      type: schemaType.TypeString,
      unique: true,
    },
    // serviceType: {
    //   type: [String], // Array of strings
    //   enum: ["video", "message", "remote", "in_personal"], // Allowed values
    //   default: undefined,
    // },

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
    }, zipCode: {
      type: schemaType.TypeString,
    },
    totalPro: {
      type: schemaType.TypeNumber,
      require:true,
      default:0
    },
    // type: {
    //   type: schemaType.TypeString,
    //   ref: "userTypes",
    // },

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



