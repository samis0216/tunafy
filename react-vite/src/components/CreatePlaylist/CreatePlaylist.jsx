import { useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import "./CreatePlaylist.css"
import { addPlaylistThunk } from "../../redux/playlists";
import { useNavigate } from "react-router-dom";

export default function CreatePlaylist() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state => state.session.user))
  const [image, setImage] = useState(null);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [priv, setPriv] = useState(false);
  const [imageLoading, setImageLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const creatorId = user.id
    const formData = new FormData();
    formData.append("playlist_cover_url", image);
    formData.append("playlist_name", name);
    formData.append("private", priv);
    formData.append("creator_id", creatorId);
    formData.append("description", description);


    // aws uploads can be a bit slow—displaying
    // some sort of loading message is a good idea
    setImageLoading(true);
    await dispatch(addPlaylistThunk(formData));
    navigate(`/playlists`);

  }

  return (
    <div className="playlist-form-container">
      <div className="create-playlist-box">
        <h1>Create a playlist</h1>

        <form
          action="/api/playlists/new"
          onSubmit={handleSubmit}
          encType="multipart/form-data"
          className="playlist-form"
        >

            <div className="playlist-form-box">
              <p>Playlist Name</p>
              <input
                className='create-playlist-inputs'
                type="text"
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div className="playlist-form-box">
              <p>Upload Cover Photo</p>
              <input
                className='create-playlist-inputs'
                type="file"
                accept="image/*"
                onChange={(e) => setImage(e.target.files[0])}
              />
            </div>

            <div className="playlist-form-box">
              <p>Description</p>
              <input
                className='create-playlist-inputs'
                type="text"
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>

            <div className="playlist-form-box">
              <div className="playlist-checkbox">
                <input
                  className='create-playlist-inputs'
                  type="checkbox"
                  onChange={(e) => setPriv(e.target.value)}
                />
                <p>Make my playlist private</p>
              </div>
            </div>

            <div className="submit-playlist">
              <button
                className="playlist-form-button"
                type="submit"
                > Create Playlist </button>
            </div>
            {(imageLoading) && <p className="loading-text">Loading...</p>}
        </form>
      </div>
    </div>
  )
}
