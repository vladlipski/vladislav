import * as fakeBackend from "../fakeBackend";

export const FETCH_USERS = 'FETCH_USERS';
export const FETCH_USERS_SUCCESS = 'FETCH_USERS_SUCCESS';
export const FETCH_USERS_FAILURE = 'FETCH_USERS_FAILURE';

export const FETCH_USER = 'FETCH_USER';
export const FETCH_USER_SUCCESS = 'FETCH_USER_SUCCESS';
export const FETCH_USER_FAILURE = 'FETCH_USER_FAILURE';

export const CREATE_USER = 'CREATE_USER';
export const CREATE_USER_SUCCESS = 'CREATE_USER_SUCCESS';
export const CREATE_USER_FAILURE = 'CREATE_USER_FAILURE';

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

export function getAllUsers() {
    return (dispatch) => {
        dispatch(fetchUsers());
        return fakeBackend.getAllUsers().then(response => {
            dispatch(fetchUsersSuccess(response.users));
        }).catch(response => {
            dispatch(fetchUsersFailure(response.errorMessage));
        })
    }
}

export function getUsersByMentor(id) {
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

export function createUser() {
    return {
        type: CREATE_USER
    };
}

export function createUserSuccess() {
    return {
        type: CREATE_USER_SUCCESS
    };
}

export function createUserFailure(message) {
    return {
        type: CREATE_USER_FAILURE,
        payload: message
    };
}

export function addUser(user) {
    return (dispatch) => {
        dispatch(createUser());
        return fakeBackend.createUser(user).then(response => {
            dispatch(createUserSuccess());
        }).catch(response => {
            dispatch(createUserFailure(response.errorMessage));
        })
    }
}