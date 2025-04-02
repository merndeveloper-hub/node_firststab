import paypal from 'paypal-rest-sdk';

paypal.configure({
  "PAYPAL_CLIENT_ID":"AU-T3vm80bzgk_ygC6zvO4ECrLDxqCVsquch2-Rd_Xpakj--1C8o6pkdkBSqFxEnI9y52hGHpLJJnJ71",
"PAYPAL_CLIENT_SECRET":"EOmvmBOo_wLM_6JhuSAvCwCxaDg4ye6eR9Pt9JqyYh_lCx-zTz7X2_leuhb1w6RJuRGB2SD4TVUZUdBa",
"PAYPAL_MODE":"sandbox"

});


const handlePayment = (req, res) => {
  const payerId = req.query.PayerID;
  const paymentId = req.query.paymentId;

  const executePayment = {
    payer_id: payerId,
  };

  paypal.payment.execute(paymentId, executePayment, (error, payment) => {
    if (error) {
      console.error('Error executing PayPal payment:', error);
      res.redirect('/paypalcancel');
    } else {
      
      res.send('Payment Success'); 
    }
  });
}

export default handlePayment;