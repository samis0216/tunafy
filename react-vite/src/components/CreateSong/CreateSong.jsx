import { useNavigate } from "react-router-dom"
import { useState, useEffect } from "react"
import './CreateSong.css'

export default function CreateSong() {
    // const history = useHistory()
    const navigate = useNavigate()
    const [songName, setSongName] = useState('')
    const [artistId, setArtistId] = useState()
    const [song_cover, setSongCover] = useState()
    const [song_file, setSongFile] = useState()
    const [awsLoading, setAwsLoading] = useState(false)

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("song_cover", song_cover);
        formData.append("song_file", song_file)
        // aws uploads can be a bit slow—displaying
        // some sort of loading message is a good idea
        setAwsLoading(true);
        await dispatch(createPost(formData));
        history.push("/songs");
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
                    <h4>Name</h4>
                    <input
                        type="text"
                        placeholder="Song Name"
                        value={songName}
                        onChange={(e) => setSongName(e.target.value)}
                    />
                </div>
                <div className="entry-container">
                    <h4>Cover Photo</h4>
                    <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => setSongCover(e.target.files[0])}
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
                {(awsLoading) && <p>Loading...</p>}
            </form>
        </div>
    )
}
