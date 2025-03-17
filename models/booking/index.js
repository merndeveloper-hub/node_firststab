import mongoose from "mongoose";
import bookingSchema from "./bookingSchema.js";

const booking = mongoose.model("booking", bookingSchema);

export default booking;
