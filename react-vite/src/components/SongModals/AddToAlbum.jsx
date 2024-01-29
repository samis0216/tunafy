import { useNavigate } from "react-router-dom"
import { useModal } from "../../context/Modal";
import "./DeleteSongModal.css"
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { addSongToAlbumThunk, loadUserAlbumsThunk } from "../../redux/albums";


const AddToAlbum = ({ song }) => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { closeModal } = useModal()
    const user = useSelector(state => state.session.user)
    const albums = useSelector(state => state.albums)

    useEffect(() => {
        dispatch(loadUserAlbumsThunk(user.id))
    }, [dispatch])

    const values = Object.values(albums)

    const handleAdd = (albumId) => {
        dispatch(addSongToAlbumThunk(song.id, albumId))
        closeModal()
        navigate(`/albums/${albumId}`)
    }

    return (
        <div className="delete-song-modal">
            <div className="delete-info-modal" style={{display: "flex", flexDirection: "column", alignItems: "center"}}>
                <h2 className="delete-header-text" style={{padding: 10}}>Your Albums</h2>
                <div style={{display: 'flex', gap: 10}}>

                {values.map(album => (
                    <div className="item" key={album.id} onClick={() => handleAdd(album.id)}>
                        <img src={album.album_cover_url} alt='album-cover' />
                        <h4>{album.album_name}</h4>
                    </div>
                ))}
                </div>
            </div>
        </div>
    )
}

export default AddToAlbum
