import { Routes, Route } from "react-router-dom";
import Header from "./components/header/header.component";
import Home from "./routes/home/home.component";
import Results from "./routes/results/results.component";
import MoreOptions from "./routes/more-options/more-options.component";
import Confirmation from "./routes/confirmation/confirmation.component";

/**
 * ************* For Stripe setup ****************
 * 1) npm add @stripe/stripe-js @stripe/react-stripe-js
 * 2) create an .env file
 * 3) create an stripe folder with an stripe.js file
 * 4) in stripe.js add the following block of code
 * import { loadStripe } from "@stripe/stripe-js";
   export const stripePromise = loadStripe(
   process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY
   5) in index.js import elements and stripePromise
   6) make sure to have the same setup as below
          <Elements stripe={stripePromise}>
            <App />
          </Elements>
); --------- You might need to add => npm add @stripe/react-stripe-js@1.8.01 --------------
 */

const App = () => {
  return (
    <Routes>
      <Route element={<Header />}>
        <Route index element={<Home />} />
        <Route path="/results" element={<Results />} />
        <Route path="/more-options" element={<MoreOptions />} />
        <Route path="/confirmation" element={<Confirmation />} />
      </Route>
    </Routes>
  );
};

export default App;
