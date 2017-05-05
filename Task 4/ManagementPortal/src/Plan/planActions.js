import * as fakeBackend from "../fakeBackend";
export const FETCH_PLANS = 'FETCH_PLANS';
export const FETCH_PLANS_SUCCESS = 'FETCH_PLANS_SUCCESS';
export const FETCH_PLANS_FAILURE = 'FETCH_PLANS_FAILURE';

export const FETCH_PLAN = 'FETCH_PLAN';
export const FETCH_PLAN_SUCCESS = 'FETCH_PLAN_SUCCESS';
export const FETCH_PLAN_FAILURE = 'FETCH_PLAN_FAILURE';
export const RESET_SELECTED_PLAN = 'RESET_SELECTED_PLAN';

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

export function fetchPlan() {
    return {
        type: FETCH_PLAN
    };
}

export function fetchPlanSuccess(plan) {
    return {
        type: FETCH_PLAN_SUCCESS,
        payload: plan
    };
}

export function fetchPlanFailure(message) {
    return {
        type: FETCH_PLAN_FAILURE,
        payload: message
    };
}

export function resetSelectedPlan() {
    return {
        type: RESET_SELECTED_PLAN
    };
}

export function getPlan(authorId, planId) {
    return (dispatch) => {
        dispatch(fetchPlan());
        return fakeBackend.getPlan(authorId, planId).then(response => {
            dispatch(fetchPlanSuccess(response.plan));
        }).catch(response => {
            dispatch(fetchPlanFailure(response.errorMessage));
        })
    }
}