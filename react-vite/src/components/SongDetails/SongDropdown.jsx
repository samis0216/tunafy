import { useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import OpenModalMenuItem from "../Navigation/OpenModalMenuItem";
import DeleteSongModal from "../SongModals/DeleteSongModal";
// import { Link } from "react-router-dom";
import "./SongDropdown.css"
import { useNavigate } from "react-router-dom";

function SongDropdown({ song }) {
    const navigate = useNavigate()
    const [showMenu, setShowMenu] = useState(false);
    const user = useSelector((store) => store.session.user);
    const ulRef = useRef();

    const toggleMenu = (e) => {
        e.stopPropagation(); // Keep from bubbling up to document and triggering closeMenu
        setShowMenu(!showMenu);
    };

    useEffect(() => {
        if (!showMenu) return;

        const closeMenu = (e) => {
            if (ulRef.current && !ulRef.current.contains(e.target)) {
                setShowMenu(false);
            }
        };

        document.addEventListener("click", closeMenu);

        return () => document.removeEventListener("click", closeMenu);
    }, [showMenu]);

    const closeMenu = () => setShowMenu(false);

    const isOwner = song.artist_id == user.id;

    return (
        <>
            <span onClick={toggleMenu}>
                <i style={{ fontSize: 28 }} className="fa-solid fa-ellipsis playlist-icon"></i>
            </span>
            {showMenu && (
            <span className="playlist-dropdown" ref={ulRef}>
                {user && (
                <>
                <div className="playlist-delete-drop">
                    <i style={{ color: '#b3b3b3' }} className="fa-solid fa-square-plus bar-icon"></i>
                    <span className="album-dropdown-item" onClick={() => navigate(`/playlists`)}>Add to Playlist</span>
                </div>
                <div className="playlist-delete-drop">
                    <i style={{ color: '#b3b3b3' }} className="fa-solid fa-square-plus bar-icon"></i>
                    <span className="album-dropdown-item" onClick={() => navigate(`/albums`)}>Add to Album</span>
                </div>
            {isOwner && (
                <>
                <div className="playlist-delete-drop">
                    <i className="fa-solid fa-pen"></i>
                    <span className="album-dropdown-item" onClick={() => navigate(`/songs/${song.id}/update`)}>Update</span>
                </div>
                <div className="playlist-delete-drop">
                    <i className="fa-solid fa-circle-minus"></i>
                    <span className="album-dropdown-item">
                        <OpenModalMenuItem
                            itemText="Delete"
                            onItemClick={closeMenu}
                            modalComponent={<DeleteSongModal song={song}/>}/>
                    </span>
                </div>
                </>
            )}
                </>
                )}
            </span>
            )}
        </>
        // <>
        // <button className="drop-down-button" onClick={toggleMenu}>
        //     <i style={{ fontSize: 30 }} className="fa-solid fa-ellipsis playlist-icon"></i>
        // </button>
        // {showMenu && (
        //     <ul className="song-dropdown" ref={ulRef}>
        //         <>
        //             <div className='menu-links'><Link style={{ textDecoration: 'none', color: "white" }}>Add to Playlist</Link></div>
        //             {!album && <div><Link style={{ textDecoration: 'none', color: "white" }}>Add to an Album</Link></div>}
        //             <div className="menu-links"><Link style={{ textDecoration: 'none', color: "white" }} to={`/songs/${song.id}/update`}>Update</Link></div>
        //             <span className="button-divider">
        //                 <OpenModalMenuItem
        //                     itemText="Delete" onItemClick={closeMenu} modalComponent={<DeleteSongModal song={song} />} />
        //             </span>
        //         </>
        //     </ul>
        // )}
        // </>
    );
}

export default SongDropdown;
