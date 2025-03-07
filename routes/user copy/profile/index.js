import express from "express";

import updateProfile from "./update.js";
//const getMetaData = require("./get");
import multipart from "connect-multiparty";
import tokenVerification from "../../../middleware/token-verification/index.js";
const multipartMiddleware = multipart();

const router = express.Router();

router.put(
  "/update/:id",multipartMiddleware,
  updateProfile
);
//router.get("/:id", getMetaData);

export default router;
