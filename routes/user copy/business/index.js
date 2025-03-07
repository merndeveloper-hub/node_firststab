import express from "express";

import createbusiness from "./create.js";
import tokenVerification from "../../../middleware/token-verification/index.js";
//const getMetaData = require("./get");


const router = express.Router();

router.post(
  "/add",tokenVerification,
  createbusiness
);
//router.get("/:id", getMetaData);

export default router;
