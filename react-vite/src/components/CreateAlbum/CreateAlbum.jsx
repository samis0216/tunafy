import { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux";
import "./CreateAlbum.css"
import { addAlbumThunk } from "../../redux/albums";

export default function CreateAlbum() {
  const dispatch = useDispatch();
  const user = useSelector((state => state.session.user))
  const [image, setImage] = useState(null);
  const [name, setName] = useState("")
  const [imageLoading, setImageLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("album_cover_url", image);
    formData.append("album_name", name);
    formData.append("artist_id", user.id);


    // aws uploads can be a bit slow—displaying
    // some sort of loading message is a good idea
    setImageLoading(true);
    await dispatch(addAlbumThunk(formData));
  }

  useEffect(() => {

  }, [dispatch])

  return (
    <form
    action="/api/albums/new"
    onSubmit={handleSubmit}
    encType="multipart/form-data"
    >
      <div className="album-form-container">
        <div className="album-form-name">
          <p>Album Name</p>
          <input
            type="text"
            onChange={(e) => setName(e.target.value)}
            />
        </div>

        <div className="album-form-file">
          <p>Upload Cover Art</p>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setImage(e.target.files[0])}
            />
        </div>

        <button
          className="album-form-button"
          type="submit"
          > Submit </button>
        {(imageLoading) && <p style={{"color": "white"}}>Loading...</p>}
      </div>
    </form>
  )
}
