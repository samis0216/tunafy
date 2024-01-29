// ACTION TYPES
const LOAD_PLAYLISTS = 'playlist/loadPlaylists';
const LOAD_ONE_PLAYLIST = 'playlist/loadOnePlaylist';
const LOAD_USER_PLAYLISTS ='playlist/loadUserPlaylists';
const ADD_PLAYLIST = 'playlist/addPlaylist';
const ADD_SONG_TO_PLAYLIST = 'playlist/addSongToPlaylist';
const EDIT_PLAYLIST = 'playlist/editPlaylist';
const DELETE_PLAYLIST = 'playlist/deletePlaylist';
const DELETE_FROM_PLAYLIST = 'playlist/deleteFromPlaylist';
// ACTION CREATORS
const loadPlaylists = (playlists) => {
    return {
        type: LOAD_PLAYLISTS,
        playlists
    }
}

const loadOnePlaylist = (playlist) => {
    return {
        type: LOAD_ONE_PLAYLIST,
        playlist
    }
}

const loadUserPlaylists = (playlists) => {
    return {
        type: LOAD_USER_PLAYLISTS,
        playlists
    }
}

const addPlaylist = (playlist) => {
    return {
        type: ADD_PLAYLIST,
        playlist
    }
}

const addSongToPlaylist = (song) => {
    return {
        type: ADD_SONG_TO_PLAYLIST,
        song
    }
}

const editPlaylist = (playlistId) => {
    return {
        type: EDIT_PLAYLIST,
        playlistId
    }
}

const deletePlaylist = (playlistId) => {
    return {
        type: DELETE_PLAYLIST,
        playlistId
    }
}

const deleteFromPlaylist = (playlist) => {
    return {
        type: DELETE_FROM_PLAYLIST,
        playlist
    }
}

// THUNK ACTION CREATORS

export const loadPlaylistsThunk = () => async(dispatch) => {
    const res = await fetch('/api/playlists')

    if (res.ok) {
        const data = await res.json();
        dispatch(loadPlaylists(data))
        return data
    }
}

export const loadOnePlaylistThunk = (playlistId) => async (dispatch) => {
    const res = await fetch(`/api/playlists/${playlistId}`)

    if (res.ok) {
        const data = await res.json();
        dispatch(loadOnePlaylist(data))
        return data
    }
}

export const loadUserPlaylistsThunk = (userId) => async (dispatch) => {
    const res = await fetch(`/api/playlists/${userId}/manage`)

    if (res.ok) {
        const data = await res.json();
        dispatch(loadUserPlaylists(data))
        return data
    }
}

export const addPlaylistThunk = (playlist) => async(dispatch) => {
    const res = await fetch('/api/playlists/new', {
        method: "POST",
        body: playlist
    })

    if (res.ok) {
        const data = await res.json()
        dispatch(addPlaylist(data))
        return data
    }
}

export const addSongToPlaylistThunk = (songId, playlistId) => async (dispatch) => {
    const res = await fetch(`/api/playlists/${playlistId}/add`, {
        method: "PUT",
        body: songId
    })

    if (res.ok) {
        const data = await res.json()
        console.log(data)
        dispatch(addSongToPlaylist(data))
        return data
    }
}

export const editPlaylistThunk = (playlist, playlistId) => async(dispatch) => {
    const res = await fetch(`/api/playlists/${playlistId}`, {
        method: "PUT",
        body: playlist
    })

    if (res.ok) {
        const data = await res.json()
        dispatch(editPlaylist(data))
        return data
    }
}

export const deletePlaylistThunk = (playlistId) => async(dispatch) => {
    const res = await fetch(`/api/playlists/${playlistId}`, {
        method: "DELETE"
    })

    if (res.ok) {
        dispatch(deletePlaylist(playlistId))
    }
}

export const deleteFromPlaylistThunk = (songId, playlistId) => async(dispatch) => {
    const res = await fetch(`/api/playlists/${playlistId}/remove`, {
        method: 'DELETE',
        body: songId
    })
    if (res.ok) {
        const data = await res.json()
        dispatch(deleteFromPlaylist(data))
        return data
    }
    const data = await res.json()
    console.log(data)
}

const initialState = {}

const playlistReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOAD_PLAYLISTS: {
            const newState = { };
            action.playlists.playlists.forEach(playlist => {
                newState[playlist.id] = playlist
            });
            return newState;
        }
        case LOAD_ONE_PLAYLIST: {
            const newState = { };
            newState[action.playlist.id] = action.playlist
            return newState;
        }
        case LOAD_USER_PLAYLISTS: {
            const newState = {  };
            action.playlists.playlists.forEach(playlist => {
                newState[playlist.id] = playlist
            });
            return newState;
        }
        case ADD_PLAYLIST: {
            const newState = { ...state, [action.playlist.id]: action.playlist}
            return newState;
        }
        case ADD_SONG_TO_PLAYLIST: {
            const newState = { }
            let counter = 1
            action.song.forEach((song) => {
                newState[counter] = song
                counter++
            })
            return newState
        }
        case EDIT_PLAYLIST: {
            const newState = { ...state, [action.playlist.id]: action.playlist}
            return newState;
        }
        case DELETE_PLAYLIST: {
            const newState = { ...state };
            delete newState[action.playlistId]
            return newState;
        }
        case DELETE_FROM_PLAYLIST: {
            const newState = { ...state }
            newState[action.playlist.id] = action.playlist
            return newState
        }
        default:
            return state
    }
}

export default playlistReducer
