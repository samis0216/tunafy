import { useSelector } from 'react-redux'
import { useState } from 'react'
import './SongTile.css'

export default function SongTile({ song, artist, albums }) {
    const user = useSelector(state => state.session.user)
    const minutes = Math.floor(song.duration / 60)
    const [clicked, setClicked] = useState(false)
    let seconds = song.duration % 60
    if (seconds < 10) seconds = `0${seconds}`
    return (
        <div>
            {clicked ?
                <div className="song-tile" id="clicked" onClick={()=> setClicked(false)}>
                    <div id='pic' onClick={() => setClicked(true)}>
                        <p style={{ width: 10 }}>{song.id}</p>
                        <img src={song.song_cover_url} className='album-picture-small' />
                        <div className='song-items'>
                            <p style={{ color: 'white' }}>{song.song_name}</p>
                            {song.artist_id === user.id ? <p>{user.username}</p> : null}
                        </div>
                    </div>
                    {albums[song.album_id] ? <p>{albums[song.album_id].album_name}</p> : <p>None</p>}
                    <p>{`${minutes}:${seconds}`}</p>
                </div> :
                <div className="song-tile" onClick={() => setClicked(true)}>
                    <div id='pic'>
                        <p style={{ width: 10 }}>{song.id}</p>
                        <img src={song.song_cover_url} className='album-picture-small' />
                        <div className='song-items'>
                            <p style={{ color: 'white' }}>{song.song_name}</p>
                            {song.artist_id === user.id ? <p>{user.username}</p> : null}
                        </div>
                    </div>
                    {albums[song.album_id] ? <p>{albums[song.album_id].album_name}</p> : <p>None</p>}
                    <p>{`${minutes}:${seconds}`}</p>
                </div>}
            </div>
    )
}
