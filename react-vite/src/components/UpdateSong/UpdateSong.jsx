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

    const song = useSelector(state => state.songs?.[id])
    const [songName, setSongName] = useState(song?.song_name)
    useEffect(()=> {
        dispatch(loadOneSongThunk(id))
    }, [dispatch, songName, id])

    console.log(song)
    const [song_cover, setSongCover] = useState('')
    const [song_file, setSongFile] = useState('')
    const [clicked, setClicked] = useState(false);
    const [clicked2, setClicked2] = useState(false);
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
        <div className="song-main">
            <div className="create-song-box">
                <h1>Update &quot;{song?.song_name}&quot;</h1>
                <form
                    onSubmit={handleSubmit}
                    encType="multipart/form-data"
                    className="form-body"
                >
                    <div className="entry-container">
                        <p>Song Name</p>
                        <input
                            type="text"
                            placeholder={song ? song.song_name : "Song Name"}
                            value={songName}
                            onChange={(e) => setSongName(e.target.value)}
                            className="song-inputs"
                        />
                    </div>
                    <div className="entry-container">
                        {!clicked ? (
                            <div className="edit-song-image-container">
                                <p>Song Cover Photo</p>
                                <div className="edit-song-image-div">
                                    <p
                                    className="edit-form-x"
                                    onClick={() => setClicked(!clicked)}
                                    >&#10060;</p>
                                    <img className="edit-song-image" src={`${song?.song_cover_url}`} />
                                </div>
                            </div>
                        ) : (
                            <>
                                <p>Upload Cover Photo</p>
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={(e) => {
                                        setSongCover(e.target.files[0])
                                        }
                                    }
                                    className="song-inputs"
                                />
                            </>
                        )}
                        {/* <p>Upload Cover Photo</p>
                        <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => {
                                setSongCover(e.target.files[0])
                                }
                            }
                            className="song-inputs"
                        /> */}
                    </div>
                    <div className="entry-container">
                    {!clicked2 ? (
                            <div>
                                <p>Song song</p>
                                <div>
                                    <p
                                        className="edit-form-x2"
                                        onClick={() => setClicked2(!clicked2)}
                                    >&#10060;</p>
                                    <h1>{`${song?.song_name}`}</h1>
                                </div>
                            </div>
                        ) : (
                            <>
                                <p>Upload Song File</p>
                                <input
                                    type="file"
                                    accept="audio/*"
                                    className="song-inputs"
                                    onChange={(e) => setSongFile(e.target.files[0])}
                                />
                            </>
                        )}
                    </div>
                    <div className="update-button">
                        <button type="submit" id="submit_butt">Update Song</button>
                    </div>
                    {(awsLoading) && <p className="loading-text">Loading...</p>}
                </form>
            </div>
        </div>
    )
}
