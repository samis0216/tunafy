import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loadAlbumsThunk } from "../../redux/albums";
// import { loadUsersThunk } from "../../redux/users";
import "./AllAlbums.css";

const AllAlbums = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const albumObj = useSelector(state => state.albums);
    const user = useSelector(state => state.users);

    const validKeys = Object.keys(albumObj).filter(key => key !== 'undefined');

    

    useEffect(() => {
        dispatch(loadAlbumsThunk());
    }, [dispatch, validKeys.length]);

    return (
        <div className="all-albums">
            <h2 onClick={() => navigate(`/albums`)}>Tunafy Albums</h2>
            <div className="list">
                {validKeys.map((key) => {
                    const album = albumObj[key];
                    return (
                        <div className="item" key={album.id} onClick={() => navigate(`/albums/${album.id}`)}>
                            <img src={album.album_cover_url} alt='album-cover' />
                            <div className="play">
                                <span className="fa fa-play" style={{color: "white"}}></span>
                            </div>
                            <h4>{album.album_name}</h4>
                            <p className="album-artist">{`By ${user[album?.artist_id]?.username}`}</p>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default AllAlbums;
