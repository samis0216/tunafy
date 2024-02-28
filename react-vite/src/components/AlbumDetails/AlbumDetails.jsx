import { useEffect, useContext, useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import { useParams } from "react-router-dom"
import { loadOneAlbumThunk } from "../../redux/albums"
import { loadAlbumSongsThunk } from "../../redux/songs"
import { loadUsersThunk } from "../../redux/users"
import { MusicContext } from "../../context/MusicContext";
import AlbumSongTile from "../AllSongs/AlbumSongTile"
import './AlbumDetails.css'
import AlbumDropdown from "../AllAlbums/AlbumDropdown"
import { IndexContext } from "../../context/IndexContext"

export default function AlbumDetails() {
  const dispatch = useDispatch()
  const { albumId } = useParams()
  const albumObj = useSelector((store) => store.albums)
  const album = albumObj[albumId]
  const [songList, setSongList] = useContext(MusicContext);
  const [currentSong, setCurrentSong] = useContext(IndexContext)
  const [playing, setPlaying] = useState(false);
  const [counter, setCounter] = useState(0);

  useEffect(() => {
    dispatch(loadOneAlbumThunk(albumId))
    dispatch(loadAlbumSongsThunk(albumId))
    dispatch(loadUsersThunk())
  }, [dispatch, albumId])

  const songs = useSelector((store) => store.songs)
  const users = useSelector((store) => store.users)
  const user = users[album?.artist_id]
  const keys = Object.keys(songs)
  const songers = Object.values(songs)
  const totDur = Object.values(songs).reduce((total, obj) => obj.duration + total, 0)

  const handleClick = () => {
    if (counter == 0) {
      setSongList(songers);
      setCurrentSong(0);
      setPlaying(true);
    } else {
      setPlaying(!playing);
      const audi = document.getElementsByTagName('audio')[0]
      if (playing) {
          audi.pause()
      }
      if (!playing) {
          audi.play()
      }
    }
    setCounter(counter+1);
  }

  if (!album) {
    return null
  }
  return (
    <section className="album-details-section">
      <div className="album-detail-header">
        <img className='album-detail-cover' src={album.album_cover_url} alt="album-detail-cover" />
        <div className="album-detail-info">
          <p style={{ fontSize: 14, color: '#b3b3b3' }}>Album</p>
          <h1 className="album-detail-name">{album.album_name}</h1>
          <div className="album-stuff">
            <i style={{ fontSize: 24 }} className="fa-solid fa-circle-user" />
            <p style={{ paddingLeft: 5, fontSize: 14 }}>{user?.username}  •  {Object.keys(songs).length} {`${Object.keys(songs).length > 1 ? "songs" : "song"}`}  •  {`${Math.floor(totDur / 60)} min ${totDur % 60 == 0 ? "" : totDur % 60 + " seconds"}`}</p>
          </div>
        </div>
      </div>
      <div className="album-song-list">
        <div className="song-list-symbols">
          <div className="album-play-button" onClick={() => handleClick()}>
          {!playing ? <i className="fa-solid fa-play fa-2xl play-icon"></i> : <i className="fa-solid fa-pause fa-2xl play-icon"></i> }
          </div>

            {/* // : <div className="album-play-button" onClick={() => { setSongList(songers); ; setPlaying(false) }}>
            //   <i className="fa-solid fa-pause fa-2xl play-icon"></i>
            // </div> */}

          {/* <i style={{ fontSize: 38 }} className="fa-regular fa-heart album-icon"></i> */}
          <AlbumDropdown albumId={albumId} />
        </div>
        <div className="song-list-info-header">
          <div className="hashtag-title">
            <p className="hashtag">#</p>
            <p>Title</p>
          </div>
          <p style={{ paddingRight: 254 }}>Album</p>
          <div className="heart-duration">
            <p style={{ paddingRight: 2, visibility: 'hidden' }}>Remove</p>
            <i className="fa-regular fa-clock duration-icon"></i>
          </div>
        </div>
        <div className="song-info">
          {
            keys.map((id) => (
              <AlbumSongTile key={id} songs={songs} count={id} song={songs[id]} album={album} artist={users[songs[id]['artist_id']]} changePlay={setPlaying} changeCount={setCounter}/>
            ))
          }
        </div>
      </div>
    </section>
  )
}
