import './SongTile.css'
import { useNavigate } from 'react-router-dom'
import { MusicContext } from "../../context/MusicContext";
import { useContext } from 'react';

export default function AlbumSongTile({ song, album, artist }) {
    const navigate = useNavigate()
    const [songList, setSongList] = useContext(MusicContext)
    // console.log(Object.values(albums))
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
                    <p className="song-album-name" onClick={() => {(song.album_id) ? navigate(`/albums/${song?.album_id}`) : navigate(`/songs/${song.id}`)}}>{album ? album.album_name : song.song_name}</p>
                    <p>{`${minutes}:${seconds}`}</p>
                </div>
            </div>
        </>
    )
}
