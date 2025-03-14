import mongoose from "mongoose";
import bookingSchema from "./booking.js";

const booking = mongoose.model("booking", bookingSchema);

export default booking;
