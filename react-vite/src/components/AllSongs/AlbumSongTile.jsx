import './SongTile.css'
import { useNavigate } from 'react-router-dom'
import { MusicContext } from "../../context/MusicContext";
import { useContext } from 'react';
import { IndexContext } from '../../context/IndexContext';
// import OpenModalMenuItem from '../Navigation/OpenModalMenuItem';
// import UnlikeSongModal from '../SongModals/UnlikeSongModal';
import { useSelector } from 'react-redux';


export default function AlbumSongTile({ songs, song, album, artist, count }) {
    const navigate = useNavigate()
    // const likedSongs = useSelector(state => state.collection)
    const user = useSelector(state => state.session.user)
    const [songList, setSongList] = useContext(MusicContext)
    const [currentSong, setCurrentSong] = useContext(IndexContext);
    const minutes = Math.floor(song.duration / 60)
    let seconds = song.duration % 60
    if (seconds < 10) seconds = `0${seconds}`
    return (
        <>
            <div onClick={() => {setSongList(Object.values(songs)); setCurrentSong(song.id - 4)}}>
                <div className='playlist-song-tile'>
                    <div className="song-info-div">
                        <p className="song-id">{count}</p>
                        <img className='song-cover-img' src={song?.song_cover_url} alt='song-cover' />
                        <div className="song-name-artist">
                            <p className='song-name' onClick={() => navigate(`/songs/${song?.id}`)}>{song?.song_name}</p>
                            <p>{artist?.username}</p>
                        </div>
                    </div>
                    <p className="song-album-name" onClick={() => {(song.album_id) ? navigate(`/albums/${song?.album_id}`) : navigate(`/songs/${song.id}`)}}>{album ? album.album_name : song.song_name}</p>
                    <div className="right-side-song">
                        {/* <span><OpenModalMenuItem itemText={<i className="fa-solid fa-heart liked-heart"></i>} modalComponent={<UnlikeSongModal song={likedSongs[song.id]} userId={user.id}/>}/></span> */}
                        <p className="song-time">{`${minutes}:${seconds}`}</p>
                    </div>
                </div>
            </div>
        </>
    )
}
