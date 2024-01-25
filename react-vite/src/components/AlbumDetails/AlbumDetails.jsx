import { useState, useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { useParams } from "react-router-dom"
import { loadOneAlbumThunk } from "../../redux/albums"
import { loadAlbumSongsThunk } from "../../redux/songs"
import { loadUsersThunk } from "../../redux/users"
import SongTile from "../AllSongs/SongTile"
import './AlbumDetails.css'

export default function AlbumDetails() {
  const dispatch = useDispatch()
  const {albumId} = useParams()


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
    <div className="album-details-container">
      <div className="album-headers-container">
        <div className="album-image-container">
          <img src={album.album_cover_url} alt="album-details-cover" />
        </div>
        <div className="album-headers">
          <p>Album</p>
          <h1>{album.album_name}</h1>
          <p>{user?.username} ‧  ‧ duration</p>
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
    </div>
  )
}
