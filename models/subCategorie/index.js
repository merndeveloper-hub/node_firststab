import mongoose from "mongoose";
import subCategorySchema from"./subCategorie-schema.js";

const subCategory = mongoose.model("subCategory", subCategorySchema);

export default subCategory;
