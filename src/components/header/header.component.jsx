// importing all the contexts we need + context and state along with google sign-in sign-out
import { useContext, useState } from "react";
import { DarkmodeContext } from "../../contexts/darkMode.context";
import { Outlet, Link, useNavigate } from "react-router-dom";
import { UserContext } from "../../contexts/user.context";
import { signOutUser } from "../../utils/firebase/firebase.utils";
import {
  signInWithGooglePopup,
  createUserDocument,
} from "../../utils/firebase/firebase.utils";
import Footer from "../footer/footer.component";
import "./header.styles.scss";

// creatinga  header component
const Header = () => {
  const { currentUser, setCurrentUser } = useContext(UserContext);
  // setting up state for the user's first name
  const [firstName, setFirstName] = useState(() => {
    // getting the firstname from LS
    const storedFirstName = localStorage.getItem("firstName");
    return storedFirstName || null;
  });
  // an async funtion to manage the google popup

  const logGoogleUser = async () => {
    const { user } = await signInWithGooglePopup();
    let firstName = user.displayName.split(" ")[0];
    // setting the current user to the display name - this will be used for Stripe as well
    setCurrentUser(user.displayName);
    setFirstName(firstName);

    // saving the firstname in LS
    localStorage.setItem("firstName", firstName);
    const userDocRef = await createUserDocument(user);
  };
  const { darkmode } = useContext(DarkmodeContext);

  // the useNavigate hook to redirect the user back to the homepage
  const navigate = useNavigate();
  const handleLogoClick = () => {
    navigate("/", { replace: true });
  };
  return (
    <>
      <header className={`${darkmode ? "dark" : ""}`}>
        <Link to="/" onClick={handleLogoClick}>
          <h1>FlightHub</h1>
        </Link>

        {/** setting up the logic for the header - sign in and welcome the user if logged in */}
        <div className="sign-in-join">
          {currentUser ? (
            <h2
              onClick={signOutUser}
              className={`${darkmode ? "sign-in dark" : "sign-in"}`}
            >
              Sign Out
            </h2>
          ) : (
            <h2
              className={`${darkmode ? "sign-in dark" : "sign-in"}`}
              onClick={logGoogleUser}
            >
              Sign In
            </h2>
          )}
          <h2 className={`${darkmode ? "join dark" : "join"}`}>{`${
            currentUser
              ? `Hi, ${firstName}`
              : currentUser === null || currentUser === ""
              ? "Join Now"
              : ""
          }`}</h2>
        </div>
      </header>
      {/** the header will be used in all pages - this is the patter to show whatever comes after it using the outlet - also the footer will be on all pages */}
      <Outlet />
      <Footer />
    </>
  );
};

export default Header;
