import OpenModalButton from "../OpenModalButton/OpenModalButton"
import DeleteAlbumModal from "./DeleteAlbumModal"

function DeleteAlbum({albumId}) {
  return (
    <OpenModalButton
      buttonText="Delete"
      modalComponent={ <DeleteAlbumModal albumId={albumId}/>}
    />
  )
}

export default DeleteAlbum
