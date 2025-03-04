import Joi from "joi";
import { insertNewDocument } from "../../../helpers/index.js";

const validationSchema = Joi.object({
  name: Joi.string().required(),
  address: Joi.string().required(),
  phoneNo: Joi.string().pattern(new RegExp("^\\+?[0-9]{8,15}$"))
  .required()
  .messages({
    "string.pattern.base":
      "Mobile number must be 8-15 digits and may include a country code (e.g., +123456789).",
    "any.required": "Mobile number is required.",
  }),
  userId: Joi.string().required(),

});

const createbusiness = async (req, res) => {
  try {
    await validationSchema.validateAsync(req.body);
    console.log(req.body);

   
  
      const createbus = await insertNewDocument(
        "proBusin",
      req.body
      );

      return res.status(200).json({
        status: 200,
        data: createbus,  
      });
    }
    // const cloudObj = await cloudinary.uploader.upload(
    //     req?.body?.launchpad_image.path,
    //   { quality: 20 }
    // );
    // req.body.image = cloudObj.url;
   catch (e) {
    console.log(e);
    return res.status(500).json({ status: 500, message: e.message });
  }
};

export default createbusiness;
