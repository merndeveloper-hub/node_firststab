import mongoose from "mongoose";
import faqCategorySchema from"./categorie-schema.js";

const faqCategory = mongoose.model("faqCategory", faqCategorySchema);

export default faqCategory;
