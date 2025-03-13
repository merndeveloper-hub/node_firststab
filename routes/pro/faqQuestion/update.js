import Joi from "joi";
// const { findOne } = require("../../../helpers");
import { findOne, updateDocument} from "../../../helpers/index.js";
const schema = Joi.object({
    FaqCategorieid:Joi.string(),
 FaqCategorieName:Joi.string(),
 title:Joi.string(),
 answer:Joi.string(),
 status:Joi.string(),
 displayPostion:Joi.number()
});

const updateContentPage = async (req, res) => {
  try {
    await schema.validateAsync(req.body);

    const { id} = req.params;
  

    let faqCategory = await findOne("faqQuestion", { _id:id });
    if (!faqCategory) {
      return res.status(400).send({ status: 400, message: "No FAQ Question Found" });
    }


    const updatefaqCategory = await updateDocument("faqQuestion", { _id:id }, {...req.body});


console.log(updateContentPage,'updateContentPage');

  

    return res
      .status(200)
      .send({ status: 200, message: "Update FAQ Question Successfully", updatefaqCategory });
  } catch (e) {
    console.log(e);
    return res.status(400).send({ status: 400, message: e.message });
  }
};

export default updateContentPage;
