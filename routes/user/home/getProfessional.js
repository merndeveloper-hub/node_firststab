import Joi from "joi";
import { getAggregate, insertNewDocument } from "../../../helpers/index.js";
import ObjectID from '../../../types/index.js'
import mongoose from "mongoose";
//import schemaType from "../../../types/index.js";

const schema = Joi.object({
  
  categoryId: Joi.string().hex().length(24).required(),
  subCategorieId: Joi.string().hex().length(24).required(),
 // userId: Joi.string().hex().length(24).required(),
      servieType:Joi.string()
 
});

      
    


const getProfessional = async (req, res) => {
  try {
    console.log(req.body,"body");
    
//	"isRemote": true,
//"isChat": false,
//"isVirtual": true,
//"isInPerson": false,
   await schema.validateAsync(req.body)
   const {categoryId,subCategorieId,servieType} = req.body
   
   
    // const { error, value } = schema.validate(req.body, { abortEarly: false });

    // if (error) {
    //   console.error("Validation Error:", error);
    //   return res
    //     .status(400)
    //     .json({ success: false, message: error.details[0].message });
    // }


    const proService = await getAggregate("proCategory", [
     
      // {
      //   $match: { categoryId: new mongoose.Types.ObjectId(categoryId) } // Match the categoryId as ObjectId
      // },
      // {
      //   $project: {
      //     userId: 1,
      //     price: 1,
      //     categoryId: 1,
      //     createdAt: 1,
      //     updatedAt: 1,
      //     subCategories: {
      //       $filter: {
      //         input: "$subCategories",
      //         as: "sub",
      //         cond: {
      //           $and: [
      //             { $eq: ["$$sub.id", new mongoose.Types.ObjectId(subCategorieId)] }, // Match subCategory ID as ObjectId
      //             { $eq: [`$$sub.${servieType}`, true] } // Check if the given key is true
      //           ]
      //         }
      //       }
      //     }
      //   }
      // },
      // {
      //   $match: { "subCategories.0": { $exists: true } } // Ensure at least one matching subCategory exists
      // }

      {
    $match: { 
      categoryId: new mongoose.Types.ObjectId(categoryId) // Match categoryId
    }
  },
  {
    $project: {
      userId: 1,
      price: 1,
      categoryId: 1,
      createdAt: 1,
      updatedAt: 1,
      subCategories: {
        $filter: {
          input: "$subCategories",
          as: "sub",
          cond: {
            $and: [
              { $eq: ["$$sub.id", new mongoose.Types.ObjectId(subCategorieId)] }, // Match subCategory ID
              { $eq: [`$$sub.${servieType}`, true] } // Check if serviceType is true
            ]
          }
        }
      }
    }
  },
  {
    $match: { "subCategories.0": { $exists: true } } // Ensure at least one matching subCategory exists
  },
  {
    $lookup: {
      from: "users", // Collection where user data is stored
      localField: "userId", // Extracted userId from the document
      foreignField: "_id", // Matching field in the users collection
      as: "userDetails"
    }
  },
  {
    $unwind: { path: "$userDetails", preserveNullAndEmptyArrays: true } // Flatten userDetails array
  }
      
    ]);
   
    if(proService <= 0){
      return res
      .status(200)
      .json({ status: 200, message:"No pro found to give service."});
    }

   console.log(proService,"proservi");
   
    

    return res
      .status(200)
      .json({ status: 200, proService});
  } catch (e) {
    console.log(e,"chec");
    return res.status(500).json({ status: 500, message: e.message });
  }
};

export default getProfessional;

