import mongoose from "mongoose";
import schemaType from "../../types/index.js";


const faqQuestionSchema = new mongoose.Schema({
  title: { type: schemaType.TypeString },
  answer: { type: schemaType.TypeString },
  displayPostion: { type: schemaType.TypeNumber },

  FaqCategorieName: { type: schemaType.TypeString },
  FaqCategorieid: { type: schemaType.TypeObjectId },

  status: { type: schemaType.TypeString, enum: ['Active', 'Inactive'], default: 'Active' },
 
   created_date: {
        type: schemaType.TypeDate,
        default: Date.now,
      },
},{ timestamps: true });

export default faqQuestionSchema;