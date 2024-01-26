import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom"
import { loadAlbumsThunk } from "../../redux/albums";
import "./AllAlbums.css"

const AllAlbums = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const albumObj = useSelector(state => state.albums)
    const albums = Object.values(albumObj)

    useEffect(() => {
        dispatch(loadAlbumsThunk())
    }, [dispatch])

    return (
        <div className="all-albums">
            <h2 onClick={() => navigate(`/albums`)}>Tunafy Albums</h2>
            <div className="list">
                {albums.map((album) => (
                    <div className="item" key={album.id} onClick={() => navigate(`/albums/${album.id}`)}>
                        <img src={album.album_cover_url} alt='album-cover' />
                        <div className="play">
                            <span className="fa fa-play" style={{color: "white"}}></span>
                        </div>
                        <h4>{album.album_name}</h4>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default AllAlbums
