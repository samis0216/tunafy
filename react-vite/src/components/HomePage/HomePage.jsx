import { useEffect } from "react"
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux"
import { loadPlaylistsThunk } from "../../redux/playlists"
import "./HomePage.css"

const LoadHomePage = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const playlistObj = useSelector(state => state.playlists)
    const playlists = Object.values(playlistObj)

    useEffect(() => {
        dispatch(loadPlaylistsThunk())
    }, [dispatch])

    return (
        <>
        <div className="main-container">
            <div className="playlists">
                <h2 onClick={() => navigate(`/playlists`)}>Tunafy Playlists</h2>
                <div className="home-page-list">
                    {playlists.map((playlist) => (
                        <div className="item" key={playlist.id} onClick={() => navigate(`/playlists`)}>
                            <img src={playlist.playlist_cover_url} alt='playlist-cover' />
                            <div className="play">
                                <span className="fa fa-play" style={{color: "white"}}></span>
                            </div>
                            <h4>{playlist.playlist_name}</h4>
                            <p className="playlist-description">{playlist.description}</p>
                        </div>
                    ))}
                </div>
                <hr />
            </div>
        </div>
        </>
    )
}

export default LoadHomePage
