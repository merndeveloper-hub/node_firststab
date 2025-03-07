import mongoose from "mongoose";
import tokenSchema from "./token-schema.js";

const token = mongoose.model("token", tokenSchema);

export default token;
