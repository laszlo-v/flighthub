import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { PriceContext } from "../../contexts/priceContext";
import ShowStep from "../../components/show-step/show-step.component";
import arrow from "../../assets/arrow.png";
import arrowDark from "../../assets/arrow-dark.png";
import Button from "../../components/button/button.component";
import { DarkmodeContext } from "../../contexts/darkMode.context";
import LightDark from "../../components/light-dark.component/light-dark.component";
import { Formik, Field, Form, ErrorMessage } from "formik";
import StripePaymentForm from "../../components/stripe-payment-form/stripe-payment-form.component";

import * as Yup from "yup";
import "./confirmation.styles.scss";

// I use two forms in this component - one is commented out
// one for Formik and Yup
// and one for Stripe - Cardelement

const Confirmation = () => {
  const { totalPrice } = useContext(PriceContext);
  const { darkmode } = useContext(DarkmodeContext);
  const [showSuccess, setShowSuccess] = useState(false);

  const location = useLocation();
  const { selectedFlight, numLuggage, insurance } = location.state || {};

  const handleSubmit = (e) => {
    setShowSuccess(true);
  };

  let navigate = useNavigate();
  const handleBackToHomepage = () => {
    // I'm passing an extra object to the use navigate hook to prevent getting back to the payment page with the back arrow key after the form is submitted
    navigate("/", { replace: true });
  };

  useEffect(() => {}, [totalPrice]);
  return (
    <>
      <LightDark />
      <div className={`${darkmode ? "container dark" : "container"}`}>
        {showSuccess && (
          <div className="overlay">
            <div
              className={`${
                darkmode ? "success-message dark" : "success-message"
              }`}
            >
              <p>Success</p>
            </div>
            <Button buttonType="backToHomepage" onClick={handleBackToHomepage}>
              Back to Homepage
            </Button>
          </div>
        )}

        <div className="circle-container">
          <ShowStep number="1" />
          <ShowStep number="2" />
          <ShowStep number="3" />
          <ShowStep number="4" className="active" />
        </div>
        <h2 className="payment">Payment</h2>
        <div className="payment-wrapper">
          <div className="payment-left">
            <div className="results-card">
              <div className="card-left">
                <p>Departure</p>
                <p>{selectedFlight.departureTime}</p>
                <p>DUB</p>
                <p>&euro;{selectedFlight.price}</p>
                <p className={`${darkmode ? "dark" : ""}`}>
                  <strong>{selectedFlight.company}</strong>
                </p>
              </div>
              <div className="card-middle">
                <img src={`${darkmode ? arrowDark : arrow}`} alt="arrow" />
              </div>

              <div className="card-right">
                <p>Arrival</p>
                <p>{selectedFlight.arrivalTime}</p>
                <p>{selectedFlight.airportCode}</p>
                <Button buttonType="selected">Selected</Button>
              </div>
            </div>
            <div className="rest-data">
              <p className={`${darkmode ? "one-way dark" : "one-way"}`}>
                One-Way
              </p>
              <p>Adult: {selectedFlight.adults}</p>
              <p>Children: {selectedFlight.children}</p>
              <p>Luggage: {numLuggage}</p>
              <p>Insurance: {insurance ? "Yes" : "No"}</p>
              <p>Promo Code: Invalid</p>
            </div>
          </div>

          <div className="payment-right">
            {/* <Formik
              initialValues={{
                fullName: "",
                email: "",
                creditCardNumber: "",
                date: "",
                cvv: "",
              }}
              validationSchema={Yup.object({
                fullName: Yup.string()
                  .min(10, "Must be 10 characters or more")
                  .required("Required"),

                email: Yup.string()
                  .email("Invalid email address")
                  .required("Required"),

                creditCardNumber: Yup.string()
                  .min(16, "Must be 16 characters")
                  .max(16, "Must be 16 characters")
                  .required("Required"),

                date: Yup.date().typeError("Invalid date").required("Required"),

                cvv: Yup.string()
                  .min(3, "Must be at least 3 characters")
                  .max(4, "Must be at most 4 characters")
                  .required("Required"),
              })}
              onSubmit={handleSubmit}
            >
              <Form>
                <div className="form-field group">
                  <label htmlFor="fullName" className="form-input-label">
                    Full Name
                  </label>
                  <div className="error-message-wrapper">
                    <ErrorMessage
                      name="fullName"
                      component="div"
                      className="error-message"
                    />
                  </div>
                  <Field name="fullName" type="text" className="form-input" />
                </div>

                <div className="form-field group">
                  <label htmlFor="email" className="form-input-label">
                    Email
                  </label>

                  <div className="error-message-wrapper">
                    <ErrorMessage
                      name="email"
                      component="div"
                      className="error-message"
                    />
                  </div>
                  <Field name="email" type="email" className="form-input" />
                </div>
                <div className="form-field group">
                  <label
                    htmlFor="creditCardNumber"
                    className="form-input-label"
                  >
                    Credit Card Number
                  </label>

                  <div className="error-message-wrapper">
                    <ErrorMessage
                      name="creditCardNumber"
                      component="div"
                      className="error-message"
                    />
                  </div>
                  <Field
                    name="creditCardNumber"
                    type="number"
                    className="form-input"
                  />
                </div>

                <div className="form-field group">
                  <label htmlFor="date" className="form-input-label">
                    Expiry Date
                  </label>
                  <div className="error-message-wrapper">
                    <ErrorMessage
                      name="date"
                      component="div"
                      className="error-message"
                    />
                  </div>
                  <Field name="date" type="date" className="form-input" />
                </div>

                <div className="form-field group">
                  <label htmlFor="cvv" className="form-input-label">
                    CVV
                  </label>
                  <div className="error-message-wrapper">
                    <ErrorMessage
                      name="cvv"
                      component="div"
                      className="error-message"
                    />
                  </div>
                  <Field name="cvv" type="number" className="form-input" />
                </div>

                <div
                  className={`${darkmode ? "button-div dark" : "button-div"}`}
                >
                  <span>Total: &euro;{totalPrice} </span>
                  <Button buttonType="pay" type="submit">
                    Pay Now
                  </Button>
                </div>
              </Form>
            </Formik> */}
            <StripePaymentForm totalPrice={totalPrice} />
          </div>
        </div>
      </div>
    </>
  );
};

export default Confirmation;
