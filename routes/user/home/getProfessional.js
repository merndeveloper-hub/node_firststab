import Joi from "joi";
import { getAggregate, insertNewDocument } from "../../../helpers/index.js";
import ObjectID from '../../../types/index.js'
//import schemaType from "../../../types/index.js";

// const schema = Joi.object({
//   userId: Joi.string().hex().length(24).required(), // Must be a valid MongoDB ObjectId
//   price: Joi.number().min(0).required(),
//   categoryId: Joi.string().hex().length(24).required(),
//         subCategories: Joi.array().items(
//           Joi.object({
//             id: Joi.string().hex().length(24).required(),
//             isRemote: Joi.boolean(),
//             isChat: Joi.boolean(),
//             isVirtual: Joi.boolean(),
//             isInPerson: Joi.boolean(),

//           })
//         ),
//       })
    


const getProfessional = async (req, res) => {
  try {
    console.log(req.body,"body");
    

 //   await schema.validateAsync(req.body)
   const {categoryId,subCategorieId,servieType} = req.body
   console.log(categoryId,"ca");
   
    // const { error, value } = schema.validate(req.body, { abortEarly: false });

    // if (error) {
    //   console.error("Validation Error:", error);
    //   return res
    //     .status(400)
    //     .json({ success: false, message: error.details[0].message });
    // }


    const categories = await getAggregate("proCategory", [
     
      {
        $match: { 
          categoryId: ObjectID(categoryId)
        } // Match the categoryId
      }
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
      //             { $eq: ["$$sub.id", subCategorieId] }, // Match subCategory ID
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
    ]);
   
console.log(categories,"categorie");

    return res
      .status(200)
      .json({ status: 200, message: "Category uploaded successfully", categories});
  } catch (e) {
    console.log(e,"chec");
    return res.status(500).json({ status: 500, message: e.message });
  }
};

export default getProfessional;

