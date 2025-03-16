import express from "express";
//import addCategory from "./add-category.js";

import addAddress from "./add.js";
import updateAddress from "./update.js";
import deleteAddress from "./delete.js";
import getAddress from "./get.js";
import getSingleUserAddress from "./getSingle.js";
//import deleteCategory from "./delete-blog.js";
//import updateCategory from "./update-blog.js";



const router = express.Router();

router.get("/", getAddress);
router.post("/add",addAddress);
 router.put("/:id",updateAddress);
 router.delete("/:id", deleteAddress);
// Get Single Blog
router.get("/:id", getSingleUserAddress);

export default router;
