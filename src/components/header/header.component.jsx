import { useContext } from "react";
import { DarkmodeContext } from "../../contexts/darkMode.context";
import { Outlet, Link, useNavigate } from "react-router-dom";
import Footer from "../footer/footer.component";
import "./header.styles.scss";

const Header = () => {
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
          <h2 className={`${darkmode ? "sign-in dark" : "sign-in"}`}>
            Sign In
          </h2>
          <h2 className={`${darkmode ? "join dark" : "join"}`}>Join Now</h2>
        </div>
      </header>
      <Outlet />
      <Footer />
    </>
  );
};

export default Header;
