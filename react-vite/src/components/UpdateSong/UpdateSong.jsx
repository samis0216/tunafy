import { useNavigate, useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import '../CreateSong/CreateSong.css'
import { useDispatch, useSelector } from "react-redux"
import { editSongThunk } from "../../redux/songs"
import { loadOneSongThunk } from "../../redux/songs"

export default function UpdateSong() {
    // const history = useHistory()
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const id = useParams().songId
    console.log(id)

    const song = useSelector(state => state.songs?.[id])
    const [songName, setSongName] = useState(song?.song_name)
    useEffect(()=> {
        dispatch(loadOneSongThunk(id))
    }, [dispatch, songName, id])

    console.log(song)
    const [song_cover, setSongCover] = useState('')
    const [song_file, setSongFile] = useState('')
    const [awsLoading, setAwsLoading] = useState(false)
    const user = useSelector(state => state.session.user)

    const handleSubmit = async (e) => {
        e.preventDefault();
        const artistId = user.id
        console.log(artistId)
        const formData = new FormData();
        formData.append("song_name", songName)
        formData.append("artist_id", artistId)
        formData.append("song_cover_url", song_cover);
        formData.append("song_file_url", song_file);
        formData.append('duration', 260)
        // aws uploads can be a bit slow—displaying
        // some sort of loading message is a good idea
        setAwsLoading(true);
        await dispatch(editSongThunk(formData, song.id));
        navigate(`/songs/${song.id}`)
    }

    return (
        <div className="main-body" id="container">
            <h1>Update &quot;{song?.song_name}&quot;</h1>
            <form
                onSubmit={handleSubmit}
                encType="multipart/form-data"
                className="form-body"
            >
                <div className="entry-container">
                    <h4>Song Name</h4>
                    <input
                        type="text"
                        placeholder={song ? song.song_name : "Song Name"}
                        value={songName}
                        onChange={(e) => setSongName(e.target.value)}
                        className="song-inputs"
                    />
                </div>
                <div className="entry-container">
                    <h4>Cover Photo</h4>
                    <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => {
                            setSongCover(e.target.files[0])
                            console.log(e.target.files[0])
                            }
                        }
                    />
                </div>
                <div className="entry-container">
                    <h4>Song File</h4>
                    <input
                        type="file"
                        accept="audio/*"
                        onChange={(e) => setSongFile(e.target.files[0])}
                    />
                </div>
                <div>
                    <button type="submit" id="submit_butt">Update song</button>
                </div>
                {(awsLoading) && <p style={{alignSelf: "center"}}>Loading...</p>}
            </form>
        </div>
    )
}
