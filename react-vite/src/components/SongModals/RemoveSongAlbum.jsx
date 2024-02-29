import { useNavigate } from "react-router-dom"
import { useModal } from "../../context/Modal";
import "./DeleteSongModal.css"
import { useDispatch, useSelector } from "react-redux";
import { deleteFromAlbumThunk} from "../../redux/albums";
import { loadAlbumSongsThunk } from "../../redux/songs";


const RemoveSongAlbum = ({ song, albumId }) => {
    console.log("SONG, ALBUMID: ", { song, albumId })
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { closeModal } = useModal()
    const albums = useSelector(state => state.albums)

    const handleRemove = async (e) => {
        e.preventDefault();
        await dispatch(deleteFromAlbumThunk(song.id, albumId))
        await dispatch(loadAlbumSongsThunk(albumId))
        closeModal()
        navigate(`/albums/${albumId}`)
    }
    if (!song || !albumId) {
        return <div>Loading...</div>;
      }

    return (
        <div className="delete-song-modal">
            <div className="delete-info-modal">
                <h2 className="delete-header-text">Removing from &quot;{albums?.[albumId].album_name}&quot;</h2>
                <p className="delete-text">&quot;{song.song_name}&quot; will no longer be in &quot;{albums?.[albumId].album_name}&quot;.</p>
                <div className="delete-buttons-holder">
                    <button className='cancel-modal-button' onClick={closeModal}>Cancel</button>
                    <button className='delete-modal-button' onClick={(e) => handleRemove(e)}>Remove</button>
                </div>
            </div>
        </div>
    )
}

export default RemoveSongAlbum
