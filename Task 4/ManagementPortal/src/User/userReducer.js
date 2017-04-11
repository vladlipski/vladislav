import {
    FETCH_USERS, FETCH_USERS_FAILURE, FETCH_USERS_SUCCESS,
    FETCH_USER, FETCH_USER_FAILURE, FETCH_USER_SUCCESS
} from "./userActions";

export default function(state = {
                            usersList: {
                                users: [],
                                errorMessage: null,
                                isFetching: false
                            },
                            activeUser:{
                                user: null,
                                errorMessage: null,
                                isFetching: false
                            }
                        }, action) {
    switch (action.type) {
        case FETCH_USERS:
            return Object.assign({}, state, {
                usersList: {
                    isFetching: true,
                    users: []
                }
            });
        case FETCH_USERS_SUCCESS:
            return Object.assign({}, state, {
                usersList: {
                    isFetching: false,
                    users: action.payload,
                    errorMessage: ''
                }
            });
        case FETCH_USERS_FAILURE:
            return Object.assign({}, state, {
                usersList: {
                    isFetching: false,
                    users: [],
                    errorMessage: action.payload
                }
            });
        case FETCH_USER:
            return Object.assign({}, state, {
                activeUser: {
                    isFetching: true,
                    user: null
                }
            });
        case FETCH_USER_SUCCESS:
            return Object.assign({}, state, {
                activeUser: {
                    isFetching: false,
                    user: action.payload,
                    errorMessage: ''
                }
            });
        case FETCH_USER_FAILURE:
            return Object.assign({}, state, {
                activeUser: {
                    isFetching: false,
                    user: null,
                    errorMessage: action.payload
                }
            });
        default:
            return state
    }
}