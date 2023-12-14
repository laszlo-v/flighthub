import { useContext } from "react";
import { DarkmodeContext } from "../../contexts/darkMode.context";
import "./footer.styles.scss";

// creating a footer component that will be used in the header so it will be visible in all pages
const Footer = () => {
  const { darkmode } = useContext(DarkmodeContext);
  return (
    <footer className={`${darkmode ? "dark" : ""}`}>
      <p>&copy;2023 FlightHub. All Rights Reserved</p>
    </footer>
  );
};

export default Footer;
