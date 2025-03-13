import express from "express";
// const { adminVerification } = require("../middleware");
import userType from "./userType/index.js";
 import auth from "./auth/index.js";
import user from "./user/index.js";
import pro from "./pro/index.js";

 import refresh_token from "./check-token/index.js";
 import admin from "./admin/index.js";
import getSterling from "../lib/sterling/index.js";
// const metadata = require("./nft-metadata");
// const launchpadMetadata = require("./launchpad-metadata");

// const moralis = require("./moralis");
// const activity = require("./user/activity");
const router = express.Router();



// AUTH Routes * /api/auth/*
router.use("/userType", userType);
router.use("/auth", auth);
router.use("/user", user);
router.use("/pro", pro);

 router.use("/refresh_token", refresh_token);
// router.use("/admin", adminVerification, admin);
router.use("/admin",  admin); //token add krna hian 
router.use("/sterling",getSterling)
// router.use("/nft-metadata", metadata);
// router.use("/launchpad-metadata",launchpadMetadata);
// router.use("/moralis", moralis);
// router.use("/activity", activity);

export default router;
