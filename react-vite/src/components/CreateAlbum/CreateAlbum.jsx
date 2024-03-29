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
  const [errors, setErrors] = useState({})
  const [submitted, setSubmitted] = useState(false)

  useEffect(() => {
    const newErrors = {};
    if (!name.length) {
      newErrors.name = 'Name is required.'
    }
    if (image === null || (!image?.name.endsWith('.jpeg') && !image?.name.endsWith('.jpg') && !image?.name.endsWith('.png') && !image?.name.endsWith('.pdf') && !image?.name.endsWith('.gif'))) {
      newErrors.image = 'Cover photo must be in .jpeg, .jpg, .pdf, .png or .gif format.'
    }
    setErrors(newErrors);
  }, [name, image])

  const handleSubmit = async (e) => {
    e.preventDefault();

    setSubmitted(true)

    if (!Object.values(errors).length) {
      const formData = new FormData();
      formData.append("album_cover_url", image);
      formData.append("album_name", name);
      formData.append("artist_id", user.id);


      // aws uploads can be a bit slow—displaying
      // some sort of loading message is a good idea
      setImageLoading(true);
      await dispatch(addAlbumThunk(formData));
      navigate(`/albums`)
    }

  }

  return (
    <div className="album-main">
      <div className="update-album-box">
        <h1 style={{paddingBottom: 20}}>Create an album</h1>
        <form
          action= "/api/albums"
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
            <div style={{minHeight: 30}}>{submitted && errors.name && <span className="error-message">{errors.name}</span>}</div>
          </div>

          <div className="album-form-box">
            <p>Upload Cover Photo</p>
            <input
              className="update-album-inputs"
              type="file"
              accept="image/*"
              onChange={(e) => setImage(e.target.files[0])}
            />
            <div style={{minHeight: 30}}>{submitted && errors.image && <span className="error-message">{errors.image}</span>}</div>
          </div>

          <div className="update-button">
            <button
              className="submit_butt"
              type="submit"
            > Create Album </button>
          </div>
          <div style={{minHeight: 30}}>{imageLoading ? <p className="loading-text">Loading...</p> : ' '}</div>
        </form>
      </div>
    </div>
  )
}
