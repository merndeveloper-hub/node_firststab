import mongoose from "mongoose";
import counterSchema from "./counter-schema.js";

const counter = mongoose.model("counters", counterSchema);

export default counter;
