import * as fakeBackend from "../fakeBackend";
export const FETCH_DEPARTMENTS = 'FETCH_DEPARTMENTS';
export const FETCH_DEPARTMENTS_SUCCESS = 'FETCH_PLANS_SUCCESS';
export const FETCH_DEPARTMENTS_FAILURE = 'FETCH_PLANS_FAILURE';

export function fetchDepartments() {
    return {
        type: FETCH_DEPARTMENTS
    };
}

export function fetchDepartmentsSuccess(departments) {
    return {
        type: FETCH_DEPARTMENTS_SUCCESS,
        payload: departments
    };
}

export function fetchDepartmentsFailure(message) {
    return {
        type: FETCH_DEPARTMENTS_FAILURE,
        payload: message
    };
}

export function getDepartments() {
    return (dispatch) => {
        dispatch(fetchDepartments());
        return fakeBackend.getDepartments().then(response => {
            dispatch(fetchDepartmentsSuccess(response.departments));
        }).catch(response => {
            dispatch(fetchDepartmentsFailure(response.errorMessage));
        })
    }
}