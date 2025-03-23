import Joi from "joi";
import {  updateDocument } from "../../../helpers/index.js";


const schema = Joi.object().keys({
  id: Joi.string().required(),
});

const schemaBody = Joi.object().keys({
  addInstruction : Joi.string(),
});

const userAcceptProServiceRequest = async (req, res) => {
  try {
  
    await schema.validateAsync(req.params);
  await schemaBody.validateAsync(req.body);

    const { id } = req.params;

    const getProBookService = await updateDocument("proBookingService",{_id:id},{...req.body,status:"OnGoing"})

if(!getProBookService || getProBookService.length == 0){
  return res.status(200).json({ status: 200, message: "No professional quotes available at the moment." });
}

const userBookServiceUpdate = await updateDocument("userBookServ",{_id:getProBookService.bookServiceId},{...req.body,status:"OnGoing"})

    return res.status(200).json({ status: 200, getProBookService,message:"Updated Book Service successfully" });
  } catch (e) {
    console.log(e);
    return res.status(400).json({ status: 400, message: e.message });
  }
};

export default userAcceptProServiceRequest;
