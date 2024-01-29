import { useModal } from "../../context/Modal";
import "./DeleteSongModal.css"
import { useDispatch } from "react-redux";
import { removeLikedSongsThunk } from "../../redux/collection";


const UnlikeSongModal = ({song, userId}) => {
    const dispatch = useDispatch()
    const { closeModal } = useModal()

    const handleRemove = () => {
        dispatch(removeLikedSongsThunk(userId, song.id))
    }

    return (
        <div className="delete-song-modal">
            <div className="delete-info-modal">
                <h2 className="delete-header-text">Are you sure?</h2>
                <p className="delete-text">This will remove &quot;{`${song.song_name}`}&quot; from your collection.</p>
                <div className="delete-buttons-holder">
                    <button className='cancel-modal-button' type="button" onClick={closeModal}>Cancel</button>
                    <button className="delete-modal-button" onClick={()=> {
                        closeModal()
                        handleRemove(song.id)}
                    }>Remove</button>
                </div>
            </div>
        </div>
    )
}

export default UnlikeSongModal
