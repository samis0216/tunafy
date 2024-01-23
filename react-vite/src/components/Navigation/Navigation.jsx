import { useNavigate } from "react-router-dom";
import "./Navigation.css";
import tunafyLogo from "./tunafy1.png";
import { useSelector } from "react-redux/es/hooks/useSelector";
import ProfileButton from "./ProfileButton";

function Navigation() {
  const navigate = useNavigate();
  const sessionUser = useSelector((state) => state.session.user)
  return (
    <>
      <div className="left-bar">
        <div className="logo">
          <a className="left-bar-logo" href="/">
            <img className="logo" src={tunafyLogo} alt="logo" />
            <h3>Tunafy</h3>
          </a>
        </div>
        <div className="nav">
          <ul className="left-bar-ul">
            <li>
              <a href="/">
                <span className="fa-solid fa-home bar-icon"></span>
                <span>Home</span>
              </a>
            </li>
          </ul>
        </div>
        <div className="nav">
          <ul className="left-bar-ul">
            <li>
              <a href="/">
                <span className="fa-solid fa-book bar-icon"></span>
                <span>Your Library</span>
              </a>
            </li>
            <li>
              <a href="/">
                <span className="fa-solid fa-square-plus bar-icon"></span>
                <span>Create Playlist</span>
              </a>
            </li>
            <li>
              <a href="/">
                <span className="fa-solid fa-heart bar-icon"></span>
                <span>Liked Songs</span>
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="top-bar">
        <div className="back-forward-buttons">
          <button type="button" className="fa fas fa-chevron-left"></button>
          <button type="button" className="fa fas fa-chevron-right"></button>
        </div>
        <div className="nav-bar">
          {!sessionUser && (
            <>
            <span className="sign-up" onClick={() => navigate("/signup")}>Sign Up</span>
          <button className='login-button' type="button" onClick={() => navigate("/login")}>
            Log In
          </button>
          </>
            )}
            {sessionUser && (
              <span>
                <ProfileButton />
              </span>
            )}
        </div>
      </div>
    </>
  );
}

export default Navigation;
