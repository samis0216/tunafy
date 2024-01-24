import { useState } from "react"
import { useSelector } from "react-redux"
export default function AlbumDetails({album}) {
  const user = useSelector((store) => store.session.user)

  return (
    <div className="album-details-container">
      <div className="album-image-container">
        <img src={album.album_cover_url} alt="album-details-cover" />
      </div>
      <div>
        <p>Album</p>
        <h1>{album.album_name}</h1>
        <p>Artist ‧  ‧ duration</p>
      </div>
    </div>
  )
}
