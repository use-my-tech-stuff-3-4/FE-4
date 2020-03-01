import axiosWithAuth from '../utilities/axiosWithAuth';

export const FETCH_DATA = "FETCH_DATA";
export const UPDATE_OWNER_ITEMS = "UPDATE_OWNER_ITEMS";
export const SET_ERROR = "SET_ERROR";

export const getData = () => dispatch => {
    dispatch({ type: FETCH_DATA });
    setTimeout(() => {
        axiosWithAuth()
            .get('')
            .then(res => {
                console.log('owner items get request result', res);
                dispatch({ type: UPDATE_OWNER_ITEMS, payload: res.data })
            })
            .catch(err => {
                console.log('error', err)
                dispatch({ type: SET_ERROR, payload: "error fetching owner item data from api" })
            })
    }, 2000);
};

