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

const Header = () => {
  const { currentUser, setCurrentUser } = useContext(UserContext);
  const [firstName, setFirstName] = useState(null);
  const logGoogleUser = async () => {
    const { user } = await signInWithGooglePopup();
    let firstName = user.displayName.split(" ")[0];
    setCurrentUser(user.displayName);
    setFirstName(firstName);
    const userDocRef = await createUserDocument(user);
  };
  const { darkmode } = useContext(DarkmodeContext);
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
      <Outlet />
      <Footer />
    </>
  );
};

export default Header;
