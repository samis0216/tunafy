import { useState, useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"

import { useParams } from "react-router-dom"
import { loadOneAlbumThunk } from "../../redux/albums"
import './AlbumDetails.css'

export default function AlbumDetails() {
  const dispatch = useDispatch()
  const {albumId} = useParams()

  useEffect(() => {
    dispatch(loadOneAlbumThunk(albumId))

  }, [dispatch, albumId])

  const albumObj = useSelector((store) => store.albums)
  const album = albumObj[albumId]
  if (!album) {
    return null
  }
  return (
    <div className="album-details-container">
      <div className="album-image-container">
        <img src={album.album_cover_url} alt="album-details-cover" />
      </div>
      <div className="album-headers">
        <p>Album</p>
        <h1>{album.album_name}</h1>
        <p>Artist ‧  ‧ duration</p>
      </div>
    </div>
  )
}
