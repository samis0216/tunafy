// import { useContext } from 'react'
// import { MusicContext } from "../../context/MusicContext";
import './SongTile.css'
import { useNavigate } from 'react-router-dom'

export default function SongTile({ song, albums, artist }) {
    const navigate = useNavigate()
    // const [srv, setSrv] = useContext(MusicContext);

    const minutes = Math.floor(song.duration / 60)
    let seconds = song.duration % 60
    if (seconds < 10) seconds = `0${seconds}`
    return (
        <>
            <div>
                <div className='playlist-song-tile'>
                    <div className="song-info-div">
                        <p className="song-id">{song?.id}</p>
                        <img className='song-cover-img' src={song?.song_cover_url} alt='song-cover' />
                        <div className="song-name-artist">
                            <p className='song-name' onClick={() => navigate(`/songs/${song?.id}`)}>{song?.song_name}</p>
                            <p>{artist?.username}</p>
                        </div>
                    </div>
                    <p className="song-album-name" onClick={() => navigate(`/albums/${song?.id}`)}>{albums[song.album_id] ? albums[song.album_id].album_name : 'None'}</p>
                    <p>{`${minutes}:${seconds}`}</p>
                </div>
            </div>
        </>
    )
}

// onClick={() => setSrv(`${song.song_file_url}`)}
