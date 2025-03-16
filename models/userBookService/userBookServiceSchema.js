import mongoose from "mongoose";
import schemaType from "../../types/index.js";

const userBookServSchema = new mongoose.Schema(
  {
  

    userId: {
      type: schemaType.ObjectID, 
      ref: "user",
      required: true,
    },
    addressId: {
      type: schemaType.ObjectID, 
      ref: "address"
   
    },
    image: {
      type: schemaType.TypeString,
     
    },
    problemDesc: {
      type: schemaType.TypeString,
      required: true,
    },
    professionalId: {
      type: schemaType.ObjectID,
      ref: "user"
    },
    // serviceAssign: {
    //   type: schemaType.TypeString,
    //   enum: ["Professional", "Random"],
    //   default: "Random",
    // },
    // serviceStatus: {
    //       type: schemaType.TypeString,
    //       enum: ["Pending", "Cancel", "Approved"],
    //       default: "Pending",
    //     },
        categoryId: {
          type: schemaType.ObjectID, // Reference to Category
          ref: "category",
          required: true,
        },
        subCategories: 
          {
            id: {
              type: schemaType.ObjectID, // Reference to SubCategory
              ref: "SubCategory",
              required: true,
            },
              serviceType:{type: schemaType.TypeString},
              startDate: {type: schemaType.TypeDate},
              EndDate: {type: schemaType.TypeDate},
              startTime: {type: schemaType.TypeDate},
              endTime: {type: schemaType.TypeDate}
            
          },
    
    createdAt: {
      type: schemaType.TypeDate,
      default: Date.now,
    },
  },
  
  { timestamps: true }
);

export default userBookServSchema;




