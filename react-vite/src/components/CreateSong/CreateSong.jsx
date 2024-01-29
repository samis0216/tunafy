import { useNavigate } from "react-router-dom"
import { useState } from "react"
import './CreateSong.css'
import { useDispatch, useSelector } from "react-redux"
import { addSongThunk } from "../../redux/songs"

export default function CreateSong() {
    // const history = useHistory()
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [songName, setSongName] = useState('')
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
        const newSong = await dispatch(addSongThunk(formData));
        navigate(`/songs/${newSong.id}`)
    }

    return (
        <div className="song-main">
            <div className="create-song-box">
                <h1>Create a song</h1>
                <form
                    onSubmit={handleSubmit}
                    encType="multipart/form-data"
                    className="form-body"
                >
                    <div className="entry-container">
                        <p>Song Name</p>
                        <input
                            type="text"
                            value={songName}
                            onChange={(e) => setSongName(e.target.value)}
                            className="song-inputs"
                        />
                    </div>
                    <div className="entry-container">
                        <p>Upload Cover Photo</p>
                        <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => {
                                setSongCover(e.target.files[0])
                                console.log(e.target.files[0])
                                }
                            }
                            className="song-inputs"
                        />
                    </div>
                    <div className="entry-container">
                        <p>Upload Song File</p>
                        <input
                            type="file"
                            accept="audio/*"
                            className="song-inputs"
                            onChange={(e) => setSongFile(e.target.files[0])}
                        />
                    </div>
                    <div className="update-button">
                        <button type="submit" id="submit_butt">Create Song</button>
                    </div>
                    {(awsLoading) && <p className="loading-text">Loading...</p>}
                </form>
            </div>
        </div>
    )
}
