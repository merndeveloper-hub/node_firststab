import Joi from "joi";
import {
  findOne,
  insertNewDocument,
  findOneAndSelect,
  getAggregate,
} from "../../../helpers/index.js";
import { JWT_EXPIRES_IN, SECRET } from "../../../config/index.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import mongoose from "mongoose";
import sendOTPVerificationEmail from "../otpVerification/sendOTPSignup.js";

const schema = Joi.object({
  first_Name: Joi.string().min(3).required(),
  last_Name: Joi.string().min(3).required(),
  email: Joi.string()
    .email({ tlds: { allow: true } }) // Ensures a valid domain with TLD (e.g., .com, .org)
    .pattern(new RegExp("^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$")) // Enforces common email rules
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
        "Mobile number must be 8-15 digits and may include a country code (e.g., +123456789).",
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
  userType: Joi.string().required(),
});

const userSignup = async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const { error, value } = schema.validate(req.body, { abortEarly: false });

    if (error) {
      console.error("Validation Error:", error);
      return res
        .status(400)
        .json({ success: false, message: error.details[0].message });
    }

    const {
      password,
      
      email,
      mobile,
      status,
      userType,
      first_Name,
      last_Name,
    } = req.body;

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
        .send({ status: 400, message: "Mobile number already exists" });
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
    const user = await insertNewDocument("user", {
      //...req.body,
      password: req.body.password,
      email,
      mobile,
      status,
      userType,
      first_Name,
      last_Name,
      totalPro: userCount[0].activeProUsers + 1
     // type: user_type._id,
    });

    console.log(user, "user");

    const token = jwt.sign({ id: user._id }, SECRET, {
      expiresIn: JWT_EXPIRES_IN,
    });
    req.userId = user._id;
    await sendOTPVerificationEmail({email,userType})
    await session.commitTransaction();
    session.endSession();

    return res.status(200).send({ status: 200, data:{user, token} });
  } catch (e) {
    await session.abortTransaction();
    session.endSession();
    return res.status(400).send({ status: 400, message: e.message });
  }
};

export default userSignup;
