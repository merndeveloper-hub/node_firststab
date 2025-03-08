import mongoose from "mongoose";
import contentSchema from"./categorie-schema.js";

const content = mongoose.model("content", contentSchema);

export default content;
