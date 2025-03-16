import Joi from "joi";
import { insertNewDocument, findOne } from "../../../../helpers/index.js";



const schema = Joi.object({


address_Type: Joi.string().required(),
address_line1: Joi.string().required(),
address_line2: Joi.string().allow('').optional(),
state: Joi.string().required(),
city: Joi.string().required(),
userId: Joi.string().required(),
zipCode: Joi.string().required(),
   
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

const addAddress = async (req, res) => {
  try {
  //  await schemaForId.validateAsync(req.params);
    await schema.validateAsync(req.body);
    const { userId } = req.body;
    const findUser = await findOne("user", { _id: userId });
    console.log(findUser,"finduser");
    
    if (!findUser) {
      return res.status(404).send({ status: 404, message: "No User found" });
    }





    const addAddress = await insertNewDocument(
      "address",
     
      {
       
       userId:userId,
        ...req.body,
      }
    );

    return res
      .status(200)
      .send({ status: 200, message: "Address created successfully", data:{addAddress} });
  } catch (e) {
    console.log(e);
    return res.status(500).send({ status: 500, message: e.message });
  }
};

export default addAddress;
