import axios from 'axios';

export const POST_DATA = "POST_DATA";
export const SET_ERROR = "SET_ERROR";
export const GET_ALL_USERS = "GET_ALL_USERS";
export const LOGIN_USER = "LOGIN_USER";
export const SET_CURRENT_USER = "SET_CURRENT_USER";
export const ADD_NEW_ITEM = "ADD_NEW_ITEM";

const config = {
    headers: {
        'Content-Type': 'application/json'
    }
}

export const getAllUsers = () => dispatch => {
    axios
        .get("https://use-my-tech-stuff-4.herokuapp.com/api/users", config)
        .then(res => {
            console.log('getAllUsers action has been called');
            dispatch({ type: GET_ALL_USERS, payload: res.data.users });
        })
        .catch(err => {
            dispatch({ type: SET_ERROR, payload: "error in GETting all users" });
        })
};

export const loginUser = () => dispatch => {
    dispatch({ type: POST_DATA, payload: "yes" })
};

export const setCurrentUser = (userData) => dispatch => {
    dispatch({ type: SET_CURRENT_USER, payload: userData });
}
