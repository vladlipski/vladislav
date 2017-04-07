import * as authService from "./authService";
import Cookies from 'js-cookie';

export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';
export const LOGOUT_REQUEST = 'LOGOUT_REQUEST';
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS';
export const LOGOUT_FAILURE = 'LOGOUT_FAILURE';

function requestLogin() {
    return {
        type: LOGIN_REQUEST
    }
}

function receiveLogin(user) {
    return {
        type: LOGIN_SUCCESS,
        payload: user
    }
}

function loginError(message) {
    return {
        type: LOGIN_FAILURE,
        payload: message
    }
}

export function loginUser(username, password) {
    return (dispatch) => {
        dispatch(requestLogin());
        return authService.login(username, password).then(response => {
            dispatch(receiveLogin(response.user));
        }).catch(response => {
            dispatch(loginError(response.errorMessage));
        })
    }
}

function requestLogout() {
    return {
        type: LOGOUT_REQUEST
    }
}

function receiveLogout() {
    return {
        type: LOGOUT_SUCCESS
    }
}

function logoutError() {
    return {
        type: LOGOUT_FAILURE
    }
}

export function logoutUser() {
    return dispatch => {
        dispatch(requestLogout());
        Cookies.remove('id_token');
        dispatch(receiveLogout())
    }
}