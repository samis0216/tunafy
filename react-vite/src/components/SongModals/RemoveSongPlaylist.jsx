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

  const handleSubmit = async (e) => {
    e.preventDefault()
    await dispatch(deleteFromPlaylistThunk(song.id, playlistId))
    await dispatch(loadPlaylistSongsThunk(playlistId))
    closeModal();
    navigate(`/playlists/${playlistId}`)
  }

  return (
    <div className="delete-song-modal">
      <div className="delete-info-modal">
          <h2 className="delete-header-text">Removing from &quot;{playlists?.[playlistId].playlist_name}&quot;</h2>
          <p className="delete-text">&quot;{song.song_name}&quot; will no longer be in &quot;{playlists?.[playlistId].playlist_name}&quot;.</p>
          <div className="delete-buttons-holder">
              <button className='cancel-modal-button' onClick={closeModal}>Cancel</button>
              <button className='delete-modal-button' onClick={(e) => handleSubmit(e)}>Remove</button>
          </div>
      </div>
    </div>
  )
}

export default RemoveSongPlaylist
