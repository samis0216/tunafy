import { useEffect, useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadSongsThunk } from "../../redux/songs";
import { loadAlbumsThunk } from "../../redux/albums";
import { loadUsersThunk } from "../../redux/users";
import { MusicContext } from "../../context/MusicContext";
import SongTile from "./SongTile";
import './AllSongs.css'
import songCover from './14.png'
import AllSongsDropdown from "./AllSongsDropdown";

export default function AllSongs() {
    const dispatch = useDispatch()
    const [songList, setSongList] = useContext(MusicContext);
    useEffect(() => {
        dispatch(loadSongsThunk())
        dispatch(loadAlbumsThunk())
        dispatch(loadUsersThunk())
    }, [dispatch])

    const songs = useSelector(state => state.songs)
    const albums = useSelector(state => state.albums)
    const users = useSelector(state=> state.users)
    const keys = Object.keys(songs)

    const songers = Object.values(songs)
    return (
        <section className="page-container">
            <div className="songs-header">
                <img className='all-songs-cover' src={songCover} alt="all-songs-cover" />
                <div className="all-songs-info">
                    <p style={{ fontSize: 14, color: '#b3b3b3' }}>Library</p>
                    <h1 className="all-songs-title">All Songs</h1>
                    <p style={{ fontSize: 14, color: '#b3b3b3', whiteSpace: 'nowrap' }}>All the songs in our library.</p>
                </div>
            </div>
            <div className="all-songs-list">
                <div className="song-list-symbols">
                    <div className="song-play-button" onClick={() => setSongList(songers)}>
                        <i className="fa-solid fa-play fa-2xl play-icon"></i>
                    </div>
                    <i style={{ fontSize: 38 }} className="fa-regular fa-heart album-icon"></i>
                    <AllSongsDropdown />
                </div>
                <div className="song-list-info-header">
                    <div className="hashtag-title">
                        <p className="hashtag">#</p>
                        <p>Title</p>
                    </div>
                    <p>Album</p>
                    <i className="fa-regular fa-clock duration-icon"></i>
                </div>
                <div className="song-info">
                    {users &&
                        keys.map((id) => (
                            <SongTile key={id} count={id} song={songs[id]} albums={albums} artist={users[songs[id]['artist_id']]}/>
                        ))
                    }
                </div>
            </div>
        </section>
    )
}
