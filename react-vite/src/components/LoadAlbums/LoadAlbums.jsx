import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const AllAlbums = () => {
    const dispatch = useDispatch()
    const albumObj = useSelector(state => state.albums)
    const albums = Object.values(albumObj)
}