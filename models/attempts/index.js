import mongoose from "mongoose";
import attemptSchema from "./attempts-schema.js";

const attempt = mongoose.model("attempt", attemptSchema);

export default attempt;
