import Joi from "joi";
import { findOne, insertNewDocument } from "../../../helpers/index.js";
import Stripe from "stripe";

let stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
console.log(stripe,"stripe");
console.log(process.env.STRIPE_SECRET_KEY,"key");



const validationSchema = Joi.object({
  amount: Joi.number().required(),
  currency: Joi.string(),
  paymentMethod: Joi.string().required(),
  userId: Joi.string().required(),
});

const stripePayment = async (req, res) => {
  try {
    await validationSchema.validateAsync(req.body);
    console.log(req.body);

    const { userId, amount, currency } = req.body;

    const findUser = await findOne('user',{_id:userId});
    if(!findUser){
      return res.status(400).json({
        status: 400,
        message: "User has not found",
      });
    }

let paymentMethod = await stripe.paymentMethods.create({
  type:'card',
  card:{
    number:'4242424242424242',
    exp_month:9,
    exp_year:2025,
    cvc:'314'
  },
});

    // Create Stripe Payment Intent
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount * 100, // Convert to cents
      currency: currency || "usd",
      payment_method: paymentMethod.id,
      confirm: true,
      payment_method_types:['card'],
    });

    console.log(paymentIntent,"payment");
    

    const paymentRes = await insertNewDocument(
      "payment",

      {
       ...req.body,
        paymentMethod: "stripe",
        transactionId: paymentIntent.id,
        status: "success",
      }
    );
    if (!paymentRes) {
      return res.status(400).json({
        status: 400,
        message: "Payment not succesfully done!",
      });
    }

    return res.status(200).json({
      status: 200,
      data: paymentRes,
    });
  } catch (e) {
    console.log(e);
    return res.status(500).json({ status: 500, message: e.message });
  }
};

export default stripePayment;
