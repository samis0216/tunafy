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
    const result = await dispatch(addPlaylistThunk(formData));
    // console.log("Result from addAlbumThunk: ", result);

  
  const playlistsArray = result.playlists
  const newPlaylist = playlistsArray && playlistsArray[playlistsArray.length - 1];
  const newPlaylistId = newPlaylist ? newPlaylist.id : null;

  if (newPlaylistId) {
    navigate(`/playlists/${newPlaylistId}`);
  } 
  }

  return (
    <div className="playlist-form-container">
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
              type="text"
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className="playlist-form-box">
            <p>Upload Cover Art</p>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setImage(e.target.files[0])}
            />
          </div>

          <div className="playlist-form-box">
            <p>Description</p>
            <input
              type="text"
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          <div className="playlist-form-box">
            <div className="playlist-checkbox">
              <input
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
          {(imageLoading) && <p style={{"color": "white", alignSelf: "center"}}>Loading...</p>}
      </form>
    </div>
  )
}
