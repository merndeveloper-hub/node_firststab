import Joi from "joi";
import {
  findOne,
  insertNewDocument,
  findOneAndSelect,
  updateDocument,
  deleteDocument,
} from "../../../helpers/index.js";
import { SECRET } from "../../../config/index.js";

import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import mongoose from "mongoose";
import userType from "../../../models/userType/index.js";

const schema = Joi.object({
  // user_id:Joi.string().required(),
});

const logout = async (req, res) => {
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

    const { id } = req.params;

    const user_passwd_updated = await deleteDocument("token", { user_id: id });

    await session.commitTransaction();
    session.endSession();

    return res
      .status(200)
      .send({ status: 200, message: "Logged out Successfully" });
  } catch (e) {
    await session.abortTransaction();
    session.endSession();
    return res.status(400).send({ status: 400, message: e.message });
  }
};

export default logout;
