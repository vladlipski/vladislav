import * as fakeBackend from "../fakeBackend";
export const FETCH_USERS = 'FETCH_USERS';
export const FETCH_USERS_SUCCESS = 'FETCH_USERS_SUCCESS';
export const FETCH_USERS_FAILURE = 'FETCH_USERS_FAILURE';

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

export function getUsers (mentorId) {
    return (dispatch) => {
        dispatch(fetchUsers());
        return fakeBackend.getUsersByMentor(mentorId).then(response => {
            dispatch(fetchUsersSuccess(response.users));
        }).catch(response => {
            dispatch(fetchUsersFailure(response.errorMessage));
        })
    }
}