import { useContext } from "react";
import { DarkmodeContext } from "../../contexts/darkMode.context";
import "./show-step.styles.scss";

// creating a show step component a classname and a number will be passed to use it along with the darkmode - this will be used as many times as the number of pages we have i.e. 4
const ShowStep = ({ className, number }) => {
  const { darkmode } = useContext(DarkmodeContext);
  return (
    <span
      className={
        className === "active" && darkmode
          ? "active-circle dark"
          : className === "active"
          ? "active-circle"
          : "default-circle"
      }
    >
      {number}
    </span>
  );
};

export default ShowStep;
