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

const addLikeSong = (song) => {
    return {
        type: ADD_LIKE_SONG,
        song
    }
}

const removeLikeSong = (song) => {
    return {
        type: REMOVE_LIKE_SONG,
        song
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

const initialState = {}

const collectionReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOAD_LIKE_SONGS: {
            const newState = { ...state };
            let counter = 0
            action.songs.forEach(song => {
                newState[counter+1] = song
            })
            return newState;
        }
        default:
            return state
    }
}

export default collectionReducer
