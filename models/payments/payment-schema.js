import mongoose from "mongoose";
import SchemaType from "../../types/index.js";

const PaymentSchema = new mongoose.Schema(
  {
    userId: {
      type: SchemaType.ObjectID,
      ref: "user",
      required: true,
    },
    amount: {
      type: SchemaType.TypeNumber,
      required: true
    },
    cardNumber: {
      type: SchemaType.TypeString,
      required: true
    },
  
    cardExpiryDate: {
      type: SchemaType.TypeString,
      required: true
    },
    cardCVC: {
      type: SchemaType.TypeString,
      required: true
    },
    holdingName: {
      type: SchemaType.TypeString
     
    },
    currency: {
      type: SchemaType.TypeString,
      default:"usd"
    //  required: true,
     // index: true
    },

    paymentMethod: { type: SchemaType.TypeString, enum: ["stripe", "paypal"], required: true },
    transactionId: { type: SchemaType.TypeString, required: true },
    status: { type: SchemaType.TypeString, enum: ["pending", "success", "failed"], default: "pending" },
  },
  { timestamps: true }
);



export default PaymentSchema;


