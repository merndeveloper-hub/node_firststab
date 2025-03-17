import Joi from "joi";
import { find, findOne, getAggregate, updateDocument } from "../../../helpers/index.js";

const schema = Joi.object().keys({
  id: Joi.string().required(),
});


const cancelledBooking = async (req, res) => {
  try {
    await schema.validateAsync(req.params);
    const { id } = req.params;
const goingbooking = await findOne("userBookServ",{_id:id})

if(goingbooking.length <= 0){
  return res.status(200).json({ status: 200, message: "No Booking Found!" });
}


const cancelbooking = await updateDocument("userBookServ",{_id:id},{serviceStatus:"Cancelled",cancelledReason:"Cancelled By You"})

if(!cancelbooking){
  return res.status(200).json({ status: 200, message: "No Booking Found!" });
}

    
    return res.status(200).json({ status: 200, message:"Cancelled Booking By User",cancelbooking });
  } catch (e) {
    console.log(e);
    return res.status(500).json({ status: 500, message: e.message });
  }
};

export default cancelledBooking;


