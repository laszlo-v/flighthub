import { useContext } from "react";
import { DarkmodeContext } from "../../contexts/darkMode.context";
import sun from "../../assets/sun.svg";
import crescent from "../../assets/crescent.png";

import "./light-dark.styles.scss";
// component to switch between lightmode and darkmode
const LightDark = () => {
  // an onclickhandler to manage the toggle logic
  const onClickHandler = () => {
    // upon onclick, if darkmode was true set to false and vice versa
    setDarkmode((prevValue) => !prevValue);
  };

  // using the darkmode context
  const { darkmode, setDarkmode } = useContext(DarkmodeContext);

  // returning a div with an image that has a dynamic src, depending on the darkmode context
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
