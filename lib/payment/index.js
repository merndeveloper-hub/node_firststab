// Create PayPal Order
import axios from "axios";
import getAccessToken from "./getCredentials";

const CLIENT_ID = "YOUR_PAYPAL_CLIENT_ID";
const CLIENT_SECRET = "YOUR_PAYPAL_SECRET";

const BASE_URL = "https://api-m.sandbox.paypal.com"; // Use live URL in production


const createPaypalOrder = async (req, res) => {
  try {
    const accessToken = await getAccessToken();

    const orderData = {
        intent: "CAPTURE",
        purchase_units: [{
            amount: { currency_code: "USD", value: "50.00" }
        }],
        application_context: {
            return_url: "https://yourapp.com/success",
            cancel_url: "https://yourapp.com/cancel"
        }
    };
  
    const response = await axios.post(
        `${BASE_URL}/v2/checkout/orders`,
        orderData,
        { headers: { Authorization: Bearer `${accessToken}`, "Content-Type": "application/json" } }
    );
  
    res.json({ approvalUrl: response.data.links.find(link => link.rel === "approve").href });   
    return res
      .status(201)
      .json({ status: 201, data: response.data.access_token });
  } catch (error) {
    console.log(error, "error");
    return res.status(400).json({ status: 400, message: error.message });
    // throw new Error("Authentication failed");
  }
};

export default createPaypalOrder;
