import express from "express";
//import newRequestBooking from "./newRequestBooking.js";
//import addCategory from "./add-category.js";
//import getAllCategories from "./get-AllCategories.js";
//import getSingleCategory from "./get-single-blog.js";
//import deleteCategory from "./delete-blog.js";
import newRequestBooking from "./newRequestBooking.js";
import updateNewRequestBooking from "./updateNewRequestBooking.js";


// import getOnGoingBooking from "./onGoingBooking.js";
import cancelledBooking from "./cancelBooking.js";
import getOnGoingBooking from "./onGoingBooking.js";
// import historyBooking from "./historyBooking.js";


const router = express.Router();

//router.get("/", newRequestBooking);
//router.post("/add",multipartMiddleware, addCategory);

//-----Update User pending,Accepted and OnGoing request related to categorie,subCategory with serviceType----//
 router.put("/newrequest/:id",updateNewRequestBooking);
 
//-----Cancelled User pending,Accepted and OnGoing request related to categorie,subCategory with serviceType----//
 router.delete("/:id", cancelledBooking);

//-----Get User pending,Accepted and OnGoing request related to categorie,subCategory with serviceType----//
router.get("/newrequest/:id", newRequestBooking);

//-----Get User pending,Accepted and OnGoing request related to categorie,subCategory with serviceType----//
router.get("/bookservices/:id", getOnGoingBooking);



export default router;
