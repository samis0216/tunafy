import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loadPlaylistsThunk } from "../../redux/playlists";
// import { loadUsersThunk } from "../../redux/users";
import './AllPlaylists.css';

const AllPlaylists = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const playlistObj = useSelector(state => state.playlists);
    const sessionUser = useSelector(state => state.session.user);
    const user = useSelector(state => state.users);

    const validKeys = Object.keys(playlistObj).filter(key => key !== 'undefined');

    const [update, setUpdate] = useState(0);

    useEffect(() => {
        dispatch(loadPlaylistsThunk()).then(() => setUpdate(update + 1));
    }, [dispatch, update]);

    return (
        <div className="playlist-section">
            <h2 onClick={() => navigate('/playlists')}>Tunafy Playlists</h2>
            <div className="list">
                {validKeys.map((key) => {
                    const playlist = playlistObj[key];
                    return (
                        (!playlist?.private || (playlist?.private && sessionUser?.id === playlist?.creator_id)) && (
                            <div key={playlist.id} className="item" onClick={() => navigate(`/playlists/${playlist.id}`)}>
                                <img src={playlist.playlist_cover_url} alt='playlist-cover' />
                                <div className="play">
                                    <span className="fa fa-play" style={{color: "white"}}></span>
                                </div>
                                <h4>{playlist.playlist_name}</h4>
                                <p className="playlist-description">{playlist.description ? playlist.description : `By ${user[playlist?.creator_id]?.username}`}</p>
                            </div>
                        )
                    );
                })}
            </div>
        </div>
    );
}

export default AllPlaylists;

