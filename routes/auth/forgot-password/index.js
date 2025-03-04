import Joi from "joi";
import {
  findOne,
  insertNewDocument,
  findOneAndSelect,
  updateDocument
} from "../../../helpers/index.js";
import { SECRET } from "../../../config/index.js";

import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import mongoose from "mongoose";
import userType from "../../../models/userType/index.js";

const schema = Joi.object({
 userType:Joi.string().required(),
  email: Joi.string()
  .email({ tlds: { allow: true } }) // Ensures a valid domain with TLD (e.g., .com, .org)
  .pattern(
    new RegExp(
      "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$"
    )
  ) // Enforces common email rules
  .required()
  .messages({
    "string.email": "Invalid email format.",
    "any.required": "Email is required.",
    "string.pattern.base": "Invalid email structure.",
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

});

const forgetPaasswd = async (req, res) => {
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

    const { password, email,userType } = req.body;

    const emailExist = await findOneAndSelect("user", { email,userType });
    if (!emailExist) {
      return res
        .status(400)
        .send({ status: 400, message: "User not exists with this email" });
    }
   
    

    req.body.password = bcrypt.hashSync(password, bcrypt.genSaltSync(10));

   console.log(req.body.password,"req.body.password");
   

    const user_passwd_updated = await updateDocument(
      "user",
      {email,userType},
      { password:req.body.password }
    
    );
console.log(user_passwd_updated,"user_passwd_updated");

    await session.commitTransaction();
    session.endSession();

    return res.status(200).send({ status: 200, message: "Password Updated Successfully" });
  } catch (e) {
    await session.abortTransaction();
    session.endSession();
    return res.status(400).send({ status: 400, message: e.message });
  }
};

export default forgetPaasswd;
