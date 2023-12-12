import { useContext } from "react";
import { DarkmodeContext } from "../../contexts/darkMode.context";
import sun from "../../assets/sun.svg";
import crescent from "../../assets/crescent.png";

import "./light-dark.styles.scss";

const LightDark = () => {
  const onClickHandler = () => {
    setDarkmode((prevValue) => !prevValue);
  };
  const { darkmode, setDarkmode } = useContext(DarkmodeContext);
  return (
    <div className={`light-dark ${darkmode ? "dark" : "light-dark"}`}>
      <img
        src={`${darkmode ? sun : crescent}`}
        alt="light-dark-icon"
        onClick={onClickHandler}
      />
    </div>
  );
};

export default LightDark;
