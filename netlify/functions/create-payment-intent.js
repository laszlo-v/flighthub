// Specific config for Netlify to provide the secret key and to create a payment intent - like an express setup
require("dotenv").config();
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

exports.handler = async (e) => {
  try {
    const { amount } = JSON.parse(e.body);

    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency: "eur",
      payment_method_types: ["card"],
    });

    return {
      statusCode: 200,
      body: JSON.stringify({ paymentIntent }),
    };
  } catch (error) {
    console.log("Error", error);

    return {
      status: 400,
      body: JSON.stringify({ error: error.message }),
    };
  }
};
