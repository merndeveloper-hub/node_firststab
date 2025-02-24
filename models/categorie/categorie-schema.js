import mongoose from "mongoose";
import schemaType from "../../types/index.js";


const categorySchema = new mongoose.Schema({
  categoryName: { type: schemaType.TypeString, required: true },
  categoryImage: { type: schemaType.TypeString, required: true },
  categoryIcon: { type: schemaType.TypeString, required: true },
  Categorycommission: { type: schemaType.TypeNumber, required: true },
  CategorytaxCode: { type: schemaType.TypeString, },
  Categorydescription: { type: schemaType.TypeString, default: '' },
  Categorystatus: { type: schemaType.TypeString, enum: ['Active', 'Inactive'], default: 'Active' },
  Categorytype: { type: schemaType.TypeString, enum: ['Blue', 'White'], default: 'Blue' },
  CategoryisRemote: { type: schemaType.TypeString, enum: ['No', 'Yes'], default: 'No' },
  CategoryaddToHome: { type: schemaType.TypeString, enum: ['default', 'Top left', 'Top Right', 'bottom'], default: 'default' }, 
   created_date: {
        type: schemaType.TypeDate,
        default: Date.now,
      },
},{ timestamps: true });

export default categorySchema;

