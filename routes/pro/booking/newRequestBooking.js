import Joi from "joi";
import { find, getAggregate } from "../../../helpers/index.js";

// const schema = Joi.object().keys({
//   id: Joi.string().required(),
// });


const newRequestBooking = async (req, res) => {
  try {
  //  await schema.validateAsync(req.params);
  
const newRequest = await find("booking",{serviceStatus:"Pending"})

if(newRequest.length <= 0){
  return res.status(200).json({ status: 200, message: "No New Request Found!" });
}
console.log(newRequest,"newRequest");



    
    return res.status(200).json({ status: 200, newRequest });
  } catch (e) {
    console.log(e);
    return res.status(500).json({ status: 500, message: e.message });
  }
};

export default newRequestBooking;


