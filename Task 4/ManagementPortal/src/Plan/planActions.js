import * as fakeBackend from "../fakeBackend";
export const FETCH_PLANS = 'FETCH_PLANS';
export const FETCH_PLANS_SUCCESS = 'FETCH_PLANS_SUCCESS';
export const FETCH_PLANS_FAILURE = 'FETCH_PLANS_FAILURE';

export function fetchPlans() {
    return {
        type: FETCH_PLANS
    };
}

export function fetchPlansSuccess(plans) {
    return {
        type: FETCH_PLANS_SUCCESS,
        payload: plans
    };
}

export function fetchPlansFailure(message) {
    return {
        type: FETCH_PLANS_FAILURE,
        payload: message
    };
}

export function getAllPlans() {
    return (dispatch) => {
        dispatch(fetchPlans());
        return fakeBackend.getAllPlans().then(response => {
            dispatch(fetchPlansSuccess(response.plans));
        }).catch(response => {
            dispatch(fetchPlansFailure(response.errorMessage));
        })
    }
}

export function getPlansByAuthor(authorId) {
    return (dispatch) => {
        dispatch(fetchPlans());
        return fakeBackend.getPlansByAuthor(authorId).then(response => {
            dispatch(fetchPlansSuccess(response.plans));
        }).catch(response => {
            dispatch(fetchPlansFailure(response.errorMessage));
        })
    }
}