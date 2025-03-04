import mongoose from "mongoose";
import proBusinSchema from "./counter-schema.js";

const proBusin = mongoose.model("proBusin", proBusinSchema);

export default proBusin;
