import { useNavigate } from "react-router-dom"
import { useModal } from "../../context/Modal";
import "./DeleteSongModal.css"
import { useDispatch, useSelector } from "react-redux";
import { deleteFromAlbumThunk} from "../../redux/albums";
import { loadAlbumSongsThunk } from "../../redux/songs";


const RemoveSongAlbum = ({ song, albumId }) => {
    // console.log(song, song.album_id)
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { closeModal } = useModal()
    const albums = useSelector(state => state.albums)

    const handleRemove = (albumId) => {
        dispatch(deleteFromAlbumThunk(song.id, albumId))
        dispatch(loadAlbumSongsThunk(albumId))
        closeModal()
        navigate(`/albums/${albumId}`)
    }

    return (
        <div className="delete-song-modal">
            <div className="delete-info-modal" style={{display: "flex", flexDirection: "column", alignItems: "center"}}>
                <h2 className="delete-header-text" style={{padding: 10}}>Removing from {albums?.[albumId].album_name}</h2>
                <p style={{color: "white"}}>{song.song_name} will no longer be in {albums?.[albumId].album_name}.</p>
                <div className="delete-buttons-holder">
                    <button className='delete-modal-button' onClick={handleRemove(albumId)}>Remove</button>
                    <button className='cancel-modal-button' onClick={closeModal}>Cancel</button>
                </div>
            </div>
        </div>
    )
}

export default RemoveSongAlbum
