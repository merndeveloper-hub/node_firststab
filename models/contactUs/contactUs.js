import mongoose from "mongoose";
import schemaType from "../../types/index.js";

const contactUs = new mongoose.Schema({

  userId: {
    type: schemaType.ObjectID, 
   ref:"user",
    required: true,
  },
  fullName: {
    type: schemaType.TypeString, 
  
    required: true,
  },
  phoneNumber: {
    type: schemaType.TypeString, 
   
    required: true,
  },
  email: {
    type: schemaType.TypeString, 
   
    required: true,
  },
  subject: {
    type: schemaType.TypeString, 
  
    required: true,
  },
  message: {
    type: schemaType.TypeString, 
  
    required: true,
  },
  },
  { timestamps: true }
);

export default contactUs;


