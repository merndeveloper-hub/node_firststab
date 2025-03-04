import express from "express";

import createbusiness from "./create.js";
//const getMetaData = require("./get");


const router = express.Router();

router.post(
  "/add",
  createbusiness
);
//router.get("/:id", getMetaData);

export default router;
