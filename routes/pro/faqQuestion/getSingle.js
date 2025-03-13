import Joi from "joi";
// const { findOne } = require("../../../helpers");
import { findOne} from "../../../helpers/index.js";
// const schema = Joi.object({
//   title: Joi.string(),
//     pageCode: Joi.string(),
//     isSystemPage : Joi.string(),
//     status: Joi.string(),
//     contents: Joi.string(),
// });

const singleContentPage = async (req, res) => {
  try {
    // await schema.validateAsync(req.body);

    const { id} = req.params;
  

    let faqQuestion = await findOne("faqQuestion", { _id:id });
    if (!faqQuestion) {
      return res.status(400).send({ status: 400, message: "No FAQ Question Found" });
    }




  

    return res
      .status(200)
      .send({ status: 200, message: "Get FAQ Question Successfully", faqQuestion });
  } catch (e) {
    console.log(e);
    return res.status(400).send({ status: 400, message: e.message });
  }
};

export default singleContentPage;
