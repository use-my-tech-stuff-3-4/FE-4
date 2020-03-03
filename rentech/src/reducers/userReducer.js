import {
    POST_DATA, SET_ERROR, GET_ALL_USERS, SET_CURRENT_USER, LOGIN_USER
} from '../actions';

const initialState = {
    userData: {
        id: 0,
        username: "",
        type: "",
        items: []
    },
    allUsers: [],
    isFetchingData: false,
    isPostingData: false,
    error: ""
}

export const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_ALL_USERS:
            return {
                ...state,
                isFetchingData: true,
                allUsers: action.payload
            }
        case LOGIN_USER:
            return {
                ...state,
                isFetchingData: false,
                userData: action.payload
            }
        case SET_ERROR:
            return {
                ...state,
                isFetchingData: false,
                error: action.payload
            }
        case POST_DATA:
            return {
                ...state,
                isPostingData: action.payload
            }

        case SET_CURRENT_USER:
            return {
                ...state,
                userData: action.payload
            }
        default:
            return state;
    }
}