import axios from 'axios';
import getAccessToken from './accessToken.js';
//import paypal from 'paypal-rest-sdk';



const paypalSuccess = async(req, res) => {
  try {
    console.log(req,"testing");
    
    console.log(req.body,"boyd");
    
    console.log(req.query.token,"query");
   // console.log(req.query.PayerID,"payer");
   // console.log(req.query.paymentId,"payment");
    
    
    // const payerId = req.query.PayerID;
    // const paymentId = req.query.token;

    const getToken = await getAccessToken()
    // console.log(getToken,"getToke");
// const orderId = "09F82665VX572742U"
    const executeResponse = await axios.post(
      `https://api-m.sandbox.paypal.com/v2/checkout/orders/${req.query.toke}/capture`,
      {},
      {
        headers: {
          Authorization: `Bearer ${getToken}`,
          "Content-Type": "application/json",
        },
      }
    );
    console.log("Payment Captured:", executeResponse.data);

    // const executeResponse = await axios.post(
    //   `https://api-m.sandbox.paypal.com/v1/payments/payment/${paymentId}/execute`,
    //   { payer_id: payerId },
    //   {
    //     headers: {
    //       Authorization: `Bearer ${getToken}`,
    //       "Content-Type": "application/json",
    //     },
    //   }
    // );
    if(!executeResponse || executeResponse.length == 0){
      res.redirect(
        "http://3.110.42.187:5000/api/v1/user/account/payment/paypalcancel"
      );
    }
    console.log("Payment Success:", executeResponse.data);
    return res.status(201).json({ status: 201, message: "Payment Success" });

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

