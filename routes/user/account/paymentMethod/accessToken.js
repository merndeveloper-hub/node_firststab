// const paypal = require('paypal-rest-sdk');
// paypal.configure({
//   'mode': 'sandbox', //sandbox or live
//   'client_id': '####yourclientid######',
//   'client_secret': '####yourclientsecret#####'
// });
const PAYPAL_CLIENT_ID="AVA2XCsB7JMyv6doidcQSEMddfdDdMH1dqO8Ss3tSECeahRvfBVcjWdKeME5nelOuXab4KfB73ue8FU3"
const PAYPAL_CLIENT_SECRET="ECOwywA12OtKSUlg4Gxi88L8c5cWLxtNPBFuEXV0KAB5zpfMUP1m-q5gSr8DPm4WwK-dp32LntDBq6oF"
// const CLIENT_ID = "YOUR_PAYPAL_CLIENT_ID";
// const CLIENT_SECRET = "YOUR_PAYPAL_SECRET";

// Get PayPal Auth Token

// auth.js
import axios from "axios";

const getAccessToken = async (req, res) => {
  try {
    //  const {type} = req.body
    // // Base64-encoded credentials (replace with your actual credentials)a
    //  const authHeader = `Basic ${process.env.STERLING_BASE_URL}`;

    // console.log(authHeader,"auth");

    // // API endpoint
    //   const url = `${process.env.STERLING_API_URL}`;

    // Request configuration
    // const config = {
    //   headers: {
    //     Authorization: authHeader,
    //     'Content-Type': 'application/x-www-form-urlencoded',
    //   },
    // };
    const BASE_URL = "https://api-m.sandbox.paypal.com"; // Use live URL in production

    const response = await axios.post(
      `${BASE_URL}/v1/oauth2/token`,
      "grant_type=client_credentials",
      {
        auth: { username: PAYPAL_CLIENT_ID, password: PAYPAL_CLIENT_SECRET },
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
      }
    );
    //return response.data.access_token;

    // Send POST request
    // const response = await axios.post(url, data, config)

    console.log(response,"response");
return response.data.access_token
    // return res
    //   .status(201)
    //   .json({ status: 201, data: response.data.access_token });
  } catch (error) {
    console.log(error, "error");
    return res.status(400).json({ status: 400, message: error.message });
    // throw new Error("Authentication failed");
  }
};

export default getAccessToken;



