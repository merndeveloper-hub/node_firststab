

const paymentCancel = (req, res) => {
 try {
 return res.send("<html><body style='background:#fff;'><h3>Payment Cancelled. You can close this window.</h3><script>window.close()</script></body></html>");

// return res.status(200).json({ status: 200, message: 'Your payment has been cancelled!'});
 } catch (error) {
  return res.status(400).json({ status: 400, message: error.message });
 }



}

export default paymentCancel;


