import Joi from "joi";
import { find, getAggregate } from "../../../helpers/index.js";
import mongoose from "mongoose";

const schema = Joi.object().keys({
  userId: Joi.string().required(),
  categoryId: Joi.string().required(),
  subCategoryId: Joi.string().required(),
  subType: Joi.string().required(),
});




const newRequestBooking = async (req, res) => {
  try {
    await schema.validateAsync(req.body);
  
    const {userId,categoryId,subCategoryId,subType} = req.body

const newRequest = await getAggregate("proCategory",[
  {
    $match: {
        userId:  new mongoose.Types.ObjectId(userId),
        categoryId:  new mongoose.Types.ObjectId(categoryId),
        "subCategories.id":  new mongoose.Types.ObjectId(subCategoryId) // Ensure subCategoryId exists
    }
},
{
    $project: {
        subCategories: {
            $filter: {
                input: "$subCategories",
                as: "sub",
                cond: {
                    $and: [
                        { $eq: ["$$sub.id", new mongoose.Types.ObjectId(subCategoryId)] }, // Match subCategoryId
                        { $eq: [`$$sub.${subType}`, true] }   // Check if subType is true
                    ]
                }
            }
        }
    }
}
]);





console.log(newRequest,"newRequest");

if(newRequest.length <= 0){
  return res.status(200).json({ status: 200, message: "No New Request Found!" });
}



    
    return res.status(200).json({ status: 200, newRequest });
  } catch (e) {
    console.log(e);
    return res.status(500).json({ status: 500, message: e.message });
  }
};

export default newRequestBooking;


