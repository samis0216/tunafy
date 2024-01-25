import './SongTile.css'
import { Link } from 'react-router-dom'

export default function SongTile({ song, albums, artist }) {
    const minutes = Math.floor(song.duration / 60)
    let seconds = song.duration % 60
    if (seconds < 10) seconds = `0${seconds}`
    return (
        <div className="song-tile">
            <div id='pic'>
                <p style={{ width: 10 }}>{song.id}</p>
                <img src={song.song_cover_url} className='album-picture-small' />
                <div className='song-items'>
                    <div className={'hover-song'}><Link style={{ color: 'white', textDecoration: 'none' }} to={`/songs/${song.id}`}>{song.song_name}</Link></div>
                    <p>{artist?.username}</p>
                </div>
            </div>
            {albums[song.album_id] ? <p>{albums[song.album_id].album_name}</p> : <p>None</p>}
            <p>{`${minutes}:${seconds}`}</p>
        </div>

    )
}
