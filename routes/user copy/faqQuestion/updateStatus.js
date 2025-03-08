import Joi from "joi";
// const { findOne } = require("../../../helpers");
import { findOne, updateDocument} from "../../../helpers/index.js";
const schema = Joi.object({

  
    status: Joi.string(),
   
});

const updateContentStatus = async (req, res) => {
  try {
    await schema.validateAsync(req.body);

    const { id} = req.params;
  

    let contentPage = await findOne("faqQuestion", { _id:id });
    if (!contentPage) {
      return res.status(400).send({ status: 400, message: "No FAQ Questin Found" });
    }


    const updateContentPage = await updateDocument("faqQuestion", { _id:id }, {status:req.body.status});


console.log(updateContentPage,'updateContentPage');

  

    return res
      .status(200)
      .send({ status: 200, message: "Update FAQ Question Successfully", updateContentPage });
  } catch (e) {
    console.log(e);
    return res.status(400).send({ status: 400, message: e.message });
  }
};

export default updateContentStatus;
