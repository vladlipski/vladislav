import {
    FETCH_USERS, FETCH_USERS_FAILURE, FETCH_USERS_SUCCESS
} from "./userActions";

export default function(state = {
                            usersList: {
                                users: [],
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
        default:
            return state
    }
}