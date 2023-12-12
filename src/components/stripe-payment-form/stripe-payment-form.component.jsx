import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { useState } from "react";
import Button from "../button/button.component";
import "./stripe-payment-form.component.scss";

const StripePaymentForm = ({ totalPrice }) => {
  const stripe = useStripe();
  const elements = useElements();

  const paymentHandler = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const response = await fetch("/.netlify/functions/create-payment-intent", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ amount: totalPrice * 100 }),
    }).then((response) => response.json());

    const {
      paymentIntent: { client_secret },
    } = response;

    const paymentResult = await stripe.confirmCardPayment(client_secret, {
      payment_method: {
        card: elements.getElement(CardElement),
        billing_details: {
          name: "Test Name",
        },
      },
    });
    if (paymentResult.error) {
      alert(paymentResult.error);
    } else {
      if (paymentResult.paymentIntent.status === "succeeded") {
        alert("Success");
      }
    }
  };
  return (
    <div className="stripe-form-container">
      <form onSubmit={paymentHandler}>
        <CardElement />
        <Button buttonType="stripePay">
          Pay &euro;{totalPrice} with Stripe
        </Button>
      </form>
    </div>
  );
};

export default StripePaymentForm;
