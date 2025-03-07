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

   profile: Joi.string(),
video: Joi.string(),
address_Type: Joi.string(),
address_line1: Joi.string(),
address_line2: Joi.string(),
state: Joi.string(),
date : Joi.string(),
time: Joi.string(),
});
const schemaForId = Joi.object({
  id: Joi.string().required(),
});

const updateProfile = async (req, res) => {
  try {
    await schemaForId.validateAsync(req.params);
    await schema.validateAsync(req.body);
    const { id } = req.params;
    const findCategory = await findOne("user", { _id: id });
    if (!findCategory) {
      return res.status(404).send({ status: 404, message: "No User found" });
    }

     const profile_Image = await cloudinary.uploader.upload(
            req?.files?.profile?.path,
            { quality: 20,allowed_formats: ['jpg', 'jpeg', 'png','jfif'] }
            
          );
    
          req.body.profile = profile_Image.url;

           const profile_Video = await cloudinary.uploader.upload(
                  req?.files?.video?.path,
                  {resource_type: "video", // Required for video uploads
  // Optional: Specify allowed formats
  allowed_formats: ["mp4", "mov", "webm"]}
                  
                );
          
                req.body.video = profile_Video.url;

    const profile = await updateDocument(
      "user",
      {
        _id: id,
      },
      {
        profile: req.body.profile,
        video: req?.body?.video ,
        ...req.body,
      }
    );

    return res
      .status(200)
      .send({ status: 200, message: "Profile updated successfully", data:{profile} });
  } catch (e) {
    console.log(e);
    return res.status(500).send({ status: 500, message: e.message });
  }
};

export default updateProfile;
