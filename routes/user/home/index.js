import express from "express";
//import addCategory from "./add-category.js";
import getAllCategories from "./getCategorie.js";
//import getSingleCategory from "./get-single-blog.js";
//import deleteCategory from "./delete-blog.js";
//import updateCategory from "./update-blog.js";
import bookService from "./bookService.js"

import multipart from "connect-multiparty";
import getProfessional from "./getProfessional.js";
const multipartMiddleware = multipart();

const router = express.Router();

router.get("/", getAllCategories);
router.get("/getprofessional",getProfessional);
 //router.put("/:id",multipartMiddleware, updateCategory);
 //router.delete("/:id", deleteCategory);
// Get Single Blog
//router.get("/single/:id", getSingleCategory);


//Book Service
router.post("/bookservice", bookService)

export default router;
