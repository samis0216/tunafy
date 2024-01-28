import { useEffect, useContext } from "react"
import { useSelector, useDispatch } from "react-redux"
import { useParams } from "react-router-dom"
import { loadOneAlbumThunk } from "../../redux/albums"
import { loadAlbumSongsThunk } from "../../redux/songs"
import { loadUsersThunk } from "../../redux/users"
import { MusicContext } from "../../context/MusicContext";
import AlbumSongTile from "../AllSongs/AlbumSongTile"
import './AlbumDetails.css'
import AlbumDropdown from "../AllAlbums/AlbumDropdown"

export default function AlbumDetails() {
  const dispatch = useDispatch()
  const {albumId} = useParams()
  const albumObj = useSelector((store) => store.albums)
  const album = albumObj[albumId]
  console.log(album)
  const [songList, setSongList] = useContext(MusicContext);

  useEffect(() => {
    dispatch(loadOneAlbumThunk(albumId))
    dispatch(loadAlbumSongsThunk(albumId))
    dispatch(loadUsersThunk())
  }, [dispatch, albumId])

  const songs = useSelector((store) => store.songs)
  const users = useSelector((store) => store.users)
  const user = users[album?.artist_id]
  const keys = Object.keys(songs)
  // console.log(user)
  if (!album) {
    return null
  }
  const songers = Object.values(songs)
  return (
    <section className="album-details-section">
      <div className="album-detail-header">
        <img className='album-detail-cover' src={album.album_cover_url} alt="album-detail-cover" />
        <div className="album-detail-info">
          <p style={{ fontSize: 14, color: '#b3b3b3' }}>Album</p>
          <h1 className="album-detail-name">{album.album_name}</h1>
          <div className="album-stuff">
            <i style={{ fontSize: 24 }} className="fa-solid fa-circle-user" />
            <p style={{ paddingLeft: 5, fontSize: 14 }}>{user?.username}  •  {Object.keys(songs).length}  •  duration</p>
          </div>
        </div>
      </div>
      <div className="album-song-list">
        <div className="song-list-symbols">
          <div className="album-play-button" onClick={() => setSongList(songers)}>
              <i className="fa-solid fa-play fa-2xl play-icon"></i>
          </div>
          <i style={{ fontSize: 38 }} className="fa-regular fa-heart album-icon"></i>
          <AlbumDropdown albumId={albumId} />
        </div>
        <div className="song-list-info-header">
            <div className="hashtag-title">
                <p className="hashtag">#</p>
                <p>Title</p>
            </div>
            <p>Album</p>
            <i className="fa-regular fa-clock duration-icon"></i>
        </div>
        <div className="song-info">
          {
            keys.map((id) => (
              <AlbumSongTile key={id} songs={songs} count={id} song={songs[id]} album={album} artist={users[songs[id]['artist_id']]} onClick={() => console.log("hi")}/>
            ))
          }
        </div>
      </div>
    </section>
  )
}
