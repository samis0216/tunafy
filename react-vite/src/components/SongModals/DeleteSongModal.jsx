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
        const res = dispatch(deleteSongThunk(songId))
        navigate('/songs')

    }

    return (
        <div className="delete-modal">
            <div className="modal-contents">
                <h2>Are you sure?</h2>
                <p style={{color: "white",  paddingTop: 5}}>Deleting "{`${song.song_name}`}" cannot be reversed.</p>
                <div className="delete-buttons-holder">
                    <button className="delete-modal-button" onClick={()=> {
                        closeModal()
                        handleDelete(song.id)}
                    }>Delete</button>
                    <button className='delete-modal-button' style={{backgroundColor: "gray"}}type="button" onClick={closeModal}>Cancel</button>
                </div>
            </div>
        </div>
    )
}

export default DeleteSongModal
