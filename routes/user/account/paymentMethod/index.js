import express from "express";



import getAccessToken from "./accessToken.js";
import createPaypalOrder from "./paypal.js";
import paypalPayment from "./capturePayment.js";
import handlePayment from "./paypalSuccess.js";
import paymentCancel from "./paypalCancel.js";
import capturePayment from "./capturePayment.js";



const router = express.Router();



router.get("/", getAccessToken);
router.post("/pay", createPaypalOrder);

router.post("/capturepayment", capturePayment);

router.post("/paypal", paypalPayment);
router.get("/paypalsuccess", handlePayment);
router.get("/paypalcancel", paymentCancel);



export default router;
