const LOAD_SONGS = 'song/loadSongs';
const ADD_SONG = 'song/addSong';
const EDIT_SONG = 'song/editSong';
const DELETE_SONG = 'song/deleteSong';

// ACTION CREATORS
const loadSongs = (songs) => {
    return {
        type: LOAD_SONGS,
        songs
    }
}

const addSong = (song) => {
    return {
        type: ADD_SONG,
        song
    }
}

const editSong = (songId) => {
    return {
        type: EDIT_SONG,
        songId
    }
}

const deleteSong = (songId) => {
    return {
        type: DELETE_SONG,
        songId
    }
}

// THUNK ACTION CREATORS

export const loadSongsThunk = () => async(dispatch) => {
    const res = await fetch('/api/songs')

    if (res.ok) {
        const data = await res.json();
        dispatch(loadSongs(data))
        return data
    }

}

export const addSongThunk = (song) => async(dispatch) => {
    const res = await fetch('/api/songs', {
        method: "POST",
        body: song
    })

    if (res.ok) {
        const data = await res.json()
        dispatch(addSong(data))
        return data
    }

}

export const editSongThunk = (song, songId) => async(dispatch) => {
    const res = await fetch(`/api/songs/${songId}`, {
        method: "PUT",
        body: song
    })

    if (res.ok) {
        const data = await res.json()
        dispatch(editSong(data))
        return data
    }
}

export const deleteSongThunk = (songId) => async(dispatch) => {
    const res = await fetch(`/api/songs/${songId}`, {
        method: "DELETE"
    })

    if (res.ok) {
        dispatch(deleteSong(songId))
    }

}

const initialState = {}

const songReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOAD_SONGS: {
            const newState = { ...state };
            action.songs.songs.forEach(song => {
                newState[song.id] = song
            })
            return newState;
        }
        case ADD_SONG: {
            const newState = { ...state, [action.song.id]: action.song }
            return newState;
        }
        case EDIT_SONG: {
            const newState = { ...state, [action.song.id]: action.song }
            return newState;
        }
        case DELETE_SONG: {
            const newState = { ...state };
            delete newState[action.songId]
            return newState;
        }
        default:
            return state
    }
}

export default songReducer
