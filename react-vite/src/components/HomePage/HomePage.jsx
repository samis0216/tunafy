import { useEffect } from "react"
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux"
import { NavLink } from "react-router-dom"
import { loadPlaylistsThunk } from "../../redux/playlists"
import { loadAlbumsThunk } from "../../redux/albums";
import LoginModal from "../LoginModal/LoginModal";
import { useModal } from "../../context/Modal";
import "./HomePage.css"

const LoadHomePage = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const playlistObj = useSelector(state => state.playlists)
    const playlists = Object.values(playlistObj)
    const albumObj = useSelector(state => state.albums)
    const albums = Object.values(albumObj)
    const sessionUser = useSelector((state) => state.session.user)
    const { setModalContent } = useModal()

    const openModal = () => {
        setModalContent(<LoginModal />);
      }
    
      const notLoggedIn = e => {
        if(!sessionUser) {
          e.preventDefault();
          openModal();
        }
      }

    useEffect(() => {
        dispatch(loadPlaylistsThunk())
        dispatch(loadAlbumsThunk())
    }, [dispatch])

    return (
        <>
        <div className="main-container">
            <div className="playlists">
                <h2 onClick={(e) => { notLoggedIn(e); if (sessionUser) navigate(`/playlists`) }}>Tunafy Playlists</h2>
                <div className="home-page-list">
                    {playlists.map((playlist) => (
                        <div className="item" key={playlist.id} onClick={(e) => { notLoggedIn(e); if (sessionUser) navigate(`/playlists/${playlist.id}`) }}>
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
            <div className="home-albums">
                <h2 onClick={(e) => { notLoggedIn(e); if (sessionUser) navigate(`/albums`) }}>Tunafy Albums</h2>
                <div className="home-page-list">
                    {albums.map((album) => (
                        <NavLink className='album-links' key={album.id} to={`/albums/${album.id}`} onClick={(e) => notLoggedIn(e)}>
                            <div className="item">
                                <img src={album.album_cover_url} alt='album-cover' />
                                <div className="play">
                                    <span className="fa fa-play" style={{color: "white"}}></span>
                                </div>
                                <h4>{album.album_name}</h4>
                            </div>
                        </NavLink>
                    ))}
                </div>
                <hr className="page-line"/>
            </div>
        </div>
        </>
    )
}

export default LoadHomePage
