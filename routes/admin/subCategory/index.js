import express from "express";
import subaddCategory from "./add-category.js";
// const deleteBlog = require("./delete-blog");
// const getBlogs = require("./get-blogs");
// const getSingleBlog = require("./get-single-blog");
// const updateBlog = require("./update-blog");
import multipart from "connect-multiparty";
const multipartMiddleware = multipart();
const router = express.Router();

//router.get("/", getBlogs);
router.post("/add",multipartMiddleware, subaddCategory);
// router.put("/:id", updateBlog);
// router.delete("/:id", deleteBlog);
// Get Single Blog
//router.get("/single/:id", getSingleBlog);

export default router;
