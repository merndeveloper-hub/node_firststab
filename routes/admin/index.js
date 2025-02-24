import express from "express";
import category from "./category/index.js";
import subCategory from "./subCategory/index.js";
import subSubCategory from './subSubCategory/index.js'
const router = express.Router();

// const user = require("./user");
// const profile = require("./profile");
// const nft = require("./nft");
// const blog = require("./blog");
// const roles = require("./roles");
// const allowlist = require("./allowlist");
// const  launchpad  = require("./launchpad");

// router.use("/user", user);
// router.use("/nft", nft);
// router.use("/profile", profile);
// router.use("/blog", blog);
// router.use("/roles", roles);
// router.use("/allowlist", allowlist);
// router.use("/launchpad", launchpad);
router.use("/category",category)
router.use("/subcategory",subCategory)
router.use("/subsubcategory",subSubCategory)

export default router;
