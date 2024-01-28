const LOAD_LIKE_SONGS = 'collection/loadLikeSongs'
const ADD_LIKE_SONG = 'collection/addLikeSong'
const REMOVE_LIKE_SONG = 'collection/removeLikeSong'
const CHECK_LIKED_IDS = 'collection/checkedLikedIds'


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

const checkedLikedIds = (song) => {
    return {
        type: CHECK_LIKED_IDS,
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

export const checkedLikedIdsThunk = (userId, songId) => async(dispatch) => {
    const res = await fetch(`/api/collection/${userId}/liked/${songId}`)

    if (res.ok) {
        const data = await res.json()
        dispatch(checkedLikedIds(data))
        return data
    } else {
        dispatch(checkedLikedIds([]))
        return []
    }
}

const initialState = {}

const collectionReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOAD_LIKE_SONGS: {
            const newState = {};
            let counter = 1
            action.songs.forEach(song => {
                newState[counter] = song
                counter++
            })
            return newState;
        }
        case CHECK_LIKED_IDS: {
            const newState = {}
            if (!action.song) return newState
            newState[action.song?.song_id] = action.song
            return newState
        }
        case ADD_LIKE_SONG: {
            const newState ={};
            newState[action.songLike.id] = action.songLike
            return newState
        }
        case REMOVE_LIKE_SONG: {
            const newState = {}
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
