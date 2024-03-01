import { useNavigate, useLocation, NavLink } from "react-router-dom";
import "./Navigation.css";
import tunafyLogo from "./tunafy1.png";
import githubLogo from './github-logo.png'
import { useSelector } from "react-redux/es/hooks/useSelector";
import ProfileButton from "./ProfileButton";
import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';
import LoginModal from "../LoginModal/LoginModal";
import { useModal } from "../../context/Modal";
import { useContext, useEffect } from "react";
import { MusicContext } from "../../context/MusicContext";
import { IndexContext } from "../../context/IndexContext";

function Navigation() {
  const navigate = useNavigate();
  const location = useLocation()
  const [songList, setSongList] = useContext(MusicContext)
  const [currentSong, setCurrentSong] = useContext(IndexContext)

  const sessionUser = useSelector((state) => state.session.user)
  const { setModalContent } = useModal()

  useEffect(() => {

  }, [songList])

  const helperFunctionNext = (i) => {
    console.log(i)
    console.log(songList)
    console.log(songList.length)
    if (i + 1 > songList.length - 1) {
      setSongList([])
      return 0
    } else {
      return i + 1
    }
  }

  const helperFunctionPrev = (i) => {
    console.log(i)
    console.log(songList)
    console.log(songList.length)
    if (i - 1 < 0) {
      return 0
    } else {
      return i - 1
    }
  }

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
      autoPlay={false}
      showSkipControls={true}
      onClickNext={() => setCurrentSong(i => i = helperFunctionNext(i))}
      onClickPrevious={() => setCurrentSong(i => i = helperFunctionPrev(i))}
      onEnded={() => setCurrentSong(i => i + 1)}
      src={!songList.length || !songList[currentSong] ? [] : songList[currentSong].song_file_url}
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
        {/* <div className="nav">
          <ul className="left-bar-ul">
            <li>
              <NavLink href="/">
                <span className="fa-solid fa-home bar-icon"></span>
                <span>Home</span>
              </NavLink>
            </li>
          </ul>
        </div> */}
        <div className="nav">
          <ul className="left-bar-ul">
            <div className="top-sidebar-box">
              <li>
                <NavLink to="/" onClick={notLoggedIn}>
                  <span className="fa-solid fa-book bar-icon"></span>
                  <span>Your Library</span>
                </NavLink >
              </li>
              <li>
                <div onClick={(e) => { notLoggedIn(e); if (sessionUser) navigate(`/songs`) }}>
                  <span className="fa-solid fa-music bar-icon"></span>
                  <span>All Songs</span>
                </div>
              </li>
              <li>
                <div onClick={(e) => { notLoggedIn(e); if (sessionUser) navigate(`/collection/tracks`) }}>
                  <span className="fa-solid fa-heart bar-icon"></span>
                  <span>Liked Songs</span>
                </div>
              </li>
            </div>
            <div className="bottom-sidebar-box">
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
                <div onClick={(e) => { notLoggedIn(e); if (sessionUser) navigate(`/playlists/new`) }}>
                  <span className="fa-solid fa-square-plus bar-icon"></span>
                  <span>Create Playlist</span>
                </div>
              </li>
            </div>
            <div className="bottom-sidebar-box">
              <li>
                <div className="title">
                  <p>Created By:</p>
                </div>
                <div className="contributors">
                  <div>
                    <a href="https://github.com/samis0216" className="contrib-span">Sami Samman</a>
                  </div>
                  <div>
                    <a href='https://github.com/nicolehuyen' className="contrib-span">Nicole Le</a>
                  </div>
                  <div>
                    <a className="contrib-span" href="https://github.com/vknguyenn">Victoria Nguyen</a>
                  </div>
                  <div>
                    <a className="contrib-span" href="https://github.com/LThomasz">Lyndon Thomasz</a>
                  </div>
                </div>
              </li>
            </div>
          </ul>
          <div className="github">
            <NavLink to='https://github.com/samis0216/tunafy' target="_blank">
              <img className="git-logo" src={githubLogo} alt="github-logo" />
            </NavLink>
          </div>
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
            <h6>Preview of Tunafy</h6>
            <p>Sign up to get unlimited songs. No credit card needed.</p>
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
