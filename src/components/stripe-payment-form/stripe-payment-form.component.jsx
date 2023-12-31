// importing everything we going to use
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { DarkmodeContext } from "../../contexts/darkMode.context";
import { UserContext } from "../../contexts/user.context";
import Button from "../button/button.component";
import "./stripe-payment-form.component.scss";

// creating the form for Stripe payment only!
const StripePaymentForm = ({ totalPrice }) => {
  const { currentUser } = useContext(UserContext);
  const navigate = useNavigate();
  const { darkmode } = useContext(DarkmodeContext);
  const stripe = useStripe();
  const elements = useElements();

  // Stripe specific setup
  const paymentHandler = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }
    // fetching the functionality from the other file
    const response = await fetch("/.netlify/functions/create-payment-intent", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      // This is how Stripe wants the payment - * 100 because price sent in as cents
      body: JSON.stringify({ amount: totalPrice * 100 }),
    }).then((response) => response.json());

    // passing the secret key from stype
    const {
      paymentIntent: { client_secret },
    } = response;

    const paymentResult = await stripe.confirmCardPayment(client_secret, {
      payment_method: {
        card: elements.getElement(CardElement),
        billing_details: {
          name: currentUser,
        },
      },
    });
    if (paymentResult.error) {
      alert(paymentResult.error.message);
    } else {
      if (paymentResult.paymentIntent.status === "succeeded") {
        navigate("/", { replace: true });
      }
    }
  };

  return (
    <div
      className={`${
        darkmode ? "stripe-form-container dark" : "stripe-form-container"
      }`}
    >
      <p>Stripe test card details</p>
      <p>Card no: 4242 4242 4242 4242</p>
      <p>Expiry date: 10 / 25</p>
      <p>CVC: 424</p>
      <p>Postal code: 12345</p>
      <form onSubmit={paymentHandler}>
        <CardElement className="card-element" />
        <Button buttonType="stripePay">
          Pay &euro;{totalPrice} with Stripe
        </Button>
      </form>
    </div>
  );
};

export default StripePaymentForm;
