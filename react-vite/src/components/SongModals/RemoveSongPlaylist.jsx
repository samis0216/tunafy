import { useNavigate } from "react-router-dom"
import { useModal } from "../../context/Modal";
import "./DeleteSongModal.css"
import { useDispatch, useSelector } from "react-redux";
import { loadPlaylistSongsThunk } from "../../redux/songs";
import { deleteFromPlaylistThunk } from "../../redux/playlists";

const RemoveSongPlaylist = ({ song, playlistId }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { closeModal } = useModal();
  const playlists = useSelector(state => state.playlists)

  const handleSubmit = (playlistId) => {
    dispatch(deleteFromPlaylistThunk(song.id, playlistId))
    dispatch(loadPlaylistSongsThunk(playlistId))
    closeModal();
    navigate(`/playlists/${playlistId}`)
  }

  return (
    <div className="delete-song-modal">
      <div className="delete-info-modal" style={{display: "flex", flexDirection: "column", alignItems: "center"}}>
          <h2 className="delete-header-text" style={{padding: 10}}>Removing from {playlists?.[playlistId].playlist_name}</h2>
          <p style={{color: "white"}}>{song.song_name} will no longer be in {playlists?.[playlistId].playlist_name}.</p>
          <div className="delete-buttons-holder">
              <button className='delete-modal-button' onClick={handleSubmit(playlistId)}>Remove</button>
              <button className='cancel-modal-button' onClick={closeModal}>Cancel</button>
          </div>
      </div>
    </div>
  )
}

export default RemoveSongPlaylist
