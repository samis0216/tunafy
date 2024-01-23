import { useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import "./CreatePlaylist.css"

export default function CreatePlaylist() {
  const dispatch = useDispatch();
  const user = useSelector((state => state.session.user))
  const [image, setImage] = useState(null);
  const [name, setName] = useState("");
  const [priv, setPriv] = useState(false);
  const [imageLoading, setImageLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("playlist_cover_url", image);
    formData.append("playlist_name", name);
    formData.append("private", priv);
    formData.append("creator_id", user.id);


    // aws uploads can be a bit slow—displaying
    // some sort of loading message is a good idea
    setImageLoading(true);
    await dispatch(addPlaylist(formData));
  }

  return (
    <form
      action="/api/playlists/new"
      onSubmit={handleSubmit}
      encType="multipart/form-data"
    >
      <div className="playlist-form-container">
        <div className="playlist-form-name">
          <p>Playlist Name</p>
          <input
            type="text"
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div className="playlist-form-file">
          <p>Upload Cover Art</p>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setImage(e.target.files[0])}
          />
        </div>

        <div className="playlist-form-private">
          <p></p>
        </div>

        <button
          className="playlist-form-button"
          type="submit"
          > Submit </button>
        {(imageLoading) && <p style={{"color": "white"}}>Loading...</p>}
      </div>
    </form>
  )
}
