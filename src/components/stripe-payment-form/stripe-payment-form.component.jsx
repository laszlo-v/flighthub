import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import Button from "../button/button.component";
import "./stripe-payment-form.component.scss";
const StripePaymentForm = ({ totalPrice }) => {
  console.log(totalPrice);
  const stripe = useStripe();

  const elements = useElements();

  const paymentHandler = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    try {
      const { paymentMethod, error } = await stripe.createPaymentMethod({
        type: "card",
        card: elements.getElement(CardElement),
      });
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="stripe-div">
      <h3>Stripe payment form</h3>
      <CardElement />
      <Button buttonType="stripePay" onClick={paymentHandler}>
        Pay Now {totalPrice}
      </Button>
    </div>
  );
};

export default StripePaymentForm;
