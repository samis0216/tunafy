import { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux";
import "./CreateAlbum.css"
import { addAlbumThunk } from "../../redux/albums";
import { useNavigate } from "react-router-dom";

export default function CreateAlbum() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state => state.session.user))
  const [image, setImage] = useState(null);
  const [name, setName] = useState("")
  const [imageLoading, setImageLoading] = useState(false);
  // const album = useSelector((state) => state.albums?.[albumId])

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("album_cover_url", image);
    formData.append("album_name", name);
    formData.append("artist_id", user.id);


    // aws uploads can be a bit slow—displaying
    // some sort of loading message is a good idea
    setImageLoading(true);
    dispatch(addAlbumThunk(formData));
    navigate(`/albums`);

}

  useEffect(() => {

  }, [dispatch])

  return (
    <div className="album-main">
      <div className="update-album-box">
        <h1>Create an album</h1>
        <form
        action="/api/albums/new"
        onSubmit={handleSubmit}
        className="album-form"
        encType="multipart/form-data"
        >
          <div className="album-form-box">
            <p>Album Name</p>
            <input
              className="update-album-inputs"
              type="text"
              onChange={(e) => setName(e.target.value)}
              />
          </div>

          <div className="album-form-box">
            <p>Upload Cover Photo</p>
            <input
              className="update-album-inputs"
              type="file"
              accept="image/*"
              onChange={(e) => setImage(e.target.files[0])}
              />
          </div>

          <div className="update-button">
            <button
              className="submit_butt"
              type="submit"
            > Create Album </button>
          </div>
          {(imageLoading) && <p className="loading-text">Loading...</p>}
        </form>
      </div>
    </div>
  )
}
