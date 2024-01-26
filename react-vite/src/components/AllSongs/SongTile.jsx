import { useState, useContext } from 'react'
import { MusicContext } from "../../context/MusicContext";
import './SongTile.css'
import { Link, useNavigate } from 'react-router-dom'


export default function SongTile({ song, albums, artist }) {
    const [srv, setSrv] = useContext(MusicContext);

    const minutes = Math.floor(song.duration / 60)
    let seconds = song.duration % 60
    if (seconds < 10) seconds = `0${seconds}`
    return (
        <>
            <div onClick={() => setSrv(`${song.song_file_url}`)}>
                    <div className="song-tile">
                        <div id='pic'>
                            <p style={{ width: 10 }}>{song.id}</p>
                            <img src={song.song_cover_url} className='album-picture-small' />
                            <div className='song-items'>
                                <Link to={`/songs/${song.id}`}><p style={{ color: 'white' }}>{song.song_name}</p></Link>
                                <p>{artist?.username}</p>
                            </div>
                        </div>
                        {albums[song.album_id] ? <p>{albums[song.album_id].album_name}</p> : <p>None</p>}
                        <p>{`${minutes}:${seconds}`}</p>
                    </div>
            </div>
        </>


    )
}
