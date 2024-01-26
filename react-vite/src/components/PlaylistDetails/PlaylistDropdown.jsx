import { useSelector } from "react-redux";
import { useState, useEffect, useRef } from "react";
import OpenModalMenuItem from "../Navigation/OpenModalMenuItem";
import DeletePlaylistModal from "../DeletePlaylistModal/DeletePlaylistModal";
import './PlaylistDropdown.css'

export default function PlaylistDropdown({playlistId}) {
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
            <span onClick={toggleMenu}>
                <i style={{ fontSize: 28 }} className="fa-solid fa-ellipsis playlist-icon"></i>
            </span>
            {showMenu && (
            <span className="playlist-dropdown" ref={ulRef}>
                {user && (
                <div className="playlist-delete-drop">
                    <i className="fa-solid fa-circle-minus"></i>
                    <span className="playlist-delete">
                        <OpenModalMenuItem
                            itemText="Delete"
                            onItemClick={closeMenu}
                            modalComponent={<DeletePlaylistModal playlistId={playlistId}/>}/>
                    </span>
                </div>
                )}
            </span>
            )}
        </>
    );
}
