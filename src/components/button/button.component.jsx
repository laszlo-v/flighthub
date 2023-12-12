import { useContext } from "react";
import { DarkmodeContext } from "../../contexts/darkMode.context";
import "./button.styles.scss";

const BUTTON_TYPE_CLASSES = {
  book: "book",
  search: "search",
  selected: "selected",
  next: "next",
  pay: "pay",
  add: "add",
  remove: "remove",
  backToHomepage: "back-to-homepage",
  stripePay: "stripe-pay",
};
const Button = ({ children, buttonType, ...otherProps }) => {
  const { darkmode } = useContext(DarkmodeContext);
  return (
    <button
      className={`button-container ${BUTTON_TYPE_CLASSES[buttonType]} ${
        darkmode ? "dark" : ""
      }`}
      {...otherProps}
    >
      {children}
    </button>
  );
};

export default Button;
