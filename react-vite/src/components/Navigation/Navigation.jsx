import { useNavigate } from "react-router-dom";
import "./Navigation.css";
import tunafyLogo from "./tunafy1.png";
import { useSelector } from "react-redux/es/hooks/useSelector";
import ProfileButton from "./ProfileButton";
import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';

function Navigation() {
  const navigate = useNavigate();
  const sessionUser = useSelector((state) => state.session.user)

  const Player = () => (
    <AudioPlayer
      autoPlay
      src="http://example.com/audio.mp3"
      onPlay={e => console.log("onPlay")}
      // other props here
    />
  );

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
      {!sessionUser && (
        <div className="preview">
          <div className="text">
            <h6>Preview of Spotify</h6>
            <p>Sign up to get unlimited songs and podcasts with occasional ads. No credit card needed.</p>
          </div>
          <div className="button">
            <button type="button" onClick={() => navigate("/signup")}>Sign Up Free</button>
          </div>
        </div>
      )}
      {sessionUser && (
        <div className="music-player">
          {Player()}
        </div>
      )}
    </>
  );
}

export default Navigation;
