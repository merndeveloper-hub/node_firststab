import express from "express";



import getAccessToken from "./accessToke.js";
import createPaypalOrder from "./paypal.js";



const router = express.Router();



router.get("/", getAccessToken);
router.post("/pay", createPaypalOrder);



export default router;
