import { useNavigate } from "react-router-dom"
import { useState, useEffect } from "react"
import './CreateSong.css'
import { useDispatch, useSelector } from "react-redux"
import { addSongThunk } from "../../redux/songs"

export default function CreateSong() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [songName, setSongName] = useState('')
    const [song_cover, setSongCover] = useState('')
    const [song_file, setSongFile] = useState('')
    const [awsLoading, setAwsLoading] = useState(false)
    const user = useSelector(state => state.session.user)
    const [errors, setErrors] = useState({})
    const [submitted, setSubmitted] = useState(false)

    if(!user) navigate('/')

    useEffect(() => {
        const newErrors = {};
        if (!songName.length) {
            newErrors.songName = 'Name is required.'
        }
        if (song_cover === '' || (!song_cover?.name.endsWith('.jpeg') && !song_cover?.name.endsWith('.jpg') && !song_cover?.name.endsWith('.png') && !song_cover?.name.endsWith('.pdf') && !song_cover?.name.endsWith('.gif'))) {
            newErrors.song_cover_url = 'Cover photo must be in .jpeg, .jpg, .pdf, .png or .gif format.'
        }
        if (song_file === '' || !song_file.name.endsWith('.mp3')) {
            newErrors.song_file = 'Song is required and must be in .mp3 format.'
        }
        setErrors(newErrors);
    }, [songName, song_cover, song_file])

    const handleSubmit = async (e) => {
        e.preventDefault();

        setSubmitted(true)

        if (!Object.values(errors).length) {
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
    }

    return (
        <div className="song-main">
            <div className="create-song-box">
                <h1 style={{paddingBottom: 20}}>Create a song</h1>
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
                        <div style={{minHeight: 30}}>{errors.songName ? <span className="error-message">{errors.songName}</span> : ' '}</div>
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
                        <div style={{minHeight: 30}}>{errors.song_cover_url ? <span className="error-message">{errors.song_cover_url}</span> : ' '}</div>
                    </div>
                    <div className="entry-container">
                        <p>Upload Song File</p>
                        <input
                            type="file"
                            accept="audio/*"
                            className="song-inputs"
                            onChange={(e) => setSongFile(e.target.files[0])}
                        />
                        <div style={{minHeight: 30}}>{errors.song_file ? <span className="error-message">{errors.song_file}</span> : ' '}</div>
                    </div>
                    <div className="update-button">
                        <button type="submit" id="submit_butt">Create Song</button>
                    </div>
                    <div style={{minHeight: 30}}>{awsLoading ? <p className="loading-text">Loading...</p> : ' '}</div>
                </form>
            </div>
        </div>
    )
}
