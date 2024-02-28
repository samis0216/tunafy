const LOAD_SONGS = 'song/loadSongs';
const LOAD_ALBUM_SONGS = 'album/loadAlbumSongs';
const ADD_SONG = 'song/addSong';
const EDIT_SONG = 'song/editSong';
const DELETE_SONG = 'song/deleteSong';
const LOAD_PLAYLIST_SONGS = 'playlist/loadPlaylistSongs';
const LOAD_ONE_SONG = 'song/loadOneSong'

// ACTION CREATORS
const loadSongs = (songs) => {
    return {
        type: LOAD_SONGS,
        songs
    }
}

const loadOneSong = (song) => {
    return {
        type: LOAD_ONE_SONG,
        song
    }
}

const loadPlaylistSongs = (songs) => {
    return {
        type: LOAD_PLAYLIST_SONGS,
        songs
    }
}
const loadAlbumSongs = (songs) => {
    return {
        type: LOAD_ALBUM_SONGS,
        songs
    }
}

const addSong = (song) => {
    return {
        type: ADD_SONG,
        song
    }
}

const editSong = (song) => {
    return {
        type: EDIT_SONG,
        song,
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

export const loadOneSongThunk = (songId) => async(dispatch) => {
    const res = await fetch(`/api/songs/${songId}`)

    if (res.ok) {
        const data = await res.json()
        dispatch(loadOneSong(data))
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

export const loadAlbumSongsThunk = (albumId) => async (dispatch) => {
    const res = await fetch(`/api/albums/${albumId}/songs`)

    if (res.ok) {
        const data = await res.json();
        dispatch(loadAlbumSongs(data))
        return data
    }
}

export const addSongThunk = (song) => async(dispatch) => {
    const res = await fetch('/api/songs/new', {
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
    const res = await fetch(`/api/songs/${songId}/update`, {
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
    console.log(songId)
    const res = await fetch(`/api/songs/${songId}`, {
        method: "DELETE",
        body: songId
    })

    if (res.ok) {
        const data = await res.json()
        dispatch(deleteSong(songId))
        return data
    }

}

const initialState = {}

const songReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOAD_SONGS: {
            const newState = {};
            let counter = 1
            action.songs.songs.forEach(song => {
                newState[counter] = song
                counter++
            })
            return newState;
        }
        case LOAD_ONE_SONG: {
            const newState = {}
            newState[action.song.id] = action.song
            return newState
        }
        case LOAD_PLAYLIST_SONGS: {
            const newState = {  };
            newState.songs = {}
            action.songs.playlist_songs.forEach(song => {
                newState.songs[song.id] = song
            })
            return newState;
        }
        case LOAD_ALBUM_SONGS: {
            const newState = {  };
            let counter = 1
            action.songs.songs.forEach(song => {
                newState[counter] = song
                counter++
            })
            return newState;
        }
        case ADD_SONG: {
            const newState = { }
            newState[action.song.id] = action.song
            return newState;
        }
        case EDIT_SONG: {
            // const newState = {}
            // newState[action.song.id] = action.song
            const newState = {...state, [action.song.id]: action.song}
            return newState;
        }
        case DELETE_SONG: {
            const newState = {...state}
            delete newState[action.songId]
            return newState;
        }
        default:
            return state
    }
}

export default songReducer
