// Home.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { DarkmodeContext } from "../../contexts/darkMode.context";
import ShowStep from "../../components/show-step/show-step.component";
import flightsData from "../../flightsData.json";
import Button from "../../components/button/button.component";
import LightDark from "../../components/light-dark.component.jsx/light-dark.component";
import "./home.styles.scss";

const Home = () => {
  const { darkmode } = useContext(DarkmodeContext);

  const navigate = useNavigate();

  const departureCities = [
    ...new Set(flightsData.flights.map((flight) => flight.departure)),
  ];
  const destinationCities = [
    ...new Set(flightsData.flights.map((flight) => flight.destination)),
  ];

  const [departure, setDeparture] = useState("");
  const [destination, setDestination] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [adults, setAdults] = useState("");
  const [children, setChildren] = useState("");
  const [errorMessage, setErrormessage] = useState(false);
  const [adultsError, setAdultsError] = useState(false);
  const [childrenError, setChildrenError] = useState(false);

  const handleDepartureChange = (e) => {
    const selectedDeparture = e.target.value;
    setDeparture(selectedDeparture);
  };

  const handleDestinationChange = (e) => {
    const selectedDestination = e.target.value;
    setDestination(selectedDestination);
  };

  const handleDateChange = (e) => {
    const selectedDate = e.target.value;
    setSelectedDate(selectedDate);
  };

  const handleAdultsChange = (e) => {
    const enteredAdults = e.target.value;
    setAdults(enteredAdults);
  };

  const handleChildrenChange = (e) => {
    const enteredChildren = e.target.value;
    setChildren(enteredChildren);
  };

  const areAllFieldsValid = () => {
    return (
      departure &&
      destination &&
      selectedDate &&
      adults !== "" &&
      children !== ""
    );
  };
  const handleSearch = () => {
    const selectedFlight = flightsData.flights.find(
      (flight) =>
        flight.departure === departure && flight.destination === destination
    );

    const price = selectedFlight ? selectedFlight.price : 0;

    const isValid = areAllFieldsValid() && validatePassengerCounts();

    if (!isValid) {
      setErrormessage(true);
      return;
    }

    const searchParams = {
      departure,
      destination,
      selectedDate,
      adults,
      children,
      price,
    };

    navigate("/results", { state: { searchParams } });
  };

  const validatePassengerCounts = () => {
    const isValidAdults = parseInt(adults, 10) === 1;
    const isValidChildren = parseInt(children, 10) <= 4;

    setAdultsError(!isValidAdults);
    setChildrenError(!isValidChildren);

    return isValidAdults && isValidChildren;
  };

  const today = new Date();
  today.setDate(today.getDate() + 1);
  const minDate = today.toISOString().split("T")[0];

  return (
    <>
      <LightDark />
      <div className={`container ${darkmode ? "dark" : ""}`}>
        <div className="hero-image">
          <h2>Book a Flight</h2>
          <div className="hero-image__options">
            <h3 className={`${darkmode ? "dark" : ""}`}>Flights</h3>
            <h3>Cars</h3>
            <h3>Hotels</h3>
          </div>
        </div>
        <div className="circle-container">
          <ShowStep number="1" className="active" />
          <ShowStep number="2" />
          <ShowStep number="3" />
          <ShowStep number="4" />
        </div>
        <div className="rounds">
          <span className={`${darkmode ? "one-way dark" : "one-way"}`}>
            One-Way
          </span>
          <span className={`${darkmode ? "roundtrip dark" : "roundtrip"}`}>
            Roundtrip
          </span>
        </div>
        <div className="from-to-container">
          <div className="from">
            <label htmlFor="departure">
              From <span className="mandatory-asterisk">*</span>
            </label>
            <select
              id="departure"
              value={departure}
              onChange={handleDepartureChange}
            >
              <option value="" disabled>
                Choose a Departure City
              </option>
              {departureCities.map((city, index) => (
                <option key={index} value={city}>
                  {city}
                </option>
              ))}
            </select>
          </div>
          <div className="to">
            <label htmlFor="destination">
              To <span className="mandatory-asterisk">*</span>
            </label>
            <select
              id="destination"
              value={destination}
              onChange={handleDestinationChange}
            >
              <option value="" disabled>
                Choose a Destination City
              </option>
              {destinationCities.map((city, index) => (
                <option key={index} value={city}>
                  {city}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="date-container">
          <div className="departure">
            <label htmlFor="date">
              Deparure <span className="mandatory-asterisk">*</span>
            </label>
            <input
              type="date"
              id="date"
              value={selectedDate}
              onChange={handleDateChange}
              min={minDate}
            />
          </div>
          <div className="return">
            <label htmlFor="date">Return</label>
            <input
              type="date"
              id="date"
              value={selectedDate}
              onChange={handleDateChange}
            />
          </div>
        </div>

        <div className="adults-children">
          <div className="adults">
            <label htmlFor="adults">
              Adults <span className="mandatory-asterisk">*</span>
              <span
                className={` ${
                  adultsError ? "show-adults-error" : "hide-adults-error"
                }`}
              >
                {" "}
                (Max 1)
              </span>
            </label>

            <input
              type="number"
              id="adults"
              value={adults}
              min="1"
              max="1"
              onChange={handleAdultsChange}
            />
          </div>

          <div className="children">
            <label htmlFor="children">
              Children (2-11 years){" "}
              <span className="mandatory-asterisk">*</span>
              <span
                className={` ${
                  childrenError ? "show-children-error" : "hide-children-error"
                }`}
              >
                {" "}
                (Max 4)
              </span>
            </label>
            <input
              type="number"
              id="children"
              value={children}
              min="0"
              max="4"
              onChange={handleChildrenChange}
            />
          </div>
        </div>

        <div className="promo-button-container">
          <div className="promo-code">
            <label htmlFor="promo">Promo Code (optional)</label>
            <input type="text" id="promo" />
          </div>
          <div>
            <p className={errorMessage ? "showMessage" : "hideMessage"}>
              Check and correct input values!
            </p>
            <Button type="button" buttonType="search" onClick={handleSearch}>
              Search
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
