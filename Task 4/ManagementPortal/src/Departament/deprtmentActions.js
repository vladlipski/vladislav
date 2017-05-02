import * as fakeBackend from "../fakeBackend";
export const FETCH_DEPARTMENTS = 'FETCH_DEPARTMENTS';
export const FETCH_DEPARTMENTS_SUCCESS = 'FETCH_DEPARTMENTS_SUCCESS';
export const FETCH_DEPARTMENTS_FAILURE = 'FETCH_DEPARTMENTS_FAILURE';

export const FETCH_DEPARTMENT = 'FETCH_DEPARTMENT';
export const FETCH_DEPARTMENT_SUCCESS = 'FETCH_DEPARTMENT_SUCCESS';
export const FETCH_DEPARTMENT_FAILURE = 'FETCH_DEPARTMENT_FAILURE';
export const RESET_SELECTED_DEPARTMENT = 'RESET_SELECTED_DEPARTMENT';

export const CREATE_DEPARTMENT = 'CREATE_DEPARTMENT';
export const CREATE_DEPARTMENT_SUCCESS = 'CREATE_DEPARTMENT_SUCCESS';
export const CREATE_DEPARTMENT_FAILURE = 'CREATE_DEPARTMENT_FAILURE';
export const RESET_NEW_DEPARTMENT = 'RESET_NEW_DEPARTMENT';

export const UPDATE_DEPARTMENT = 'UPDATE_DEPARTMENT';
export const UPDATE_DEPARTMENT_SUCCESS = 'UPDATE_DEPARTMENT_SUCCESS';
export const UPDATE_DEPARTMENT_FAILURE = 'UPDATE_DEPARTMENT_FAILURE';
export const RESET_UPDATED_DEPARTMENT = 'RESET_UPDATED_DEPARTMENT';

export const DELETE_DEPARTMENT = 'DELETE_DEPARTMENT';
export const DELETE_DEPARTMENT_SUCCESS = 'DELETE_DEPARTMENT_SUCCESS';
export const DELETE_DEPARTMENT_FAILURE = 'DELETE_DEPARTMENT_FAILURE';
export const RESET_DELETED_DEPARTMENT = 'RESET_DELETED_DEPARTMENT';

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

export function fetchDepartment() {
    return {
        type: FETCH_DEPARTMENT
    };
}

export function fetchDepartmentSuccess(department) {
    return {
        type: FETCH_DEPARTMENT_SUCCESS,
        payload: department
    };
}

export function fetchDepartmentFailure(message) {
    return {
        type: FETCH_DEPARTMENT_FAILURE,
        payload: message
    };
}

export function resetSelectedDepartment() {
    return {
        type: RESET_SELECTED_DEPARTMENT
    };
}

export function getDepartment(departmentId) {
    return (dispatch) => {
        dispatch(fetchDepartment());
        return fakeBackend.getDepartment(departmentId).then(response => {
            dispatch(fetchDepartmentSuccess(response.department));
        }).catch(response => {
            dispatch(fetchDepartmentFailure(response.errorMessage));
        })
    }
}

export function createDepartment() {
    return {
        type: CREATE_DEPARTMENT
    };
}

export function createDepartmentSuccess() {
    return {
        type: CREATE_DEPARTMENT_SUCCESS
    };
}

export function createDepartmentFailure(message) {
    return {
        type: CREATE_DEPARTMENT_FAILURE,
        payload: message
    };
}

export function resetNewDepartment() {
    return {
        type: RESET_NEW_DEPARTMENT
    };
}

export function requestDepartmentCreation(department) {
    return (dispatch) => {
        dispatch(createDepartment());
        return fakeBackend.createDepartment(department).then(response => {
            dispatch(createDepartmentSuccess());
        }).catch(response => {
            dispatch(createDepartmentFailure(response.errorMessage));
        })
    }
}

export function updateDepartment() {
    return {
        type: UPDATE_DEPARTMENT
    };
}

export function updateDepartmentSuccess() {
    return {
        type: UPDATE_DEPARTMENT_SUCCESS
    };
}

export function updateDepartmentFailure(message) {
    return {
        type: UPDATE_DEPARTMENT_FAILURE,
        payload: message
    };
}

export function resetUpdatedDepartment() {
    return {
        type: RESET_UPDATED_DEPARTMENT
    };
}

export function requestDepartmentUpdate(department) {
    return (dispatch) => {
        dispatch(updateDepartment());
        return fakeBackend.updateDepartment(department).then(response => {
            dispatch(updateDepartmentSuccess());
        }).catch(response => {
            dispatch(updateDepartmentFailure(response.errorMessage));
        })
    }
}

export function deleteDepartment() {
    return {
        type: DELETE_DEPARTMENT
    };
}

export function deleteDepartmentSuccess() {
    return {
        type: DELETE_DEPARTMENT_SUCCESS
    };
}

export function deleteDepartmentFailure(message) {
    return {
        type: DELETE_DEPARTMENT_FAILURE,
        payload: message
    };
}

export function resetDeletedDepartment() {
    return {
        type: RESET_DELETED_DEPARTMENT
    };
}

export function requestDepartmentDeletion (id) {
    return (dispatch) => {
        dispatch(deleteDepartment());
        return fakeBackend.deleteDepartment(id).then(response => {
            dispatch(deleteDepartmentSuccess());
        }).catch(response => {
            dispatch(deleteDepartmentFailure(response.errorMessage));
        })
    }
}