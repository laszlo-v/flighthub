import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { PriceProvider } from "./contexts/priceContext";
import { DarkmodeProvider } from "./contexts/darkMode.context";
import reportWebVitals from "./reportWebVitals";

import { Elements } from "@stripe/react-stripe-js";
import { stripePromise } from "./stripe/stripe";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <PriceProvider>
        <DarkmodeProvider>
          <Elements stripe={stripePromise}>
            <App />
          </Elements>
        </DarkmodeProvider>
      </PriceProvider>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
