import Joi from "joi";
import { findOne, insertNewDocument } from "../../../helpers/index.js";
import { v2 as cloudinary } from "cloudinary";
//import { cloudinary } from "../../../lib/index.js";

cloudinary.config({
  cloud_name:'dwebxmktr',
  api_key: '988681166781262',
  api_secret: 'f4gUgqo7htBtD3eOGhfirdKd8kA',
});


const schema = Joi.object({
 // categoryId: Joi.string().required(),
  categoryName: Joi.string().required(),
  name: Joi.string().required(),
  image: Joi.string(),
  icon: Joi.string(),
  description: Joi.string(),
  status: Joi.string(),
  addToHome: Joi.string(),
  isRemote: Joi.string(),
  isChat: Joi.string(),
  isVirtual: Joi.string(),
  isInPerson: Joi.string(),
  price: Joi.string().required(),
});


const subaddCategory = async (req, res) => {
  try {
    const { error, value } = schema.validate(req.body, { abortEarly: false });

    if (error) {
      console.error("Validation Error:", error);
      return res
        .status(400)
        .json({ success: false, message: error.details[0].message });
    }

   const {categoryName} = req.body   

   const categoryData = await findOne("category", {
    name:categoryName,
   // categoryImage: req.body.categoryImage,
   // categoryIcon:req.body.categoryIcon,
  });
  
console.log(categoryData,"cate");

    //if (req?.files?.categoryImage?.path) {
       
      const category_Image = await cloudinary.uploader.upload(
        req?.files?.image?.path,
        { quality: 20 }
      );

      req.body.image = category_Image.url;
  
   // }
    // if (!req.files.image.path) {
    //   return res.status(400).json({
    //     status: 400,
    //     message: "Profile Image is required",
    //   });
    // }

    //if (req?.files?.categoryIcon?.path) {
      const category_Icon = await cloudinary.uploader.upload(
        req?.files?.icon?.path,
        { quality: 20 }
      );
    
      req.body.icon = category_Icon.url;
      console.log(req.body.icon,"category_Image");
   // }

    //   if (!req.files.icon.path) {
    //   return res.status(400).json({
    //     status: 400,
    //     message: "Icon Image is required",
    //   });
    // }
    const subCategory = await insertNewDocument("subCategory", {
      ...req.body,
      categoryId:categoryData._id,
      categoryName:categoryData.name
     // categoryImage: req.body.categoryImage,
     // categoryIcon:req.body.categoryIcon,
    });
console.log(subCategory,"subCategory");


    return res
      .status(200)
      .send({ status: 200, message: "SubCategory uploaded successfully", data:{subCategory} });
  } catch (e) {
    console.log(e,"chec");
    return res.status(500).send({ status: 500, message: e.message });
  }
};

export default subaddCategory;
