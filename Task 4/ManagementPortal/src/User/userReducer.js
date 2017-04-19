import {
    FETCH_USERS, FETCH_USERS_FAILURE, FETCH_USERS_SUCCESS,
    FETCH_USER, FETCH_USER_FAILURE, FETCH_USER_SUCCESS, CREATE_USER_FAILURE, CREATE_USER_SUCCESS, CREATE_USER,
    UPDATE_USER, UPDATE_USER_SUCCESS, UPDATE_USER_FAILURE, RESET_USERS, RESET_SELECTED_USER, RESET_NEW_USER,
    RESET_UPDATED_USER, DELETE_USER, DELETE_USER_SUCCESS, DELETE_USER_FAILURE, RESET_DELETED_USER
} from "./userActions";

export default function(state = {
                            usersList: {
                                users: [],
                                errorMessage: null,
                                isFetching: false
                            },
                            selectedUser:{
                                user: null,
                                errorMessage: null,
                                isFetching: false
                            },
                            newUser:{
                                success: false,
                                errorMessage: null,
                                isFetching: false
                            },
                            updatedUser:{
                                success: false,
                                errorMessage: null,
                                isFetching: false
                            },
                            deletedUser:{
                                success: false,
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
                    errorMessage: null
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
        case RESET_USERS:
            return Object.assign({}, state, {
                usersList: {
                    isFetching: false,
                    users: [],
                    errorMessage: null
                }
            });
        case FETCH_USER:
            return Object.assign({}, state, {
                selectedUser: {
                    isFetching: true,
                    user: null
                }
            });
        case FETCH_USER_SUCCESS:
            return Object.assign({}, state, {
                selectedUser: {
                    isFetching: false,
                    user: action.payload,
                    errorMessage: null
                }
            });
        case FETCH_USER_FAILURE:
            return Object.assign({}, state, {
                selectedUser: {
                    isFetching: false,
                    user: null,
                    errorMessage: action.payload
                }
            });
        case RESET_SELECTED_USER:
            return Object.assign({}, state, {
                selectedUser: {
                    isFetching: false,
                    user: {},
                    errorMessage: null
                }
            });
        case CREATE_USER:
            return Object.assign({}, state, {
                newUser: {
                    success: false,
                    errorMessage: null,
                    isFetching: true
                }
            });
        case CREATE_USER_SUCCESS:
            return Object.assign({}, state, {
                newUser: {
                    success: true,
                    errorMessage: null,
                    isFetching: false
                }
            });
        case CREATE_USER_FAILURE:
            return Object.assign({}, state, {
                newUser: {
                    success: false,
                    errorMessage: action.payload,
                    isFetching: false
                }
            });
        case RESET_NEW_USER:
            return Object.assign({}, state, {
                newUser: {
                    success: false,
                    errorMessage: null,
                    isFetching: false
                }
            });
        case UPDATE_USER:
            return Object.assign({}, state, {
                updatedUser: {
                    success: false,
                    errorMessage: null,
                    isFetching: true
                }
            });
        case UPDATE_USER_SUCCESS:
            return Object.assign({}, state, {
                updatedUser: {
                    success: true,
                    errorMessage: null,
                    isFetching: false
                }
            });
        case UPDATE_USER_FAILURE:
            return Object.assign({}, state, {
                updatedUser: {
                    success: false,
                    errorMessage: action.payload,
                    isFetching: false
                }
            });
        case RESET_UPDATED_USER:
            return Object.assign({}, state, {
                updatedUser: {
                    success: false,
                    errorMessage: null,
                    isFetching: false
                }
            });
        case DELETE_USER:
            return Object.assign({}, state, {
                deletedUser: {
                    success: false,
                    errorMessage: null,
                    isFetching: true
                }
            });
        case DELETE_USER_SUCCESS:
            return Object.assign({}, state, {
                deletedUser: {
                    success: true,
                    errorMessage: null,
                    isFetching: false
                }
            });
        case DELETE_USER_FAILURE:
            return Object.assign({}, state, {
                deletedUser: {
                    success: false,
                    errorMessage: action.payload,
                    isFetching: false
                }
            });
        case RESET_DELETED_USER:
            return Object.assign({}, state, {
                deletedUser: {
                    success: false,
                    errorMessage: null,
                    isFetching: false
                }
            });
        default:
            return state
    }
}