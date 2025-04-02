import express from "express";
//import addCategory from "./add-category.js";
//import getAllCategories from "./get-AllCategories.js";
//import getSingleCategory from "./get-single-blog.js";
//import deleteCategory from "./delete-blog.js";
//import updateCategory from "./update-blog.js";


import booking from "./getBooking.js";
import cancelledBooking from "./cancleBooking.js";
import proServiceRequest from "./getProServiceReq.js";
import userAcceptProServiceRequest from "./userAcceptProServiceRequest.js";
//import tokenVerification from "../../../middleware/token-verification/index.js";
//import mostPopularCategory from "../home/mostPopularCategory.js";
// import releasePayment from "./releasePayment.js";
// import refundPayment from "./refundPayment.js";
//import historyBooking from "./historyBooking.js";


const router = express.Router();


///--------User get all created,requested,accepted services------///
router.get("/:id", booking);


//router.post("/add",multipartMiddleware, addCategory);

//user accept pro request
//router.put("/holdamount/:id", userAcceptProServiceRequest);

//  releasePayment to pro 
// router.post("/releasepayment/:id", releasePayment);

// //refundPayment
// router.post("/refundPayment/:id", refundPayment);


///--------Remove get (created,requested,accepted services)------///
router.delete("/:id", cancelledBooking);


//----User accepted Pro Accepted services----//
router.put("/useraccept/:id", userAcceptProServiceRequest);


//----Get Pro Accepted services----//
router.get("/proaccept/:id", proServiceRequest);


export default router;
