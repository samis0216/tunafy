import { useNavigate } from "react-router-dom"
import { useState } from "react"
import './CreateSong.css'
import { useDispatch, useSelector } from "react-redux"

export default function CreateSong() {
    // const history = useHistory()
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [songName, setSongName] = useState('')
    const [song_cover, setSongCover] = useState('')
    const [song_file, setSongFile] = useState('')
    const [awsLoading, setAwsLoading] = useState(false)
    const user = useSelector(state => state.session.user)
    const artistId = user.id

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("song_name", songName)
        formData.append("artist_id", artistId)
        formData.append("song_cover", song_cover);
        formData.append("song_file", song_file);
        // aws uploads can be a bit slow—displaying
        // some sort of loading message is a good idea
        setAwsLoading(true);
        // await dispatch(createPost(formData));
        // navigate('/')
    }

    return (
        <div className="main-body" id="container">
            <h1>Create a song</h1>
            <form
                onSubmit={handleSubmit}
                encType="multipart/form-data"
                className="form-body"
            >
                <div className="entry-container">
                    <h4>Song Name</h4>
                    <input
                        type="text"
                        placeholder="Song Name"
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
                    <button type="submit" id="submit_butt">Create song</button>
                </div>
                {(awsLoading) && <p style={{alignSelf: "center"}}>Loading...</p>}
            </form>
        </div>
    )
}
