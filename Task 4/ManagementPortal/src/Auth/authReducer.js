import Cookies from 'js-cookie';
import {
    LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE, LOGOUT_REQUEST, LOGOUT_SUCCESS, LOGOUT_FAILURE
} from './authActions'
import {verifyToken} from "./authService";


export default function(state = {
                            isFetching: false,
                            isAuthenticated: verifyToken(Cookies.get('id_token'))
                        }, action) {
    switch (action.type) {
        case LOGIN_REQUEST:
            return Object.assign({}, state, {
                isFetching: action.isFetching,
                isAuthenticated: action.isAuthenticated
            });
        case LOGIN_SUCCESS:
            return Object.assign({}, state, {
                isFetching: action.isFetching,
                isAuthenticated: action.isAuthenticated,
                errorMessage: action.message
            });
        case LOGIN_FAILURE:
            return Object.assign({}, state, {
                isFetching: action.isFetching,
                isAuthenticated: action.isAuthenticated,
                errorMessage: action.message
            });
        case LOGOUT_REQUEST:
            return Object.assign({}, state, {
                isFetching: action.isFetching,
                isAuthenticated: action.isAuthenticated
            });
        case LOGOUT_SUCCESS:
            return Object.assign({}, state, {
                isFetching: action.isFetching,
                isAuthenticated: action.isAuthenticated
            });
        case LOGOUT_FAILURE:
            return Object.assign({}, state, {
                isFetching: action.isFetching,
                isAuthenticated: action.isAuthenticated
            });
        default:
            return state
    }
}