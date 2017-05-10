import * as fakeBackend from "../../fakeBackend";

export const FETCH_TASK = 'FETCH_TASK';
export const FETCH_TASK_SUCCESS = 'FETCH_TASK_SUCCESS';
export const FETCH_TASK_FAILURE = 'FETCH_TASK_FAILURE';

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