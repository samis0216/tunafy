import { useDispatch, useSelector } from "react-redux";
import { useModal } from "../../context/Modal";
import './AddtoPlaylistModal.css'
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { loadUserPlaylistsThunk } from "../../redux/playlists";
import { addSongToPlaylistThunk } from "../../redux/playlists";
import { loadPlaylistSongsThunk } from "../../redux/songs"

export default function AddtoPlaylistModal({ song }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // const [currentPlaylist, setCurrentPlaylist] = useState("")
  const {closeModal} = useModal();
  const user = useSelector(store => store.session.user)
  const playlists = useSelector(store => store.playlists)
  const choices = Object.values(playlists)


  useEffect(() => {
    dispatch(loadUserPlaylistsThunk(user.id))
  }, [dispatch])



  const handleSubmit = (playlistId) => {
    dispatch(addSongToPlaylistThunk(song.id, playlistId))
    dispatch(loadPlaylistSongsThunk())
    closeModal()
    navigate(`/playlists/${playlistId}`)
  }

  if (!playlists) return null
  return (
    <div className="delete-song-modal">
            <div className="delete-info-modal" style={{alignItems: "center", paddingLeft: 30, paddingRight: 30}}>
                <h2 className="delete-header-text" style={{paddingBottom: 20}}>Choose a playlist.</h2>
                <div className="album-choose">

                {choices.map(playlist => (
                    <div className="item choose" key={playlist.id} onClick={() => handleSubmit(playlist.id)}>
                        <img src={playlist.playlist_cover_url} alt='album-cover' />
                        <h4>{playlist.playlist_name}</h4>
                    </div>
                ))}
                </div>
            </div>
        </div>
  )
}
