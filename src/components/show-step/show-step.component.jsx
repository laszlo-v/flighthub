import { useContext } from "react";
import { DarkmodeContext } from "../../contexts/darkMode.context";
import "./show-step.styles.scss";

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
