import { useModal } from "../../context/Modal";
import { deleteAlbumsThunk } from "../../redux/albums";
import { useDispatch, useSelector } from "react-redux";
import './DeleteAlbum.css'
import { useNavigate } from "react-router-dom";

function DeleteAlbumModal({albumId}) {
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const album = useSelector(state => state.albums[albumId])
  const {closeModal} = useModal();

  const deleteAlbum = (e) => {
    e.stopPropagation()
    dispatch(deleteAlbumsThunk(albumId)).then(closeModal())
    navigate('/albums')
  }

  return (
    <div className="delete-playlist-modal">
      <div className="delete-info-modal">
        <h2 className="delete-header-text">Are you sure?</h2>
        <p className="delete-text">Deleting &quot;{`${album?.album_name}`}&quot; cannot be reversed.</p>
        <div className="playlist-delete-buttons">
          <button className='playlist-cancel-button' onClick={closeModal}>
          Cancel
          </button>
          <button className='playlist-delete-button' onClick={deleteAlbum}>
          Delete
          </button>
        </div>
      </div>
    </div>
  )
}

export default DeleteAlbumModal
