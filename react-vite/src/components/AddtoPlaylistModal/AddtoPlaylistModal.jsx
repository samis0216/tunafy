import { useDispatch, useSelector } from "react-redux";
import { useModal } from "../../context/Modal";
import './AddtoPlaylistModal.css'
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { loadUserPlaylistsThunk } from "../../redux/playlists";

export default function AddtoPlaylistModal() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [currentPlaylist, setCurrentPlaylist] = useState("")
  const {closeModal} = useModal();
  const user = useSelector(store => store.session.user)
  const playlists = useSelector(store => store.playlists)
  const choices = Object.values(playlists)


  useEffect(() => {
    dispatch(loadUserPlaylistsThunk(user.id))
  }, [dispatch])

  const handleSubmit = async (e) => {
    e.preventDefault();


  }

  if (!playlists) return null
  return (
    <div className="add-to-playlist-modal">
        <div className="playlist-info-modal">
            <h2 className="add-header-text">To which playlist?</h2>
            <form
              onSubmit={handleSubmit}
              action={`/api/playlists/${currentPlaylist}/addsong`}
            >
              <label>
                Playlist
                <select
                  onChange={(e) => setCurrentPlaylist(e.target.value)}
                >
                  <option defaultValue={true}>Select a Playlist</option>
                  {choices.map((key) => {
                    return (
                      <option value={`${key?.id}`}>{`${key?.playlist_name}`}</option>
                    )
                  })}
                </select>
              </label>
              <button type="submit">Add Song</button>
            </form>
        </div>
      </div>
  )
}
