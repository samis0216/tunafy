import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { loadOnePlaylistThunk} from "../../redux/playlists";
import { loadPlaylistSongsThunk } from "../../redux/songs";
import { loadUsersThunk } from "../../redux/users";
import './PlaylistDetails.css'
import { loadAlbumsThunk } from "../../redux/albums";
import PlaylistDropdown from "./PlaylistDropdown";

export default function PlaylistDetails() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { playlistId } = useParams()
    const playlist = useSelector(state => state.playlists[playlistId])
    const user = useSelector(state => state.users)
    const playlistSongs = useSelector(state => state.songs.songs)
    const album = useSelector(state => state.albums)

    useEffect(() => {
        dispatch(loadOnePlaylistThunk(playlistId))
        dispatch(loadUsersThunk())
        dispatch(loadPlaylistSongsThunk(playlistId))
        dispatch(loadAlbumsThunk())
    }, [dispatch, playlistId])

    if (!playlist || !playlistSongs) return null
    const songKeys = Object.values(playlistSongs)

    return (
        <section className="playlist-details-section">
            <div className="playlist-detail-header">
                <img className='playlist-detail-cover' src={playlist?.playlist_cover_url} />
                <div className="playlist-detail-info">
                    <p style={{ fontSize: 14, color: '#b3b3b3' }}>Playlist</p>
                    <h1 className="playlist-detail-name">{playlist?.playlist_name}</h1>
                    <p style={{ fontSize: 14, color: '#b3b3b3', whiteSpace: 'nowrap' }}>{playlist?.description}</p>
                    <div className="playlist-user-songs">
                        <i style={{ fontSize: 24 }} className="fa-solid fa-circle-user" />
                        <p style={{ paddingLeft: 5, fontSize: 14 }}>{`${user[playlist?.creator_id]?.username}  •  # likes  •  ${Object.keys(playlistSongs).length} songs`}</p>
                    </div>
                </div>
            </div>
            <div className="playlist-song-list">
                <div className="song-list-symbols">
                    <div className="playlist-play-button">
                        <i className="fa-solid fa-play fa-2xl play-icon"></i>
                    </div>
                    <i style={{ fontSize: 38 }} className="fa-regular fa-heart playlist-icon"></i>
                    <PlaylistDropdown playlistId={playlistId} />
                </div>
                <div className="song-list-info-header">
                    <div className="hashtag-title">
                        <p className="hashtag">#</p>
                        <p>Title</p>
                    </div>
                    <p>Album</p>
                    <i className="fa-regular fa-clock duration-icon"></i>
                </div>
                <div className="song-info">
                    {songKeys?.map(song => (
                        <div key={song?.id} className="playlist-song-tile">
                            <div className="song-info-div">
                                <p className="song-id">{song?.id}</p>
                                <img className='song-cover-img' src={song?.song_cover_url} alt='song-cover' />
                                <div className="song-name-artist">
                                    <p className='song-name' onClick={() => navigate(`/songs/${song?.id}`)}>{song?.song_name}</p>
                                    <p>{user[song?.artist_id]?.username}</p>
                                </div>
                            </div>
                            <p className="song-album-name" onClick={() => navigate(`/albums/${song?.id}`)}>{album[song?.album_id]?.album_name}</p>
                            <p>{`${Math.floor(song?.duration / 60)}:${(song?.duration % 60) < 10 ? `0${song?.duration % 60}` : song?.duration % 60}`}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}
