import Joi from "joi";
import {
  findOne,
  insertNewDocument,
  findOneAndSelect,
  updateDocument,
  getAggregate,
  deleteDocument,
} from "../../../helpers/index.js";
import { JWT_EXPIRES_IN, SECRET } from "../../../config/index.js";

import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import mongoose from "mongoose";
import sendOTPSignup from "../otpVerification/sendOTPSignup.js";

const schema = Joi.object({
  first_Name: Joi.string().min(3).required(),
  last_Name: Joi.string().min(3).required(),
 // city: Joi.string().required(),
  totalPro:Joi.number(),
  //zipCode: Joi.string().required(),
  // zipCode: Joi.string()
  //   .pattern(/^\d{5}(-\d{4})?$/) // Matches 5 digits or 5+4 format (e.g., 12345 or 12345-6789)
  //   .required()
  //   .messages({
  //     'string.pattern.base': 'ZIP code must be in the format 12345 or 12345-6789',
  //     'any.required': 'ZIP code is required',
  //   }),
  // full_Name: Joi.string().required(),
   email: Joi.string()
   .email({ tlds: { allow: true } }) // Ensures a valid domain with TLD (e.g., .com, .org)
   .pattern(
     new RegExp(
       "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$"
     )
   ) // Enforces common email rules
   .required()
   .messages({
     "string.email": "Invalid email format",
     "any.required": "Email is required",
     "string.pattern.base": "Invalid email structure",
   }),
  mobile: Joi.string()
    .pattern(new RegExp("^\\+?[0-9]{8,15}$"))
    .required()
    .messages({
      "string.pattern.base":
        "Mobile number must be 8-15 digits",
      "any.required": "Mobile number is required.",
    }),
  password: Joi.string()
    .pattern(
      new RegExp(
        "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,30}$"
      )
    )
    .required()
    .messages({
      "string.pattern.base":
        "Password must be 8-30 characters, including uppercase, lowercase, number & special character.",
    }),
  confirm_password: Joi.string().required().valid(Joi.ref("password")),
  status: Joi.string(),
  // businessname: Joi.string(),
  // businessaddress: Joi.string(),
  // businessphoneNo: Joi.string().pattern(new RegExp("^\\+?[0-9]{8,15}$"))
  //  .messages({
  //    "string.pattern.base":
  //      "Mobile number must be 8-15 digits and may include a country code (e.g., +123456789).",
  //    "any.required": "Mobile number is required.",
  //  }),


  // dateOfBirth: Joi.date()
  //   .less("now") // Ensures date is in the past
  //   .iso() // Ensures format is valid (YYYY-MM-DD)
  //   .required()
  //   .messages({
  //     "date.base": "Invalid date format. Use YYYY-MM-DD.",
  //     "date.less": "Date of birth must be in the past.",
  //     "any.required": "Date of birth is required.",
  //   }),
  // ssn_Number: Joi.string()
  //   .pattern(new RegExp("^[0-9]{3}-[0-9]{2}-[0-9]{4}$")) // SSN format: XXX-XX-XXXX
  //   .required()
  //   .messages({
  //     "string.pattern.base": "SSN must be in the format XXX-XX-XXXX.",
  //     "any.required": "SSN is required.",
  //   }),
    // serviceType: Joi.array()
    // .items(Joi.string().valid("video", "message", "remote", "in_personal"))
    // .messages({
    //   "array.min": "Please select at least one service type.",
    //   "any.only": "Invalid service type selected.",
    //   "any.required": "Service type is required.",
    // }),
      userType:Joi.string().required(),
});

const proSignup = async (req, res) => {
  
  const session = await mongoose.startSession();
  session.startTransaction();
  
  try {
   
    await schema.validateAsync(req.body);
   // const { error, value } = schema.validate(req.body, { abortEarly: false });

    // if (error) {
    //   console.error("Validation Error:", error);
    //   return res
    //     .status(400)
    //     .json({ success: false, message: error.details[0].message });
    // }


    const { password, city,zipCode,email, mobile,first_Name,last_Name,userType,status } = req.body;
    const deleteEmailExist = await findOneAndSelect("user", { email,status: "InActive" });
    if (deleteEmailExist) {
      await deleteDocument("user", { email });
    }
    const emailExist = await findOneAndSelect("user", { email });
    if (emailExist) {
      return res
        .status(400)
        .send({ status: 400, message: "User already exists with this email" });
    }
    const mobileExist = await findOneAndSelect("user", { mobile });
    if (mobileExist) {
      return res
        .status(400)
        .send({ status: 400, message: "Mobile number already exists with this email" });
    }
    // const user_type = await findOne("userType", { type });
 
    // if (!user_type) {
    //   return res
    //     .status(404)
    //     .send({ status: 404, message: "No User Type Found" });
    // }
  
    req.body.password = bcrypt.hashSync(password, bcrypt.genSaltSync(10));

    const userCount = await getAggregate("user", [
      {
        $match: { status: "Active", userType: "pro" },
      },
      { $count: "activeProUsers" },
      {
        $sort: {
          _id: -1,
        },
      },
    ]);


    
    
    // const result = await collection.aggregate([
    //   { $match: { status: "active", userType: "pro" } },
    //   { $count: "activeProUsers" }
    // ]).toArray();

    // const inscounter = await insertNewDocument("counter",{
    //   id: userType

       
    // }
    // );

    // console.log(inscounter,"inscounter");
    
//     const counter = await updateDocument(
//       "counter",
//       { id: userType }, // Find by ID
//       { $inc: { count: 1 } }// Fix: Move `$inc` inside `$set`
//     );

//     if(!counter){
//       const counterCre = await insertNewDocument("counter",{
//       id: userType

       
//     }
//     );
//     const counter = await updateDocument(
//       "counter",
//       { id: counterCre.userType }, // Find by ID
//       { $inc: { count: 1 } }// Fix: Move `$inc` inside `$set`
//     );
//      }
//  // Step 1: Increment the counter


// console.log(counter,"counter");


    const user = await insertNewDocument("user", {
      ...req.body,
     password:req.body.password,
     status:"InActive",
     totalPro: userCount[0]? userCount[0]?.activeProUsers + 1: 1
      
    });
 

    const token = jwt.sign({ id: user._id }, SECRET, {
      expiresIn: JWT_EXPIRES_IN,
    });
    req.userId = user._id;
   await sendOTPSignup({email,userType})
    await session.commitTransaction();
    session.endSession();
    return res.json({
      status: 200,
      message: "OTP sent to your email. Check inbox to proceed.",
      data: {
        userId: user._id,
      },
    });
   // return res.status(200).send({ status: 200, data:{user, token} });
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    if (error.code === 11000) {
      // Duplicate key error
      return res.status(400).send({
        status: 400,
        message: "Email already exists. Please use a different email.",
      });
    }
    // Handle other errors
    console.error("Error saving user:", error);
    return res.status(400).send({ status: 400, message: "An unexpected error occurred." });
  //  return res.status(400).send({ status: 400, message: e.message });
  }
};

export default proSignup;
