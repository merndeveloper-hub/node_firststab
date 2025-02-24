import mongoose from "mongoose";
import userSchema from "./user-schema.js";

const user = mongoose.model("users", userSchema);

export default user;
