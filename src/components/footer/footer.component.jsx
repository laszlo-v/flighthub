import { useContext } from "react";
import { DarkmodeContext } from "../../contexts/darkMode.context";
import "./footer.styles.scss";

const Footer = () => {
  const { darkmode } = useContext(DarkmodeContext);
  return (
    <footer className={`${darkmode ? "dark" : ""}`}>
      <p>&copy;2023 FlightHub. All Rights Reserved</p>
    </footer>
  );
};

export default Footer;
