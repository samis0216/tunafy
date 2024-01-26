import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { thunkLogout } from "../../redux/session";
import OpenModalMenuItem from "../Navigation/OpenModalMenuItem";
import DeleteSongModal from "../SongModals/DeleteSongModal";
import { Link } from "react-router-dom";
import "./SongDropdown.css"

function SongDropdown({song, album}) {
    const dispatch = useDispatch();
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

    return (
        <>
            <button className="drop-down-button" onClick={toggleMenu}>
                <i style={{ fontSize: 30 }} className="fa-solid fa-ellipsis playlist-icon"></i>
            </button>
            {showMenu && (
                <ul className="song-dropdown" ref={ulRef}>
                    {user ? (
                        <>
                            <div className='menu-links'><Link style={{textDecoration: 'none', color: "white"}}>Add to Playlist</Link></div>
                            {!album && <div><Link style={{textDecoration: 'none', color: "white"}}>Add to an Album</Link></div>}
                            <div className="menu-links"><Link style={{textDecoration: 'none', color: "white"}} to={`/songs/${song.id}/update`}>Update</Link></div>
                            <span className="button-divider">
                                <OpenModalMenuItem
                                itemText="Delete" onItemClick={closeMenu} modalComponent={<DeleteSongModal song={song}/>}/>

                            </span>
                        </>
                    ) : (
                        <>
                            <OpenModalMenuItem
                                itemText=""
                                onItemClick={closeMenu}
                                modalComponent={<LoginFormModal />}
                            />
                            <OpenModalMenuItem
                                itemText="Sign Up"
                                onItemClick={closeMenu}
                                modalComponent={<SignupFormModal />}
                            />
                        </>
                    )}
                </ul>
            )}
        </>
    );
}

export default SongDropdown;
