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
        type: LOGIN_REQUEST,
        isFetching: true,
        isAuthenticated: false
    }
}

function receiveLogin() {
    return {
        type: LOGIN_SUCCESS,
        isFetching: false,
        isAuthenticated: true,
        errorMessage: ''
    }
}

function loginError(message) {
    return {
        type: LOGIN_FAILURE,
        isFetching: false,
        isAuthenticated: false,
        message
    }
}

export function loginUser(username, password) {
    return (dispatch) => {
        dispatch(requestLogin());
        return authService.login(username, password).then((response) => {
            if (response.status !== 200) {
                return Promise.reject(response.status);
            }
            dispatch(receiveLogin());
        }).catch(error => {
            switch (error) {
                case 401:
                    dispatch(loginError('Incorrect username or password.'));
                    break;
                default:
                    dispatch(loginError('Oops. Something is wrong. Try again, please. '));
            }
        })
    }
}

function requestLogout() {
    return {
        type: LOGOUT_REQUEST,
        isFetching: true,
        isAuthenticated: true
    }
}

function receiveLogout() {
    return {
        type: LOGOUT_SUCCESS,
        isFetching: false,
        isAuthenticated: false
    }
}

function logoutError() {
    return {
        type: LOGOUT_FAILURE,
        isFetching: false,
        isAuthenticated: false
    }
}

export function logoutUser() {
    return dispatch => {
        dispatch(requestLogout());
        Cookies.remove('id_token');
        dispatch(receiveLogout())
    }
}