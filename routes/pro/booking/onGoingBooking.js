// import Joi from "joi";
// import { find, getAggregate } from "../../../helpers/index.js";

// const schema = Joi.object().keys({
//   id: Joi.string().required(),
// });


// const getOnGoingBooking = async (req, res) => {
//   try {
//     await schema.validateAsync(req.params);
//     const { id } = req.params;
// const goingbooking = await find("booking",{userId:id,serviceStatus:"Pending"})

// if(goingbooking.length <= 0){
//   return res.status(200).json({ status: 200, message: "No Booking Found!" });
// }
// console.log(goingbooking,"goingbooking");



    
//     return res.status(200).json({ status: 200, goingbooking });
//   } catch (e) {
//     console.log(e);
//     return res.status(500).json({ status: 500, message: e.message });
//   }
// };

// export default getOnGoingBooking;


