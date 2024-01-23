import { useNavigate } from "react-router-dom"
import "./HomePage.css"


const LoadHomePage = () => {
    const navigate = useNavigate()
    return (
        <>
        <div className="left-bar">
        <div className="logo">
            <a href="#">
                <img src="./tunafy-images/tunafy5.png" alt="logo" />
                <h3>Tunafy</h3>
            </a>
        </div>
        <div className="nav">
            <ul>
                <li>
                    <a href="x">
                        <span className="fa-solid fa-home"></span>
                        <span>Home</span>
                    </a>
                </li>
            </ul>
        </div>
        <div className="nav">
            <ul>
                <li>
                    <a href="x">
                        <span className="fa-solid fa-book"></span>
                        <span>Your Library</span>
                    </a>
                </li>
                <li>
                    <a href="x">
                        <span className="fa-solid fa-square-plus"></span>
                        <span>Create Playlist</span>
                    </a>
                </li>
                <li>
                    <a href="x">
                        <span className="fa-solid fa-heart"></span>
                        <span>Liked Songs</span>
                    </a>
                </li>
            </ul>
        </div>
    </div>
    <div className="main-container">
        <div className="top-bar">
            <div className="back-forward-buttons">
                <button type="button" className="fa fas fa-chevron-left"></button>
                <button type="button" className="fa fas fa-chevron-right"></button>
            </div>
            <div className="nav-bar">
                <ul>
                    <li>
                        <span onClick={() => navigate("/signup")}>Sign Up</span>
                    </li>
                </ul>
                <button type="button" onClick={() => navigate("/login")}>Log In</button>
            </div>
        </div>
        <div className="playlists">
            <h2>Tunafy Playlists</h2>
            <div className="list">
                <div className="item">
                    <img src="/tunafy-images/playlist1.jpg" />
                    <div className="play">
                        <span className="fa fa-play" style={{color: "white"}}></span>
                    </div>
                    <h4>Today's Top Hits</h4>
                    <p>Jack Harlow is on top of the Hottest 50!</p>
                </div>
                <div className="item">
                    <img src="/tunafy-images/playlist1.jpg" />
                    <div className="play">
                        <span className="fa fa-play" style={{color: "white"}}></span>
                    </div>
                    <h4>Today's Top Hits</h4>
                    <p>Jack Harlow is on top of the Hottest 50!</p>
                </div>
                <div className="item">
                    <img src="/tunafy-images/playlist1.jpg" />
                    <div className="play">
                        <span className="fa fa-play" style={{color: "white"}}></span>
                    </div>
                    <h4>Today's Top Hits</h4>
                    <p>Jack Harlow is on top of the Hottest 50!</p>
                </div>
                <div className="item">
                    <img src="/tunafy-images/playlist1.jpg" />
                    <div className="play">
                        <span className="fa fa-play" style={{color: "white"}}></span>
                    </div>
                    <h4>Today's Top Hits</h4>
                    <p>Jack Harlow is on top of the Hottest 50!</p>
                </div>
                <div className="item">
                    <img src="/tunafy-images/playlist1.jpg" />
                    <div className="play">
                        <span className="fa fa-play" style={{color: "white"}}></span>
                    </div>
                    <h4>Today's Top Hits</h4>
                    <p>Jack Harlow is on top of the Hottest 50!</p>
                </div>
                <div className="item">
                    <img src="/tunafy-images/playlist1.jpg" />
                    <div className="play">
                        <span className="fa fa-play" style={{color: "white"}}></span>
                    </div>
                    <h4>Today's Top Hits</h4>
                    <p>Jack Harlow is on top of the Hottest 50!</p>
                </div>
            </div>
            <hr />
        </div>
        <div className="preview">
            <div className="text">
                <h6>Preview of Spotify</h6>
                <p>Sign up to get unlimited songs and podcasts with occasional ads. No credit card needed.</p>
            </div>
            <div className="button">
                <button type="button">Sign Up Free</button>
            </div>
        </div>
    </div>
    </>
    )
}

export default LoadHomePage