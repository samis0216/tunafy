import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { loadOnePlaylistThunk} from "../../redux/playlists";
import { loadPlaylistSongsThunk } from "../../redux/songs";
import { loadUsersThunk } from "../../redux/users";
import './PlaylistDetails.css'

export default function PlaylistDetails() {
    const dispatch = useDispatch()
    const { playlistId } = useParams()
    const playlist = useSelector(state => state.playlists[playlistId])
    const user = useSelector(state => state.users)
    const playlistSongs = useSelector(state => state.playlists?.songs)
    // const songKeys = playlistSongs.keys()
    console.log('playlist', playlistSongs)

    useEffect(() => {
        dispatch(loadOnePlaylistThunk(playlistId))
        dispatch(loadUsersThunk())
        dispatch(loadPlaylistSongsThunk(playlistId))
    }, [dispatch, playlistId])

    // function totalSongs() {
    //     const total = 0;
    //     for (let i = 0; )
    // }
    if (!playlist) return null

    return (
        <section className="playlist-details-section">
            <div className="playlist-detail-header">
                <img className='playlist-detail-cover' src={playlist?.playlist_cover_url} />
                <div className="playlist-detail-info">
                    <p style={{ fontSize: 14, color: '#b3b3b3' }}>Playlist</p>
                    <h1 style={{ whiteSpace: 'nowrap' }} className="playlist-detail-name">{playlist?.playlist_name}</h1>
                    <p style={{ fontSize: 14, color: '#b3b3b3', whiteSpace: 'nowrap' }}>{playlist?.description}</p>
                    <div className="playlist-user-songs">
                        <i style={{ fontSize: 24 }} className="fa-solid fa-circle-user" />
                        <p style={{ paddingLeft: 5, fontSize: 14 }}>{`${user[playlist?.creator_id]?.username}  •  # likes  •  # songs`}</p>
                    </div>
                </div>
            </div>
            <div className="playlist-song-list">
                <div className="song-list-symbols">
                    <div className="playlist-play-button">
                        <i className="fa-solid fa-play fa-2xl"></i>
                    </div>
                    <i style={{ fontSize: 40 }} className="fa-regular fa-heart playlist-icon"></i>
                    <i style={{ fontSize: 30 }} className="fa-solid fa-ellipsis playlist-icon"></i>
                </div>

            </div>
        </section>
    )
}
