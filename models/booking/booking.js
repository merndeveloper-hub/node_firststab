import mongoose from "mongoose";
import schemaType from "../../types/index.js";

const booking = new mongoose.Schema({

  userId: {
    type: schemaType.ObjectID, 
   ref:"user",
    required: true,
  },
  professsionalId: {
    type: schemaType.ObjectID,
    ref:"user",
  },
  bookServiceId: {
    type: schemaType.ObjectID,
    ref:"userBookServ",
  },
  requestId: {
    type: schemaType.TypeString, 
    deafult:0,
    required: true,
  },
  cancelledReason: {
    type: schemaType.TypeString, 
    default:""
  },
  serviceType: {
    type: schemaType.TypeString, 
   enum:['chat','video','remote','inPerson'],
    required: true,
  },
  serviceName: {
    type: schemaType.TypeString, 
  
    required: true,
  },
  typeOfWork: {
    type: schemaType.TypeString, 
  
    required: true,
  },
  problemDesc: {
    type: schemaType.TypeString, 
  
    required: true,
  },
  quotesReceived: {
    type: schemaType.TypeNumber, 
  desfault:0,
   
  },
  desiredDateTime: {
    type: schemaType.TypeDate, 
  
    required: true,
  },
  serviceAssign: {
    type: schemaType.TypeString,
    enum: ["Professional", "Random"],
    default: "Random",
  },
  serviceStatus: {
        type: schemaType.TypeString,
        enum: ["Pending", "Cancelled", "Approved", "completed"],
        default: "Pending",
      },
  },
  { timestamps: true }
);

export default booking;


