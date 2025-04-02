// Create PayPal Order
import axios from "axios";
import getAccessToken from "./accessToken.js";

// import getAccessToken from "./getCredentials";



// const CLIENT_ID = "YOUR_PAYPAL_CLIENT_ID";
// const CLIENT_SECRET = "YOUR_PAYPAL_SECRET";

const BASE_URL = "https://api-m.sandbox.paypal.com"; // Use live URL in production
//const BASE_URL = "https://sandbox.paypal.com";

const createPaypalOrder = async (req, res) => {
  try {


     const getToken = await getAccessToken()
     console.log(getToken,"getToke");
     
 //  const accessToken = "A21AAJhrm3Rn6HphTT_dmYD8bGZtq6ejlw2u3cUIEy616qnhG4YuRsJ0dtmXnI9TygJbfvzbyLeKBi60820-PuTV7Kr9ngz2g"

    const orderData = {
        intent: "CAPTURE",
        purchase_units: [{
            amount: { currency_code: "USD", value: "50.00" }
        }],
        application_context: {
            return_url: "http://localhost:5000/api/v1/user/account/payment/paypalsuccess",
            cancel_url: "http://localhost:5000/api/v1/user/account/payment/paypalcancel"
        }
    };
  
    // return_url: "https://yourdomain.com/paypal/return-create?status=check",
    // cancel_url: "https://yourdomain.com/paypal/return-create?status=cancel",

    const response = await axios.post(
        `${BASE_URL}/v2/checkout/orders`,
        orderData,
        { headers: { Authorization: `Bearer ${getToken}`, "Content-Type": "application/json" } }
    );
  
console.log(response.data.id,"id");

    // if (payment.links[i].rel === "approval_url") {
    //   res.redirect(payment.links[i].href)
 // return  response.data.links.find(link => link.rel === "approve").href 
    return res
      .status(201)
      .json({ status: 201, data: response.data.id });
  } catch (error) {
    console.log(error, "error");
    return res.status(400).json({ status: 400, message: error.message });
    // throw new Error("Authentication failed");
  }
};

export default createPaypalOrder;


// const { url } = navState;
//         console.log("Navigated URL:", url);

//         if (url.includes("paypal/return-create?status=check")) {
//             console.log("Checking payment status...");
//         } else if (url.includes("paypal/return-create?status=cancel")) {
//             setTimeout(() => handleBackNavigation("homePage"), 1000);
//         } else if (url.includes("paypal/payment-success")) {
//             console.log("Payment success detected.");
//             if (!isPaymentProcessing) {
//                 setIsPaymentProcessing(true);
//                 const transactionID = getTransIdFromUrl(url);
//                 if (transactionID) {
//                     paymentApiCall(transactionID);
//                 }
//             }
//         } else if (url.includes("paypal/payment-fail")) {
//             setTimeout(() => handleBackNavigation("homePage"), 1000);
     //   }




     // const dictParameter = JSON.stringify([
        //     {
        //         loginuserID: global.UserId,
        //         languageID: "1",
        //         userType: "Customer",
        //         orderPaymentMode: "Credit Card",
        //         orderID: global.dictQuoteData.orderID,
        //         quoteID: global.dictQuoteData.quoteID,
        //         orderPaymentStatus: "Paid",
        //         apiVersion: "1.0",
        //         apiType: "Android",
        //         accountType: "Creditcard",
        //         cardToken: "sgkhgfdgngzxczcvbnvcx",
        //         amount: Number(global.dictQuoteData.total_amount_cus_pay),
        //         transactionID,
        //     },
        // ]);


        // try {
        //     const response = await utilityDL.sendRequestPost(
        //         dictParameter,
        //         "orders/customer-update-payment-status"
        //     );