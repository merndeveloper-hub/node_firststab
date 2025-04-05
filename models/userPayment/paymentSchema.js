import mongoose from "mongoose";
import SchemaType from "../../types/index.js";

const PaymentSchema = new mongoose.Schema(
  {
    userId: {
      type: SchemaType.ObjectID,
      ref: "user",
      required: true,
    },
    professsionalId: { type: SchemaType.ObjectID, ref: "User"},
    bookServiceId: { type: SchemaType.ObjectID, ref: "User"},
    proServiceId: { type: SchemaType.ObjectID, ref: "User"},
    categoryId: { type: SchemaType.ObjectID, ref: "User"},
    amount: {
      type: SchemaType.TypeNumber,
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
    // const payload ={
//   _id: _id,
//   bookServiceId:bookServiceId,
//   categoryId:categoryId,
//   professsionalId:professsionalId,
//   userId:userId,
//   proServiceId:proServiceId,
//   addInstruction:addInstruction
// }
    paymentIntentId: { type: SchemaType.TypeString},
    paymentMethod: { type: SchemaType.TypeString, enum: ["stripe", "paypal"], required: true },
    transactionId: { type: SchemaType.TypeString, required: true },
    status: { type: SchemaType.TypeString, enum: [ "Success", "Failed","Pending", "Released", "Refunded"], default: "Pending" },
    createdAt: { type: Date, default: Date.now }
  },
  { timestamps: true }
);



export default PaymentSchema;


