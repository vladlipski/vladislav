import * as fakeBackend from "../fakeBackend";
export const FETCH_USERS = 'FETCH_USERS';
export const FETCH_USERS_SUCCESS = 'FETCH_USERS_SUCCESS';
export const FETCH_USERS_FAILURE = 'FETCH_USERS_FAILURE';

export const FETCH_USER = 'FETCH_USER';
export const FETCH_USER_SUCCESS = 'FETCH_USER_SUCCESS';
export const FETCH_USER_FAILURE = 'FETCH_USER_FAILURE';

export function fetchUsers() {
    return {
        type: FETCH_USERS
    };
}

export function fetchUsersSuccess(users) {
    return {
        type: FETCH_USERS_SUCCESS,
        payload: users
    };
}

export function fetchUsersFailure(message) {
    return {
        type: FETCH_USERS_FAILURE,
        payload: message
    };
}

export function getUsers(id) {
    return (dispatch) => {
        dispatch(fetchUsers());
        return fakeBackend.getUsersByMentor(id).then(response => {
            dispatch(fetchUsersSuccess(response.users));
        }).catch(response => {
            dispatch(fetchUsersFailure(response.errorMessage));
        })
    }
}

export function fetchUser() {
    return {
        type: FETCH_USER
    };
}

export function fetchUserSuccess(user) {
    return {
        type: FETCH_USER_SUCCESS,
        payload: user
    };
}

export function fetchUserFailure(message) {
    return {
        type: FETCH_USER_FAILURE,
        payload: message
    };
}

export function getUser(mentorId, userId) {
    return (dispatch) => {
        dispatch(fetchUser());
        return fakeBackend.getUserById(mentorId, userId).then(response => {
            dispatch(fetchUserSuccess(response.user));
        }).catch(response => {
            dispatch(fetchUserFailure(response.errorMessage));
        })
    }
}