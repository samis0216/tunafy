import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { useContext } from "react";
import { loadOnePlaylistThunk} from "../../redux/playlists";
import { loadPlaylistSongsThunk } from "../../redux/songs";
import { loadUsersThunk } from "../../redux/users";
import './PlaylistDetails.css'
import { loadAlbumsThunk } from "../../redux/albums";
import PlaylistDropdown from "./PlaylistDropdown";
import { MusicContext } from "../../context/MusicContext";
import { IndexContext } from "../../context/IndexContext";
import RemoveSongPlaylist from "../SongModals/RemoveSongPlaylist";
import OpenModalMenuItem from "../Navigation/OpenModalMenuItem";

export default function PlaylistDetails() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { playlistId } = useParams()
    const playlist = useSelector(state => state.playlists[playlistId])
    const userSession = useSelector(state => state.session.user)
    const user = useSelector(state => state.users)
    const playlistSongs = useSelector(state => state.songs)
    const album = useSelector(state => state.albums)
    const [songList, setSongList] = useContext(MusicContext);
    const [currentSong, setCurrentSong] = useContext(IndexContext);
    if (songList) currentSong


    useEffect(() => {
        dispatch(loadOnePlaylistThunk(playlistId))
        dispatch(loadUsersThunk())
        dispatch(loadPlaylistSongsThunk(playlistId))
        dispatch(loadAlbumsThunk())
    }, [dispatch, playlistId])

    if (!playlist || !playlistSongs) return null
    const songKeys = Object.keys(playlistSongs)
    const songers = Object.values(playlistSongs)
    const totDur = Object.values(songers).reduce((total, obj) => obj.duration + total, 0)
    let songCounter = 1;
    const isOwner = playlist.creator_id == userSession.id

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
                        <p style={{ paddingLeft: 5, fontSize: 14 }}>{user[playlist?.creator_id]?.username}  •  {Object.keys(playlistSongs).length} {`${Object.keys(playlistSongs).length > 1 ? "songs" : "song"}`} • {Math.floor(totDur / 60)} min {totDur % 60 == 0 ? "" : totDur % 60 + " seconds"}</p>
                    </div>
                </div>
            </div>
            <div className="playlist-song-list">
                <div className="song-list-symbols">
                    <div className="playlist-play-button" onClick={() => {setSongList(songers); setCurrentSong(0)}}>
                        <i className="fa-solid fa-play fa-2xl play-icon"></i>
                    </div>
                    {/* <i style={{ fontSize: 38 }} className="fa-regular fa-heart playlist-icon"></i> */}
                    <PlaylistDropdown playlistId={playlistId} />
                </div>
                <div className="song-list-info-header">
                    <div className="hashtag-title">
                        <p className="hashtag">#</p>
                        <p>Title</p>
                    </div>
                    <p style={{ paddingRight: 254 }}>Album</p>
                    <div className="heart-duration">
                        <p style={{ paddingRight: 2, visibility: 'hidden'}}>Remove</p>
                        <i className="fa-regular fa-clock duration-icon"></i>
                    </div>
                </div>
                <div className="song-info">
                    {songKeys?.map(playSongId => (
                        <div key={playSongId} className="playlist-song-tile" onClick={() => {setSongList(songers); setCurrentSong(playSongId)}}>
                            <div className="song-info-div" >
                                <p className="song-id">{songCounter++}</p>
                                <img className='song-cover-img' src={songers[playSongId]?.song_cover_url} alt='song-cover' />
                                <div className="song-name-artist">
                                    <p className='song-name' onClick={() => navigate(`/songs/${songers[playSongId]?.id}`)}>{songers[playSongId]?.song_name}</p>
                                    <p>{user[songers[playSongId]?.artist_id]?.username}</p>
                                </div>
                            </div>
                            <p className="song-album-name" onClick={() => navigate(`/albums/${album[songers[playSongId]?.album_id]?.id}`)}>{album[songers[playSongId]?.album_id]?.album_name}</p>
                            <div className="right-side-song">
                            {isOwner ?
                                <span className='remove-feat'><OpenModalMenuItem itemText='Remove' modalComponent={<RemoveSongPlaylist song={songers[playSongId]} playlistId={playlist.id}/>}/></span> :
                                <p style={{ paddingRight: 30, visibility: 'hidden' }}>Remove</p>}
                                <p className="song-time">{`${Math.floor(songers[playSongId]?.duration / 60)}:${(songers[playSongId]?.duration % 60) < 10 ? `0${songers[playSongId]?.duration % 60}` : songers[playSongId]?.duration % 60}`}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}
