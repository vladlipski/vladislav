// import { authService } from './authService'
// var localStorage = require('localStorage');
//
export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';

function requestLogin() {
    return {
        type: LOGIN_REQUEST
    }
}

function receiveLogin() {
    return {
        type: LOGIN_SUCCESS
    }
}

function loginError(message) {
    return {
        type: LOGIN_FAILURE,
        payload: message
    }
}

export function loginUser(creds) {

    let request = {
        username: creds.username,
        password: creds.password
    };

    return dispatch => {
        // dispatch(requestLogin(creds));
        // var response = authService('login', request);
        // localStorage.setItem('id_token', response.id_token);
        dispatch(requestLogin());
        dispatch(loginError('Wrong password'));//response.id_token))
    }
}
//
// export const LOGOUT_REQUEST = 'LOGOUT_REQUEST';
// export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS';
// export const LOGOUT_FAILURE = 'LOGOUT_FAILURE';
//
// function requestLogout() {
//     return {
//         type: LOGOUT_REQUEST,
//         isFetching: true,
//         isAuthenticated: true
//     }
// }
//
// function receiveLogout() {
//     return {
//         type: LOGOUT_SUCCESS,
//         isFetching: false,
//         isAuthenticated: false
//     }
// }
//
// export function logoutUser() {
//     return dispatch => {
//         dispatch(requestLogout());
//         localStorage.removeItem('id_token');
//         dispatch(receiveLogout())
//     }
// }