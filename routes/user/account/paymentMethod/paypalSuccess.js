import axios from 'axios';
import getAccessToken from './accessToken.js';
//import paypal from 'paypal-rest-sdk';



const paypalSuccess = async(req, res) => {
  try {
   
const {token} = req.query

    const getToken = await getAccessToken()
 
  // Step 1: AUTHORIZE the payment
  const authorizeRes = await axios.post(
    `https://api-m.sandbox.paypal.com/v2/checkout/orders/${token}/authorize`,
    {},
    {
      headers: {
        Authorization: `Bearer ${getToken}`,
        "Content-Type": "application/json",
      },
    }
  );

  console.log("Payment Authorized:", authorizeRes.data);

  // Optional: Save authorization ID to DB for later capture
  const authorizationId =
    authorizeRes.data.purchase_units[0].payments.authorizations[0].id;
console.log(authorizationId,"authorizationId");

  // Send minimal success response
  //return res.send("<html><body style='background:#fff;'>Payment Authorized</body></html>");




    // const executeResponse = await axios.post(
    //   `https://api-m.sandbox.paypal.com/v2/checkout/orders/${req.query.token}/capture`,
    //   {},
    //   {
    //     headers: {
    //       Authorization: `Bearer ${getToken}`,
    //       "Content-Type": "application/json",
    //     },
    //   }
    // );
    // console.log("Payment Captured:", executeResponse.data);

  
    // if(!executeResponse || executeResponse.length == 0){
    //   res.redirect(
    //     "http://localhost:5000/api/v1/user/account/payment/paypalcancel"
    //   );
    // }
    // console.log("Payment Success:", executeResponse.data);
  return  res.send("<html><body style='background:#fff;'></body></html>");

    //return res.status(201).json({ status: 201, message: "Payment Success" });

  } catch (error) {
    console.error(
      "Error executing PayPal payment:",
      error.response ? error.response.data : error.message
    );
    res.redirect(
      "http://3.110.42.187:5000/api/v1/user/account/payment/paypalcancel"
    );
  }

  // const executePayment = {
  //   payer_id: payerId,
  // };

  // paypal.payment.execute(paymentId, executePayment, (error, payment) => {
  //   if (error) {
  //     console.error('Error executing PayPal payment:', error);
  //     res.redirect('http://localhost:5000/api/v1/user/account/payment/paypalcancel');
  //   } else {
      
  //     res.send('Payment Success'); 
  //   }
  // });
}

export default paypalSuccess;

