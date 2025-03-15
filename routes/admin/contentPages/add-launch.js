import Joi from "joi";
import { updateDocument, findOne, insertNewDocument } from "../../../helpers/index.js";
import { v2 as cloudinary } from "cloudinary";
//import { cloudinary } from "../../../lib/index.js";
cloudinary.config({
  cloud_name:'dwebxmktr',
  api_key: '988681166781262',
  api_secret: 'f4gUgqo7htBtD3eOGhfirdKd8kA',
});



const schema = Joi.object({
    title: Joi.string().required(),
    pageCode: Joi.string().required(),
    image: Joi.string().required(),
    isSystemPage : Joi.string(),
    status: Joi.string().required(),
    contents: Joi.string().required(),
});


const addContentPage = async (req, res) => {
    try {
        await schema.validateAsync(req.body);
         

        if(req.body.image){

        
 const conetent_Image = await cloudinary.uploader.upload(
        req?.files?.image?.path,
        { quality: 20,allowed_formats: ['jpg', 'jpeg', 'png','jfif','avif'] }
        
      );

      req.body.image = conetent_Image.url;
    }
        const addContent = await insertNewDocument("content",{...req.body,image:req.body.image});

console.log(addContent,"addContent....");

        if (!addContent) {
            return res.status(404).send({ status: 404, message: "No Content found" });
        }
        

        return res
            .status(200)
            .send({ status: 200, message: "Add Content created successfully" ,addContent});
    } catch (e) {
        console.log(e);
        return res.status(500).send({ status: 500, message: e.message });
    }
};

export default addContentPage;