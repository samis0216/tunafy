import { useNavigate, useLocation, NavLink } from "react-router-dom";
import "./Navigation.css";
import tunafyLogo from "./tunafy1.png";
import { useSelector } from "react-redux/es/hooks/useSelector";
import ProfileButton from "./ProfileButton";
import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';
import LoginModal from "../LoginModal/LoginModal";
import { useModal } from "../../context/Modal";
import { useContext } from "react";
import { MusicContext } from "../../context/MusicContext";

function Navigation() {
  const navigate = useNavigate();
  const location = useLocation()
  const [srv, setSrv] = useContext(MusicContext)
  const sessionUser = useSelector((state) => state.session.user)
  const { setModalContent } = useModal()

  const openModal = () => {
    setModalContent(<LoginModal />);
  }

  const notLoggedIn = e => {
    if(!sessionUser) {
      e.preventDefault();
      openModal();
    }
  }

  const Player = () => (
    <AudioPlayer
      autoPlay={true}
      src={srv}
      volume={0.1}
      // onPlay={e => console.log("onPlay")}
      // other props here
    />
  );

  return (
    <>
    {location.pathname !== '/signup' && location.pathname !== '/login' && (
      <>
      <div className="left-bar">
        <div className="logo">
          <NavLink className="left-bar-logo" to="/">
            <img className="logo" src={tunafyLogo} alt="logo" />
            <h3>Tunafy</h3>
          </NavLink>
        </div>
        <div className="nav">
          <ul className="left-bar-ul">
            <li>
              <NavLink to="/">
                <span className="fa-solid fa-home bar-icon"></span>
                <span>Home</span>
              </NavLink >
            </li>
          </ul>
        </div>
        <div className="nav">
          <ul className="left-bar-ul">
            <li>
              <NavLink to="/" onClick={notLoggedIn}>
                <span className="fa-solid fa-book bar-icon"></span>
                <span>Your Library</span>
              </NavLink >
            </li>
            <li>
              <div onClick={(e) => { notLoggedIn(e); if (sessionUser) navigate(`/playlists/new`) }}>
                <span className="fa-solid fa-square-plus bar-icon"></span>
                <span>Create Playlist</span>
              </div>
            </li>
            <li>
              <div onClick={(e) => { notLoggedIn(e); if (sessionUser) navigate(`/songs/new`) }}>
                <span className="fa-solid fa-square-plus bar-icon"></span>
                <span>Create Song</span>
              </div>
            </li>
            <li>
              <div onClick={(e) => { notLoggedIn(e); if (sessionUser) navigate(`/albums/new`) }}>
                <span className="fa-solid fa-square-plus bar-icon"></span>
                <span>Create Album</span>
              </div>
            </li>
            <li>
              <NavLink to="/" onClick={notLoggedIn}>
                <span className="fa-solid fa-heart bar-icon"></span>
                <span>Liked Songs</span>
              </NavLink >
            </li>
          </ul>
        </div>
      </div>
      <div className="top-bar">
        <div className="back-forward-buttons">
          <button onClick={() => navigate(-1)} type="button" className="fa fas fa-chevron-left"></button>
          <button onClick={() => navigate(1)} type="button" className="fa fas fa-chevron-right"></button>
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
    )}
    </>
  );
}

export default Navigation;
