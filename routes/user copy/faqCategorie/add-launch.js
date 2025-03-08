import Joi from "joi";
import { updateDocument, findOne, insertNewDocument } from "../../../helpers/index.js";

const schema = Joi.object({
    name: Joi.string().required(),
  
    status: Joi.string()
  
});


const addContentPage = async (req, res) => {
    try {
        await schema.validateAsync(req.body);
       

        const faqCategorie = await insertNewDocument("faqCategory",{...req.body});

console.log(faqCategorie,"addContent....");

        if (!faqCategorie) {
            return res.status(404).send({ status: 404, message: "No Content found" });
        }
        

        return res
            .status(200)
            .send({ status: 200, message: "Add FAQ Category created successfully" ,faqCategorie});
    } catch (e) {
        console.log(e);
        return res.status(500).send({ status: 500, message: e.message });
    }
};

export default addContentPage;