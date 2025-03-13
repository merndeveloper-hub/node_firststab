import Joi from "joi";
import { updateDocument, findOne, insertNewDocument } from "../../../helpers/index.js";

const schema = Joi.object({
 
    FaqCategorieid:Joi.string().required(),
FaqCategorieName:Joi.string().required(),
title:Joi.string().required(),
answer:Joi.string().required(),
status:Joi.string(),
displayPostion:Joi.number().required()

  
});


const addContentPage = async (req, res) => {
    try {
        await schema.validateAsync(req.body);
       
        const findFaqCategorie = await findOne("faqCategory",{_id:req.body.FaqCategorieid});
        if (!findFaqCategorie) {
            return res.status(404).send({ status: 404, message: "No FAQ Categoryfound" });
        }
        const findFaqQuestion = await findOne("faqQuestion",{displayPostion:req.body.displayPostion});
        if (findFaqQuestion) {
            return res.status(404).send({ status: 404, message: "Already found question in displayPostion" });
        }
        const faqQuestion = await insertNewDocument("faqQuestion",{...req.body});

console.log(faqQuestion,"addContent....");

        if (!faqQuestion) {
            return res.status(404).send({ status: 404, message: "No Content found" });
        }
        

        return res
            .status(200)
            .send({ status: 200, message: "Add FAQ Question created successfully" ,faqQuestion});
    } catch (e) {
        console.log(e);
        return res.status(500).send({ status: 500, message: e.message });
    }
};

export default addContentPage;