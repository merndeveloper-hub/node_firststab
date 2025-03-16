import express from "express";
//import addCategory from "./add-category.js";
//import getAllCategories from "./get-AllCategories.js";
//import getSingleCategory from "./get-single-blog.js";
//import deleteCategory from "./delete-blog.js";
//import updateCategory from "./update-blog.js";


import getOnGoingBooking from "./onGoingBooking.js";


const router = express.Router();

router.get("/ongoing/:id", getOnGoingBooking);
//router.post("/add",multipartMiddleware, addCategory);
 //router.put("/:id",multipartMiddleware, updateCategory);
 //router.delete("/:id", deleteCategory);
// Get Single Blog
//router.get("/single/:id", getSingleCategory);

export default router;
