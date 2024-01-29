const LOAD_ALBUMS = 'album/loadAlbums';
const LOAD_ONE_ALBUM = 'album/loadOneAlbum';
const LOAD_USER_ALBUMS = 'album/loadUserAlbums'
const ADD_ALBUM = 'album/addAlbum';
const ADD_SONG_TO_ALBUM = 'album/addSongToAlbum'
const EDIT_ALBUM = 'album/editAlbum';
const DELETE_ALBUM = 'album/deleteAlbum';
const DELETE_FROM_ALBUM = 'album/deleteFromAlbum'

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

const loadUserAlbums = (albums) => {
    return {
        type: LOAD_USER_ALBUMS,
        albums
    }
}

const addAlbum = (album) => {
    return {
        type: ADD_ALBUM,
        album
    }
}

const addSongtoAlbum = (songs) => {
    return {
        type: ADD_SONG_TO_ALBUM,
        songs
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

const deleteFromAlbum = (album) => {
    return {
        type: DELETE_FROM_ALBUM,
        album
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
    const res = await fetch(`/api/albums/${albumId}`)

    if (res.ok) {
        const data = await res.json();
        dispatch(loadOneAlbum(data))
        return data
    }
}

export const loadUserAlbumsThunk = (userId) => async(dispatch) => {
    const res = await fetch(`/api/albums/current/${userId}`)

    if (res.ok) {
        const data = await res.json()
        dispatch(loadUserAlbums(data))
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

export const addSongToAlbumThunk = (songId, albumId) => async(dispatch) => {
    const res = await fetch(`/api/albums/${albumId}/add`, {
        method: 'PUT',
        body: songId
    })

    if (res.ok) {
        const data = await res.json()
        dispatch(addSongtoAlbum(data))
        return data
    }
}

export const editAlbumThunk = (album, albumId) => async(dispatch) => {
    const res = await fetch(`/api/albums/${albumId}/update`, {
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

export const deleteFromAlbumThunk = (songId, albumId) => async(dispatch) => {
    const res = await fetch(`/api/albums/${albumId}/remove`, {
        method: 'PUT',
        body: songId
    })
    if (res.ok) {
        const data = await res.json()
        dispatch(deleteFromAlbum(data))
        return data
    }
}

const initialState = {}

const albumReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOAD_ALBUMS: {
            const newState = { ...state };
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
        case LOAD_USER_ALBUMS: {
            const newState = {}
            action.albums.forEach((album)=> {
                newState[album.id] = album
            })
            return newState
        }
        case ADD_ALBUM: {
            const newState = { ...state, [action.album.id]: action.album }
            return newState;
        }
        case ADD_SONG_TO_ALBUM: {
            const newState = {}
            let counter = 1
            action.songs.forEach((song) => {
                newState[counter] = song
                counter++
            })
            return newState
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
        case DELETE_FROM_ALBUM: {
            const newState = {}
            newState[action.album.id] = action.album
            return newState
        }
        default:
            return state
    }
}

export default albumReducer
