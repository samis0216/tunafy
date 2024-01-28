import { useNavigate } from "react-router-dom"
import { useModal } from "../../context/Modal";
import "./DeleteSongModal.css"
import { useDispatch } from "react-redux";
import { loadLikedSongsThunk, removeLikedSongsThunk } from "../../redux/collection";


const UnlikeSongModal = ({song, userId}) => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { closeModal } = useModal()

    const handleRemove = () => {
        dispatch(removeLikedSongsThunk(userId, song.id))
    }

    return (
        <div className="delete-modal">
            <div className="modal-contents">
                <h2 style={{color: 'white', marginTop: 10}}>Are you sure?</h2>
                <p style={{color: "white", padding: 10}}>This will remove &quot;{`${song.song_name}`}&quot; from your collection</p>
                <div className="delete-buttons-holder">
                    <button className="delete-modal-button" onClick={()=> {
                        closeModal()
                        handleRemove(song.id)}
                    }>Remove</button>
                    <button className='delete-modal-button' style={{backgroundColor: "gray"}}type="button" onClick={closeModal}>Cancel</button>
                </div>
            </div>
        </div>
    )
}

export default UnlikeSongModal
