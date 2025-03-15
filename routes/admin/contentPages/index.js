import express from "express";
// const addLaunch = require("./add-launch");
// const getLaunch = require('./get-launchPad');
// const approvedLaunchpad = require("./update");
import addContentPage from "./add-launch.js";
import getContentPage from "./get-launchPad.js";
import updateContentPage from "./update.js";
import updateContentStatus from "./updateStatus.js";
import singleContentPage from "./getSingle.js";


import multipart from "connect-multiparty";
const multipartMiddleware = multipart();
const router = express.Router();

router.post("/add",multipartMiddleware, addContentPage);
router.get("/get", getContentPage);
router.get("/get/:id", singleContentPage)
router.put("/updatedstatus/:id", updateContentStatus);
router.put("/update/:id",multipartMiddleware, updateContentPage);

export default router;
