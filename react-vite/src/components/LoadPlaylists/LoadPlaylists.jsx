import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { loadPlaylistsThunk } from "../../redux/playlists"


const AllPlaylists = () => {
    const dispatch = useDispatch();
    const playlistObj = useSelector(state => state.playlists)
    const playlists = Object.values(playlistObj)

    useEffect(() => {
        dispatch(loadPlaylistsThunk())

    }, [dispatch])

    return (
        <div>
            
        </div>
    )


}