import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import { loadUserByIdThunk, loadUsersThunk } from '../../redux/users'
import './SongTile.css'

export default function SongTile({ song, albums, artist}) {
    const [clicked, setClicked] = useState(false)
    const minutes = Math.floor(song.duration / 60)
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
                            <p>{artist?.username}</p>
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
                            <p>{artist?.username}</p>
                        </div>
                    </div>
                    {albums[song.album_id] ? <p>{albums[song.album_id].album_name}</p> : <p>None</p>}
                    <p>{`${minutes}:${seconds}`}</p>
                </div>}
            </div>
    )
}
