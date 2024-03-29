import './SongTile.css'
import { useNavigate } from 'react-router-dom'
import { MusicContext } from "../../context/MusicContext";
import { useContext } from 'react';
import { IndexContext } from '../../context/IndexContext';
// import UnlikeSongModal from '../SongModals/UnlikeSongModal';
import { useSelector } from 'react-redux';
import OpenModalMenuItem from '../Navigation/OpenModalMenuItem';
import RemoveSongAlbum from '../SongModals/RemoveSongAlbum';


export default function AlbumSongTile({ songs, song, album, artist, count, changePlay, changeCount }) {
    const navigate = useNavigate()
    // const likedSongs = useSelector(state => state.collection)
    const user = useSelector(state => state.session.user)
    const [songList, setSongList] = useContext(MusicContext)
    const [currentSong, setCurrentSong] = useContext(IndexContext);
    if(songList) currentSong
    const minutes = Math.floor(song.duration / 60)
    let seconds = song.duration % 60
    if (seconds < 10) seconds = `0${seconds}`
    const isOwner = song.artist_id == user.id;


    return (
        <>
            <div onClick={() => {setSongList(Object.values(songs)); setCurrentSong(count-1); changePlay(true); changeCount(1)}}>
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
                    {isOwner ?
                        <span className='remove-feat'><OpenModalMenuItem itemText='Remove' modalComponent={<RemoveSongAlbum song={song} albumId={album.id}/>}/></span> :
                        <p style={{ paddingRight: 30, visibility: 'hidden' }}>Remove</p>}
                        <p className="song-time">{`${minutes}:${seconds}`}</p>
                    </div>
                </div>
            </div>
        </>
    )
}
