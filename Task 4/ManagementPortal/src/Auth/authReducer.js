import Cookies from 'js-cookie';
import {
    LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE, LOGOUT_REQUEST, LOGOUT_SUCCESS, LOGOUT_FAILURE
} from './authActions'
import {verifyToken} from "../fakeBackend";


export default function(state = {
                            errorMessage: null,
                            isFetching: false,
                            user: verifyToken(Cookies.get('id_token'))
                        }, action) {
    switch (action.type) {
        case LOGIN_REQUEST:
            return Object.assign({}, state, {
                isFetching: true,
                user: null
            });
        case LOGIN_SUCCESS:
            return Object.assign({}, state, {
                isFetching: false,
                user: action.payload,
                errorMessage: null
            });
        case LOGIN_FAILURE:
            return Object.assign({}, state, {
                isFetching: false,
                user: null,
                errorMessage: action.payload
            });
        case LOGOUT_REQUEST:
            return Object.assign({}, state, {
                isFetching: true
            });
        case LOGOUT_SUCCESS:
            return Object.assign({}, state, {
                isFetching: false,
                user: null
            });
        case LOGOUT_FAILURE:
            return Object.assign({}, state, {
                isFetching: false,
                user: null
            });
        default:
            return state
    }
}