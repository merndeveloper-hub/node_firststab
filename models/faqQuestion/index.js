import mongoose from "mongoose";
import faqQuestionSchema from"./categorie-schema.js";

const faqQuestion = mongoose.model("faqQuestion", faqQuestionSchema);

export default faqQuestion;
