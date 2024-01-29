import OpenModalButton from "../OpenModalButton/OpenModalButton"
import AddtoPlaylistModal from "./AddtoPlaylistModal"

function AddtoPlaylist() {
  return (
    <OpenModalButton
      buttonText="Add to Playlist"
      modalComponent={ <AddtoPlaylistModal/>}
    />
  )
}

export default AddtoPlaylist
