import Joi from "joi";
import { insertNewDocument } from "../../../helpers/index.js";
import { v2 as cloudinary } from "cloudinary";
//import { cloudinary } from "../../../lib/index.js";
cloudinary.config({
  cloud_name:'dwebxmktr',
  api_key: '988681166781262',
  api_secret: 'f4gUgqo7htBtD3eOGhfirdKd8kA',
});


const schema = Joi.object({
  categoryName: Joi.string().required(),
  categoryImage: Joi.string(),
  categoryIcon: Joi.string(),
  Categorycommission: Joi.number().required(),
  CategorytaxCode: Joi.string().required(),
  Categorydescription: Joi.string(),
  Categorystatus: Joi.string(),
  Categorytype: Joi.string(),
  CategoryisRemote: Joi.string(),
  CategoryaddToHome: Joi.string(),
});

const addCategory = async (req, res) => {
  try {
    const { error, value } = schema.validate(req.body, { abortEarly: false });

    if (error) {
      console.error("Validation Error:", error);
      return res
        .status(400)
        .json({ success: false, message: error.details[0].message });
    }

   
   

  

    //if (req?.files?.categoryImage?.path) {
       
      const category_Image = await cloudinary.uploader.upload(
        req?.files?.categoryImage?.path,
        { quality: 20 }
      );

      req.body.categoryImage = category_Image.url;
      console.log(req.body.categoryImage,"category_Image");
      // fs.unlinkSync(req.file.path);
       console.log(req.files.categoryImage.path,"ching");
   // }
    if (!req.files.categoryImage.path) {
      return res.status(400).json({
        status: 400,
        message: "Profile Image is required",
      });
    }

    //if (req?.files?.categoryIcon?.path) {
      const category_Icon = await cloudinary.uploader.upload(
        req?.files?.categoryIcon?.path,
        { quality: 20 }
      );
    
      req.body.categoryIcon = category_Icon.url;
      console.log(req.body.categoryIcon,"category_Image");
   // }

      if (!req.files.categoryIcon.path) {
      return res.status(400).json({
        status: 400,
        message: "Icon Image is required",
      });
    }
    const category = await insertNewDocument("category", {
      ...req.body,
     // categoryImage: req.body.categoryImage,
     // categoryIcon:req.body.categoryIcon,
    });
console.log(category,"category11");

    return res
      .status(200)
      .send({ status: 200, message: "Category uploaded successfully", category });
  } catch (e) {
    console.log(e,"chec");
    return res.status(500).send({ status: 500, message: e.message });
  }
};

export default addCategory;
