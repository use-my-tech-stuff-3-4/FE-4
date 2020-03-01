import { FETCH_DATA, UPDATE_OWNER_ITEMS, SET_ERROR } from '../actions';

const initialState = {
    username: "",
    password: "",
    type: "",
    id: 0,
    items: [],
    isFetchingData: false,
    error: "",
    credentials: {
        username: username,
        password: password
    }
}

export const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_DATA:
            return {
                ...state,
                isFetchingData: true
            };
        case UPDATE_OWNER_ITEMS:
            return {
                ...state,
                items: action.payload,
                isFetchingData: false
            };
        case SET_ERROR:
            return {
                ...state,
                error: action.payload,
                isFetchingData: false
            }
        default:
            return state;
    }
}