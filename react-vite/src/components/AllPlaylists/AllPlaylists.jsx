import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { loadPlaylistsThunk } from "../../redux/playlists"

const AllPlaylists = () => {
    const dispatch = useDispatch();
    const playlistObj = useSelector(state => state.playlists)
    const playlists = Object.values(playlistObj)
    console.log(playlists)

    useEffect(() => {
        dispatch(loadPlaylistsThunk())
    }, [dispatch])

    return (
        <div className="playlists">
            <h2>Tunafy Playlists</h2>
            <div className="list">
                {playlists.map((playlist) => (
                    <div className="item" key={playlist.id}>
                        {/* <img src={} /> */}
                        <div className="play">
                            <span className="fa fa-play" style={{color: "white"}}></span>
                        </div>
                        <h4>Today&apos;s Top Hits</h4>
                        <p>Jack Harlow is on top of the Hottest 50!</p>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default AllPlaylists;
