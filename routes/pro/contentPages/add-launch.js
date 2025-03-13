import Joi from "joi";
import { updateDocument, findOne, insertNewDocument } from "../../../helpers/index.js";

const schema = Joi.object({
    title: Joi.string().required(),
    pageCode: Joi.string().required(),
    isSystemPage : Joi.string(),
    status: Joi.string().required(),
    contents: Joi.string().required(),
});


const addContentPage = async (req, res) => {
    try {
        await schema.validateAsync(req.body);
       

        const addContent = await insertNewDocument("content",{...req.body});

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