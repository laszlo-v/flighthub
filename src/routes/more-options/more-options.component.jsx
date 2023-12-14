import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { PriceContext } from "../../contexts/priceContext";
import { DarkmodeContext } from "../../contexts/darkMode.context";
import ShowStep from "../../components/show-step/show-step.component";
import Button from "../../components/button/button.component";
import arrow from "../../assets/arrow.png";
import arrowDark from "../../assets/arrow-dark.png";
import LightDark from "../../components/light-dark.component/light-dark.component";

import "./more-options.styles.scss";

const MoreOptions = () => {
  const { darkmode } = useContext(DarkmodeContext);
  const { totalPrice, setTotalPrice } = useContext(PriceContext);

  const location = useLocation();
  const { selectedFlight } = location.state || {};

  const navigate = useNavigate();

  const [numLuggage, setNumLuggage] = useState(0);

  const [insurance, setInsurance] = useState(false);

  useEffect(() => {
    const luggagePrice = 28;

    const insuranceCost = insurance ? 50 : 0;

    const newTotalPrice =
      selectedFlight.price * selectedFlight.adults +
      numLuggage * luggagePrice +
      insuranceCost * selectedFlight.adults;

    setTotalPrice(newTotalPrice);
  }, [numLuggage, insurance]);

  const handleAddLuggage = () => {
    if (numLuggage < 4) {
      setNumLuggage((prevNum) => prevNum + 1);
    }
  };

  const handleRemoveLuggage = () => {
    if (numLuggage > 0) {
      setNumLuggage((prevNum) => prevNum - 1);
    }
  };

  const handleToggleInsurance = () => {
    setInsurance((prevInsurance) => !prevInsurance);
  };

  const handleProceed = () => {
    // this way we pass again all the date we want to use in another component
    navigate("/confirmation", {
      state: {
        selectedFlight: { ...selectedFlight },
        numLuggage,
        insurance,
      },
    });
  };

  return (
    <>
      <LightDark />
      <div className={`${darkmode ? "container dark" : "container"}`}>
        <div className="circle-container">
          <ShowStep number="1" />
          <ShowStep number="2" />
          <ShowStep number="3" className="active" />
          <ShowStep number="4" />
        </div>
        <h2 className="more">Additional Options</h2>
        <h3 className="luggage-h3">Luggage</h3>

        {selectedFlight ? (
          <div className="outer">
            <div className="luggages-insurance-container">
              <p className="luggage">In Cabin (up to 10kg) - Included</p>
              <p className="luggage">
                In Cargo (up to 20kg) - &euro;28 <span>{numLuggage}</span>
              </p>
              <div className="add-remove-luggage">
                <h4>Luggage</h4>
                <div>
                  <Button buttonType="add" onClick={handleAddLuggage}>
                    +
                  </Button>
                  <Button buttonType="remove" onClick={handleRemoveLuggage}>
                    -
                  </Button>
                </div>
              </div>
              <div className="insurance">
                <label>Insurance - &euro;50 p/p</label>
                <input
                  className={`${darkmode ? "dark" : ""}`}
                  type="checkbox"
                  checked={insurance}
                  onChange={handleToggleInsurance}
                />
              </div>
            </div>

            <div className="flight-card-total-container">
              <div
                className={`${darkmode ? "results-card dark" : "results-card"}`}
              >
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
              {/* <p>Departure: {selectedFlight.departure}</p>
            <p>Destination: {selectedFlight.destination}</p>
            <p>Departure Time: {selectedFlight.departureTime}</p>
            <p>Arrival Time: {selectedFlight.arrivalTime}</p>
            <p>Adults: {selectedFlight.adults}</p>
            <div>
              <h3>Total Price</h3>
              <p>
                $
                {totalPrice +
                  selectedFlight.price * (selectedFlight.adults - 1)}
              </p>
            </div> */}
              <div className="price-next">
                <p className="total-price">Total: &euro;{totalPrice}</p>
                <Button buttonType="next" onClick={handleProceed}>
                  Next
                </Button>
              </div>
            </div>
          </div>
        ) : (
          <p>No flight selected</p>
        )}
      </div>
    </>
  );
};

export default MoreOptions;
