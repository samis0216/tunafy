import { useModal } from "../../context/Modal";
import { deletePlaylistThunk } from "../../redux/playlists";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import './DeletePlaylistModal.css'

export default function DeletePlaylistModal({playlistId}) {
    const dispatch = useDispatch();
    const navigate = useNavigate()
    const playlist = useSelector(state => state.playlists[playlistId])
    const {closeModal} = useModal();

    const deletePlaylist = (e) => {
      e.preventDefault();
      dispatch(deletePlaylistThunk(playlistId)).then(closeModal());
      navigate('/playlists');
  };

    return (
      <div className="delete-playlist-modal">
        <div className="delete-info-modal">
            <h2 className="delete-header-text">Are you sure?</h2>
            <p className="delete-text">Deleting &quot;{`${playlist?.playlist_name}`}&quot; cannot be reversed.</p>
            <div className="playlist-delete-buttons">
                <button className='playlist-cancel-button' onClick={closeModal}>
                Cancel
                </button>
                <button className='playlist-delete-button' onClick={deletePlaylist}>
                Delete
                </button>
            </div>
        </div>
      </div>
    )
}
