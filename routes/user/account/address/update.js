import Joi from "joi";
import { insertNewDocument, findOne, updateDocument } from "../../../../helpers/index.js";



const schema = Joi.object({


address_Type: Joi.string(),
address_line1: Joi.string(),
address_line2: Joi.string().allow('').optional(),
state: Joi.string(),
city: Joi.string(),
zipCode: Joi.string(),
mobile: Joi.string()
        .pattern(new RegExp("^\\+?[0-9]{8,15}$"))
        .messages({
          "string.pattern.base":
            "Mobile number must be 8-15 digits and may include a country code (e.g., +123456789).",
          "any.required": "Mobile number is required.",
        }),
});

// const schemaForId = Joi.object({
//   userId: Joi.string().required(),
// });

const updateAddress = async (req, res) => {
  try {
  //  await schemaForId.validateAsync(req.params);
    await schema.validateAsync(req.body);
 
    
   





    const updatedAddress = await updateDocument(
      "address",
     
{
  _id:req.params.id
},

      {
       
      
        ...req.body,
      }
    );

    if (!updatedAddress) {
      return res.status(404).send({ status: 404, message: "No User found" });
    }

    return res
      .status(201)
      .send({ status: 201, message: "Address updated successfully", data:{updatedAddress} });
  } catch (e) {
    console.log(e);
    return res.status(500).send({ status: 500, message: e.message });
  }
};

export default updateAddress;
