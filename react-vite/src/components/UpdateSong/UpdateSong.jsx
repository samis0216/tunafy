import { useNavigate, useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import '../CreateSong/CreateSong.css'
import { useDispatch, useSelector } from "react-redux"
import { editSongThunk } from "../../redux/songs"
import { loadOneSongThunk } from "../../redux/songs"

export default function UpdateSong() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const id = useParams().songId
    const user = useSelector(state => state.session.user)
    const song = useSelector(state => state.songs?.[id])
    const [songName, setSongName] = useState(song?.song_name)
    const [song_cover, setSongCover] = useState(null)
    const [displayImage, setDisplayImage] = useState(null)
    const [song_file, setSongFile] = useState(null)
    // const [displayFile, setDisplayFile] = useState(null)
    const [awsLoading, setAwsLoading] = useState(false)
    const [errors, setErrors] = useState({})
    const [clicked, setClicked] = useState(false)

    if(!user) navigate('/')

    useEffect(() => {
        const newErrors = {};
        if (!String(songName).length) {
            newErrors.songName = 'Name is required.'
        }
        setErrors(newErrors);
    }, [songName])

    useEffect(()=> {
        dispatch(loadOneSongThunk(id))
    }, [dispatch, id])

    useEffect(() => {
        if (song) {
            setSongName(song?.song_name || '')
            setDisplayImage(song?.song_cover_url || '')
            setSongFile(song?.song_file_url || '')
        }
    }, [song])

    const fileWrap = (e) => {
        e.stopPropagation();

        const tempFile = e.target.files[0];

        const newImageURL = URL.createObjectURL(tempFile); // Generate a local URL to render the image file inside of the <img> tag.
        setSongCover(tempFile);
        setDisplayImage(newImageURL)
    }

    // const fileWrapFile = (e) => {
    //     e.stopPropagation()

    //     const tempFile = e.target.files[0];

    //     setSongFile(tempFile);
    //     setDisplayFile(tempFile?.name)
    // }

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!Object.values(errors).length) {
            const artistId = user.id
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
    }

    return (
        <div className="song-main">
            <div className="create-song-box">
                <h1 style={{paddingBottom: 20}}>Update &quot;{song?.song_name}&quot;</h1>
                <form
                    onSubmit={handleSubmit}
                    encType="multipart/form-data"
                    className="form-body"
                >
                    <div className="entry-container">
                        <p>Song Name</p>
                        <input
                            type="text"
                            // placeholder={song ? song.song_name : "Song Name"}
                            value={songName}
                            onChange={(e) => setSongName(e.target.value)}
                            className="song-inputs"
                        />
                        <div style={{minHeight: 30}}>{errors.songName ? <span className="error-message">{errors.songName}</span> : ' '}</div>
                    </div>
                    <div className="entry-container">
                        <p>Update Cover Photo</p>
                        <p style={{fontSize: 13, paddingBottom: 10, paddingTop: 5}}>To update the cover photo, click the thumbnail below.</p>
                        <label className="image-input-label" htmlFor="update-image-input"><img className="thumbnail" src={displayImage}/><input
                            className="song-inputs"
                            id='update-image-input'
                            type="file"
                            accept="image/*"
                            onChange={fileWrap}
                        /></label>
                        <div style={{minHeight: 20, paddingTop: 10}}></div>
                    </div>
                    {/* <div className="entry-container">
                        <p style={{paddingTop: 8}}>Update Song File</p>
                        <p style={{fontSize: 13, paddingBottom: 10, paddingTop: 5}}>To update the song file, click the file below.</p>
                        <label className="song-file-label" htmlFor="update-song-file-input"><div className="song-file-input">{displayFile}</div><input
                            id='update-song-file-input'
                            type="file"
                            accept="audio/*"
                            // className="song-inputs"
                            onChange={fileWrapFile}
                        /></label>
                        <div style={{minHeight: 20}}></div>
                    </div> */}
                    <div className="entry-container">
                        <p style={{paddingTop: 8}}>Update Song File</p>
                        <p style={{fontSize: 13, paddingBottom: 10, paddingTop: 5}}>To update the song file, click the file below.</p>
                        {!clicked ? (
                            <>
                                <div className='song-file-input' onClick={() => setClicked(!clicked)}>
                                    <p>{`${song?.song_name}.mp3`}</p>
                                </div>
                                <div style={{minHeight: 20}}></div>
                            </>
                        ) : (
                            <>
                                <input
                                    type="file"
                                    accept="audio/*"
                                    className="song-inputs"
                                    onChange={(e) => setSongFile(e.target.files[0])}
                                />
                                <div style={{minHeight: 20}}></div>
                            </>
                        )}
                    </div>
                    <div className="update-button">
                        <button type="submit" id="submit_butt">Update Song</button>
                    </div>
                    <div style={{minHeight: 30}}>{awsLoading ? <p className="loading-text">Loading...</p> : ' '}</div>
                </form>
            </div>
        </div>
    )
}
