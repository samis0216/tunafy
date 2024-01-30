import { useNavigate } from "react-router-dom"
import { useModal } from "../../context/Modal";
import "./DeleteSongModal.css"
import { useDispatch } from "react-redux";
import { deleteSongThunk } from "../../redux/songs";


const DeleteSongModal = ({song}) => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { closeModal } = useModal()

    const handleDelete = (songId) => {
        dispatch(deleteSongThunk(songId))
        navigate('/songs')
    }

    return (
        <div className="delete-song-modal">
            <div className="delete-info-modal">
                <h2 className="delete-header-text">Are you sure?</h2>
                <p className="delete-text">Deleting &quot;{`${song.song_name}`}&quot; cannot be reversed.</p>
                <div className="delete-buttons-holder">
                    <button className='cancel-modal-button' type="button" onClick={closeModal}>Cancel</button>
                    <button className="delete-modal-button" onClick={()=> {
                        closeModal()
                        handleDelete(song.id)}
                    }>Delete</button>
                </div>
            </div>
        </div>
    )
}

export default DeleteSongModal
