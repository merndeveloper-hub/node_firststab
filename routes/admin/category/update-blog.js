import Joi from "joi";
import { updateDocument, findOne } from "../../../helpers/index.js";
import { v2 as cloudinary } from "cloudinary";
//import { cloudinary } from "../../../lib/index.js";
cloudinary.config({
  cloud_name:'dwebxmktr',
  api_key: '988681166781262',
  api_secret: 'f4gUgqo7htBtD3eOGhfirdKd8kA',
});


const schema = Joi.object({
  name: Joi.string(),
   image: Joi.string(),
   icon: Joi.string(),
   commission: Joi.number(),
   taxCode: Joi.string(),
   description: Joi.string(),
   status: Joi.string(),
   type: Joi.string(),
   isRemote: Joi.string(),
   addToHome: Joi.string(),
});
const schemaForId = Joi.object({
  id: Joi.string().required(),
});

const updateCategory = async (req, res) => {
  try {
    await schemaForId.validateAsync(req.params);
    await schema.validateAsync(req.body);
    const { id } = req.params;
    const findCategory = await findOne("category", { _id: id });
    if (!findCategory) {
      return res.status(404).send({ status: 404, message: "No Category found" });
    }

  const category_Image = await cloudinary.uploader.upload(
        req?.files?.image?.path,
        { quality: 20,allowed_formats: ['jpg', 'jpeg', 'png','jfif'] }
        
      );

      req.body.image = category_Image.url;
      console.log(category_Image,"category_Image");

 const category_Icon = await cloudinary.uploader.upload(
        req?.files?.icon?.path,
        { quality: 20,allowed_formats: ['jpg', 'jpeg', 'png', 'jfif'] }
      );
    
      req.body.icon = category_Icon.url;
      console.log(category_Icon,"category_Image");

    const category = await updateDocument(
      "category",
      {
        _id: id,
      },
      {
        image: req?.body?.image,
        icon:req?.body?.icon,
        ...req.body,
      }
    );

    return res
      .status(200)
      .send({ status: 200, message: "Category updated successfully", data:{category} });
  } catch (e) {
    console.log(e);
    return res.status(500).send({ status: 500, message: e.message });
  }
};

export default updateCategory;
