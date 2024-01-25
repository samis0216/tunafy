const LOAD_ALBUMS = 'album/loadAlbums';
const LOAD_ONE_ALBUM = 'album/loadOneAlbum';
const ADD_ALBUM = 'album/addAlbum';
const EDIT_ALBUM = 'album/editAlbum';
const DELETE_ALBUM = 'album/deleteAlbum';

// ACTION CREATORS
const loadAlbums = (albums) => {
    return {
        type: LOAD_ALBUMS,
        albums
    }
}

const loadOneAlbum = (album) => {
    return {
        type: LOAD_ONE_ALBUM,
        album
    }
}

const addAlbum = (album) => {
    return {
        type: ADD_ALBUM,
        album
    }
}

const editAlbum = (albumId) => {
    return {
        type: EDIT_ALBUM,
        albumId
    }
}

const deleteAlbum = (albumId) => {
    return {
        type: DELETE_ALBUM,
        albumId
    }
}

// THUNK ACTION CREATORS

export const loadAlbumsThunk = () => async(dispatch) => {
    const res = await fetch('/api/albums')

    if (res.ok) {
        const data = await res.json();
        dispatch(loadAlbums(data))
        return data
    }

}

export const loadOneAlbumThunk = (albumId) => async (dispatch) => {
    const res = await fetch(`/albums/${albumId}`)

    if (res.ok) {
        const data = await res.json();
        dispatch(loadOneAlbum(data))
        return data
    }
}

export const addAlbumThunk = (album) => async(dispatch) => {
    const res = await fetch('/api/albums/new', {
        method: "POST",
        body: album
    })

    if (res.ok) {
        const data = await res.json()
        dispatch(addAlbum(data))
        return data
    }

}

export const editAlbumThunk = (album, albumId) => async(dispatch) => {
    const res = await fetch(`/api/albums/${albumId}`, {
        method: "PUT",
        body: album
    })

    if (res.ok) {
        const data = await res.json()
        dispatch(editAlbum(data))
        return data
    }
}

export const deleteAlbumsThunk = (albumId) => async(dispatch) => {
    const res = await fetch(`/api/albums/${albumId}`, {
        method: "DELETE"
    })

    if (res.ok) {
        dispatch(deleteAlbum(albumId))
    }

}

const initialState = {}

const albumReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOAD_ALBUMS: {
            const newState = {...state};
            action.albums.albums.forEach(album => {
                newState[album.id] = album
            })
            return newState;
        }
        case LOAD_ONE_ALBUM: {
            const newState = { ...state };
            newState[action.album.id] = action.album
            return newState;
        }
        case ADD_ALBUM: {
            const newState = { ...state, [action.album.id]: action.album }
            return newState;
        }
        case EDIT_ALBUM: {
            const newState = { ...state, [action.album.id]: action.album }
            return newState;
        }
        case DELETE_ALBUM: {
            const newState = { ...state };
            delete newState[action.albumId]
            return newState;
        }
        default:
            return state
    }
}

export default albumReducer
