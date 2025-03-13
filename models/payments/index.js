import mongoose from "mongoose";
import PaymentSchema from "./payment-schema.js";

const payment = mongoose.model("payment", PaymentSchema);

export default payment;
