import mongoose from "mongoose";
import proCategorySchema from "./proCategory-schema.js";

const proCategory = mongoose.model("proCategory", proCategorySchema);

export default proCategory;
