import { loadOneSongThunk } from "../../redux/songs";
import { loadUsersThunk } from "../../redux/users";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { loadOneAlbumThunk } from "../../redux/albums";

export default function SongDetails() {
    const dispatch = useDispatch()
    const { songId } = useParams()
    const song = useSelector(state  => state.songs[songId])
    const user = useSelector(state => state.users)
    const album = useSelector(state => state.albums[song?.album_id])

    useEffect(() => {
        dispatch(loadOneSongThunk(songId))
        dispatch(loadOneAlbumThunk(song?.album_id))
        dispatch(loadUsersThunk())
    }, [dispatch])

    console.log('song', song, 'album', album)
    if (!album) dispatch(loadOneAlbumThunk(song?.album_id))

    if (song && album) return (
        <section className="playlist-details-section">
            <div className="playlist-detail-header">
                <img className='playlist-detail-cover' src={album? album.album_cover_url : song?.song_cover_url} />
                <div className="playlist-detail-info">
                    {/* <p style={{ fontSize: 14, color: '#b3b3b3' }}>Song</p> */}
                    <p style={{ fontSize: 14, color: '#b3b3b3' }}>Song</p>
                    <h1 style={{ whiteSpace: 'nowrap' }} className="playlist-detail-name">{song?.song_name}</h1>
                    <div className="playlist-user-songs">
                        <i style={{ fontSize: 24 }} className="fa-solid fa-circle-user" />
                        <div>

                        </div>
                        <p style={{ paddingLeft: 5, fontSize: 14 }}>{`${user[song.artist_id]?.username}`}{album?.album_name? `  •  ${album.album_name}` : null}</p>
                    </div>
                </div>
            </div>
            <div className="playlist-song-list">
                <div className="song-list-symbols">
                    <div className="playlist-play-button">
                        <i className="fa-solid fa-play fa-2xl"></i>
                    </div>
                    <i style={{ fontSize: 40 }} className="fa-regular fa-heart playlist-icon"></i>
                    <i style={{ fontSize: 30 }} className="fa-solid fa-ellipsis playlist-icon"></i>
                </div>

            </div>
        </section>
    )
}
