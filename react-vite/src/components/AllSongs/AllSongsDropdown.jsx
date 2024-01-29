import { useSelector } from "react-redux";
import { useState, useEffect, useRef } from "react";
import './AllSongsDropdown.css'
import { useNavigate } from "react-router-dom";

export default function AllSongsDropdown() {
    const [showMenu, setShowMenu] = useState(false);
    const navigate = useNavigate()
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

    return (
        <>
            <span onClick={toggleMenu}>
                <i style={{ fontSize: 28 }} className="fa-solid fa-ellipsis playlist-icon"></i>
            </span>
            {showMenu && (
            <span className="playlist-dropdown" style={{left: 402}} ref={ulRef}>
                {user && (
                <>
                <div className="playlist-delete-drop">
                    <i style={{ color: '#b3b3b3' }} className="fa-solid fa-square-plus bar-icon"></i>
                    <span className="album-dropdown-item" onClick={() => navigate(`/songs/new`)}>Create</span>
                </div>
                </>
                )}
            </span>
            )}
        </>
    );
}
