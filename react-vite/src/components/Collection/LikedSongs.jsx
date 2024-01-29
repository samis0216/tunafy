import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { loadLikedSongsThunk } from "../../redux/collection"
import { loadAlbumsThunk } from "../../redux/albums"
import { loadUsersThunk } from "../../redux/users"
import { useContext } from "react"
import { MusicContext } from "../../context/MusicContext"
import { useNavigate} from "react-router-dom"
import likedSongsCover from './13.png'
import UnlikeSongModal from "../SongModals/UnlikeSongModal"
import OpenModalMenuItem from "../Navigation/OpenModalMenuItem"

export default function Collection() {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const likedSongs = useSelector(state => state.collection)
    const user = useSelector(state => state.session.user)
    const users = useSelector(state => state.users)
    const album = useSelector(state => state.albums)
    const [srv, setSrv] = useContext(MusicContext);
    const keys = Object.keys(likedSongs)
    console.log(srv)

    if(!user) return null

    // if(likedOwnerId !== user.id) navigate(`/${likedOwnerId}/collection/tracks`)
    useEffect(() => {
        dispatch(loadLikedSongsThunk(user.id))
        dispatch(loadUsersThunk())
        dispatch(loadAlbumsThunk())
    }, [dispatch])

    return (
        <section className="playlist-details-section">
            <div className="playlist-detail-header">
                <img className='playlist-detail-cover' src={likedSongsCover} />
                <div className="playlist-detail-info">
                    <p style={{ fontSize: 14, color: '#b3b3b3' }}>Playlist</p>
                    <h1 className="playlist-detail-name">Liked Songs</h1>
                    <p style={{ fontSize: 14, color: '#b3b3b3', whiteSpace: 'nowrap' }}>Your favorite songs!</p>
                    <div className="playlist-user-songs">
                        <i style={{ fontSize: 24 }} className="fa-solid fa-circle-user" />
                        <p style={{ paddingLeft: 5, fontSize: 14 }}>{user.username} •  {Object.keys(likedSongs).length} {`${Object.keys(likedSongs).length > 1 ? "songs" : "song"}`}</p>
                    </div>
                </div>
            </div>
            <div className="playlist-song-list">
                <div className="song-list-symbols">
                    <div className="playlist-play-button">
                        <i className="fa-solid fa-play fa-2xl play-icon"></i>
                    </div>
                    {/* <i style={{ fontSize: 38 }} className="fa-regular fa-heart playlist-icon"></i> */}
                </div>
                <div className="song-list-info-header">
                    <div className="hashtag-title">
                        <p className="hashtag">#</p>
                        <p>Title</p>
                    </div>
                    <p style={{ paddingRight: 254 }}>Album</p>
                    <div className="heart-duration">
                        <i className="fa-regular fa-heart"></i>
                        <i className="fa-regular fa-clock duration-icon"></i>
                    </div>
                </div>
                <div className="song-info">
                    {keys?.map(key => (
                        <div key={key} className="playlist-song-tile" onClick={() => setSrv(`${likedSongs[key].song_file_url}`)}>
                            <div className="song-info-div">
                                <p className="song-id">{key}</p>
                                <img className='song-cover-img' src={likedSongs[key].song_cover_url} alt='song-cover' />
                                <div className="song-name-artist">
                                    <p className='song-name' onClick={() => navigate(`/songs/${likedSongs[key]?.id}`)}>{likedSongs[key]?.song_name}</p>
                                    <p>{users[likedSongs[key]?.artist_id]?.username}</p>
                                </div>
                            </div>
                            <p className="song-album-name" onClick={() => navigate(`/albums/${album[likedSongs[key]?.album_id]?.id}`)}>{album[likedSongs[key]?.album_id]?.album_name}</p>
                            <div className="right-side-song">
                                <span><OpenModalMenuItem itemText={<i className="fa-solid fa-heart liked-heart"></i>} modalComponent={<UnlikeSongModal song={likedSongs[key]} userId={user.id}/>}/></span>
                                <p className="song-time">{`${Math.floor(likedSongs[key]?.duration / 60)}:${(likedSongs[key]?.duration % 60) < 10 ? `0${likedSongs[key]?.duration % 60}` : likedSongs[key]?.duration % 60}`}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}
