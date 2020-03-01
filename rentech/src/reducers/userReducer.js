import { FETCH_DATA } from '../actions';

const initialState = {
    username: "",
    password: "",
    type: "",
    id: 0,
    items: [],
    isFetchingData: false,
    error: "",

}

export const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_DATA:
            return {
                ...state,
                isFetchingData: true
            };
        default:
            return state;
    }
}