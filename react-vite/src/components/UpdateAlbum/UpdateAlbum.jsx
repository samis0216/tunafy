import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { editAlbumThunk, loadOneAlbumThunk } from "../../redux/albums";
import "../CreateAlbum/CreateAlbum.css"
import { useNavigate, useParams } from "react-router-dom";

export default function UpdateAlbum() {
    const { albumId } = useParams();
    const dispatch = useDispatch()
    const navigate = useNavigate();
    const user = useSelector((state => state.session.user))
    const album = useSelector((state) => state.albums?.[albumId])
    const [image, setImage] = useState(null);
    const [displayImage, setDisplayImage] = useState(null)
    const [name, setName] = useState(album?.album_name)
    const [imageLoading, setImageLoading] = useState(false);
    const [errors, setErrors] = useState({})

    if(!user) navigate('/')

    useEffect(() => {
      const newErrors = {};
      if (!String(name).length) {
        newErrors.name = 'Name is required.'
      }
      setErrors(newErrors);
    }, [name])

    useEffect(() => {
        dispatch(loadOneAlbumThunk(albumId));
    }, [dispatch, albumId])

    useEffect(() => {
        if (album) {
            setName(album?.album_name || '')
            setDisplayImage(album?.album_cover_url || '')
        }
    }, [album])

    const fileWrap = (e) => {
      e.stopPropagation();

      const tempFile = e.target.files[0];

      const newImageURL = URL.createObjectURL(tempFile); // Generate a local URL to render the image file inside of the <img> tag.
      setImage(tempFile);
      setDisplayImage(newImageURL)
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!Object.values(errors).length) {
      const formData = new FormData();
      formData.append("album_cover_url", image);
      formData.append("album_name", name);
      formData.append("artist_id", user.id);

      setImageLoading(true);
      await dispatch(editAlbumThunk(formData, albumId));
      navigate(`/albums/${albumId}`)
    }
  }

  return (
    <div className="album-main">
      <div className="update-album-box">
        <h1 style={{paddingBottom: 20}}>Update &quot;{album?.album_name}&quot;</h1>
        <form
        action={`/api/albums/${albumId}`}
        onSubmit={handleSubmit}
        className="album-form"
        encType="multipart/form-data"
        >
          <div className="album-form-box">
            <p>Album Name</p>
            <input
              className="update-album-inputs"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              />
            <div style={{minHeight: 30}}>{errors.name ? <span className="error-message">{errors.name}</span> : ' '}</div>
          </div>

          <div className="album-form-box">
            <p>Update Cover Photo</p>
            <p style={{fontSize: 13, paddingBottom: 10, paddingTop: 5}}>To update the cover photo, click the thumbnail below.</p>
            <label className="image-input-label" htmlFor="update-image-input"><img className="thumbnail" src={displayImage}/><input
              className="update-album-inputs"
              id='update-image-input'
              type="file"
              accept="image/*"
              onChange={fileWrap}
              /></label>
              <div style={{minHeight: 20, paddingTop: 10}}></div>
          </div>

          <div className="update-button">
            <button
              className="submit_butt"
              type="submit"
            > Update Album </button>
          </div>
          <div style={{minHeight: 30}}>{imageLoading ? <p className="loading-text">Loading...</p> : ' '}</div>
        </form>
      </div>
    </div>
  )


}
