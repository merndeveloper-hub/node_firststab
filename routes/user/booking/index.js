import express from "express";
//import addCategory from "./add-category.js";
//import getAllCategories from "./get-AllCategories.js";
//import getSingleCategory from "./get-single-blog.js";
//import deleteCategory from "./delete-blog.js";
//import updateCategory from "./update-blog.js";


import booking from "./getBooking.js";
import cancelledBooking from "./cancleBooking.js";
//import historyBooking from "./historyBooking.js";


const router = express.Router();

router.get("/:id", booking);
//router.post("/add",multipartMiddleware, addCategory);
 //router.put("/:id",multipartMiddleware, updateCategory);
 router.delete("/:id", cancelledBooking);
// Get Single Blog
//router.get("/history/:id", historyBooking);

export default router;
