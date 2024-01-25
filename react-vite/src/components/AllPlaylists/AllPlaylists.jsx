import { useEffect } from "react"
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux"
import { loadPlaylistsThunk } from "../../redux/playlists"
import './AllPlaylists.css'

const AllPlaylists = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const playlistObj = useSelector(state => state.playlists)
    const playlists = Object.values(playlistObj)

    useEffect(() => {
        dispatch(loadPlaylistsThunk())
    }, [dispatch])

    return (
        <div className="playlist-section">
            <h2 onClick={() => navigate(`/playlists`)}>Tunafy Playlists</h2>
            <div className="list">
                {playlists.map((playlist) => (
                    <div className="item" key={playlist.id}>
                        <img src={playlist.playlist_cover_url} alt='playlist-cover' />
                        <div className="play">
                            <span className="fa fa-play" style={{color: "white"}}></span>
                        </div>
                        <h4>{playlist.playlist_name}</h4>
                        <p className="playlist-description">{playlist.description}</p>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default AllPlaylists;
