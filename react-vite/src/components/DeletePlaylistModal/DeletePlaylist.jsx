import OpenModalButton from "../OpenModalButton/OpenModalButton"
import DeletePlaylistModal from "./DeletePlaylistModal"

function DeletePlaylist({playlistId}) {
  return (
    <OpenModalButton
      buttonText="Delete"
      modalComponent={ <DeletePlaylistModal playlistId={playlistId}/>}
    />
  )
}

export default DeletePlaylist