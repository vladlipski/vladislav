import * as fakeBackend from "../../fakeBackend";

export const FETCH_TASK = 'FETCH_TASK';
export const FETCH_TASK_SUCCESS = 'FETCH_TASK_SUCCESS';
export const FETCH_TASK_FAILURE = 'FETCH_TASK_FAILURE';

export const CREATE_TASK = 'CREATE_TASK';
export const CREATE_TASK_SUCCESS = 'CREATE_TASK_SUCCESS';
export const CREATE_TASK_FAILURE = 'CREATE_TASK_FAILURE';

export const UPDATE_TASK = 'UPDATE_TASK';
export const UPDATE_TASK_SUCCESS = 'UPDATE_TASK_SUCCESS';
export const UPDATE_TASK_FAILURE = 'UPDATE_TASK_FAILURE';
export const RESET_UPDATED_TASK = 'RESET_UPDATED_TASK';

export function fetchTask() {
    return {
        type: FETCH_TASK
    };
}

export function fetchTaskSuccess(task) {
    return {
        type: FETCH_TASK_SUCCESS,
        payload: task
    };
}

export function fetchTaskFailure(message) {
    return {
        type: FETCH_TASK_FAILURE,
        payload: message
    };
}

export function getTask(authorId, taskId) {
    return (dispatch) => {
        dispatch(fetchTask());
        return fakeBackend.getTask(authorId, taskId).then(response => {
            dispatch(fetchTaskSuccess(response.task));
        }).catch(response => {
            dispatch(fetchTaskFailure(response.errorMessage));
        })
    }
}

export function createTask() {
    return {
        type: CREATE_TASK
    };
}

export function createTaskSuccess() {
    return {
        type: CREATE_TASK_SUCCESS
    };
}

export function createTaskFailure(message) {
    return {
        type: CREATE_TASK_FAILURE,
        payload: message
    };
}

export function requestTaskCreation(task) {
    return (dispatch) => {
        dispatch(createTask());
        return fakeBackend.createTask(task).then(response => {
            dispatch(createTaskSuccess());
        }).catch(response => {
            dispatch(createTaskFailure(response.errorMessage));
        })
    }
}

export function updateTask() {
    return {
        type: UPDATE_TASK
    };
}

export function updateTaskSuccess(task) {
    return {
        type: UPDATE_TASK_SUCCESS,
        payload: task
    };
}

export function updateTaskFailure(message) {
    return {
        type: UPDATE_TASK_FAILURE,
        payload: message
    };
}

export function requestTaskUpdate(task) {
    return (dispatch) => {
        dispatch(updateTask());
        return fakeBackend.updateTask(task).then(response => {
            dispatch(updateTaskSuccess(task));
        }).catch(response => {
            dispatch(updateTaskFailure(response.errorMessage));
        })
    }
}

export function resetUpdatedTask() {
    return {
        type: RESET_UPDATED_TASK
    };
}