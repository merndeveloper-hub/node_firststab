import express from "express";


import getAllCategoriesWithSubcate from "./getAdminMainSubCategory.js";
import getCategories from "./getAdminCategorie.js";
import getSubCateWithPagination from "./getSubCategoriePagination.js";

//------Add Media Image and Icon in categorie---//
import multipart from "connect-multiparty";
import removeServiceCategory from "./removeServiceCategory.js";
import getServiceCategoryCount from "./getServiceCount.js";
import createService from "./addService.js";
const multipartMiddleware = multipart();

const router = express.Router();

//router.get("/list", getAllCategories);

//--------Get All Admin Categories With subcategories---//
router.get("/subcategory",getAllCategoriesWithSubcate)

//--------Get All Admin Categories-------//
router.get("/",getCategories)


//--------Get Single Admin Category With subcategories Pagination---//
router.get("/subcategory/:id", getSubCateWithPagination);


//--------Count Pro Service ---//
router.get("/servicecount/:id",getServiceCategoryCount);


//--------Create Service With Categories and subcategories---//
router.post("/", createService);

// router.put("/:id",multipartMiddleware, updateCategory);

//-----Delete pro created service----//
router.delete("/service/:id", removeServiceCategory);



export default router;
