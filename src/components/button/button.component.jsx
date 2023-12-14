// importing useContext and DarkmodeContext
import { useContext } from "react";
import { DarkmodeContext } from "../../contexts/darkMode.context";
import "./button.styles.scss";

// setting up all the possible class names in an object
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

// creating a button component - getting the children, buttontype and the other props as a rest parameter e.g. type="submit" or type="button"
const Button = ({ children, buttonType, ...otherProps }) => {
  // bringing in darkmode context
  const { darkmode } = useContext(DarkmodeContext);
  // returning a HTML button and specifying the classname based on darkmode
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

// default exporting the component
export default Button;
