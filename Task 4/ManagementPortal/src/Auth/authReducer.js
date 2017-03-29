// var localStorage = require('localStorage');

import {
    LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE, LOGOUT_SUCCESS
} from './authActions'


export default function(state = {
                            isFetching: false,
                            isAuthenticated: false//localStorage.getItem('id_token') ? true : false
                        }, action) {
    switch (action.type) {
        // case LOGIN_REQUEST:
        //     return Object.assign({}, state, {
        //         isFetching: true,
        //         isAuthenticated: false
        //     })
        case LOGIN_SUCCESS:
            return Object.assign({}, state, {
                isFetching: false,
                isAuthenticated: true,
                errorMessage: ''
            });
        case LOGIN_FAILURE:
            return Object.assign({}, state, {
                isFetching: false,
                isAuthenticated: false,
                errorMessage: action.payload
            });
        // case LOGOUT_SUCCESS:
        //     return Object.assign({}, state, {
        //         isFetching: true,
        //         isAuthenticated: false
        //     })
        default:
            return state
    }
}