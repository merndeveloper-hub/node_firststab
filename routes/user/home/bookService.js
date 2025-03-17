import Joi from "joi";
import { findOne, insertNewDocument } from "../../../helpers/index.js";
//import booking from "../../../models/booking/booking.js";
//import category from "../../../models/categorie/index.js";
import generateUniqueNumber from "../../../utils/index.js";
//import subCategory from "../../../models/subCategorie/index.js";

const schema = Joi.object({
  userId: Joi.string().hex().length(24).required(), // Must be a valid MongoDB ObjectId
  addressId:Joi.string().hex().length(24),
  image: Joi.string().allow('').optional(),
  professionalId:  Joi.string().allow('').optional(),
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
  const {userId,categoryId,professionalId,problemDesc,startDate,endDate,startTime,endTime} =  req.body
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

console.log(req.body.subCategories.id,"req.body.subCategories.id");
console.log([req.body.serviceType],"checkintype");


//const findSubCategorie = await findOne("subCategory",{_id: req.body.subCategories.id})
const findSubCategorie = await findOne("subCategory", {
  _id: req.body.subCategories.id,
  [req.body.subCategories.serviceType]: true // Dynamically check serviceType key
}); 

console.log(findSubCategorie,"findSubCategorie");

if(!findSubCategorie){
  return res
  .status(400)
  .json({ status: 400, message: "No Sub Categorie Found"}); 
}

if(req.body.addressId){

  const addressId = await findOne("address",{_id: req.body.addressId})
    if(!addressId){
    return res
    .status(400)
    .json({ status: 400, message: "No Address Found"}); 
  }
}


const genrateRequestID = generateUniqueNumber()

console.log(genrateRequestID,"genrateRequestID");

    const bookServ = await insertNewDocument("userBookServ", {
      ...req.body,
      requestId: genrateRequestID,
      serviceType:req.body.subCategories.serviceType,
      serviceName:findCategorie.name,
      typeOfWork:findSubCategorie.name,
      problemDesc:problemDesc,
     desiredDateTime:startDate && startTime ? new Date(`${startDate}T${startTime}:00.000Z`) : null,
     endDateTime:endDate && endTime ? new Date(`${endDate}T${endTime}:00.000Z`) : null,
      quotesReceived:0,
      serviceAssign:professionalId ? "Professional": "Random",
      serviceStatus: "OnGoing"
    
    });

console.log(bookServ,"bookServ");
if(!bookServ){
  return res
  .status(400)
  .json({ status: 400, message: "Book Service not created successfully"});
}

// if(bookServ){


  

// const booking = await insertNewDocument("booking", {
//   bookServiceId:bookServ._id,
//   userId:findUser?._id,
//   professsionalId:findprofessionalId?._id,
//   categoryId:findCategorie._id,
//   subCategoryId:findSubCategorie._id,
//   requestId: genrateRequestID,
//   serviceType:bookServ.subCategories.serviceType,
//   serviceName:findCategorie.name,
//   typeOfWork:findSubCategorie.name,
//   problemDesc:bookServ.problemDesc,
//  desiredDateTime:bookServ.subCategories.startDate,
//   quotesReceived:0,
//   serviceAssign:professionalId ? "Professional": "Random",
//   serviceStatus: "Pending"
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

