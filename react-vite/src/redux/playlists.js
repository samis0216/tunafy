// ACTION TYPES
const LOAD_PLAYLISTS = 'playlist/loadPlaylists';
const LOAD_ONE_PLAYLIST = 'playlist/loadOnePlaylist';
const LOAD_PLAYLIST_SONGS = 'playlist/loadPlaylistSongs';
const ADD_PLAYLIST = 'playlist/addPlaylist';
const EDIT_PLAYLIST = 'playlist/editPlaylist';
const DELETE_PLAYLIST = 'playlist/deletePlaylist';

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

const loadPlaylistSongs = (songs) => {
    return {
        type: LOAD_PLAYLIST_SONGS,
        songs
    }
}

const addPlaylist = (playlist) => {
    return {
        type: ADD_PLAYLIST,
        playlist
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

export const loadPlaylistSongsThunk = (playlistId) => async (dispatch) => {
    const res = await fetch(`/api/playlists/${playlistId}/songs`)

    if (res.ok) {
        const data = await res.json();
        dispatch(loadPlaylistSongs(data))
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

const initialState = {}

const playlistReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOAD_PLAYLISTS: {
            const newState = { ...state };
            action.playlists.playlists.forEach(playlist => {
                newState[playlist.id] = playlist
            });
            return newState;
        }
        case LOAD_ONE_PLAYLIST: {
            const newState = { ...state };
            newState[action.playlist.id] = action.playlist
            return newState;
        }
        case LOAD_PLAYLIST_SONGS: {
            const newState = { ...state };
            newState.songs = {}
            action.songs.playlist_songs.forEach(song => {
                newState.songs[song.id] = song
            })
            return newState;
        }
        case ADD_PLAYLIST: {
            const newState = { ...state, [action.playlist.id]: action.playlist}
            return newState;
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
        default:
            return state
    }
}

export default playlistReducer
