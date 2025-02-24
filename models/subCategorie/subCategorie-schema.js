import mongoose from "mongoose";
import schemaType from "../../types/index.js";


const subCategorySchema = new mongoose.Schema({
  categoryId: { type: schemaType.TypeObjectId, ref: 'Category', required: true },
  categoryName: { type: schemaType.TypeString, required: true },
  name: { type: schemaType.TypeString, required: true },
  image: { type: schemaType.TypeString, required: true },
  icon: { type: schemaType.TypeString, required: true },
  description: { type: schemaType.TypeString, required: true },
  addToHome: { type: schemaType.TypeString, enum: ['Yes', 'No'], default: 'No' },
  status: { type: schemaType.TypeString, enum: ['Active', 'Inactive'], default: 'Active' },
   created_date: {
        type: schemaType.TypeDate,
        default: Date.now,
      },
},{ timestamps: true });

export default subCategorySchema;


