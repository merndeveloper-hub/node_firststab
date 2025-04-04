
import axios from "axios";
import getAccessToken from "./accessToken.js";




const BASE_URL = "https://api-m.sandbox.paypal.com"; // Use live URL in production
//const BASE_URL = "https://sandbox.paypal.com";

const createPaypalOrder = async (req, res) => {
  try {
    const { amount } = req.body;
    const getToken = await getAccessToken();
    console.log(getToken, "getToke");

    //  const accessToken = "A21AAJhrm3Rn6HphTT_dmYD8bGZtq6ejlw2u3cUIEy616qnhG4YuRsJ0dtmXnI9TygJbfvzbyLeKBi60820-PuTV7Kr9ngz2g"

    const orderData = {
      intent: "CAPTURE", // Use "CAPTURE" instead of "sale"
      purchase_units: [
        {
          amount: {
            currency_code: "USD",
            value: amount,
          },
          description: "Payment for order",
        },
      ],
      application_context: {
        return_url:
          "http://localhost:5000/api/v1/user/account/payment/paypalsuccess",
        cancel_url:
          "http://localhost:5000/api/v1/user/account/payment/paypalcancel",
      },
    };

    const response = await axios.post(
      `${BASE_URL}/v2/checkout/orders`,
      orderData,
      {
        headers: {
          Authorization: `Bearer ${getToken}`,
          "Content-Type": "application/json",
        },
      }
    );
   
    const data = {
      id: response.data.id,
      status: "CREATED",
      links: [
        {
          href: response.data.links.find((link) => link.rel === "approve").href,
          rel: "approve",
          method: "GET",
        },
      ],
    };

    console.log("enter");

    // await paypalSuccess(response.data.id);

    console.log("final");
    return res.status(201).json({ status: 201, data: data });
  } catch (error) {
    // console.log(error, "error");
    return res.status(400).json({ status: 400, message: error.message });
    // throw new Error("Authentication failed");
  }
};

export default createPaypalOrder;
