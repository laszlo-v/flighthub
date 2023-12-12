import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useContext } from "react";
import { DarkmodeContext } from "../../contexts/darkMode.context";
import ShowStep from "../../components/show-step/show-step.component";
import arrow from "../../assets/arrow.png";
import arrowDark from "../../assets/arrow-dark.png";
import Button from "../../components/button/button.component";
import LightDark from "../../components/light-dark.component.jsx/light-dark.component";

import "./results.styles.scss";

const Results = () => {
  const { darkmode } = useContext(DarkmodeContext);
  let currentDate = new Date();
  const location = useLocation();
  const { searchParams } = location.state;

  const navigate = useNavigate();
  let airportCode;
  if (searchParams.destination === "London") {
    currentDate.getMinutes() % 5 === 0
      ? (airportCode = "LHR")
      : (airportCode = "LGW");
  } else if (searchParams.destination === "Paris") {
    airportCode = "CDG";
  } else {
    airportCode = "BER";
  }
  const flights = [
    {
      id: 1,
      departure: "Dublin",
      destination: searchParams.destination,
      departureTime: "10:00 AM",
      arrivalTime: "12:00 PM",
      adults: searchParams.adults,
      children: searchParams.children,
      price: searchParams.price,
      airportCode: airportCode,
      company: "Aer Lingus",
    },
    {
      id: 2,
      departure: "Dublin",
      destination: searchParams.destination,
      departureTime: "1:30 PM",
      arrivalTime: "3:30 PM",
      adults: searchParams.adults,
      children: searchParams.children,
      price: searchParams.price,
      airportCode: airportCode,
      company: "Aer Lingus",
    },
    {
      id: 3,
      departure: "Dublin",
      destination: searchParams.destination,
      departureTime: "5:00 PM",
      arrivalTime: "7:00 PM",
      adults: searchParams.adults,
      children: searchParams.children,
      price: searchParams.price,
      airportCode: airportCode,
      company: "Aer Lingus",
    },
  ];

  const [selectedFlight, setSelectedFlight] = useState(null);

  const handleSelectFlight = (flight) => {
    setSelectedFlight(flight);

    navigate("/more-options", { state: { selectedFlight: { ...flight } } });
  };

  return (
    <>
      <LightDark />
      <div className={`container ${darkmode ? "container dark" : "container"}`}>
        <div className="circle-container">
          <ShowStep number="1" />
          <ShowStep number="2" className="active" />
          <ShowStep number="3" />
          <ShowStep number="4" />
        </div>
        <h2 className="select">Select a Flight</h2>
        <div className="results-container">
          {flights.map((flight) => (
            <div
              key={flight.id}
              className={`${darkmode ? "results-card dark" : "results-card"}`}
            >
              <div className="card-left">
                <p>Departure</p>
                <p>{flight.departureTime}</p>
                <p>DUB</p>
                <p>&euro;{flight.price}</p>
                <p className={`${darkmode ? "dark" : ""}`}>
                  <strong>{flight.company}</strong>
                </p>
              </div>
              <div className="card-middle">
                <img src={`${darkmode ? arrowDark : arrow}`} alt="arrow" />
              </div>

              <div className="card-right">
                <p>Arrival</p>
                <p>{flight.arrivalTime}</p>
                <p>{flight.airportCode}</p>
                <Button
                  buttonType="book"
                  onClick={() => handleSelectFlight({ ...flight })}
                >
                  Book Now
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Results;
