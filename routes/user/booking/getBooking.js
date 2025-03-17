import Joi from "joi";
import { find, getAggregate } from "../../../helpers/index.js";

const schemaForId = Joi.object().keys({
  id: Joi.string().required(),
});

const schema = Joi.object().keys({
  serviceStatus: Joi.string().required(),
});


const booking = async (req, res) => {
  try {
    await schema.validateAsync(req.body);
    await schemaForId.validateAsync(req.params);
    const { id } = req.params;
const {serviceStatus} = req.body

const booking = await find("userBookServ",{userId:id,serviceStatus})

if(booking.length <= 0){
  return res.status(200).json({ status: 200, message: "No Booking Found!" });
}
console.log(booking,"booking");



    
    return res.status(200).json({ status: 200, booking });
  } catch (e) {
    console.log(e);
    return res.status(500).json({ status: 500, message: e.message });
  }
};

export default booking;


