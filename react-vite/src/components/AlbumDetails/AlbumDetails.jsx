import { useState, useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { useNavigate, useParams } from "react-router-dom"
import { loadOneAlbumThunk } from "../../redux/albums"
import { loadAlbumSongsThunk } from "../../redux/songs"
import { loadUsersThunk } from "../../redux/users"
import DeleteAlbum from "../DeleteModal/DeleteAlbum"
import SongTile from "../AllSongs/SongTile"
import './AlbumDetails.css'

export default function AlbumDetails() {
  const dispatch = useDispatch()
  const {albumId} = useParams()
  const navigate = useNavigate()

  const albumObj = useSelector((store) => store.albums)
  const album = albumObj[albumId]
  useEffect(() => {
    dispatch(loadOneAlbumThunk(albumId))
    dispatch(loadAlbumSongsThunk(albumId))
    dispatch(loadUsersThunk())
  }, [dispatch, albumId])

  const songs = useSelector((store) => store.songs)
  const users = useSelector((store) => store.users)
  const user = users[album?.artist_id]
  const keys = Object.keys(songs)
  console.log(user)
  if (!album) {
    return null
  }
  return (
    <section className="album-details-section">
      <div className="album-detail-header">
        <img src={album.album_cover_url} alt="album-detail-cover" />
        <div className="album-detail-info">
          <p>Album</p>
          <h1 className="album-detail-name">{album.album_name}</h1>
          <div className="album-stuff">
            <p>{user?.username} ‧ {Object.keys(songs).length} ‧ duration</p>
            <DeleteAlbum albumId={albumId}/>
            <button onClick={() => navigate(`/albums/${albumId}/update`)}>Update</button>
          </div>
        </div>
      </div>
      <div className="album-song-list">
        <div className="song-list-symbols">
          <div className="album-play-button">
              <i className="fa-solid fa-play fa-2xl"></i>
          </div>
          <i style={{ fontSize: 40 }} className="fa-regular fa-heart album-icon"></i>
          <i style={{ fontSize: 30 }} className="fa-solid fa-ellipsis album-icon"></i>
        </div>
      </div>
      <div className="album-song-tiles-container">
        <hr />
        {
          keys.map((id) => (
            <SongTile key={id} song={songs[id]} albums={album} artist={users[songs[id]['artist_id']]}/>
          ))
        }
      </div>
    </section>
  )
}
