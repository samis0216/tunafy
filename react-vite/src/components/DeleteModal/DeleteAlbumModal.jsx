import { useModal } from "../../context/Modal";
import { deleteAlbumsThunk } from "../../redux/albums";
import { useDispatch } from "react-redux";
import '../DeleteModal/DeleteAlbum.css'
import { redirect, useNavigate } from "react-router-dom";
function DeleteAlbumModal({albumId}) {
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const {closeModal} = useModal();
  const deleteAlbum = (e) => {
    e.stopPropagation()
    dispatch(deleteAlbumsThunk(albumId)).then(closeModal())
    navigate('/albums')
  }

  return (
    <div className="album-delete-container">
      <h1>Confirm Delete</h1>
      <p>Are you sure you want to delete this album?</p>
      <button style={{color: "white", backgroundColor: "red"}} onClick={deleteAlbum}>
        Yes
      </button>
      <button style={{color: "white", backgroundColor: "grey"}} onClick={closeModal}>
        No
      </button>
    </div>
  )
}

export default DeleteAlbumModal
