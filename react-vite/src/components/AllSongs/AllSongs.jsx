import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loadSongsThunk } from "../../redux/songs";
import { loadAlbumsThunk } from "../../redux/albums";
import SongTile from "./SongTile";
import './AllSongs.css'


export default function AllSongs() {
    const navigate = useNavigate()
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(loadSongsThunk())
        dispatch(loadAlbumsThunk())
    }, [dispatch])
    const songs = useSelector(state => state.songs)
    const albums = useSelector(state => state.albums)
    const keys = Object.keys(songs)

    return (
        <div className="page-container">
            <div className="songs-header" style={{width: 1050}}>
                <h1>All Songs</h1>
                {/* <button><i></i></button> ADD PLAY ICON */}
            </div>
            <div className="song-tile-header" style={{paddingTop: 30}}>
                <div id='pic2' onClick={() => setClicked(true)}>
                    <p style={{ width: 10 }}>#</p>
                    <div className='song-items'>
                        <p>Name</p>
                    </div>
                </div>
                <p>Album</p>
                <p>Duration</p>
            </div>
            <div className="song-tiles-container">
                <hr />
                {
                    keys.map((id) => (
                        <SongTile key={id} song={songs[id]} albums={albums} />
                    ))
                }
            </div>
        </div>
    )
}
