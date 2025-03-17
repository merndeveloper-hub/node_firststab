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
     enum:['isChat','isVirtual','isRemote','inInPerson'],
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
    refundableAmount: {
      type: schemaType.TypeNumber,  
    },
    desiredDateTime: {
      type: schemaType.TypeDate
    },
    endDateTime: {
      type: schemaType.TypeDate
    },
    serviceAssign: {
      type: schemaType.TypeString,
      enum: ["Professional", "Random"],
      default: "Random",
    },
    serviceStatus: {
          type: schemaType.TypeString,
          enum: ["Cancelled", "Completed","OnGoing"],
          default: "OnGoing",
        },
        reasonCancel: {
          type: schemaType.TypeString,
          enum: ["Change of Plans", "Delayed Need", "Emergency Situation","Financial Reasons","Found an Alternative Solution","No Show","Others","Rescheduling","Schedule Conflict","Service No Longer Needed","Unsatisfactory Provider Options"],
      
        },reasonDesc: {
          type: schemaType.TypeString
          
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
              startTime: {type: schemaType.TypeDate},
              EndDate: {type: schemaType.TypeDate},
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




