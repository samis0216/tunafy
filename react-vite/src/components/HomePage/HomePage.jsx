import { useNavigate } from "react-router-dom";
import "./HomePage.css"
import playlistCover from './playlist1.jpg'

const LoadHomePage = () => {
    const navigate = useNavigate();
    return (
        <>
        <div className="main-container">
            <div className="playlists">
                <h2>Tunafy Playlists</h2>
                <div className="list">
                    <div className="item">
                        <img src={playlistCover} />
                        <div className="play">
                            <span className="fa fa-play" style={{color: "white"}}></span>
                        </div>
                        <h4>Today&apos;s Top Hits</h4>
                        <p>Jack Harlow is on top of the Hottest 50!</p>
                    </div>
                    <div className="item">
                        <img src={playlistCover} />
                        <div className="play">
                            <span className="fa fa-play" style={{color: "white"}}></span>
                        </div>
                        <h4>Today&apos;s Top Hits</h4>
                        <p>Jack Harlow is on top of the Hottest 50!</p>
                    </div>
                    <div className="item">
                        <img src={playlistCover} />
                        <div className="play">
                            <span className="fa fa-play" style={{color: "white"}}></span>
                        </div>
                        <h4>Today&apos;s Top Hits</h4>
                        <p>Jack Harlow is on top of the Hottest 50!</p>
                    </div>
                    <div className="item">
                        <img src={playlistCover} />
                        <div className="play">
                            <span className="fa fa-play" style={{color: "white"}}></span>
                        </div>
                        <h4>Today&apos;s Top Hits</h4>
                        <p>Jack Harlow is on top of the Hottest 50!</p>
                    </div>
                    <div className="item">
                        <img src={playlistCover} />
                        <div className="play">
                            <span className="fa fa-play" style={{color: "white"}}></span>
                        </div>
                        <h4>Today&apos;s Top Hits</h4>
                        <p>Jack Harlow is on top of the Hottest 50!</p>
                    </div>
                    <div className="item">
                        <img src={playlistCover} />
                        <div className="play">
                            <span className="fa fa-play" style={{color: "white"}}></span>
                        </div>
                        <h4>Today&apos;s Top Hits</h4>
                        <p>Jack Harlow is on top of the Hottest 50!</p>
                    </div>
                </div>
                <hr />
            </div>
        </div>
        </>
    )
}

export default LoadHomePage
