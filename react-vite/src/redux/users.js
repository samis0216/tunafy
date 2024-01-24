const LOAD_USERS = "user/loadUsers"
const LOAD_USER_BY_ID = "user/loadUserById"

const loadUsers = users => {
    return {
        type: LOAD_USERS,
        users
    }
}

const loadUserById = user => {
    return {
        type: LOAD_USER_BY_ID,
        user
    }
}

export const loadUsersThunk = () => async(dispatch) => {
    const res = await fetch('/api/users')

    if (res.ok) {
        const data = await res.json();
        dispatch(loadUsers(data))
        return data
    }
}
export const loadUserByIdThunk = (user) => async(dispatch) => {
    const res = await fetch('/api/users/:userId')

    if (res.ok) {
        const data = await res.json();
        dispatch(loadUserById(data))
        return data
    }
}

const initialState = {}

const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOAD_USERS: {
            const newState = { ...state };
            action.users.users.forEach(user => {
                newState[user.id] = user
            })
            return newState;
        }
        case LOAD_USER_BY_ID: {
            const newState = { ...state, [action.user.id]: action.user }
            return newState;
        }
    }
}

export default userReducer
