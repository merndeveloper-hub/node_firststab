import Joi from "joi";
// const { findOne } = require("../../../helpers");
import { findOne, updateDocument} from "../../../helpers/index.js";
const schema = Joi.object({
  title: Joi.string(),
    pageCode: Joi.string(),
    isSystemPage : Joi.string(),
    status: Joi.string(),
    contents: Joi.string(),
});

const updateContentPage = async (req, res) => {
  try {
    await schema.validateAsync(req.body);

    const { id} = req.params;
  

    let faqCategory = await findOne("faqCategory", { _id:id });
    if (!faqCategory) {
      return res.status(400).send({ status: 400, message: "No Content Page Found" });
    }


    const updatefaqCategory = await updateDocument("faqCategory", { _id:id }, {...req.body});


console.log(updateContentPage,'updateContentPage');

  

    return res
      .status(200)
      .send({ status: 200, message: "Update FAQ Category Successfully", updatefaqCategory });
  } catch (e) {
    console.log(e);
    return res.status(400).send({ status: 400, message: e.message });
  }
};

export default updateContentPage;
