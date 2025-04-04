

const paymentCancel = (req, res) => {
 try {
  return res.status(200).json({ status: 200, message: 'Your payment has been cancelled!'});
 } catch (error) {
  return res.status(400).json({ status: 400, message: error.message });
 }



}

export default paymentCancel;