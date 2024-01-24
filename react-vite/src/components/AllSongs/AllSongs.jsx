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
            <div>
                <h1>All Songs</h1>
                {/* <button><i></i></button> ADD PLAY ICON */}
            </div>
            <div>
                {
                    keys.map((id) => (
                        <SongTile key={id} song={songs[id]} albums={albums} />
                    ))
                }
            </div>
        </div>
    )
}
