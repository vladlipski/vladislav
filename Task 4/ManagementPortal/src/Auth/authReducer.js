import Cookies from 'js-cookie';
import {
    LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE, LOGOUT_REQUEST, LOGOUT_SUCCESS, LOGOUT_FAILURE
} from './authActions'
import {verifyToken} from "./authService";


export default function(state = {
                            isFetching: false,
                            user: verifyToken(Cookies.get('id_token'))
                        }, action) {
    switch (action.type) {
        case LOGIN_REQUEST:
            return Object.assign({}, state, {
                isFetching: action.isFetching,
                user: action.user
            });
        case LOGIN_SUCCESS:
            return Object.assign({}, state, {
                isFetching: action.isFetching,
                user: action.user,
                errorMessage: action.message
            });
        case LOGIN_FAILURE:
            return Object.assign({}, state, {
                isFetching: action.isFetching,
                user: action.user,
                errorMessage: action.message
            });
        case LOGOUT_REQUEST:
            return Object.assign({}, state, {
                isFetching: action.isFetching
            });
        case LOGOUT_SUCCESS:
            return Object.assign({}, state, {
                isFetching: action.isFetching,
                user: action.user
            });
        case LOGOUT_FAILURE:
            return Object.assign({}, state, {
                isFetching: action.isFetching,
                user: action.user
            });
        default:
            return state
    }
}