import mongoose from "mongoose";
import SchemaType from "../../types/index.js";

const userPaymentSchema = new mongoose.Schema(
  {
    userId: {
      type: SchemaType.ObjectID,
      ref: "user",
      required: true,
    },
    professsionalId: { type: SchemaType.ObjectID, ref: "user" },
    bookServiceId: { type: SchemaType.ObjectID, ref: "userBookServ" },
    proServiceId: { type: SchemaType.ObjectID, ref: "proBookingService" },
    categoryId: { type: SchemaType.ObjectID, ref: "category" },
    userAccpetBookingId: { type: SchemaType.ObjectID, ref: "User" },

    amount: {
      type: SchemaType.TypeNumber,
      //  required: true
    },

    holdingName: {
      type: SchemaType.TypeString,
    },
    currency: {
      type: SchemaType.TypeString,
      default: "USD",
      //  required: true,
      // index: true
    },
    order_id: { type: SchemaType.TypeString },
    authorization_id: { type: SchemaType.TypeString },
    payer_id: { type: SchemaType.TypeString },
    payer_email: { type: SchemaType.TypeString, unique: true },

    status: {
      type: SchemaType.TypeString,
      enum: [
        "AUTHORIZED",
        "CAPTURED",
        "VOIDED",
        "Success",
        "Failed",
        "Pending",
        "Released",
        "Refunded",
      ],
      default: "Pending",
    },
    createdAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

//authorizationId
export default userPaymentSchema;
