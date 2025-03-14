import Joi from "joi";
import { findOne, insertNewDocument } from "../../../helpers/index.js";
import booking from "../../../models/booking/booking.js";
import category from "../../../models/categorie/index.js";

const schema = Joi.object({
  userId: Joi.string().hex().length(24).required(), // Must be a valid MongoDB ObjectId
  image: Joi.string(),
  professionalId:Joi.string().hex().length(24),
  problemDesc: Joi.string().required(),
  categoryId: Joi.string().hex().length(24).required(),
        subCategories: Joi.object({
           id:Joi.string().hex().length(24).required(),
          serviceType: Joi.string(),
              startDate: Joi.date().optional(),
              endDate: Joi.date().optional(),
              startTime: Joi.date().optional(),
              endTime: Joi.date().optional(),
        })
        
      })    


const bookService = async (req, res) => {
  try {
  await schema.validateAsync(req.body)  
  const {userId,categoryId,professionalId,} =  req.body
//console.log( req.body.subCategories[0].id," req.body.subCategories[0].id");

 
const findUser = await findOne("user",{_id:userId})
  if(!findUser){
  return res
  .status(400)
  .json({ status: 400, message: "No User Found"}); 
}

let findprofessionalId
if(professionalId){
  findprofessionalId = await findOne("user",{_id:professionalId})
  if(!findprofessionalId){
  return res
  .status(400)
  .json({ status: 400, message: "No Service Provider Found"}); 
}
}
const findCategorie = await findOne("category",{_id:categoryId})
  if(!findCategorie){
  return res
  .status(400)
  .json({ status: 400, message: "No Categorie Found"}); 
}

const findSubCategorie = await findOne("subCategory",{_id: req.body.subCategories.id})
  if(!findSubCategorie){
  return res
  .status(400)
  .json({ status: 400, message: "No Sub Categorie Found"}); 
}
    const bookServ = await insertNewDocument("userBookServ", {
      ...req.body,
    
    });

console.log(bookServ,"bookServ");
if(!bookServ){
  return res
  .status(400)
  .json({ status: 400, message: "Not Book Service"});
}

// if(bookServ){




// //console.log(filteredSubCategories,"filteredSubCategories");

// const booking = await insertNewDocument("userBookServ", {
//   userId:findUser._id,
//   professsionalId:findprofessionalId?._id,
//   requestId: "",
//   serviceName:bookServ.subCategories.name,
//   serviceName:findCategorie.name,
//   typeOfWork:findSubCategorie.name,
//   problemDesc:bookServ.problemDesc,
//  desiredDateTime:bookServ.subCategories.startDate,
//   quotesReceived:0,
// });


// console.log(booking,"bookings");
// }
    return res
      .status(200)
      .json({ status: 200, message: "Book Service successfully", bookServ});
  } catch (e) {
    return res.status(500).json({ status: 500, message: e.message });
  }
};

export default bookService;

