import './SongTile.css'
import { useNavigate } from 'react-router-dom'
import { MusicContext } from "../../context/MusicContext";
import { useContext } from 'react';
import { useDispatch } from 'react-redux';
import { addLikedSongsThunk } from '../../redux/collection';

export default function SongTile({ song, albums, artist, count, user }) {
    const navigate = useNavigate()
    const [songList, setSongList] = useContext(MusicContext)
    // const [liked, setLiked] = useState()
    // console.log(Object.values(albums))
    const dispatch = useDispatch()
    const minutes = Math.floor(song.duration / 60)
    let seconds = song.duration % 60
    if (seconds < 10) seconds = `0${seconds}`

    const handleLike = () => {
        dispatch(addLikedSongsThunk(song.id, user.id))
    }

    return (
        <>
            <div>
                <div className='playlist-song-tile'>
                    <div className="song-info-div">
                        <p className="song-id">{count}</p>
                        <img className='song-cover-img' src={song?.song_cover_url} alt='song-cover' />
                        <div className="song-name-artist">
                            <p className='song-name' onClick={() => navigate(`/songs/${song?.id}`)}>{song?.song_name}</p>
                            <p>{artist?.username}</p>
                        </div>
                    </div>
                    <p className="song-album-name" onClick={() => { (song.album_id) ? navigate(`/albums/${song?.album_id}`) : navigate(`/songs/${song.id}`) }}>{albums[song.album_id] ? albums[song.album_id].album_name : song.song_name}</p>
                    {/* <i style={{ fontSize: 18, color: 'green', fill: 'green' }} className="fa-regular fa-heart album-icon"></i> */}
                    <p>{`${minutes}:${seconds}`}</p>

                </div>
            </div>
        </>
    )
}

// onClick={() => setSrv(`${song.song_file_url}`)}
