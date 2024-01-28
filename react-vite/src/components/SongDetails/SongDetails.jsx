import { loadOneSongThunk } from "../../redux/songs";
import { loadUsersThunk } from "../../redux/users";
import { useEffect, useContext, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import { loadOneAlbumThunk } from "../../redux/albums";
import { MusicContext } from "../../context/MusicContext";
import SongDropdown from "./SongDropdown";
import { addLikedSongsThunk, checkedLikedIdsThunk, removeLikedSongsThunk } from "../../redux/collection";

export default function SongDetails() {
    const dispatch = useDispatch()
    const { songId } = useParams()
    const [songList, setSongList] = useContext(MusicContext);
    const song = useSelector(state => state.songs[songId])
    const user = useSelector(state => state.users)
    const album = useSelector(state => state.albums[song?.album_id])
    const userId = useSelector(state => state.session.user)
    const liked = useSelector(state => state.collection[songId])
    const [songLiked, setSongLiked] = useState(liked)
    console.log(liked)

    const minutes = Math.floor(song?.duration / 60)
    let seconds = song?.duration % 60
    if (seconds < 10) seconds = `0${seconds}`

    useEffect(() => {
        dispatch(loadOneSongThunk(songId))
        dispatch(loadOneAlbumThunk(song?.album_id))
        dispatch(loadUsersThunk())
        dispatch(checkedLikedIdsThunk(userId.id, songId))
    }, [dispatch, songId])

    const handleLike = () => {
        dispatch(addLikedSongsThunk(userId.id, songId))
        dispatch(checkedLikedIdsThunk(userId.id, songId))
    }

    const handleDislike = () => {
        dispatch(removeLikedSongsThunk(userId.id, songId))
        dispatch(checkedLikedIdsThunk(userId.id, songId))
    }

    if (!album) dispatch(loadOneAlbumThunk(song?.album_id))
    if (!song) return null
    const songer = [song]
    if (song) return (
        <section className="playlist-details-section">
            <div className="playlist-detail-header">
                <img className='playlist-detail-cover' src={album ? album.album_cover_url : song?.song_cover_url} />
                <div className="playlist-detail-info">
                    <p style={{ fontSize: 14, color: '#b3b3b3' }}>Song</p>
                    <h1 className="playlist-detail-name">{song?.song_name}</h1>
                    <div className="playlist-user-songs">
                        <i style={{ fontSize: 24 }} className="fa-solid fa-circle-user" />
                        <div style={{ display: 'flex', gap: 5, alignItems: "center" }}>
                            <p style={{ paddingLeft: 5, fontSize: 14 }}>{`${user[song.artist_id]?.username}`}</p>
                            <span>•</span>
                            {album?.album_name ?

                                <div className="hover-song" style={{ display: "flex", alignItems: 'center' }}><Link to={`/albums/${song.album_id}`}
                                    style={{ fontSize: 14, textDecoration: 'none', color: 'white' }}>{`${album.album_name}`}</Link> </div>

                                : null}

                            {album && <span>•</span>}
                            <p style={{ fontSize: 14 }}>{`${minutes}:${seconds}`}</p>

                        </div>
                    </div>
                </div>
            </div>
            <div className="playlist-song-list">
                <div className="song-list-symbols">
                    <div className="playlist-play-button" onClick={() => setSongList(songer)}>
                        <i className="fa-solid fa-play fa-2xl play-icon"></i>
                    </div>
                    {songLiked ? <i className="fa-solid fa-heart" style={{ fontSize: 38, color: '#63E6BE' }} onClick={()=> {
                        setSongLiked(false)
                        handleDislike()}}></i> : <i style={{ fontSize: 38 }} className="fa-regular fa-heart playlist-icon" onClick={() => {
                            setSongLiked(true)
                            handleLike()}}></i>}
                    <SongDropdown song={song} />
                </div>

            </div>
        </section>
    )
}
