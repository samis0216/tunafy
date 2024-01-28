const LOAD_LIKE_SONGS = 'collection/loadLikeSongs'
const ADD_LIKE_SONG = 'collection/addLikeSong'
const REMOVE_LIKE_SONG = 'collection/removeLikeSong'


// ACTION CREATORS
const loadLikedSongs = (songs) => {
    return {
        type: LOAD_LIKE_SONGS,
        songs
    }
}

const addLikeSong = (songLike) => {
    return {
        type: ADD_LIKE_SONG,
        songLike
    }
}

const removeLikeSong = (songs) => {
    return {
        type: REMOVE_LIKE_SONG,
        songs
    }
}

export const loadLikedSongsThunk = (userId) => async(dispatch) => {
    const res = await fetch(`/api/collection/${userId}/tracks`)

    if (res.ok) {
        const data = await res.json()
        dispatch(loadLikedSongs(data))
        return data
    }
}

export const addLikedSongsThunk = (userId, songId) => async(dispatch) => {
    const res = await fetch(`/api/collection/${userId}/new`, {
        method: 'POST',
        body: songId
    })

    if (res.ok) {
        const data = await res.json()
        dispatch(addLikeSong(data))
        return data
    }
}

export const removeLikedSongsThunk = (userId, songId) => async(dispatch) => {
    const res = await fetch(`/api/collection/${userId}/delete`, {
        method: 'DELETE',
        body: songId
    })

    if (res.ok) {
        const data = await res.json()
        dispatch(removeLikeSong(data))
        return data
    }
}

const initialState = {}

const collectionReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOAD_LIKE_SONGS: {
            const newState = { ...state };
            let counter = 1
            action.songs.forEach(song => {
                newState[counter] = song
                counter++
            })
            return newState;
        }
        case ADD_LIKE_SONG: {
            const newState ={ ...state};
            return newState
        }
        case REMOVE_LIKE_SONG: {
            const newState = { ...state }
            let counter = 1
            action.songs.forEach(song => {
                newState[counter] = song
                counter++
            })
            return newState
        }
        default:
            return state
    }
}

export default collectionReducer
