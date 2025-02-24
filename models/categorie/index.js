import mongoose from "mongoose";
import categorySchema from"./categorie-schema.js";

const category = mongoose.model("category", categorySchema);

export default category;
