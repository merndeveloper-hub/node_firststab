import mongoose from "mongoose";
import userBookServSchema from "./userCategorySchema.js";

const userBookServ = mongoose.model("userBookServ", userBookServSchema);

export default userBookServ;
